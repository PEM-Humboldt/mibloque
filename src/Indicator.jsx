/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';

import Select from 'react-select';
import Layout from './Layout';
import MapViewer from './commons/MapViewer';
import RenderGraph from './graphs/RenderGraph';
import RestAPI from './commons/RestAPI';

// Data mockups
import { graphData1 } from './assets/mockups/summaryData';

class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      biomesByBlockData: [],
      connError: false,
    };
  }

  componentDidMount() {
    const { activeArea } = this.props;
    const areaId = (activeArea && activeArea.name) ? activeArea.name : null;
    if (areaId) {
      this.loadBiomes(areaId);
    } else {
      this.reportConnError();
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
   * Behavior when a biome option is selected
   */
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
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
      biomesByBlockData,
      connError,
    } = this.state;
    const { layers, activeArea } = this.props;
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
            <div className="indicator">
              {graphData1
                ? RenderGraph(
                  graphData1, '', '', 'Line',
                  'Cobertura', 'Tendencia', ['#5f8f2c', '#fff'], null, null,
                  '', '%',
                )
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
            <h2>Biomas</h2>
            <div className="line" />
            <br />
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
};

Indicator.defaultProps = {
  activeArea: {},
  layers: {},
};

export default Indicator;
