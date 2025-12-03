import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timeZone);

dayjs.locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

export default dayjs;
