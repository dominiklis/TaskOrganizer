export const checkForDates = (today, tomorrow) => {
  if (today == null || tomorrow == null) {
    return false;
  }

  let td = new Date(today);
  let tm = new Date(tomorrow);
  if (td.getDay() !== tm.getDay()) {
    return true;
  }

  return false;
};