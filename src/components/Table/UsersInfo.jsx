import UserInfo from "./UserInfo";

const users = [
  {
    id: 1,
    name: "John",
    hasCat: "true",
    company: "Coca-cola",
    age: 32,
    city: "Rostov",
  },
  {
    id: 2,
    name: "Ivan",
    hasCat: "true",
    company: "Coca-cola",
    age: 12,
    city: "Boston",
  },
  {
    id: 3,
    name: "Nikita",
    hasCat: "true",
    company: "Coca-cola",
    age: 89,
    city: "Vladimir",
  },
  {
    id: 4,
    name: "Vlad",
    hasCat: "true",
    company: "Apple",
    age: 43,
    city: "Ekaterinburg",
  },
];

const UsersInfo = () => {
  return users.map((elem) => {
    return (
      <UserInfo
        name={elem.name}
        hasCat={elem.hasCat}
        company={elem.company}
        age={elem.age}
        city={elem.city}
        key={elem.id}
      />
    );
  });
};

export default UsersInfo;
