import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { dayRangeFilter } from '../utils/dateHelpers';

export const getMyBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentId = (req as any).user?.id;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: 'Authentication required',
        },
      });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        studentId,
      },
      include: {
        room: true,
        members: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date, status } = req.query;

    const where: any = {};
    if (date) {
      where.room = {
        date: dayRangeFilter(date as string),
      };
    }
    if (status) {
      where.requestStatus = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        student: {
          select: {
            id: true,
            registrationNo: true,
            email: true,
            phoneNumber: true,
          },
        },
        room: true,
        members: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        bookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      roomId,
      applicantName,
      applicantPhone,
      applicantEmail,
      applicantSemester,
      groupMemberCount,
      members = [],
      studentId: studentIdFromBody,
      registrationNo,
    } = req.body;

    // Get studentId from auth, body, or lookup by registrationNo
    let studentId = (req as any).user?.id || studentIdFromBody;

    if (!studentId && registrationNo) {
      let student = await prisma.student.findUnique({
        where: { registrationNo },
      });

      // Auto-create student if not exists
      if (!student) {
        const hashedPassword = await bcrypt.hash(registrationNo, 10);
        student = await prisma.student.create({
          data: {
            registrationNo,
            email: applicantEmail,
            phoneNumber: applicantPhone,
            semester: applicantSemester,
            password: hashedPassword,
          },
        });
        console.log(`  [Auto-created student: ${registrationNo}]`);
      }

      studentId = student.id;
    }

    if (!studentId) {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: 'registrationNo is required',
        },
      });
    }

    // Get room details
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Room not found',
        },
      });
    }

    // Check if student already has a booking for the same room date
    const existingBooking = await prisma.booking.findFirst({
      where: {
        studentId,
        room: {
          date: room.date,
        },
      },
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        error: {
          code: 2003,
          message: 'You already have a booking for this date',
        },
      });
    }

    // Check if queue is full
    if (room.queueCount >= room.maxQueue) {
      return res.status(400).json({
        success: false,
        error: {
          code: 2002,
          message: 'Queue is full',
        },
      });
    }

    // Create booking in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create booking
      const booking = await tx.booking.create({
        data: {
          studentId,
          roomId,
          applicantName,
          applicantPhone,
          applicantEmail,
          applicantSemester,
          groupMemberCount,
          requestStatus: 'PENDING',
          queuePosition: room.queueCount,
        },
      });

      // Create members if any
      if (members.length > 0) {
        await tx.member.createMany({
          data: members.map((member: any) => ({
            bookingId: booking.id,
            name: member.name,
            registrationNo: member.registrationNo,
          })),
        });
      }

      // Update room queue count and status
      await tx.room.update({
        where: { id: roomId },
        data: {
          queueCount: {
            increment: 1,
          },
          status: 'PENDING',
        },
      });

      return booking;
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: {
        booking: result,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { requestStatus } = req.body;

    const studentId = (req as any).user?.id;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: 'Authentication required',
        },
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Booking not found',
        },
      });
    }

    // Check if student owns the booking
    if (booking.studentId !== studentId) {
      return res.status(403).json({
        success: false,
        error: {
          code: 403,
          message: 'You can only update your own bookings',
        },
      });
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        requestStatus,
      },
    });

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      data: {
        booking: updatedBooking,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const studentId = (req as any).user?.id;
    if (!studentId) {
      return res.status(401).json({
        success: false,
        error: {
          code: 401,
          message: 'Authentication required',
        },
      });
    }

    const booking = await prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Booking not found',
        },
      });
    }

    // Check if student owns the booking
    if (booking.studentId !== studentId) {
      return res.status(403).json({
        success: false,
        error: {
          code: 403,
          message: 'You can only cancel your own bookings',
        },
      });
    }

    // Delete booking in transaction
    await prisma.$transaction(async (tx) => {
      // Delete booking
      await tx.booking.delete({
        where: { id },
      });

      // Update room queue count
      await tx.room.update({
        where: { id: booking.roomId },
        data: {
          queueCount: {
            decrement: 1,
          },
        },
      });
    });

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};
