import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getQueueStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { roomId, date, timeSlot } = req.params;

    const bookings = await prisma.booking.findMany({
      where: {
        roomId,
        requestStatus: 'PENDING',
      },
      include: {
        student: {
          select: {
            id: true,
            registrationNo: true,
          },
        },
        members: true,
      },
      orderBy: {
        queuePosition: 'asc',
      },
    });

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    res.status(200).json({
      success: true,
      data: {
        queue: bookings,
        queue_count: bookings.length,
        max_queue: room?.maxQueue || 5,
      },
    });
  } catch (error) {
    next(error);
  }
};
