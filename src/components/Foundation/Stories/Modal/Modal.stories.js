import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Text } from 'components/Foundation';

const story = {
  title: 'Components/Modal',
  component: Modal,
};

function Primary(args) {
  const [open, setOpen] = useState(false);

  function showModal() {
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
  }

  return (
    <div className="m-3">
      <Modal {...args} open={open} onClose={closeModal}>
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, vel?</Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, atque magnam nobis placeat praesentium quibusdam quis temporibus? Asperiores, laudantium, nobis?</Text>
        <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, vel?</Text>
      </Modal>
      <Button size="small" onClick={showModal}>Show modal</Button>
    </div>
  );
}

export const Default = Primary.bind({});

Default.args = {
  title: 'Default modal',
};

export const WithFooter = Primary.bind({});

function CustomFooter({ onClose }) {
  return (
    <>
      <Button type="primary">Submit</Button>
      <Button type="alternative" onClick={onClose}>Cancel</Button>
    </>
  );
}

CustomFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
};

WithFooter.args = {
  title: 'Custom footer',
  renderFooter: CustomFooter,
};

export const Small = Primary.bind({});

Small.args = {
  title: 'Small dialog',
  renderFooter: CustomFooter,
  size: 'small',
};

export const Large = Primary.bind({});

Large.args = {
  title: 'Large dialog',
  renderFooter: CustomFooter,
  size: 'large',
};

export default story;
