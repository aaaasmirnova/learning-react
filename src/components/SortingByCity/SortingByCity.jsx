import { useState } from "react";
import { users } from "./data";
import "./styles.css";
import { DropDown } from "./DropDown";
export const SortingByCity = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const statuses = [
    { value: "Canceled", label: "сanceled" },
    { value: "Active", label: "active" },
    { value: "Expired", label: "expired" },
    { value: "Active until period end", label: "activeUntilPeriodEnd" },
  ];
  const placeholder = "Subscription status";

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

  const changeStatusList = (status) => {
    if (!selectedStatus.includes(status)) {
      setSelectedStatus([...selectedStatus, status]);
    } else {
      setSelectedStatus(selectedStatus.filter((elem) => elem !== status));
    }
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

      <DropDown
        selectedStatus={selectedStatus}
        changeStatusList={changeStatusList}
        statuses={statuses}
        placeholder={placeholder}
      />
    </div>
  );
};
