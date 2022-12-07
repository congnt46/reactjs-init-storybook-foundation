import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Text, ToastContainer } from 'components/Foundation';
import { toast } from 'react-toastify';

const story = {
  title: 'Components/Tabs',
  component: Tabs,
};

function TabContent({ index }) {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(loadingTimeout);
  }, []);

  const renderState = loading ? 'Loading' : 'Ready';

  return (
    <div className="mt-3 ml-2">
      <Text>This is tab {index} content</Text>
      <Text>Rendering State: <Text tag="span" bold color="primary">{renderState}</Text></Text>
    </div>
  );
}

function Default({ forceRender, ...args }) {
  return (
    <div className="d-flex">
      <ToastContainer />
      <Tabs {...args} >
        <Tabs.Tab key="Tab-1" label="Tab 1" forceRender={forceRender}>
          <TabContent index={1} key={1} />
        </Tabs.Tab>
        <Tabs.Tab key="Tab-2" label="Tab 2" forceRender={forceRender}>
          <TabContent index={2} key={2} />
        </Tabs.Tab>
        <Tabs.Tab key="Tab-3" label="Tab 3" forceRender={forceRender}>
          <TabContent index={3} key={3} />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
}

export const Basic = Default.bind({});

export const ForceRender = Default.bind({});

ForceRender.args = {
  forceRender: true,
};

export const DefaultActiveTab = Default.bind({});

DefaultActiveTab.args = {
  activeKey: 'Tab-2',
};

export const WithHandler = Default.bind({});

WithHandler.args = {
  onChange(key) {
    toast(`Active tab: ${key}`, {
      type: 'info',
      closeButton: false,
    });
  },
};

TabContent.propTypes = {
  index: PropTypes.number.isRequired,
};

Default.propTypes = {
  forceRender: PropTypes.bool,
};

export default story;
