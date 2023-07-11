import React, { FC, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classes from './Modal.module.css';
import modalEvents from './events';

const Modal: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = modalEvents.onOpen(() => setOpen(true));
    return () => unsubscribe();
  }, []);

  const handleSubmit = () => {
    modalEvents.confirmModal({ name: 'John' });
    setOpen(false);
  };
  const handleReject = () => {
    modalEvents.rejectModal('Incorrect');
    setOpen(false);
  };

  if (!open) {
    return null;
  }
  return createPortal(
    <div className={classes.modal}>
      <div>Modal</div>
      <div>
        <button onClick={handleReject}>Cancel</button>
        <button onClick={handleSubmit}>Ok</button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
