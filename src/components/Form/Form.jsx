import { useState } from "react";
import { steps } from "./data";
import { IoCheckmarkCircle } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./styles.css";

export const Form = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [info, setInfo] = useState({});
  const [doneButtonActive, setDoneButtonActive] = useState(false);

  const showNextForm = (e) => {
    e.preventDefault();

    // Валидация: проверяем, заполнены ли все поля на текущем шаге
    const currentFields = steps[activeStep];
    const allFilled = currentFields.every(field => info[field]?.trim());
    
    if (!allFilled) {
      toast.warning('⚠️ Пожалуйста, заполните все поля перед переходом');
      return;
    }

    const newStep = activeStep + 1;
    setActiveStep(newStep);
    const newInfo = { ...info };
    for (let elem of steps[newStep]) {
      if (!Object.keys(info).includes(elem)) {
        newInfo[elem] = "";
      }
    }
    setInfo(newInfo);

    // Уведомление о переходе
    toast.info(`📋 Шаг ${newStep + 1} из ${steps.length}`);
  };

  const showPreviousForm = (e) => {
    // e.preventDefault();
    setActiveStep(activeStep - 1);
    toast.info(`⬅️ Шаг ${activeStep} из ${steps.length}`);
  };

  const changeInfo = (event, elem) => {
    setInfo({ ...info, [elem]: event.target.value.trim() });
  };

  const completeForm = () => {
   // ⬇️⬇️⬇️ ВАЛИДАЦИЯ СНАЧАЛА ⬇️⬇️⬇️
    const currentFields = steps[activeStep];
    const allFilled = currentFields.every(field => info[field]?.trim());
    
    if (!allFilled) {
      toast.warning('⚠️ Пожалуйста, заполните все поля');
      return;
    }

    // ✅ СРАЗУ показываем экран успеха
    setDoneButtonActive(true);
    console.log('Данные формы:', info);

    // ⏳ Уведомление об отправке (тост НЕ БЛОКИРУЕТ интерфейс)
    const toastId = toast.loading('⏳ Отправка данных...');

    // Имитация отправки на сервер (асинхронно, не блокирует UI)
    setTimeout(() => {
      toast.update(toastId, {
        render: '✅ Форма успешно отправлена!',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    }, 1500);
  };

  if (doneButtonActive) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '24px' }}>
          <IoCheckmarkCircle color="violet" size={48} />
          <br />
          You have successfully completed the process.
        </p>
      </div>
    );
  }

  return (
    <div className="form-wrapper">
      <div className="form-dots-wrapper">
        {steps.map((elem, index) => (
          <div className={`form-symbols-wrapper`}>
            <div
              key={index}
              className={`form-dot ${
                elem.every((item) => info[item]) ? "active-form-dot" : ""
              }`}
            >
              {index + 1}
            </div>
            <div
              className={`${index !== steps.length - 1 ? "form-line" : ""} ${
                elem.every((item) => info[item]) ? "active-form-dot" : ""
              }`}
            ></div>
          </div>
        ))}
      </div>
      <form>
        {steps[activeStep].map((elem) => (
          <div className="form-input-wrapper">
            <label for={elem}>{elem}</label>
            <input
              value={info[elem]}
              onChange={(event) => changeInfo(event, elem)}
              id={elem}
            />
          </div>
        ))}
        <div className="form-buttons-wrapper">
          {activeStep > 0 && (
            <button
              type="button"
              className="form-button"
              onClick={showPreviousForm}
            >
              Back
            </button>
          )}
          {activeStep === steps.length - 1 ? (
            <button
              className="form-button form-done-button"
              onClick={completeForm}
            >
              Done
            </button>
          ) : (
            <button
              className="form-next-button form-button"
              type="submit"
              onClick={showNextForm}
            >
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
