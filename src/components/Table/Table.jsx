import UsersInfo from "./UsersInfo";
import "./styles.css";

const Table = () => {
  return (
    <table className="table_style">
      <thead className="thead_style">
        <tr>
          <th className="td_style">Имя</th>
          <th className="td_style">Кот</th>
          <th className="td_style">Компания</th>
          <th className="td_style">Возраст</th>
          <th className="td_style">Место проживания</th>
        </tr>
      </thead>
      <tbody className="tbody_style">
        <UsersInfo />
      </tbody>
    </table>
  );
};

export default Table;
