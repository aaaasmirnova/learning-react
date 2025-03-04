import { RecipeCard } from "./RecipeCard";
import { recipes } from "./data";
import "./styles.css";

export const RecipeCards = () => {
  return (
    <div className="recipes">
      {recipes.map((elem) => (
        <RecipeCard elem={elem} />
      ))}
    </div>
  );
};
