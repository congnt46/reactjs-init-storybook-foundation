import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType } from 'types/prop-types';

import Tab from './Tab';

function Tabs({ onChange, children, activeKey, className, tabHeaderClassName, tabContentClassName, extraLeft }) {
  const [activeTab, setActiveTab] = useState();
  const [mountedKeys, setMountedKeys] = useState([]);

  // eslint-disable-next-line
  useEffect(() => {
    if (Array.isArray(children)) {
      const key = activeKey || children[0].key;
      setActiveTab(key);
      setMountedKeys([key]);
    }
  }, [activeKey, children]);

  function onClickTab(key) {
    setActiveTab(key);
    if (!mountedKeys.includes(key)) {
      setMountedKeys((prevState) => [...prevState, key]);
    }
    if (onChange) {
      onChange(key);
    }
  }

  function getTabContentClass(key) {
    return key === activeTab ? 'tab__content--active' : 'tab__content--inactive';
  }

  function renderTabHeader() {
    return React.Children.map(children, (child) => ({
      ...child,
      props: { ...child.props, key: child.key, active: child.key === activeTab, onChange: onClickTab },
    }));
  }

  function renderTabContent() {
    return React.Children.map(children, (child) => {
      if (child.key === activeTab || child.props.forceRender || mountedKeys.includes(child.key)) {
        const classes = cx(getTabContentClass(child.key), child.props.className);
        return (
          <div key={child.key} className={classes}>
            {child.props.children}
          </div>
        );
      }
      return null;
    });
  }

  return (
    <div className={cx('tab', className)}>
      <ol className={`tab__header ${tabHeaderClassName}`}>
        { extraLeft }
        {renderTabHeader()}
      </ol>
      <div className={cx('tab__content', tabContentClassName)}>
        {renderTabContent()}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
  onChange: PropTypes.func,
  activeKey: PropTypes.string,
  className: PropTypes.string,
  tabHeaderClassName: PropTypes.string,
  tabContentClassName: PropTypes.string,
  extraLeft: ChildrenPropType,
};

Tabs.defaultProps = {
  onChange: null,
  activeKey: null,
  className: '',
  tabHeaderClassName: '',
  tabContentClassName: '',
  extraLeft: null,
};

Tabs.Tab = Tab;

export default Tabs;
