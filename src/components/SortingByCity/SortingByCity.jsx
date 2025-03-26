import { useState } from "react";
import { users } from "./data";
import "./styles.css";
export const SortingByCity = () => {
  const [activeButton, setActiveButton] = useState(null);

  const getCities = () => {
    return users
      .map((user) => user.city)
      .filter((city, index, arr) => arr.indexOf(city) === index);
  };

  const cities = getCities();

  const getUsers = () => {
    return users.filter((user) => user.city === activeButton);
  };

  const usersCity = getUsers();

  const getSortedByCityList = (city) => {
    setActiveButton(city);
  };

  return (
    <div className="users-wrapper">
      <div className="city-buttons-wrapper">
        {cities.map((city) => (
          <button
            className={`city-button ${
              activeButton === city ? "city-button-active" : ""
            }`}
            onClick={() => getSortedByCityList(city)}
          >
            {city}
          </button>
        ))}
      </div>
      <div className="users-info-wrapper">
        {usersCity.map((elem) => (
          <div className={` users-info ${!elem.active ? "inactive-user" : ""}`}>
            <p>
              {elem.name}, возраст: {elem.age}, {elem.city}
            </p>
            <p>{elem.active ? "На сайте" : "Не на сайте"}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
