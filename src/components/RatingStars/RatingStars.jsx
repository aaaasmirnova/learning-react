import "./styles.css";
import { FaStar } from "react-icons/fa";
export const RatingStars = ({ total, selectedValue }) => {
  const getArray = () => {
    const numbers = [];
    for (let i = 1; i <= total; i++) {
      numbers.push(i);
    }
    return numbers;
  };

  const numbers = getArray();

  return (
    <div>
      {numbers.map((_, index) =>
        index < selectedValue ? <FaStar color="gold" /> : <FaStar />
      )}
    </div>
  );
};
