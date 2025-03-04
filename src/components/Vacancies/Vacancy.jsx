const Vacancy = ({
  company,
  newLabel,
  featuredLabel,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages,
  tools,
}) => {
  return (
    <div className="vacancy-info">
      <div className="company-info-wrapper">
        <div className="company-info">
          <p className="company">{company}</p>
          <p className={newLabel ? "new" : ""}>{newLabel && "NEW!"}</p>
          <p className={featuredLabel ? "featured" : ""}>
            {featuredLabel && "FEATURED"}
          </p>
        </div>
        <p className="position">{position}</p>
        <div className="working-conditions-info">
          <p className="working-conditions-description">{postedAt}</p>
          <p className="working-conditions-description">{contract}</p>
          <p className="working-conditions-description">{location}</p>
        </div>
      </div>
      <div className="skills">
        <ul className="languages-list">
          <li className="skills-style">{role}</li>
          <li className="skills-style">{level}</li>
          {languages.map((item, index) => (
            <li className="skills-style" key={index}>
              {item}
            </li>
          ))}
          {tools.map((item, index) => (
            <li className="skills-style" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Vacancy;
