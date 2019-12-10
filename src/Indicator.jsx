/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';

import Select from 'react-select';
import Layout from './Layout';
import MapViewer from './commons/MapViewer';
import RenderGraph from './graphs/RenderGraph';
import GraphData from './commons/GraphData';
import RestAPI from './commons/RestAPI';


class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      biomesList: [],
      connError: false,
      data: null,
      fullData: null,
      code: 4,
      groupName: '',
    };
  }

  componentDidMount() {
    const { areaName, indicatorIds } = this.props;
    this.loadData(areaName, indicatorIds);
  }

  componentDidUpdate() {
    const { activeArea, areaName, setActiveArea } = this.props;
    if (!activeArea) {
      setActiveArea(areaName);
    }
  }

  /**
   * Load indicators data for selected area from RestAPI and specified ids
   *
   * @param {string} name area name for selected area
   * @param {string} ids indicator ids for selected area
   */
  loadData = (name, ids) => {
    const idsQuery = ids.map((id) => `ids=${id}`).join('&');
    RestAPI.requestIndicatorsByArea(name, idsQuery)
      .then((res) => {
        const state = {};
        if (res.biomes) {
          state.biomesList = res.biomes.map((item) => ({ value: item.id, label: item.name }));
        }
        state.data = GraphData.prepareData(res.code, res.values, res.biomes);
        state.fullData = state.data;
        state.code = res.code;
        state.groupName = res.group_name;
        this.setState(state);
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
   * Behavior when a biome option is selected
   */
  handleBiomesSelect = (selectedOption) => {
    this.setState({ selectedOption });
    const { fullData } = this.state;
    const state = {};
    if (selectedOption) {
      state.data = fullData.filter((row) => row[0] === 'Bioma' || row[0] === selectedOption.label);
    } else {
      state.data = fullData;
    }
    this.setState(state);
  };

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
      selectedOption,
      biomesList,
      connError,
      data,
      code,
      groupName,
    } = this.state;
    const { layers, activeArea } = this.props;

    let biomesSelect = null;
    if (biomesList.length > 0) {
      biomesSelect = (
        <div>
          <Select
            value={selectedOption}
            onChange={this.handleBiomesSelect}
            options={biomesList}
            placeholder="Seleccione un bioma"
            isSearchable="true"
            isClearable="true"
          />
        </div>
      );
    }

    // data.filter((post) => post.values.name_biome.includes('Peinobioma Altillanura'));

    let graph = null;
    graph = (
      RenderGraph(
        data,
        '',
        'Hectáreas',
        GraphData.validGraphType(code).validGraphType,
        groupName,
        null,
        null,
        null,
      )
    );

    return (
      <Layout
        activeArea={activeArea}
        activateHome
        activateIndicators
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
          <div className="sheet">
            <div>
              {biomesSelect}
            </div>
            <div className="indicator">
              {data
                ? graph
                : 'Cargando...'}
            </div>
          </div>
          <div className="blockdata">
            <h1>¿Cómo leer esta cifra en el área?</h1>
            <div className="line" />
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
              sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
              Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit
              lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
              in hendrerit in vulputate velit esse molestie consequat, vel illum
              dolore eu feugiat nulla facilisis at.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,
              sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna
              aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci
              tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie
              consequat, vel illum dolore eu feugiat nulla facilisis at.
            </p>
            <br />
            {layers
              && (
              <div className="smallMap">
                <MapViewer
                  layers={layers}
                  controls={false}
                />
              </div>
              )}
          </div>
        </section>
      </Layout>
    );
  }
}

Indicator.propTypes = {
  activeArea: PropTypes.object,
  layers: PropTypes.object,
  indicatorIds: PropTypes.array,
  areaName: PropTypes.string.isRequired,
  setActiveArea: PropTypes.func,
};

Indicator.defaultProps = {
  activeArea: {},
  layers: {},
  indicatorIds: null,
  setActiveArea: () => {},
};

export default Indicator;
