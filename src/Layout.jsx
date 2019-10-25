/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const Layout = ({
  activeBlock,
  activateHome,
  activateIndicators,
  activateSummary,
  children,
}) => (
  <div>
    <Header
      activeBlock={activeBlock}
      activateHome={activateHome}
      activateIndicators={activateIndicators}
      activateSummary={activateSummary}
    />
    {children}
    <Footer />
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
  activeBlock: PropTypes.object,
  activateHome: PropTypes.bool,
  activateIndicators: PropTypes.bool,
  activateSummary: PropTypes.bool,
};

Layout.defaultProps = {
  children: null,
  activeBlock: '',
  activateHome: false,
  activateIndicators: false,
  activateSummary: false,
};

export default Layout;
