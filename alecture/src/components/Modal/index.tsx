import { CloseModalButton, CreateModal } from '@components/Modal/styles';
import React, { FC, useCallback } from 'react';

interface Props {
  children?: React.ReactNode;
  show: boolean;
  onCloseModal: () => void;
}
const Modal: FC<Props> = ({ show, children, onCloseModal }) => {
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
