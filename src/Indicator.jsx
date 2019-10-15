/** eslint verified */
import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Layout from './Layout';

class IndicatorsDash extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        moduleName: 'indicators',
        activeBlock: null,
        connError: false,
      };
    }
  
    componentDidMount() {
      const { activeBlock } = this.props;
      this.setState((prevState) => {
          const newState = { ...prevState };
          newState.activeBlock = { activeBlock };
          return newState;
      });
    }
  
    render() {
      const { moduleName, connError } = this.state;
      return (
        <Layout
          moduleName={moduleName}
        >
        <section className="sectionintern">
          <div className="internheader"></div>
          <div className="filtros">
          <div className="blockdata">                    
              <h1>¿Cómo leer este bloque?</h1>
              <div className="line"></div>
              <br />
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.<br />
              <br />Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
              <div className="line"></div>
            </div>
          </div>
        </section>
    </Layout>
    );
  }
}

export default IndicatorsDash;