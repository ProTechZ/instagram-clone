const getTimeSincePosted = (datePosted: string) => {
  const diff = Date.now() - Date.parse(datePosted.split('T')[0]);
  const timeSincePostedHrs = Math.round(diff / (1000 * 60 * 60));
  let time;

  if (timeSincePostedHrs < 24) {
    time = timeSincePostedHrs;
    return { time, hours: true };
  } else {
    time = Math.round(timeSincePostedHrs / 24); // in days
    return { time, hours: false };
  }
};

export default getTimeSincePosted;