const tasks = [
  {
    TaskId: 1,
    AuthorId: 1,
    Title: "task 01",
    Added: new Date("2020-10-27T11:24:00"),
    StartDate: new Date("2020-10-29T14:00:00"),
    Deadline: new Date("2020-10-29T15:00:00"),
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus lacus, pellentesque ac consectetur a, dictum sed sem. Nam eget nisi leo. Aliquam non est magna. Suspendisse massa lectus, venenatis id interdum et, gravida eget lectus. Integer et tellus metus. Sed gravida felis vel elit convallis commodo. Phasellus eleifend pulvinar orci sed ullamcorper. Aliquam posuere ullamcorper bibendum. Fusce tincidunt, purus ut sagittis finibus, augue ex mollis elit, id congue odio ante eget magna. Integer eleifend odio in pharetra dignissim. Aliquam vehicula, mi eget faucibus imperdiet, odio nisl feugiat dolor, sed dictum lorem magna et velit.",
    Steps: [
      { Id: 1, Text: "step 01", Description: "desc 01", Completed: true },
      { Id: 2, Text: "step 02", Description: "desc 02", Completed: false },
      { Id: 3, Text: "step 03", Description: null, Completed: false },
    ],
    Notes: [
      {
        Id: 1,
        Text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        Added: new Date("2020-10-27T16:27:41"),
      },
      {
        Id: 3,
        Text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        Added: new Date("2020-10-27T19:05:11"),
      },
      {
        Id: 4,
        Text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        Added: new Date("2020-10-27T23:44:40"),
      },
      {
        Id: 5,
        Text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        Added: new Date("2020-10-28T07:32:13"),
      },
    ],
  },

  {
    TaskId: 2,
    AuthorId: 1,
    Title: "task 02",
    Added: new Date("2020-10-27T11:31:00"),
    StartDate: new Date("2020-10-29T15:30:00"),
    Deadline: new Date("2020-10-29T17:30:00"),
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus lacus, pellentesque ac consectetur a, dictum sed sem. Nam eget nisi leo. Aliquam non est magna. Suspendisse massa lectus, venenatis id interdum et, gravida eget lectus. Integer et tellus metus. Sed gravida felis vel elit convallis commodo. Phasellus eleifend pulvinar orci sed ullamcorper. Aliquam posuere ullamcorper bibendum. Fusce tincidunt, purus ut sagittis finibus, augue ex mollis elit, id congue odio ante eget magna. Integer eleifend odio in pharetra dignissim. Aliquam vehicula, mi eget faucibus imperdiet, odio nisl feugiat dolor, sed dictum lorem magna et velit.",
    Steps: [
      { Id: 4, Text: "step 01", Description: null, Completed: true },
      { Id: 5, Text: "step 02", Description: null, Completed: false },
      { Id: 6, Text: "step 03", Description: null, Completed: false },
      { Id: 7, Text: "step 04", Description: null, Completed: false },
      { Id: 8, Text: "step 05", Description: null, Completed: false },
    ],
    Notes: [],
  },

  {
    TaskId: 3,
    AuthorId: 1,
    Title: "task 03",
    Added: new Date("2020-10-28T07:14:00"),
    StartDate: new Date("2020-10-29T12:00:00"),
    Deadline: new Date("2020-10-29T14:00:00"),
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus lacus, pellentesque ac consectetur a, dictum sed sem. Nam eget nisi leo. Aliquam non est magna. Suspendisse massa lectus, venenatis id interdum et, gravida eget lectus. Integer et tellus metus. Sed gravida felis vel elit convallis commodo. Phasellus eleifend pulvinar orci sed ullamcorper. Aliquam posuere ullamcorper bibendum. Fusce tincidunt, purus ut sagittis finibus, augue ex mollis elit, id congue odio ante eget magna. Integer eleifend odio in pharetra dignissim. Aliquam vehicula, mi eget faucibus imperdiet, odio nisl feugiat dolor, sed dictum lorem magna et velit.",
    Steps: [],
    Notes: [],
  },

  {
    TaskId: 4,
    AuthorId: 1,
    Title: "task 04",
    Added: new Date("2020-10-28T08:18:00"),
    StartDate: new Date("2020-10-30T10:00:00"),
    Deadline: new Date("2020-10-03T11:45:00"),
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tellus lacus, pellentesque ac consectetur a, dictum sed sem. Nam eget nisi leo. Aliquam non est magna. Suspendisse massa lectus, venenatis id interdum et, gravida eget lectus. Integer et tellus metus. Sed gravida felis vel elit convallis commodo. Phasellus eleifend pulvinar orci sed ullamcorper. Aliquam posuere ullamcorper bibendum. Fusce tincidunt, purus ut sagittis finibus, augue ex mollis elit, id congue odio ante eget magna. Integer eleifend odio in pharetra dignissim. Aliquam vehicula, mi eget faucibus imperdiet, odio nisl feugiat dolor, sed dictum lorem magna et velit.",
    Steps: [
      {
        Id: 11,
        Text: "step 01",
        Description: "step description 1",
        Completed: false,
      },
      {
        Id: 12,
        Text: "step 02",
        Description: "step description 2",
        Completed: false,
      },
      {
        Id: 13,
        Text: "step 03",
        Description: "step description 3",
        Completed: false,
      },
      {
        Id: 14,
        Text: "step 04",
        Description: "step description 4",
        Completed: false,
      },
    ],
    Notes: [
      {
        Id: 2,
        Text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        Added: new Date("2020-10-29T16:03:00"),
      },
    ],
  },

  {
    TaskId: 5,
    AuthorId: 1,
    Title: "task 05",
    Added: new Date(),
    StartDate: new Date(new Date().getTime() + (1*60*60*1000)),
    Deadline: new Date(new Date().getTime() + (2*60*60*1000)),
    Description:
      "Maecenas at cursus felis. Duis mollis imperdiet tortor nec ornare. In tempus quam ut tortor vulputate facilisis. Nullam diam magna, efficitur sit amet consequat nec, molestie ut tellus. Donec nec lectus pharetra, malesuada massa vel, dignissim arcu. Suspendisse potenti. Aliquam erat volutpat. Aliquam vestibulum magna quis molestie viverra. Sed nec libero ac nulla facilisis dictum at eget odio.",
    Steps: [
      {
        Id: 15,
        Text: "step 01",
        Description: "step description 1",
        Completed: false,
      },
      {
        Id: 16,
        Text: "step 02",
        Description: "step description 2",
        Completed: false,
      },
    ],
    Notes: [],
  },
];

const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getTasks = async () => {
  await wait(500);
  return tasks;
};

export const getTaskById = async (id) => {
  await wait(500);
  return tasks.filter((task) => task.TaskId === parseInt(id))[0];
};

export const getTasksOrderByAdded = async () => {
  await wait(500);
  return tasks.sort((a, b) => {
    return a.Added - b.Added;
  });
};
