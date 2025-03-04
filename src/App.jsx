import "./App.css";
import Figures from "./components/Figures/Figures";
import Users from "./components/Users/Users";
import Vacancies from "./components/Vacancies/Vacancies";
import Table from "./components/Table/Table";
import { Notification } from "./components/Notification/Notification";
import { Input } from "./components/Input/Input";
import { Select } from "./components/Select/Select";
import { Button } from "./components/Button/Button";
import { Pagination } from "./components/Pagination/Pagination";
import { RatingStars } from "./components/RatingStars/RatingStars";
import { RecipeCards } from "./components/RecipeCards/RecipeCards";
import { QuestionsApp } from "./components/QuestionsApp/QuestionsApp";
import { QuestionsApp2 } from "./components/QuestionsApp2/QuestionsApp2";
import { Counter } from "./components/Counter/Counter";
import { UserData } from "./components/UserData/UserData";
import { CounterWithStep } from "./components/CounterWithStep/CounterWithStet";
import { ViewCard } from "./components/ViewCard/ViewCard";
import { TrafficLight } from "./components/TrafficLight/TrafficLight";
import { ConstructorFigures } from "./components/ConstructorFigures/ConstructorFigures";
import { BodyMassIndex } from "./components/BodyMassIndex/BodyMassIndex";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import { SliderPictures } from "./components/sliderPictures/sliderPictures";
import { SortingByCity } from "./components/SortingByCity/SortingByCity";

function App() {
  return (
    <>
      {/* <Figures />
      <Users />
      <Vacancies />
      <Table />
      <Notification
        text="Успешное редактирование"
        type="success"
        textColor="green"
      /> */}
      {/* <Input placeholder="Введите e-mail" type="text" labelText="Почта" /> */}
      {/* <Select options={["Круг", "Квадрат", "Овал"]} /> */}
      {/* <Button
        text="Добавить"
        backgroundColor="green"
        isDisabled={true}
        hasBorderRadius={false}
        hasBorder={false}
        hasUpperCaseText={false}
      /> */}
      {/* <Pagination total={47} limit={10} /> */}
      {/* <RatingStars total={5} selectedValue={3} /> */}
      {/* <RecipeCards /> */}
      {/* <QuestionsApp /> */}
      {/* <QuestionsApp2 /> */}
      {/* <Counter /> */}
      {/* <UserData /> */}
      {/* <CounterWithStep /> */}
      {/* <ViewCard /> */}
      {/* <TrafficLight /> */}
      {/* <ConstructorFigures /> */}
      {/* <BodyMassIndex /> */}
      {/* <ShoppingCart /> */}
      {/* <SliderPictures isLoop={false} /> */}
      <SortingByCity />
    </>
  );
}

export default App;
