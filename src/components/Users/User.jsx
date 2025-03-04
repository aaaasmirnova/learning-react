const User = ({
  elem,
  // name,
  // gender,
  // DoB,
  // isMarried,
  // children,
  // hasCat,
  // status,
  // lastVisited,
  // photo,
}) => {
  const {
    name,
    gender,
    DoB,
    isMarried,
    children,
    hasCat,
    status,
    lastVisited,
    photo,
  } = elem;
  return (
    <div
      className={`user-card ${status === "online" ? "user-card--online" : ""}`}
    >
      <div className={`photo-wrapper  ${photo === null ? "letter" : "photo"}`}>
        {photo === null ? (
          name[0]
        ) : (
          <img src={photo} width="100" height="100"></img>
        )}
      </div>
      <p
        className={`status ${
          status === "offline" ? "offline-theme" : "online-theme"
        }`}
      >
        {status === "offline"
          ? `Последний визит: ${lastVisited.value} ${lastVisited.time}.`
          : "В сети"}
      </p>
      <p className="name">{name}</p>
      <div className="info-wrapper">
        <p>Пол: {gender === "male" ? "мужской" : "женский"}</p>
        <p>Дата рождения: {DoB}</p>
        <p>Статус: {isMarried ? "в браке" : "не в браке"}</p>
        <p>
          Дети:{" "}
          {children.length > 0
            ? children.map((child) => (
                <p className="child-info" key={child.name}>
                  - {child.name}, {child.age}
                </p>
              ))
            : "нет"}
        </p>
        <p>Кот: {hasCat ? "есть" : "нет"}</p>
      </div>
    </div>
  );
};

export default User;
