import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { ChildrenPropType } from 'types/prop-types';

import Text from '../Text';
import Icon from '../Icon';
import Title from '../Title';

function Panel({ key, icon, title, children, caption, extra, disabled, expanded, forceRender, ...rest }) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setHidden(!expanded);
  }, [expanded]);

  const bodyRef = useRef();
  const bodyRect = bodyRef?.current?.getBoundingClientRect();
  const bodyRectHeight = (bodyRect ? bodyRect.height : 0) + 1;

  const [height, setHeight] = useState(bodyRectHeight);

  useEffect(() => {
    setHeight(bodyRectHeight);
  }, [expanded, forceRender, bodyRectHeight, children, disabled]);

  const headerClasses = cx('accordion-panel__header', {
    disabled: Boolean(disabled),
    hidden,
  });

  const bodyClasses = cx('accordion-panel__body', {
    hidden,
  });

  function onClickHeader() {
    if (!rest.onChange || disabled) { return; }
    setHeight(bodyRectHeight);
    rest.onChange(key);
  }

  function renderExpandIcon() {
    if (expanded) {
      return <Icon className="icon-collapse" icon="fa-minus" color="primary" size="large" />;
    }
    return <Icon className="icon-expand" icon="fa-plus" color="gray-dark" size="large" />;
  }

  function renderBody(bodyContent) {
    if (!disabled && children && (expanded || forceRender)) {
      return (
        <div
          className={bodyClasses}
          style={{ height: expanded ? height : bodyRectHeight }}
          onTransitionEnd={() => setHeight(null)}
        >
          {bodyContent}
        </div>
      );
    }
    return null;
  }

  const bodyContent = useMemo(() => <div ref={bodyRef}>{children}</div>, [children]);
  return (
    <div className="accordion-panel" key={key}>
      <div className={headerClasses} onClick={onClickHeader} onKeyDown={onClickHeader}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center">
            {icon && <span className="accordion-panel__icon">{icon}</span>}
            <Title tag="h5">{title}</Title>
            {caption && <Text type="caption" theme="gray">{caption}</Text>}
          </div>
          {extra && React.cloneElement(extra, { className: cx(extra.props.className, 'accordion__extra') }) }
        </div>
        {renderExpandIcon()}
      </div>
      {renderBody(bodyContent)}
    </div>
  );
}

Panel.propTypes = {
  key: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  title: ChildrenPropType.isRequired,
  caption: ChildrenPropType,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  expanded: PropTypes.bool,
  extra: PropTypes.element,
  forceRender: PropTypes.bool,
};

Panel.defaultProps = {
  caption: null,
  disabled: false,
  expanded: false,
  forceRender: false,
  extra: null,
};

export default Panel;
