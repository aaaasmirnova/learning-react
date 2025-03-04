const UserInfo = ({ name, hasCat, company, age, city }) => {
  return (
    <tr>
      <td className="td_style">{name}</td>
      <td className="td_style">
        {hasCat === "true" ? "есть кот" : hasCat === "false" ? "нет кота" : ""}
      </td>
      <td className="td_style">{company}</td>
      <td className="td_style"> {age}</td>
      <td className="td_style">{city}</td>
    </tr>
  );
};

export default UserInfo;
