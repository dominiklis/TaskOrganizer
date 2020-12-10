export const TaskRequestParams = {
  today() {
    let d = new Date(Date.now());
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    return Math.floor(d.getTime() / 1000);
  },

  tomorrow() {
    let td = this.today();
    td += 24 * 60 * 60;
    return td;
  },

  dayAfterTomorrow() {
    let td = this.today();
    td += 48 * 60 * 60;
    return td;
  },

  twoDaysAfterTomorrow() {
    let td = this.today();
    td += 72 * 60 * 60;
    return td;
  },

  yesterday() {
    let td = this.today();
    td -= 24 * 60 * 60;
    return td;
  },

  dayBeforeYesterday() {
    let td = this.today();
    td -= 48 * 60 * 60;
    return td;
  },

  twoDaysBeforeYesterday() {
    let td = this.today();
    td -= 72 * 60 * 60;
    return td;
  },

  sortOrderAsc: "asc",
  sortOrderDesc: "desc",
};
