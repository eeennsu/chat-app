import dayjs from '@configs/setup/dayjs';

export const dateFormatDetail = (date: string) =>
  dayjs.utc(date).tz().format('YYYY-MM-DD HH:mm:ss');
