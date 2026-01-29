import { useState } from "react";
import "./styles.css";
import { IoIosArrowUp } from "react-icons/io";

export const DropDown = ({
  selectedStatus,
  changeStatusList,
  statuses,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const showStatusBlock = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="drop-down-wrapper">
      <div className="placeholder-block" onClick={() => showStatusBlock()}>
        <p>{placeholder}</p>
        <p className="status-info">{selectedStatus.length} active items</p>
        <p>
          <IoIosArrowUp className={isVisible ? "arrow-up" : "arrow-down"} />
        </p>
      </div>
      {isVisible && (
        <div className="status-block">
          {statuses.map((status) => (
            <div className="checkbox-wrapper activeLine">
              <input
                type="checkbox"
                checked={selectedStatus.includes(status.value)}
                value={status.value}
                id={status.label}
                onChange={() => changeStatusList(status.value)}
              />
              <label htmlFor={status.label}>{status.value}</label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
