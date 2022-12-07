import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Button, Radio, ToastButtonContent, Container, ToastContainer } from 'components/Foundation';

const TYPES = ['Default', 'Info', 'Warning', 'Success', 'Error'];

const story = {
  title: 'Components/Toast',
  component: ToastContainer,
};

export function Types(args) {
  const [type, setType] = useState(TYPES[0]);

  function onChange(value) {
    setType(value);
  }

  function notify() {
    toast(`${type} notification is shown!`, {
      type: type.toLowerCase(),
      ...args,
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-column">
        {TYPES.map((item) => (
          <Radio label={item} value={item} key={item} onChange={onChange} checked={type === item} />
        ))}
      </div>
      <div className="d-flex mt-2">
        <Button onClick={notify}>Show</Button>
      </div>
    </>
  );
}

Types.args = {
  closeButton: false,
  closeOnClick: true,
  autoClose: true,
};

export function WithButton(args) {
  function notifyPrimary() {
    toast((
      <ToastButtonContent text="Toast with button" button={{ title: 'Show' }} />
    ), { ...args });
  }
  function notifyAlternative() {
    toast((
      <ToastButtonContent text="Toast with button" color="white" button={{ title: 'Show', type: 'alternative' }} />
    ), { ...args, type: 'info' });
  }
  function notifyWithClose() {
    toast((
      <ToastButtonContent button={{ title: 'Show' }} text="Toast with close button" />
    ), {
      ...args,
      closeButton: true,
    });
  }
  return (
    <Container>
      <ToastContainer />
      <div className="d-flex m-3 flex-column align-items-start">
        <Button size="small" onClick={notifyPrimary} type="primary" className="mb-3">Primary</Button>
        <Button size="small" type="alternative" onClick={notifyAlternative} className="mb-3">Alternative</Button>
        <Button size="small" onClick={notifyWithClose} type="primary">With close button</Button>
      </div>
    </Container>
  );
}

WithButton.args = {
  closeButton: false,
  closeOnClick: true,
  autoClose: true,
};

export function Positioning() {
  function notify() {
    Object.values(toast.POSITION).forEach((position) => {
      toast(position, { autoClose: true, position, type: 'success', closeButton: false });
    });
  }

  return (
    <>
      <ToastContainer />
      <div className="mt-5">
        <Button onClick={notify}>Notify</Button>
      </div>
    </>
  );
}

export default story;
