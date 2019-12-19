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
import internacional from './assets/img/internacional.png';
import licencias from './assets/img/licencias.png';

// Thousands number format
const numberWithCommas = (x) => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPerBiome: {},
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
      layers: {},
      minibd: false,
      alleft: false,
      nogo: false,
    };
  }

  componentDidMount() {
    const { areaName } = this.props;
    this.loadData(areaName);
  }

  componentDidUpdate() {
    const { activeArea, areaName, setActiveArea } = this.props;
    if (!activeArea) {
      setActiveArea(areaName);
    }
  }

  /**
   * Load data required by the component
   */
  loadData = async (areaName) => {
    const { colors } = this.state;
    try {
      const geometryAreaRequest = await RestAPI.requestGeometryByArea(areaName);
      const geometryBiomesRequest = await RestAPI.requestBiomesGeometryWithArea(areaName);
      const biomesRequest = await RestAPI.requestBiomesDataByArea(areaName);
      const dictionaryColor = {};
      let biomesCounter = 0;
      biomesRequest.forEach((biome) => {
        dictionaryColor[biome.name] = colors[biomesCounter];
        biomesCounter += 1;
      });
      this.setState({
        biomesDataGraps: biomesRequest,
        colorPerBiome: dictionaryColor,
        layers: {
          areaBorder: {
            displayName: areaName,
            id: 1,
            active: true,
            layer: L.geoJSON(geometryAreaRequest, {
              style: {
                color: '#0000FF',
                stroke: true,
                fillColor: 'transparent',
                fillOpacity: 0.5,
              },
            }),
          },
          biomes: {
            displayName: areaName,
            id: 1,
            active: true,
            layer: L.geoJSON(geometryBiomesRequest, {
              style: (feature) => ({
                stroke: false,
                fillColor: dictionaryColor[feature.properties.name_biome],
                fillOpacity: 0.5,
              }),
            }),
          },
        },
      });
    } catch (error) {
      // TODO: Decide if to do something else with the error
      this.reportConnError();
    }
  }

  /**
   * Return the color assigned to an specific biome
   *
   * @param {String} name biome name to search
   */
  getColorCode = (name) => {
    const { colorPerBiome } = this.state;
    return (name !== undefined) ? colorPerBiome[name] : '#fe6625';
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

  toggleBlock = () => {
    this.setState((prevState) => ({
      minibd: !prevState.minibd,
      alleft: !prevState.alleft,
      nogo: !prevState.alleft,
    }));
  }

  render() {
    const {
      biomesDataGraps, connError, layers, minibd, alleft, nogo,
    } = this.state;
    const { activeArea, areaName } = this.props;

    if (!activeArea) return null;
    return (
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
          <div className={`blockdata ${minibd? 'minibd' : ''}`}>
            <button onClick={this.toggleBlock} className={`arrowLink ${alleft? 'alleft' : ''}`}>
            </button>
            <Link to={`/indicatorsDash/${areaName}`}>
              <button
                type="button"
                key="indBtn"
                className={`generalbtn absright ${nogo? 'nogo' : ''}`}
              >
                indicadores
              </button>
            </Link>
            <h1>Sobre el área</h1>
            <div className="line" />
            <h5 className="hectareas">
              Área total:
              {' '}
              <b>{activeArea.area ? numberWithCommas(Number(activeArea.area).toFixed(2)) : 'Sin información disponible'}</b>
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
              <img
                className={activeArea.categories.international ? '' : 'nogo'}
                src={internacional}
                alt="Protección internacional"
                title="Protección internacional"
              />
              <img
                className={activeArea.categories.license ? '' : 'nogo'}
                src={licencias}
                alt="Licencias ambientales"
                title="Licencias ambientales"
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
                  return (
                    <div key={biome.name} style={{ paddingBottom: '5px' }}>
                      <RenderGraph
                        data={[
                          biome,
                          {
                            area: (activeArea.area - biome.area),
                            type: 'empty',
                            color: '#fff',
                          },
                        ]}
                        graph="SmallBarStackGraph"
                        subtitle={biome.name}
                        colors={[localColor, '#fff']}
                        units="ha"
                      />
                      {biome.area ? (
                        <span key={biome.area}>
                          <b>
                            {`${numberWithCommas(Number(biome.area).toFixed(2))} `}
                          </b>
                            ha
                        </span>
                      ) : ''}
                      {biome.compensation_factor ? (
                        <span key={biome.compensation_factor}>
                            · FC:
                          <b>
                            {`${numberWithCommas(Number(biome.compensation_factor).toFixed(2))} `}
                          </b>
                        </span>
                      ) : ''}
                    </div>
                  );
                })
              }
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

Summary.propTypes = {
  activeArea: PropTypes.object,
  areaName: PropTypes.string.isRequired,
  setActiveArea: PropTypes.func,
};

Summary.defaultProps = {
  activeArea: null,
  setActiveArea: () => {},
};

export default Summary;
