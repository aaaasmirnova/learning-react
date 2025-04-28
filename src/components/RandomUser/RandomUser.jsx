import { IoPersonOutline } from "react-icons/io5";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { FaRegMap } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";
import { BsPersonLock } from "react-icons/bs";
import { MdOutlineMail } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import "./styles.css";

export const RandomUser = () => {
  const [user, setUser] = useState();
  const [activeButton, setActiveButton] = useState("name");

  const buttonsIcons = {
    name: <IoPersonOutline color="grey" size={30} />,
    email: <MdOutlineMail color="grey" size={30} />,
    age: <FaRegCalendarXmark color="grey" size={30} />,
    street: <FaRegMap color="grey" size={30} />,
    phone: <FaPhoneFlip color="grey" size={30} />,
    password: <BsPersonLock color="grey" size={30} />,
  };

  const usersInfo = {
    name: user ? `${user.name.first} ${user.name.last}` : "Rachel Welch",
    email: user?.email,
    age: user?.dob.age,
    street: user?.location.street.name,
    phone: user?.phone,
    password: user?.login.password,
  };

  const getRandomUserInfo = async () => {
    try {
      const response = await axios(" https://randomuser.me/api/");
      setUser(response.data.results[0]);
      setActiveButton("name");
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  useEffect(() => {
    getRandomUserInfo();
  }, []);

  const changeActiveInfoButton = (elem) => {
    if (user) {
      setActiveButton(elem);
    }
  };

  console.log(user);

  return (
    <div className="random-user-form">
      <div className="random-user-form-content">
        <div className="random-user-image-wrapper">
          {!user ? (
            <img
              className="random-user-image"
              src="https://randomuser.me/api/portraits/women/49.jpg"
            />
          ) : (
            <img className="random-user-image" src={user?.picture.large} />
          )}
        </div>
        <div className="user-info-list">
          {/* {getInfoForActiveButton(activeButton)} */}
          <div className="user-info-description">
            <p className="user-title">
              {user ? `My ${activeButton} is` : `Hi, My ${activeButton} is`}{" "}
            </p>
            <p className="user-info">{usersInfo[activeButton]}</p>
          </div>
          <div className="user-buttons-wrapper">
            {Object.keys(buttonsIcons).map((key) => (
              <button
                className={`user-info-button ${
                  key === activeButton ? "active-button" : ""
                }`}
                onClick={() => changeActiveInfoButton(key)}
              >
                {buttonsIcons[key]}
              </button>
            ))}
          </div>
        </div>
        <button className="random-user-button" onClick={getRandomUserInfo}>
          RANDOM USER
        </button>
      </div>
    </div>
  );
};
