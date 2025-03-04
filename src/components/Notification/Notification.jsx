import "./styles.css";
import { CiCircleCheck } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";
import { VscError } from "react-icons/vsc";

export const Notification = ({ text, type, textColor }) => {
  const getIcon = () => {
    if (type === "success") {
      return <CiCircleCheck />;
    }
    if (type === "warning") {
      return <CiWarning />;
    }

    return <VscError />;
  };
  const icon = getIcon();
  return (
    <div style={{ color: textColor }} className={`notification ${type}`}>
      {icon} {text}
    </div>
  );
};
