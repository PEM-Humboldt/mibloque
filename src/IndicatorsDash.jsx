/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';

import Masonry from 'react-masonry-component';
import Select from 'react-select';
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
      selectedOption: null,
      biomesByBlockData: [],
    };
  }

  componentDidMount() {
    const { activeBlock } = this.props;
    this.setState({ activeBlock });

    const areaId = (activeBlock && activeBlock.id) ? activeBlock.id : 'LLA 86';
    this.loadIndicators(areaId);
    this.loadBiomes(areaId);
  }

  /**
   * Load indicators for selected area from RestAPI
   *
   * @param {string} areaId id for selected area
   * @param {string} biomeId id for selected biome
   */
  loadIndicators = (areaId, biomeId) => {
    if (typeof biomeId === 'undefined') {
      RestAPI.requestIndicatorsByArea(areaId)
        .then((res) => {
          this.setState({
            data: res,
          });
        })
        .catch(() => {
          this.reportConnError();
        });
    } else {
      RestAPI.requestIndicatorsByBiomeByArea(areaId, biomeId)
        .then((res) => {
          this.setState({
            data: res,
          });
        })
        .catch(() => {
          this.reportConnError();
        });
    }
  }

  /**
   * Load biomes for selected area from RestAPI
   *
   * @param {string} areaId id for selected area
   */
  loadBiomes = (areaId) => {
    RestAPI.requestBiomesByArea(areaId)
      .then((res) => {
        this.setState({
          biomesByBlockData: res.map((item) => (
            { value: item.id, label: item.name })),
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

  /**
   * Re-Load indicators list by selecting one bioma option
   *
   * @param {String} state state value that controls the modal you want to close
   */
  handleChange = (selectedOption) => {
    const { activeBlock } = this.state;
    this.setState(
      { selectedOption },
      () => this.loadIndicators(activeBlock.id, selectedOption ? selectedOption.value : undefined),
    );
  };

  render() {
    const {
      activeBlock,
      connError,
      data,
      activeTab,
      selectedOption,
      biomesByBlockData,
    } = this.state;

    const tabs = {
      all: 'Todas',
      riesgo: 'Riesgo Biodiversidad',
      costo: 'Costo de Compensación',
      oportunidad: 'Oportunidad',
      monitoreo: 'Monitoreo',
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
          <div>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={biomesByBlockData}
              placeholder="Seleccione un bioma"
              isSearchable="true"
              isClearable="true"
            />
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
