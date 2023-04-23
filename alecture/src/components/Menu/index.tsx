import React, { CSSProperties, FC, ReactNode, useCallback } from 'react';
import { CreateMenu } from './styles';
import { CloseModalButton } from '../Modal/styles';

interface Props {
  children?: ReactNode;
  show: boolean;
  onCloseModal: (e: React.MouseEvent) => void;
  style: CSSProperties;
  closeButton?: boolean;
}

const Menu: FC<Props> = ({
  children,
  style,
  show,
  onCloseModal,
  closeButton,
}) => {
  const stopPropagation = useCallback((e: React.MouseEvent) => {
    e.stopPropagation;
  }, []);
  if (!show) {
    return null;
  }
  return (
    <CreateMenu onClick={onCloseModal}>
      <div style={style} onClick={stopPropagation}>
        {children}
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
      </div>
    </CreateMenu>
  );
};
Menu.defaultProps = {
  closeButton: true,
};
export default Menu;
