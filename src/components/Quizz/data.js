export const questions = [
  {
    title: "Столица Канады?",
    list: [
      { answer: "Оттава", term: true },
      { answer: "Ванкувер", term: false },
      { answer: "Мельбурн", term: false },
      { answer: "Чиконтен", term: false },
    ],
  },
  {
    title: "Сколько людей живет в РФ?",
    list: [
      { answer: "117 млн.", term: false },
      { answer: "162 млн.", term: false },
      { answer: "155 млн.", term: false },
      { answer: "144 млн.", term: true },
    ],
  },
  {
    title: "Расстояние от Москвы до Владивостока?",
    list: [
      { answer: "2000 км", term: false },
      { answer: "3500 км", term: false },
      { answer: "6000 км", term: false },
      { answer: "9000 км", term: true },
    ],
  },
];

export const initialNewQuestion = {
  title: "",
  list: [
    { answer: "", term: true },
    { answer: "", term: false },
    { answer: "", term: false },
    { answer: "", term: false },
  ],
};
