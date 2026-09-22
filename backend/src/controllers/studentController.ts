import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;

    let students;
    if (search) {
      students = await prisma.student.findMany({
        where: {
          OR: [
            { registrationNo: { contains: search as string } },
            { email: { contains: search as string } },
          ],
        },
        select: {
          id: true,
          registrationNo: true,
          email: true,
          phoneNumber: true,
          semester: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          registrationNo: 'asc',
        },
      });
    } else {
      students = await prisma.student.findMany({
        select: {
          id: true,
          registrationNo: true,
          email: true,
          phoneNumber: true,
          semester: true,
          role: true,
          createdAt: true,
        },
        orderBy: {
          registrationNo: 'asc',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        students,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const student = await prisma.student.findUnique({
      where: { id },
      select: {
        id: true,
        registrationNo: true,
        email: true,
        phoneNumber: true,
        semester: true,
        role: true,
        createdAt: true,
      },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Student not found',
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        student,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentMembers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Verify student exists
    const student = await prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        error: {
          code: 404,
          message: 'Student not found',
        },
      });
    }

    const members = await prisma.member.findMany({
      where: {
        booking: {
          studentId: id,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    res.status(200).json({
      success: true,
      data: {
        members,
      },
    });
  } catch (error) {
    next(error);
  }
};
