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
import { CounterWithStep } from "./components/CounterWithStep/CounterWithStep";
import { ViewCard } from "./components/ViewCard/ViewCard";
import { TrafficLight } from "./components/TrafficLight/TrafficLight";
import { ConstructorFigures } from "./components/ConstructorFigures/ConstructorFigures";
import { BodyMassIndex } from "./components/BodyMassIndex/BodyMassIndex";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart";
import { SliderPictures } from "./components/sliderPictures/sliderPictures";
import { SortingByCity } from "./components/SortingByCity/SortingByCity";
import { ToDoList } from "./components/ToDoList/ToDoList";
import { CreationFigures } from "./components/CreationFigures/CreationFigures";
import { ToDoListByCategories } from "./components/ToDoListByCategories/ToDoListByCategories";
import { CheckedUsers } from "./components/CheckedUsers/CheckedUsers";
import { HomeRentalCalculator } from "./components/HomeRentalCalculator/HomeRentalCalculator";
import { ExpenseCalculator } from "./components/ExpenseCalculator/ExpenseCalculator";
import { GuessTheWordGame } from "./components/GuessTheWordGame/GuessTheWordGame";
import { Quizz } from "./components/Quizz/Quizz";
import { Form } from "./components/Form/Form";
import { FilteringShapes } from "./components/FilteringShapes/FilteringShapes";
import { UsersTable } from "./components/UsersTable/UsersTable";
import { CoffeeCart } from "./components/CoffeeCart/CoffeeCart";
import { Pagination2 } from "./components/Pagination2/Pagination2";
import { Posts } from "./components/Posts/Posts";
import { Test } from "./components/Test/Test";
import { RandomUser } from "./components/RandomUser/RandomUser";
import { Weather } from "./components/Weather/Weather";
import { CriptoApp } from "./components/CriptoApp/CriptoApp";
import { ToDoList2 } from "./components/ToDoList2/ToDoList2";
import { UsersTableSorting } from "./components/UsersTableSorting/UsersTableSorting";
import { ImageSearch } from "./components/ImageSearch/ImageSearch";
import { InputWithCustomHook } from "./components/InputWithCustomHook/InputWithCustomHook";
import { CounterWithCustomHook } from "./components/CounterWithCustomHook/CounterWithCustomHook";
import { ToDoListWithCustomHook } from "./components/ToDoWithCustomHook/ToDoListWithCustomHook";
import { GuessTheWord } from "./components/GuessTheWord/GuessTheWord";
import { InputWithUseRef } from "./components/InputWithUseRef/InputWithUseRef";
import { CounterWithUsePrevious } from "./components/CounterWithUsePrevious/CounterWithUsePrevious";
import { Stopwatch } from "./components/Stopwatch/Stopwatch";
import { PomadoroTimer } from "./components/PomadoroTimer/PomadoroTimer";
import { TrafficLight2 } from "./components/TrafficLight2/TrafficLight2";
import { ToastContainer } from "react-toastify";
// import { TanstackExample } from "./components/TanstackExample/TanstackToDoList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanstackToDoList } from "./components/TanstackExample/TanstackToDoList";
import { Home } from "./components/TestConstructor/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TestPassing } from "./components/TestConstructor/TestPassing";
import { TestEditor } from "./components/TestConstructor/TestEditor";
import { TestResult } from "./components/TestConstructor/TestResult";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 минут данные считаются свежими
      retry: 3,                   // 3 попытки при ошибке
      refetchOnWindowFocus: false, // не обновлять при фокусе вкладки
    },
  },
});
function App() {

  return (
    <>
    {/* <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"/> */}
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
      {/* <SortingByCity /> */}
      {/* <ToDoList /> */}
      {/* <CreationFigures /> */}
      {/* <ToDoListByCategories /> */}
      {/* <CheckedUsers /> */}
      {/* <HomeRentalCalculator /> */}
      {/* <ExpenseCalculator /> */}
      {/* <GuessTheWordGame /> */}
      {/* <Quizz /> */}
      {/* <Form /> */}
      {/* <FilteringShapes /> */}
      {/* <UsersTable /> */}
      {/* <CoffeeCart /> */}
      {/* <Pagination2 total={10} /> */}
      {/* <Posts /> */}
      {/* <RandomUser /> */}
      {/* <Weather /> */}
      {/* <CriptoApp /> */}
      {/* <ToDoList2 /> */}
      {/* <UsersTableSorting /> */}
      {/* <ImageSearch /> */}
      {/* <InputWithCustomHook /> */}
      {/* <CounterWithCustomHook /> */}
      {/* <ToDoListWithCustomHook /> */}
      {/* <GuessTheWord /> */}
      {/* <InputWithUseRef /> */}
      {/* <CounterWithUsePrevious /> */}
      {/* <Stopwatch /> */}
      {/* <PomadoroTimer /> */}
      {/* <TrafficLight2 /> */}
      {/* <TrafficLight2 layout="horizontal" /> */}
       <QueryClientProvider client={queryClient}>
        {/* <TanstackToDoList/> */}
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test/:id" element={<TestPassing />} />
          <Route path="/result/:id" element={<TestResult />} />
          <Route path="/editor/:id" element={<TestEditor />} /> 
        </Routes>
      </BrowserRouter>
      </QueryClientProvider> */
     
      
    </>
  );
}

export default App;
