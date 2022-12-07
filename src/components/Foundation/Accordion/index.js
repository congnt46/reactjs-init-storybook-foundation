import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Panel from './Panel';

function Accordion({ className, onChange, allowMultiple, children, squared, openFirst }) {
  const [activeKeys, setActiveKeys] = useState([]);
  const [mountedKeys, setMountedKeys] = useState([]);

  useEffect(() => {
    const defaultActiveKeys = [];
    const forceRenders = [];
    // eslint-disable-next-line
    React.Children.forEach(children, (child, index) => {
      if (child) {
        if ((index === 0 && openFirst) || child.props.expanded) {
          defaultActiveKeys.push(child.key);
        }
        if (child.props.forceRender) {
          forceRenders.push(child.key);
        }
      }
    });
    setActiveKeys(defaultActiveKeys);
    setMountedKeys([...defaultActiveKeys, ...forceRenders]);
  }, [children, openFirst]);

  function onClick(key) {
    setActiveKeys((prevState) => {
      if (!prevState.includes(key)) {
        return allowMultiple ? [...prevState, key] : [key];
      }
      return prevState.filter((item) => item !== key);
    });
    if (!mountedKeys.includes(key)) {
      setMountedKeys((prevState) => [...prevState, key]);
    }
    if (onChange) {
      onChange(key);
    }
  }

  const classes = cx('accordion', className, {
    'accordion--squared': squared,
  });

  return (
    <div className={classes}>
      {
        React.Children.map(
          children,
          (child) => {
            if (child) {
              return {
                ...child,
                props: {
                  ...child.props,
                  key: child.key,
                  expanded: activeKeys.includes(child.key),
                  forceRender: mountedKeys.includes(child.key),
                  onChange: onClick,
                },
              };
            } else {
              return null;
            }
          },
        )
      }
    </div>
  );
}

Accordion.propTypes = {
  onChange: PropTypes.func,
  allowMultiple: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  squared: PropTypes.bool,
  className: PropTypes.string,
  openFirst: PropTypes.bool,
};

Accordion.defaultProps = {
  allowMultiple: false,
  squared: false,
  openFirst: true,
};

Accordion.Panel = Panel;

export default Accordion;
