// let today = new Date(Date.now());
// today.setHours(0);
// today.setMinutes(0);
// today.setSeconds(0);
// today.setMilliseconds(0);
// let twoDaysBeforeYesterday = new Date(today - 72 * 60 * 60 * 1000);
// let dayBeforeYesterday = new Date(today - 48 * 60 * 60 * 1000);
// let yesterday = new Date(today - 24 * 60 * 60 * 1000);
// let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
// let dayAfterTomorrow = new Date(today.getTime() + 48 * 60 * 60 * 1000);
// const tasks = [
//   {
//     id: 1,
//     title: "task two days before yesterday 1",
//     description: null,
//     completed: true,
//     priority: "normal",
//     hasStartTime: false,
//     added: new Date(
//       Date.UTC(
//         twoDaysBeforeYesterday.getUTCFullYear(),
//         twoDaysBeforeYesterday.getUTCMonth(),
//         twoDaysBeforeYesterday.getUTCDate(),
//         10,
//         0,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         twoDaysBeforeYesterday.getUTCFullYear(),
//         twoDaysBeforeYesterday.getUTCMonth(),
//         twoDaysBeforeYesterday.getUTCDate(),
//         0,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [
//       { id: 1, text: "step 01", description: "desc 01", completed: true },
//       { id: 2, text: "step 02", description: "desc 02", completed: false },
//       { id: 3, text: "step 03", description: null, completed: false },
//     ],
//     notes: [],
//   },
//   {
//     id: 3,
//     title: "task two days before yesterday 2",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in vestibulum purus, at rhoncus diam. Vivamus feugiat velit sed dui lobortis, nec pellentesque felis tincidunt. Vivamus sed diam scelerisque, euismod tortor vel, dapibus tellus.",
//     completed: true,
//     priority: "high",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         twoDaysBeforeYesterday.getUTCFullYear(),
//         twoDaysBeforeYesterday.getUTCMonth(),
//         twoDaysBeforeYesterday.getUTCDate(),
//         10,
//         8,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         twoDaysBeforeYesterday.getUTCFullYear(),
//         twoDaysBeforeYesterday.getUTCMonth(),
//         twoDaysBeforeYesterday.getUTCDate(),
//         13,
//         0,
//         0
//       )
//     ),
//     endDate: new Date(
//       Date.UTC(
//         twoDaysBeforeYesterday.getUTCFullYear(),
//         twoDaysBeforeYesterday.getUTCMonth(),
//         twoDaysBeforeYesterday.getUTCDate(),
//         13,
//         30,
//         0
//       )
//     ),
//     group: null,
//     steps: [],
//     notes: [],
//   },

