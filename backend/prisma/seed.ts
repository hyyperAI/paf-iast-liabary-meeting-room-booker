import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin', 10);

  const admin = await prisma.student.upsert({
    where: { registrationNo: 'admin' },
    update: {},
    create: {
      registrationNo: 'admin',
      phoneNumber: '+923001234567',
      email: 'admin@paf-iast.edu.pk',
      semester: 'N/A',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created:', admin);

  // Create sample students
  const studentPassword = await bcrypt.hash('student123', 10);

  const student1 = await prisma.student.upsert({
    where: { registrationNo: '2021-CS-001' },
    update: {},
    create: {
      registrationNo: '2021-CS-001',
      phoneNumber: '+923001234568',
      email: 'student1@paf-iast.edu.pk',
      semester: '6th',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  const student2 = await prisma.student.upsert({
    where: { registrationNo: '2021-CS-002' },
    update: {},
    create: {
      registrationNo: '2021-CS-002',
      phoneNumber: '+923001234569',
      email: 'student2@paf-iast.edu.pk',
      semester: '8th',
      password: studentPassword,
      role: 'STUDENT',
    },
  });

  console.log('Sample students created:', { student1, student2 });

  // Create room slots for the next 3 working days
  const today = new Date();
  const next3WorkingDays = getNext3WorkingDays(today);

  const timeSlots = [
    '9:00-10:00',
    '10:00-11:00',
    '11:00-12:00',
    '12:00-13:00',
    '13:00-14:00',
    '14:00-15:00',
    '15:00-16:00',
    '16:00-17:00',
  ];

  const roomSlots = [];

  for (const date of next3WorkingDays) {
    for (const timeSlot of timeSlots) {
      for (const roomNumber of [1, 2]) {
        roomSlots.push({
          roomNumber,
          date,
          timeSlot,
          status: 'ACTIVE',
        });
      }
    }
  }

  for (const slot of roomSlots) {
    await prisma.room.upsert({
      where: {
        roomNumber_date_timeSlot: {
          roomNumber: slot.roomNumber,
          date: slot.date,
          timeSlot: slot.timeSlot,
        },
      },
      update: {},
      create: slot,
    });
  }

  console.log(`Created ${roomSlots.length} room slots for next 3 working days`);

  // Create sample booking
  const firstRoom = await prisma.room.findFirst({
    where: {
      roomNumber: 1,
      date: next3WorkingDays[0],
      timeSlot: '9:00-10:00',
    },
  });

  if (firstRoom) {
    const booking = await prisma.booking.create({
      data: {
        studentId: student1.id,
        roomId: firstRoom.id,
        applicantName: 'John Doe',
        applicantPhone: '+923001234568',
        applicantEmail: 'student1@paf-iast.edu.pk',
        applicantSemester: '6th',
        groupMemberCount: 2,
        requestStatus: 'PENDING',
        queuePosition: 0,
      },
    });

    await prisma.member.createMany({
      data: [
        {
          bookingId: booking.id,
          name: 'Jane Smith',
          registrationNo: '2021-CS-003',
        },
        {
          bookingId: booking.id,
          name: 'Bob Johnson',
          registrationNo: '2021-CS-004',
        },
      ],
    });

    // Update room status to PENDING
    await prisma.room.update({
      where: { id: firstRoom.id },
      data: {
        status: 'PENDING',
        queueCount: 1,
      },
    });

    console.log('Sample booking created:', booking);
  }

  console.log('Seeding completed successfully!');
}

function getNext3WorkingDays(startDate: Date): Date[] {
  const dates: Date[] = [];
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);

  while (dates.length < 3) {
    const dayOfWeek = current.getDay();
    // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    // Working days are Monday (1) to Friday (5)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
