export const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
};

export const isWorkingDay = (date: Date): boolean => {
  return !isWeekend(date);
};

export const getNext3WorkingDays = (startDate: Date = new Date()): Date[] => {
  const dates: Date[] = [];
  const current = new Date(startDate);
  current.setHours(0, 0, 0, 0);

  while (dates.length < 3) {
    if (isWorkingDay(current)) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

export const isDateInNext3WorkingDays = (date: Date): boolean => {
  const next3Days = getNext3WorkingDays();
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return next3Days.some(
    (d) => d.getTime() === targetDate.getTime()
  );
};

export const isDateInPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  return targetDate.getTime() < today.getTime();
};

// Returns a Prisma `date` filter that matches the entire local calendar day
// for the given input. Avoids the timezone pitfall where `new Date('YYYY-MM-DD')`
// parses as UTC midnight while stored values are local-midnight serialized.
export const dayRangeFilter = (input: string | Date) => {
  const start = new Date(input);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { gte: start, lt: end };
};
