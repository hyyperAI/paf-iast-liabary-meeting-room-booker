import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';
import { dayRangeFilter } from '../utils/dateHelpers';

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query;

    let rooms;

    if (date) {
      rooms = await prisma.room.findMany({
        where: {
          date: dayRangeFilter(date as string),
        },
        include: {
          bookings: {
            include: {
              student: {
                select: {
                  id: true,
                  registrationNo: true,
                },
              },
            },
          },
        },
        orderBy: [
          { roomNumber: 'asc' },
          { timeSlot: 'asc' },
        ],
      });
    } else {
      rooms = await prisma.room.findMany({
        include: {
          bookings: {
            include: {
              student: {
                select: {
                  id: true,
                  registrationNo: true,
                },
              },
            },
          },
        },
        orderBy: [
          { date: 'asc' },
          { roomNumber: 'asc' },
          { timeSlot: 'asc' },
        ],
      });
    }

    res.status(200).json({
      success: true,
      data: {
        rooms,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            student: {
              select: {
                id: true,
                registrationNo: true,
              },
            },
            members: true,
          },
        },
      },
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

    res.status(200).json({
      success: true,
      data: {
        room,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRoomAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    // First, find the requested room by its CUID so callers can scope availability
    // to a specific room slot rather than all rooms with the same number.
    const room = await prisma.room.findUnique({
      where: { id },
      include: {
        bookings: {
          include: {
            student: {
              select: {
                id: true,
                registrationNo: true,
              },
            },
          },
        },
      },
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

    // If a date query is provided, restrict to other slots for that same room
    // number on the same calendar day (useful for showing alternatives).
    const siblings = date
      ? await prisma.room.findMany({
          where: {
            roomNumber: room.roomNumber,
            date: dayRangeFilter(date as string),
          },
          orderBy: [{ timeSlot: 'asc' }],
        })
      : [room];

    res.status(200).json({
      success: true,
      data: {
        room,
        slots: siblings,
      },
    });
  } catch (error) {
    next(error);
  }
};
