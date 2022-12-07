import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import ChildrenPropType from 'types/prop-types/ChildrenPropType';

const modalRoot = document.getElementById('modal');

function ModalPortal({ children }) {
  const containerRef = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    const root = modalRoot ? modalRoot : document.body;
    root.appendChild(containerRef);
    return () => {
      root.removeChild(containerRef);
    };
  }, [containerRef]);

  return ReactDOM.createPortal(
      children,
      containerRef,
  );
}

ModalPortal.propTypes = {
  children: ChildrenPropType,
};

const modalRootRef = {
  current: modalRoot,
};

export {
  modalRootRef,
};

export default ModalPortal;
