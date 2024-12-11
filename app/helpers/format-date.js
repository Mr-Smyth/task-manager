import { helper } from '@ember/component/helper';
import moment from 'moment';

export default helper(function formatDate([date, format]) {
  // Eexclude 'GMT'
  return moment(date).format(format);
});
