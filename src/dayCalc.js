const periodInDays = ({ periodType, timeToElapse }) => {
  let duration = 0;
  switch (periodType) {
    case 'DAYS':
      duration = timeToElapse;
      break;
    case 'WEEKS':
      duration = timeToElapse * 7;
      break;
    case 'MONTHS':
      duration = timeToElapse * 30;
      break;
    default:
      duration = null;
  }
  return duration;
};

export default periodInDays;
