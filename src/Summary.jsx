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
      colorPerBiome: [],
      biomesDataGraps: {},
      colors: [
        '#003d59',
        '#5a1d44',
        '#902130',
        '#6d819c',
        '#db9d6b',
        '#fb9334',
        '#fe6625',
        '#ab5727',
        '#44857d',
        '#167070',
      ],
      connError: false,
      featuresCounter: 0,
      layers: {},
    };
  }

  async componentDidMount() {
    const { activeArea } = this.props;
    const { colors, colorPerBiome, featuresCounter } = this.state;
    const validData = activeArea && activeArea.name;
    if (validData) {
      const geometryRequest = await RestAPI.requestGeometryByArea(activeArea.name);
      const biomesRequest = await RestAPI.requestBiomesDataByArea(activeArea.name);
      this.setState({
        biomesDataGraps: biomesRequest,
        layers: {
          area: {
            displayName: activeArea.name,
            id: 1,
            active: true,
            layer: L.geoJSON(geometryRequest, {
              style: (feature) => {
                const localColor = colors[featuresCounter];
                console.log(feature);
                console.log(localColor);
                this.setState({
                  colorPerBiome: [
                    { [feature.properties.name_biome]: colors[featuresCounter] },
                  ],
                  featuresCounter: featuresCounter + 1,
                });
                return {
                  stroke: false,
                  fillColor: localColor,
                  fillOpacity: 0.5,
                };
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
   * Return a color code according to as many features are in a layer
   */
  getStyle = () => {
    const { colorPerBiome } = this.state;
    return colorPerBiome.map((element) => eleme);
  };

  /**
   * Count biomes to set color
   */
  getColorCode = (name) => {
    const { colorPerBiome } = this.state;
    return colorPerBiome.find((element) => element.key === name);
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
      biomesDataGraps, connError, layers,
    } = this.state;
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
                <b>{numberWithCommas(Number(activeArea.area).toFixed(2))}</b>
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
                {
                  biomesDataGraps && Object.values(biomesDataGraps).map((biome) => {
                    const localColor = this.getColorCode(biome.name);
                    return RenderGraph(
                      [
                        biome,
                        {
                          area: (activeArea.area - biome.area),
                          type: 'empty',
                          color: '#fff',
                        },
                      ], '', '', 'SmallBarStackGraph',
                      biome.name, '', [localColor, '#fff'], 'ha',
                    )})
                }
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
