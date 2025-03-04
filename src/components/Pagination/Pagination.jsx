import "./styles.css";

export const Pagination = ({ total, limit }) => {
  const getNumbersPagination = () => {
    const numbers = [];
    for (let i = 1; i <= Math.ceil(total / limit); i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const numbers = getNumbersPagination();

  return (
    <div className="pagination">
      <button className="page-switch previous">НАЗАД</button>
      {numbers.map((elem) => (
        <button className="pagination-item">{elem}</button>
      ))}
      <button className="page-switch next">ВПЕРЕД</button>
    </div>
  );
};
