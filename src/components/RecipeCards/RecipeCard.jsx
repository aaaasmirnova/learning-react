import { RatingStars } from "../RatingStars/RatingStars";
import "./styles.css";

export const RecipeCard = ({ elem }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card-wrapper">
        <p className="recipe-name">
          {elem.name
            .split(" ")
            .map((item, index) => item[0].toUpperCase() + item.slice(1))
            .join(" ")}
        </p>
        <p className="difficulty">
          <span>Сложность:</span>
          <RatingStars total={5} selectedValue={elem.difficulty} />
        </p>
        <div className="description-wrapper">
          <img src={elem.photoURL} width="140" height="100"></img>
          <p className="ingredients">
            {elem.ingredients.map((item) => (
              <p key={item.name}>
                - {item.name} {item.quantity}
              </p>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