//   {
//     id: 2,
//     title: "task day before yesterday 1",
//     description: null,
//     completed: false,
//     priority: "normal",
//     hasStartTime: false,
//     added: new Date(
//       Date.UTC(
//         twoDaysBeforeYesterday.getUTCFullYear(),
//         twoDaysBeforeYesterday.getUTCMonth(),
//         twoDaysBeforeYesterday.getUTCDate(),
//         17,
//         31,
//         15
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         dayBeforeYesterday.getUTCFullYear(),
//         dayBeforeYesterday.getUTCMonth(),
//         dayBeforeYesterday.getUTCDate(),
//         0,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [
//       { id: 4, text: "step 01", description: "desc 01", completed: false },
//     ],
//     notes: [],
//   },
//   {
//     id: 4,
//     title: "task day before yesterday 2",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in vestibulum purus, at rhoncus diam. Vivamus feugiat velit sed dui lobortis, nec pellentesque felis tincidunt. Vivamus sed diam scelerisque, euismod tortor vel, dapibus tellus.",
//     completed: true,
//     priority: "high",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         dayBeforeYesterday.getFullYear(),
//         dayBeforeYesterday.getMonth(),
//         dayBeforeYesterday.getDate(),
//         10,
//         0,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         dayBeforeYesterday.getFullYear(),
//         dayBeforeYesterday.getMonth(),
//         dayBeforeYesterday.getDate(),
//         12,
//         0,
//         0
//       )
//     ),
//     endDate: new Date(
//       Date.UTC(
//         dayBeforeYesterday.getFullYear(),
//         dayBeforeYesterday.getMonth(),
//         dayBeforeYesterday.getDate(),
//         14,
//         0,
//         0
//       )
//     ),
//     group: null,
//     steps: [
//       { id: 5, text: "step 01", description: "desc 01", completed: false },
//       { id: 6, text: "step 02", description: "desc 01", completed: false },
//     ],
//     notes: [],
//   },
//   {
//     id: 5,
//     title: "task yesterday",
//     description: null,
//     completed: false,
//     priority: "high",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         dayBeforeYesterday.getUTCFullYear(),
//         dayBeforeYesterday.getUTCMonth(),
//         dayBeforeYesterday.getUTCDate(),
//         10,
//         33,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         yesterday.getUTCFullYear(),
//         yesterday.getUTCMonth(),
//         yesterday.getUTCDate(),
//         10,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [],
//     notes: [
//       {
//         id: 1,
//         text:
//           "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
//         added: new Date(
//           Date.UTC(
//             dayBeforeYesterday.getFullYear(),
//             dayBeforeYesterday.getMonth(),
//             dayBeforeYesterday.getDate(),
//             10,
//             36,
//             0
//           )
//         ),
//       },
//     ],
//   },
//   {
//     id: 6,
//     title: "task today 1",
//     description:
//       "In bibendum accumsan imperdiet. In elit mauris, rutrum vitae scelerisque at, luctus id massa. Donec a vehicula lorem. Maecenas viverra tincidunt orci, non volutpat erat ultrices et. Aenean sodales nisi id arcu pellentesque, eget posuere elit auctor.",
//     completed: true,
//     priority: "high",
//     hasStartTime: false,
//     added: new Date(
//       Date.UTC(
//         dayBeforeYesterday.getUTCFullYear(),
//         dayBeforeYesterday.getUTCMonth(),
//         dayBeforeYesterday.getUTCDate(),
//         13,
//         3,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         0,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [],
//     notes: [],
//   },
//   {
//     id: 7,
//     title: "task today 2",
//     description:
//       "Etiam sodales, leo ut dapibus bibendum, lorem tortor iaculis eros, ut consectetur libero libero in dui. Cras dapibus orci sit amet metus maximus molestie. Donec tempor purus tempor nunc bibendum tristique imperdiet nec quam. Donec non porttitor felis. Phasellus accumsan dignissim eros, non pretium turpis tincidunt sagittis. Phasellus sit amet tempor ante.",
//     completed: false,
//     priority: "normal",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         yesterday.getUTCFullYear(),
//         yesterday.getUTCMonth(),
//         yesterday.getUTCDate(),
//         10,
//         0,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         10,
//         20,
//         0
//       )
//     ),
//     endDate: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         10,
//         40,
//         0
//       )
//     ),
//     group: null,
//     steps: [
//       { id: 7, text: "step 01", description: "desc 01", completed: true },
//       { id: 8, text: "step 02", description: "desc 02", completed: false },
//       { id: 9, text: "step 03", description: "desc 03", completed: false },
//     ],
//     notes: [
//       {
//         id: 2,
//         text:
//           "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
//         added: new Date(
//           Date.UTC(
//             today.getUTCFullYear(),
//             today.getUTCMonth(),
//             today.getUTCDate(),
//             16,
//             0,
//             0
//           )
//         ),
//       },
//     ],
//   },
//   {
//     id: 10,
//     title: "task today 3",
//     description: null,
//     completed: false,
//     priority: "very high",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         yesterday.getUTCFullYear(),
//         yesterday.getUTCMonth(),
//         yesterday.getUTCDate(),
//         14,
//         0,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         8,
//         40,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [
//       { id: 14, text: "step 01", description: "desc 01", completed: false },
//     ],
//     notes: [],
//   },
//   {
//     id: 12,
//     title: "task today 4",
//     description:
//       "Nunc nunc sapien, pharetra eu lacus ut, mattis commodo tellus. Ut porta magna ac risus aliquet, id mattis quam volutpat. Aenean nec ultrices libero. Nam eget aliquet ex. Suspendisse placerat felis eget nulla vestibulum, ac sodales augue bibendum. Cras maximus lorem nec nisi iaculis, facilisis hendrerit felis malesuada.",
//     completed: false,
//     priority: "high",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         10,
//         0,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         11,
//         0,
//         0
//       )
//     ),
//     endDate: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         12,
//         0,
//         0
//       )
//     ),
//     group: null,
//     steps: [
//       { id: 15, text: "step 01", description: "desc 01", completed: false },
//       { id: 16, text: "step 02", description: "desc 02", completed: false },
//     ],
//     notes: [],
//   },
//   {
//     id: 8,
//     title: "task tomorrow 1",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non leo eu mauris tincidunt ultricies. Nam eu erat in est iaculis congue vel quis urna.",
//     completed: false,
//     priority: "normal",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         yesterday.getUTCFullYear(),
//         yesterday.getUTCMonth(),
//         yesterday.getUTCDate(),
//         10,
//         5,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         tomorrow.getUTCFullYear(),
//         tomorrow.getUTCMonth(),
//         tomorrow.getUTCDate(),
//         9,
//         0,
//         0
//       )
//     ),
//     endDate: new Date(
//       Date.UTC(
//         tomorrow.getUTCFullYear(),
//         tomorrow.getUTCMonth(),
//         tomorrow.getUTCDate(),
//         9,
//         45,
//         0
//       )
//     ),
//     group: null,
//     steps: [
//       { id: 10, text: "step 01", description: "desc 01", completed: false },
//       { id: 11, text: "step 02", description: "desc 02", completed: false },
//       { id: 12, text: "step 03", description: "desc 03", completed: false },
//       { id: 13, text: "step 04", description: "desc 04", completed: false },
//     ],
//     notes: [],
//   },
//   {
//     id: 11,
//     title: "task tomorrow 2",
//     description: null,
//     completed: false,
//     priority: "very high",
//     hasStartTime: false,
//     added: new Date(
//       Date.UTC(
//         today.getUTCFullYear(),
//         today.getUTCMonth(),
//         today.getUTCDate(),
//         16,
//         0,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         tomorrow.getUTCFullYear(),
//         tomorrow.getUTCMonth(),
//         tomorrow.getUTCDate(),
//         0,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [],
//     notes: [],
//   },
//   {
//     id: 9,
//     title: "task day after tomorrow",
//     description:
//       "Quisque et purus in risus mattis rhoncus. Cras lacinia metus at metus rhoncus, eu porttitor quam auctor. Vestibulum mollis, felis a aliquet posuere, magna quam pellentesque nisi, vitae tristique ipsum leo ac sapien. Sed molestie, est a tempus auctor, est enim ornare justo, malesuada blandit urna quam sit amet ante. Vestibulum quis malesuada dolor, sit amet fermentum ipsum. Suspendisse et dolor nunc.",
//     completed: false,
//     priority: "normal",
//     hasStartTime: true,
//     added: new Date(
//       Date.UTC(
//         yesterday.getUTCFullYear(),
//         yesterday.getUTCMonth(),
//         yesterday.getUTCDate(),
//         11,
//         28,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         dayAfterTomorrow.getUTCFullYear(),
//         dayAfterTomorrow.getUTCMonth(),
//         dayAfterTomorrow.getUTCDate(),
//         9,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [],
//     notes: [],
//   },
//   {
//     id: 13,
//     title: "task day after tomorrow 2",
//     description:
//       "Nam libero orci, dignissim condimentum feugiat quis, cursus sit amet lacus. Integer consectetur molestie iaculis.",
//     completed: false,
//     priority: "high",
//     hasStartTime: false,
//     added: new Date(
//       Date.UTC(
//         yesterday.getUTCFullYear(),
//         yesterday.getUTCMonth(),
//         yesterday.getUTCDate(),
//         11,
//         28,
//         0
//       )
//     ),
//     startDate: new Date(
//       Date.UTC(
//         dayAfterTomorrow.getUTCFullYear(),
//         dayAfterTomorrow.getUTCMonth(),
//         dayAfterTomorrow.getUTCDate(),
//         0,
//         0,
//         0
//       )
//     ),
//     endDate: null,
//     group: null,
//     steps: [],
//     notes: [
//       {
//         id: 3,
//         text:
//           "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
//         added: new Date(
//           Date.UTC(
//             yesterday.getUTCFullYear(),
//             yesterday.getUTCMonth(),
//             yesterday.getUTCDate(),
//             16,
//             0,
//             0
//           )
//         ),
//       },
//     ],
//   },
// ];

