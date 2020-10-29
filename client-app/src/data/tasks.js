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
      { id: 1, text: "step 01", completed: true },
      { id: 2, text: "step 02", completed: false },
      { id: 3, text: "step 03", completed: false },
    ],
    Notes: [
      {
        id: 1,
        text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        dateAdded: "19.10.2020 - 13:21",
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
      { id: 4, text: "step 01", completed: true },
      { id: 5, text: "step 02", completed: false },
      { id: 6, text: "step 03", completed: false },
      { id: 7, text: "step 04", completed: false },
      { id: 8, text: "step 05", completed: false },
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
    Steps: [
      { id: 9, text: "step 01", completed: false },
      { id: 10, text: "step 02", completed: false },
    ],
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
      { id: 11, text: "step 01", completed: false },
      { id: 12, text: "step 03", completed: false },
      { id: 13, text: "step 04", completed: false },
      { id: 14, text: "step 05", completed: false },
      { id: 15, text: "step 06", completed: false },
    ],
    Notes: [
      {
        id: 2,
        text:
          "Praesent tempus lacinia convallis. Nunc sodales quam pulvinar augue aliquet fermentum. Proin imperdiet ante at urna mattis, et aliquam elit lacinia. ",
        dateAdded: new Date("2020-10-29T16:03:00"),
      },
    ],
  },
];

export const getTasks = () => {
  return tasks;
};

export const getTasksOrderByAdded = () => {
  return tasks.sort((a, b) => {
    return a.Added - b.Added;
  });
};
