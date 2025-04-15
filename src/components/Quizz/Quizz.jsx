import { useState } from "react";
import { initialNewQuestion, questions } from "./data";
import "./styles.css";
import { Modal } from "./Modal";

export const Quizz = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [newQuestionInfo, setNewQuestionInfo] = useState(initialNewQuestion);
  const [questionsList, setQuestionsList] = useState(questions);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const chooseAnswer = (item) => {
    const answerResult = item.term;
    setAnswers([...answers, answerResult]);
    setActiveQuestion(activeQuestion + 1);
  };

  const getResult = () => {
    return answers.reduce((acc, elem) => acc + (elem ? 1 : 0), 0);
  };

  const result = getResult();

  const startQuizz = () => {
    setAnswers([]);
    setActiveQuestion(0);
  };

  if (answers.length === questionsList.length) {
    return (
      <div className="quizz-result-wrapper">
        <p className="quizz-result">
          Вы ответили верно на {result} из {questionsList.length} вопросов !
        </p>
        <button className="quizz-start-button" onClick={startQuizz}>
          Начать сначала
        </button>
      </div>
    );
  }

  const changeQuestionText = (e) => {
    setNewQuestionInfo({ ...newQuestionInfo, title: e.target.value });
  };

  const changeAnswerText = (e, index) => {
    setNewQuestionInfo({
      ...newQuestionInfo,
      list: newQuestionInfo.list.map((elem, ind) =>
        index === ind ? { ...elem, answer: e.target.value } : elem
      ),
    });
  };

  const chooseCorrectAnswer = (index) => {
    setNewQuestionInfo({
      ...newQuestionInfo,
      list: newQuestionInfo.list.map((elem, ind) =>
        index === ind ? { ...elem, term: true } : { ...elem, term: false }
      ),
    });
  };

  const addNewQuestionToList = () => {
    if (
      newQuestionInfo.title.trim() &&
      newQuestionInfo.list.every((elem) => elem.answer.trim())
    ) {
      setQuestionsList([...questionsList, newQuestionInfo]);
      setNewQuestionInfo(initialNewQuestion);
      setModalIsOpen(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  console.log(newQuestionInfo);
  // console.log(questionsList);

  return (
    <div className="quizz-wrapper">
      <div className="quizz-dots">
        {questionsList.map((_, index) => (
          <div
            key={index}
            className={`quizz-dot ${
              index === activeQuestion ? "active-quizz-dot" : " "
            }
                ${
                  answers.includes(answers[index])
                    ? answers[index]
                      ? "quizz-dot-correct"
                      : "quizz-dot-wrong"
                    : ""
                }
                `}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="quizz-question-wrapper">
        <p>
          <span className="question-number">
            Вопрос {activeQuestion + 1}/{questionsList.length}{" "}
          </span>
          {questionsList[activeQuestion].title}
        </p>
        <div className="quizz-answer-buttons-wrapper">
          {questionsList[activeQuestion].list.map((item, index) => (
            <button
              className="quizz-answer-button"
              key={index}
              onClick={() => chooseAnswer(item)}
            >
              {index + 1}. {item.answer}
            </button>
          ))}
        </div>
      </div>
      <button onClick={openModal}>Создать новый вопрос</button>
      {modalIsOpen && (
        <Modal setModalIsOpen={setModalIsOpen}>
          <div>
            <label htmlFor="new-question">Название вопроса</label>
            <input
              value={newQuestionInfo.title}
              onChange={changeQuestionText}
              id="new-question"
            />
          </div>
          <div>
            {newQuestionInfo.list.map((elem, index) => (
              <div key={index}>
                <input
                  type="radio"
                  checked={elem.term}
                  onChange={() => chooseCorrectAnswer(index)}
                />
                <label htmlFor="new-answer">Ответ {index + 1}</label>
                <input
                  type="text"
                  value={elem.answer}
                  onChange={(e) => changeAnswerText(e, index)}
                  id="new-answer"
                />
              </div>
            ))}
          </div>
          <button onClick={addNewQuestionToList}>Добавить</button>
        </Modal>
      )}
    </div>
  );
};
