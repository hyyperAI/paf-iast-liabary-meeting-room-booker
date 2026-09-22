import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../config/database';
import { generateToken } from '../utils/jwt';
import { createError, errorCodes } from '../utils/errors';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { registrationNo, password } = req.body;

    // Find student
    const student = await prisma.student.findUnique({
      where: { registrationNo },
    });

    if (!student) {
      return next(createError(errorCodes.INVALID_CREDENTIALS, 'Invalid credentials'));
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return next(createError(errorCodes.INVALID_CREDENTIALS, 'Invalid credentials'));
    }

    // Generate token
    const token = generateToken({
      id: student.id,
      registrationNo: student.registrationNo,
      role: student.role,
    });

    // Remove password from response
    const { password: _, ...studentWithoutPassword } = student;

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: studentWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { registrationNo, phoneNumber, email, semester, password } = req.body;

    // Check if student already exists
    const existingStudent = await prisma.student.findUnique({
      where: { registrationNo },
    });

    if (existingStudent) {
      return next(createError(errorCodes.INVALID_INPUT, 'Registration number already exists'));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create student
    const student = await prisma.student.create({
      data: {
        registrationNo,
        phoneNumber,
        email,
        semester,
        password: hashedPassword,
      },
    });

    // Remove password from response
    const { password: _, ...studentWithoutPassword } = student;

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        student: studentWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { registrationNo, password } = req.body;

    // Find admin
    const admin = await prisma.student.findUnique({
      where: { registrationNo },
    });

    if (!admin) {
      return next(createError(errorCodes.INVALID_CREDENTIALS, 'Invalid credentials'));
    }

    if (admin.role !== 'ADMIN') {
      return next(createError(errorCodes.ACCESS_DENIED, 'Access denied. Admin only'));
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return next(createError(errorCodes.INVALID_CREDENTIALS, 'Invalid credentials'));
    }

    // Generate token
    const token = generateToken({
      id: admin.id,
      registrationNo: admin.registrationNo,
      role: admin.role,
    });

    // Remove password from response
    const { password: _, ...adminWithoutPassword } = admin;

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      data: {
        token,
        user: adminWithoutPassword,
      },
    });
  } catch (error) {
    next(error);
  }
};
