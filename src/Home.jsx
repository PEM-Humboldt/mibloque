/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import Layout from './Layout';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: '',
      activeBlock: '',
    };
  }

  render() {
    const {
      callbackUser, userLogged,
    } = this.props;
    const { activeBlock, moduleName } = this.state;
    return (
      <Layout
        userLogged={userLogged}
        callbackUser={callbackUser}
        moduleName={moduleName}
      >
        {activeBlock}
        {moduleName}
      </Layout>
    );
  }
}

Home.propTypes = {
  callbackUser: PropTypes.func.isRequired,
  userLogged: PropTypes.object,
};

Home.defaultProps = {
  userLogged: null,
};

export default Home;
