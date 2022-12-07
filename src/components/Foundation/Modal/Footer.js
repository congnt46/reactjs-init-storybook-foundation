import React from 'react';

import { ChildrenPropType } from 'types/prop-types';

function Footer({ children }) {

  return (
    <div className="modal__footer">{children}</div>
  );
}

Footer.propTypes = {
  children: ChildrenPropType,
};

export default Footer;
