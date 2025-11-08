import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import dayjsTimezone from 'dayjs/plugin/timezone';
import dayjsUtc from 'dayjs/plugin/utc';

dayjs.extend(dayjsUtc);
dayjs.extend(dayjsTimezone);

dayjs.locale('ko');
dayjs.tz.setDefault('Asia/Seoul');

export default dayjs;