// const wait = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

// export const getTasks = async (
//   start = today,
//   end = new Date(dayAfterTomorrow.getTime() + 24 * 60 * 60 * 1000),
//   order = "-"
// ) => {
//   await wait(500);
//   let tasksBetweenTwoDates = tasks.filter(
//     (task) => task.startDate >= start && task.startDate < end
//   );

//   let groupedTasks = {};
//   tasksBetweenTwoDates.forEach((task) => {
//     let dateString = `${task.startDate.getUTCFullYear()}-${
//       task.startDate.getUTCMonth() + 1
//     }-${task.startDate.getUTCDate()}`;
//     if (!groupedTasks.hasOwnProperty(dateString)) {
//       groupedTasks[dateString] = [];
//     }
//     groupedTasks[dateString].push(task);
//   });

//   Object.keys(groupedTasks).forEach((tasks) => {
//     if (order === "-") {
//       groupedTasks[tasks].sort((a, b) => a.startDate - b.startDate);
//     } else {
//       groupedTasks[tasks].sort((a, b) => b.startDate - a.startDate);
//     }
//   });

//   return JSON.stringify(groupedTasks);
// };

export const TaskRequestParams = {
  today() {
    let d = new Date(Date.now());
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0)
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

  sortOrderDesc: "desc"
}

// export const getTaskById = async (id) => {
//   await wait(500);
//   let task = tasks.filter((t) => t.id === parseInt(id))[0];
//   if (!task) {
//     task = null;
//   }

//   return JSON.stringify(task);
// };
