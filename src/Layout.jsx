/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import Footer from './Footer';
import Header from './Header';

const Layout = ({
  activeBlock,
  callbackUser,
  children,
  moduleName,
  showFooterLogos,
  userLogged,
}) => (
  <div>
    <Header
      moduleName={moduleName}
      activeBlock={activeBlock}
      userLogged={userLogged}
      callbackUser={callbackUser}
    />
    {children}
    <Footer showLogos={showFooterLogos} />
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
  activeBlock: PropTypes.string,
  moduleName: PropTypes.string,
  showFooterLogos: PropTypes.bool,
  userLogged: PropTypes.object,
  callbackUser: PropTypes.func.isRequired,
};

Layout.defaultProps = {
  children: null,
  activeBlock: '',
  moduleName: '',
  showFooterLogos: true,
  userLogged: null,
};

export default Layout;
