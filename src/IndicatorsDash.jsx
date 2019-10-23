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
        activeTab: 'all',
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
      const { moduleName, connError, data, activeTab } = this.state;

      const tabs = {
        'all': 'Todas',
        'riesgo': 'Riesgo Biodiversidad',
        'costo': 'Costo de Compensación',
        'oportunidad' :'Oportunidad',
        'monitoreo' :'Monitoreo',
        'bioma' :'Bioma'
      };

      const massonryComp = (
        <Masonry options={masonryOptions}>
          {data.filter(post => activeTab === 'all' || activeTab === post.class).map((item) => {
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
              return(
                      <div className={validClass} key={item.id}>
                         <h2>{item.name}</h2>
                         <h3>{item.class}</h3>
                      </div>
                    )
            }
          )}
        </Masonry>
      );

      return (
        <Layout
          moduleName={moduleName}
          activateHome
          activateSummary>
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
                    {Object.keys(tabs).map( tabKey => (
                        <a
                          key={tabKey}
                          href={'#'+tabKey}
                          className={tabKey===activeTab && 'filteron'}
                          onClick={() => this.setState({ activeTab: tabKey})} >
                          {tabs[tabKey]}
                        </a>
                    ))}
                </div> 

                <div className="boxeswrapper">
                  
                  {/* For each tab, we generate a row */}
                  {Object.keys(tabs).map( tabKey => (
                    <div id={tabKey} key={tabKey}>
                      {/* We render masonry comp only if we are in current active tab key */}
                      {activeTab === tabKey && massonryComp}
                    </div>
                  ))}
                </div>
            </section>
        </Layout>
      );
    }
  }
  
  export default IndicatorsDash;
  