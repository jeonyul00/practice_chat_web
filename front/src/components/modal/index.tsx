import { FC, PropsWithChildren, useCallback } from "react";
import { CreateModal, CloseModalButton } from "./styles";

interface Props {
  show: boolean;
  onCloseModal: () => void;
}

const Modal: FC<PropsWithChildren<Props>> = ({
  show,
  children,
  onCloseModal,
}) => {
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

export default Modal;