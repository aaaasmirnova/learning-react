import User from "./User";
import "./styles.css";

const users = [
  {
    id: 1,
    name: "Михаил",
    gender: "male",
    DoB: "23.09.87",
    isMarried: true,
    children: [
      {
        name: "Kirill",
        age: 12,
      },
      {
        name: "Filipp",
        age: 24,
      },
    ],
    hasCat: true,
    status: "offline",
    lastVisited: {
      value: 24,
      time: "мин",
    },
    photo:
      "https://i.pinimg.com/736x/16/3a/0c/163a0c2af14f1e5a676cd37885f21f78.jpg",
  },
  {
    id: 2,
    name: "Elena",
    gender: "female",
    DoB: "23.09.98",
    isMarried: false,
    children: [],
    hasCat: false,
    status: "online",
    lastVisited: null,
    photo: null,
  },
];

const Users = () => {
  return (
    <div className="cards-wrapper">
      {users.map((elem) => {
        return (
          <User
            // name={elem.name}
            // gender={elem.gender}
            // DoB={elem.DoB}
            // isMarried={elem.isMarried}
            // children={elem.children}
            // hasCat={elem.hasCat}
            // status={elem.status}
            // lastVisited={elem.lastVisited}
            // photo={elem.photo}
            elem={elem}
            key={elem.id}
          />
        );
      })}
    </div>
  );
};

export default Users;
