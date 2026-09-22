import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const approveBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
      },
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

    if (booking.requestStatus !== 'PENDING') {
      return res.status(400).json({
        success: false,
        error: {
          code: 400,
          message: 'Booking is not pending',
        },
      });
    }

    // Update booking and room in transaction
    await prisma.$transaction(async (tx) => {
      // Update booking status
      await tx.booking.update({
        where: { id },
        data: {
          requestStatus: 'APPROVED',
        },
      });

      // Update room status to APPROVED
      await tx.room.update({
        where: { id: booking.roomId },
        data: {
          status: 'APPROVED',
        },
      });
    });

    res.status(200).json({
      success: true,
      message: 'Booking approved successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const rejectBooking = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        room: {
          include: {
            bookings: {
              where: {
                requestStatus: 'PENDING',
              },
              orderBy: {
                queuePosition: 'asc',
              },
            },
          },
        },
      },
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

    // Update booking status and handle queue in transaction
    await prisma.$transaction(async (tx) => {
      // Update rejected booking status
      await tx.booking.update({
        where: { id },
        data: {
          requestStatus: 'REJECTED',
        },
      });

      // Decrement room queue count
      await tx.room.update({
        where: { id: booking.roomId },
        data: {
          queueCount: {
            decrement: 1,
          },
        },
      });

      // Move remaining bookings up in queue
      const remainingBookings = booking.room.bookings.filter((b) => b.id !== id);
      for (let i = 0; i < remainingBookings.length; i++) {
        await tx.booking.update({
          where: { id: remainingBookings[i].id },
          data: {
            queuePosition: i,
          },
        });
      }

      // If queue is now empty, set room back to ACTIVE
      if (remainingBookings.length === 0) {
        await tx.room.update({
          where: { id: booking.roomId },
          data: {
            status: 'ACTIVE',
          },
        });
      }
    });

    res.status(200).json({
      success: true,
      message: 'Booking rejected and queue updated',
    });
  } catch (error) {
    next(error);
  }
};
