import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Accordion, Icon, Text } from 'components/Foundation';

const story = {
  title: 'Components/Accordion',
  component: Accordion,
};

function AccordionContent({ index }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const renderState = loading ? 'Loading' : 'Ready';

  return (
    <div className="p-4">
      <Text>This is Panel {index} content</Text>
      <Text>Rendering State: <Text tag="span" bold color="primary">{renderState}</Text></Text>
    </div>
  );
}

function Default(args) {
  return (
    <div className="w-100">
      <Text color="primary" className="m-2 mb-3">
        Lazy mounting: Rendering state of each panel should be <b>loading</b>, then <b>ready</b>
      </Text>
      <Accordion {...args}>
        <Accordion.Panel title="Panel 1" key="Panel-1">
          <AccordionContent index={1} />
        </Accordion.Panel>
        <Accordion.Panel title="Panel 2" key="Panel-2">
          <AccordionContent index={2} />
        </Accordion.Panel>
        <Accordion.Panel title="Panel 3" key="Panel-3">
          <AccordionContent index={3} />
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export const Basic = Default.bind({});

AccordionContent.propTypes = {
  index: PropTypes.number.isRequired,
};

export function WithIcons(args) {
  return (
    <Accordion {...args}>
      <Accordion.Panel title="Panel 1" key="Panel-1" icon={<Icon icon="fa-home" />}>
        <AccordionContent index={1} />
      </Accordion.Panel>
      <Accordion.Panel title="Panel 2" key="Panel-2" icon={<Icon icon="fa-check" />}>
        <AccordionContent index={2} />
      </Accordion.Panel>
    </Accordion>
  );
}

export function Multiple(args) {
  return (
    <div className="w-100">
      <Text color="primary" className="m-2 mb-3">
        Multiple expansion
      </Text>
      <Accordion {...args}>
        <Accordion.Panel title="Panel 1" key="Panel-1" expanded>
          <AccordionContent index={1} />
        </Accordion.Panel>
        <Accordion.Panel title="Panel 2" key="Panel-2" expanded>
          <AccordionContent index={2} />
        </Accordion.Panel>
        <Accordion.Panel title="Panel 3" key="Panel-3">
          <AccordionContent index={3} />
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

Multiple.args = {
  allowMultiple: true,
};

export function ForceRender(args) {
  return (
    <div className="w-100">
      <Text color="primary" className="m-2 mb-3">
        Eager mount: Rendering state of Panel 2 should be <b>ready</b> after 1s
      </Text>
      <Accordion {...args}>
        <Accordion.Panel forceRender title="Panel 1" key="Panel-1">
          <AccordionContent index={1} />
        </Accordion.Panel>
        <Accordion.Panel forceRender title="Panel 2" key="Panel-2">
          <AccordionContent index={2} />
        </Accordion.Panel>
      </Accordion>
    </div>
  );
}

export default story;
