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
  
    /**
     * Report a connection error from one of the child components
     */
    reportConnError = () => {
      this.setState({
        connError: true,
      });
    }
  
    /**
     * Close a given modal
     *
     * @param {String} state state value that controls the modal you want to close
     */
    handleCloseModal = state => () => {
      this.setState({ [state]: false });
    };
  
    render() {
      const { moduleName, connError } = this.state;
      return (
        <Layout
          moduleName={moduleName}
        >
          <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={connError}
          onClose={this.handleCloseModal('connError')}
          disableAutoFocus
          >
              <div className="generalAlarm">
              <h2>
                  <b>Sin conexión al servidor</b>
                  <br />
                  Intenta de nuevo en unos minutos.
              </h2>
              <button
                  type="button"
                  className="closebtn"
                  onClick={this.handleCloseModal('connError')}
                  data-tooltip
                  title="Cerrar"
              >
                  <CloseIcon />
              </button>
              </div>
          </Modal>
            <section className="sectionintern">
                <div className="internheader"></div>
                <div className="filtros">
                    <a className="filteron" href="http://www.anh.gov.co/">Todos</a>
                    <a href="http://www.anh.gov.co/">Riesgo Biodiversidad</a>
                    <a href="http://www.anh.gov.co/">Costo de Compensación</a>
                    <a href="http://www.anh.gov.co/">Oportunidad</a>
                    <a href="http://www.anh.gov.co/">Monitoreo</a>
                    <a href="http://www.anh.gov.co/">Bioma</a>
                </div>
                <div className="boxeswrapper">
                    <div className="boxes">
                        <h6>Especies endémicas por Bioma</h6>
                    </div>
                    <div className="boxes box2">
                        
                    </div>
                    <div className="boxes box3">
                        
                    </div>
                </div>
            </section>
        </Layout>
      );
    }
  }
  
  export default IndicatorsDash;
  