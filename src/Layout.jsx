/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const Layout = ({
  activeBlock,
  children,
  moduleName,
}) => (
  <div>
    <Header
      moduleName={moduleName}
      activeBlock={activeBlock}
    />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
  activeBlock: PropTypes.string,
  moduleName: PropTypes.string,
};

Layout.defaultProps = {
  children: null,
  activeBlock: '',
  moduleName: '',
};

export default Layout;
