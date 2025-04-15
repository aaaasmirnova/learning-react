import "./styles.css";
export const Modal = ({ children, setModalIsOpen }) => {
  return (
    <div className="modal" onClick={() => setModalIsOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
