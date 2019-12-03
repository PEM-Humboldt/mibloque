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
      connError: false,
      data: [],
      tabs: [],
      activeTab: 'Todas',
    };
  }

  componentDidMount() {
    const { activeArea } = this.props;
    const areaId = (activeArea && activeArea.name) ? activeArea.name : null;
    if (areaId) {
      this.loadIndicators(areaId);
      this.loadTopics(areaId);
    } else {
      this.reportConnError();
    }
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
          data: res.indicators,
        });
      })
      .catch(() => {
        this.reportConnError();
      });
  }

  /**
   * Load topic list for selected area from RestAPI
   *
   * @param {string} areaId id for selected area
   */
  loadTopics = (areaId) => {
    RestAPI.requestIndicatorsByArea(areaId)
      .then((res) => {
        res.topics.unshift('Todas');
        this.setState({
          tabs: res.topics,
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
      connError,
      data,
      activeTab,
      tabs,
    } = this.state;

    const { activeArea } = this.props;

    const masonryComp = (
      <Masonry
        options={masonryOptions}
      >
        {data.filter((post) => activeTab === 'Todas' || post.topics.includes(activeTab)).map((item) => (
          <IndicatorCard
            key={item.code}
            code={item.code}
            size={item.size}
            name={item.name}
            values={item.values}
          />
        ))}
      </Masonry>
    );

    return (
      <Layout
        activeArea={activeArea}
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
            {tabs.map((tabKey) => (
              <a
                key={tabKey}
                href={`#${tabKey}`}
                className={(tabKey === activeTab && 'filteron') || ''}
                onClick={() => this.setState({ activeTab: tabKey })}
              >
                {tabKey}
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
  activeArea: PropTypes.object,
};

IndicatorsDash.defaultProps = {
  activeArea: {},
};

export default IndicatorsDash;
