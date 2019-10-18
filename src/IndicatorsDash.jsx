/** eslint verified */
import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';

import Masonry from 'react-masonry-component';
import Layout from './Layout';

import { arrayData } from './assets/mockups/indicatorsDash';

const masonryOptions = {
  transitionDuration: 0,
};

class IndicatorsDash extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        moduleName: 'indicators',
        activeBlock: null,
        connError: false,
        data: null,
      };
    }

    UNSAFE_componentWillMount() {
      this.setState({ data: arrayData});
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
      const { moduleName, connError, data } = this.state;
      return (
        <Layout
          moduleName={moduleName}
          activateHome
          activateSummary
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
                <Masonry
                  options={masonryOptions}
                >
                  {data.map((item) => {
                    let validClass = null;
                      switch (item.type){
                        case '1':
                          validClass = 'boxes'
                        break;
                        case '2':
                          validClass = 'boxes box2'
                        break;
                        case '3':
                          validClass = 'boxes box3'
                        break;
                        default:
                          validClass = 'boxes'
                        break;
                      }
                    return(<div className={validClass} key={item.id}></div>)}
                    )}
                    {console.log(data)}
                </Masonry>
                </div>
            </section>
        </Layout>
      );
    }
  }
  
  export default IndicatorsDash;
  