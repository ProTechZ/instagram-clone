const calculateDateDiff = (date: Date) => {
  const ONEDAY = 1000 * 60 * 60 * 24;  // millisecond to day

  const now = new Date();
  const timeDiff = now.getTime() - date.getTime();

  const dateDiff = Math.round(timeDiff / ONEDAY);
  return dateDiff;
};

export default calculateDateDiff;
