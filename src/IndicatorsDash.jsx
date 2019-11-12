/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';

import Masonry from 'react-masonry-component';
import Layout from './Layout';
import IndicatorCard from './IndicatorCard';

import RestAPI from './commons/RestAPI';

const masonryOptions = {
  transitionDuration: '0.5s',
};

class IndicatorsDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: {},
      connError: false,
      data: [],
      activeTab: 'all',
    };
  }

  componentDidMount() {
    const { activeBlock } = this.props;
    this.setState({ activeBlock });
    const areaId = (activeBlock && activeBlock.id) ? activeBlock.id : 'LLA 0970';
    this.loadIndicators(areaId);
  }

  /**
   * Load indicators for selected area from RestAPI
   *
   * @param {string} areaId id for selected area
   */
  loadIndicators = (areaId) => {
    RestAPI.requestIndicatorsByArea(areaId)
      .then((res) => {
        this.setState({
          data: res,
        });
      })
      .catch(() => {
        this.reportConnError();
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
  handleCloseModal = (state) => () => {
    this.setState({ [state]: false });
  };

  render() {
    const {
      activeBlock, connError, data, activeTab,
    } = this.state;

    const tabs = {
      all: 'Todas',
      riesgo: 'Riesgo Biodiversidad',
      costo: 'Costo de Compensación',
      oportunidad: 'Oportunidad',
      monitoreo: 'Monitoreo',
      bioma: 'Bioma',
    };
    const masonryComp = (
      <Masonry
        options={masonryOptions}
      >
        {data.filter((post) => activeTab === 'all' || post.group.includes(activeTab)).map((item) => (
          <IndicatorCard
            key={item.id}
            id={item.id}
            typeName={item.typeName}
            values={item.values}
            size={item.size}
          />
        ))}
      </Masonry>
    );

    return (
      <Layout
        activeBlock={activeBlock}
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
          <div className="internheader" />
          <div className="filtros">
            {Object.keys(tabs).map((tabKey) => (
              <a
                key={tabKey}
                href={`#${tabKey}`}
                className={(tabKey === activeTab && 'filteron') || ''}
                onClick={() => this.setState({ activeTab: tabKey })}
              >
                {tabs[tabKey]}
              </a>
            ))}
          </div>
          <div className="boxeswrapper">
            {masonryComp}
          </div>
        </section>
      </Layout>
    );
  }
}

IndicatorsDash.propTypes = {
  activeBlock: PropTypes.object,
};

IndicatorsDash.defaultProps = {
  activeBlock: {},
};

export default IndicatorsDash;
