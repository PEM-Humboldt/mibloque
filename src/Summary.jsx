/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import L from 'leaflet';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import MapViewer from './commons/MapViewer';
import Layout from './Layout';
import RenderGraph from './graphs/RenderGraph';
import RestAPI from './commons/RestAPI';

// Data mockups
import { graphData1 } from './assets/mockups/summaryData';

// Images to import
import protegidas from './assets/img/protegidas.png';
import reservas from './assets/img/reservas.png';
import estrategicos from './assets/img/estrategicos.png';
import etnicas from './assets/img/etnicas.png';
import campesinas from './assets/img/campesinas.png';
import infraestructura from './assets/img/infraestructura.png';
import ordenamiento from './assets/img/ordenamiento.png';

// Thousands number format
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connError: false,
      layers: {},
    };
  }

  async componentDidMount() {
    const { activeArea } = this.props;
    const validData = activeArea && activeArea.name;
    if (validData) {
      const geometryRequest = await RestAPI.requestGeometryByArea(activeArea.name);
      this.setState({
        layers: {
          area: {
            displayName: activeArea.name,
            id: 1,
            active: true,
            layer: L.geoJSON(geometryRequest, {
              style: {
                stroke: false,
                fillColor: '#5f8f2c',
                fillOpacity: 0.7,
              },
            }),
          },
        },
      });
    } else {
      this.setState({
        connError: true,
      });
    }
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
    const { connError, layers } = this.state;
    const { activeArea } = this.props;
    return (
      (activeArea && (
        <Layout
          activateHome
          activeArea={activeArea}
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
            <div className="map">
              <MapViewer
                layers={layers}
              />
            </div>
            <div className="blockdata">
              <Link to="/indicatorsDash">
                <button
                  type="button"
                  key="indBtn"
                  className="generalbtn absright"
                >
                  indicadores
                </button>
              </Link>
              <h1>Sobre el área</h1>
              <div className="line" />
              <h5 className="hectareas">
                <b>{numberWithCommas(activeArea.area)}</b>
                {' '}
                ha
              </h5>
              <div className="iconos">
                <img
                  className={activeArea.categories.protected_areas ? '' : 'nogo'}
                  src={protegidas}
                  alt="Áreas protegidas"
                  title="Áreas protegidas"
                />
                <img
                  className={activeArea.categories.forest_reserves ? '' : 'nogo'}
                  src={reservas}
                  alt="Reservas forestales"
                  title="Reservas forestales"
                />
                <img
                  className={activeArea.categories.strategic_ecosystems ? '' : 'nogo'}
                  src={estrategicos}
                  alt="Ecosistemas estratégicos"
                  title="Ecosistemas estratégicos"
                />
                <img
                  className={activeArea.categories.ethnic_territories ? '' : 'nogo'}
                  src={etnicas}
                  alt="Territorios étnicos"
                  title="Territorios étnicos"
                />
                <img
                  className={activeArea.categories.peasant_reserves ? '' : 'nogo'}
                  src={campesinas}
                  alt="Zonas de reserva campesina"
                  title="Zonas de reserva campesina"
                />
                <img
                  className={activeArea.categories.projects ? '' : 'nogo'}
                  src={infraestructura}
                  alt="Proyectos e infraestructura"
                  title="Proyectos e infraestructura"
                />
                <img
                  className={activeArea.categories.ordering ? '' : 'nogo'}
                  src={ordenamiento}
                  alt="Ordenamiento"
                  title="Ordenamiento"
                />
              </div>
              <p>
                La información espacial que se muestra en la figura corresponde a la identificación de condiciones sociales, culturales, económicas y biofísicas, algunas de las cuales son determinantes ambientales del ordenamiento territorial y pueden generar restricciones al desarrollo de las actividades de exploración y explotación de hidrocarburos. Este análisis hace parte del procedimiento que la ANH ha establecido para la coordinación y concurrencia con las entidades territoriales y demás autoridades y entidades con presencia en el territorio, con el fin de posibilitar la definición y determinación de nuevas áreas de interés de hidrocarburos.
              </p>
              <h1>Biomas</h1>
              <div className="line" />
              <br />
              <div>
                {graphData1
                  ? RenderGraph(
                    graphData1, '', '', 'SmallBarStackGraph',
                    'Orobioma', '', ['#5e8f2c', '#fff'], null, null,
                    '', '%',
                  )
                  : 'Cargando...'}
              </div>
              <br />
              <div>
                {graphData1
                  ? RenderGraph(
                    graphData1, '', '', 'SmallBarStackGraph',
                    'Zoonobioma', '', ['#5f8f2c', '#fff'], null, null,
                    '', '%',
                  )
                  : 'Cargando...'}
              </div>
            </div>
          </section>
        </Layout>
      ))
      // TODO: Redirect to HOME if activeArea is empty
    );
  }
}

Summary.propTypes = {
  activeArea: PropTypes.object,
};

Summary.defaultProps = {
  activeArea: null,
};

export default Summary;
