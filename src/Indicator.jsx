/** eslint verified */
import React from 'react';
import L from 'leaflet';
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
      geometries: {},
      connError: false,
      data: null,
      dataGroups: 1,
      fullData: null,
      code: 4,
      groupName: '',
      graphSize: { width: 0, height: 0 },
      selectHeight: 0,
    };
  }

  componentDidMount() {
    const { areaName, indicatorIds } = this.props;
    this.loadData(areaName, indicatorIds);
    this.loadAreaGeometry(areaName);
  }

  componentDidUpdate() {
    const { activeArea, areaName, setActiveArea } = this.props;
    if (!activeArea) {
      setActiveArea(areaName);
    }
  }

  loadAreaGeometry = (areaName) => {
    RestAPI.requestGeometryByArea(areaName)
      .then((res) => {
        this.setState({
          geometries: {
            areaBorder: {
              displayName: areaName,
              id: 1,
              active: true,
              layer: L.geoJSON(res, {
                style: {
                  color: '#8B7765',
                  stroke: true,
                  fillColor: 'transparent',
                  fillOpacity: 0.5,
                },
              }),
            },
          },
        });
      })
      .catch(() => {
        this.reportConnError();
      });
  }

  /**
   * Load geometry for the incoming indicator
   *
   * @param {string} gids indicator ids for a selected area
  */
  loadIndicatorGeometry = (code, gids) => {
    const bufferColorsByIdIndicator = {
      3: 'black',
      4: 'black',
      5: 'black',
      6: 'red',
      7: '#f4b400',
      8: 'green',
    };
    const coverageColorsByCoverage = { 1: '#f4b400', 2: '#fada80' };
    // TODO: Use the following colors for code = 3
    // const ecosystemsRedListColorsByThreat = { CR: '#EF0928', EN: '#FB6A2A', VU: '#DF9735' };

    const gidsQuery = gids.map((gid) => `ids=${gid}`).join('&');
    RestAPI.requestGeometryByGid(gidsQuery)
      .then((res) => {
        if (res.features) {
          if (code === 1) {
            const temp = {
              area: {
                displayName: 'Foo',
                id: 2,
                active: true,
                layer: L.geoJSON(res.features[0].geometry, {
                  style: {
                    color: '#f4b400',
                    stroke: false,
                    fillColor: coverageColorsByCoverage[res.features[0].properties.id_indicator],
                    fillOpacity: 0.7,
                  },
                }),
              },
            };
            this.setState((prevState) => ({ geometries: { ...prevState.geometries, ...temp } }));
          }
          if (code === 2) {
            res.features.forEach((i) => {
              const geom = {
                [i.properties.gid]: {
                  displayName: `buff_+${i.properties.gid}`,
                  id: i.properties.gid,
                  active: true,
                  layer: L.geoJSON(i.geometry, {
                    style: {
                      stroke: false,
                      fillColor: bufferColorsByIdIndicator[i.properties.id_indicator],
                      fillOpacity: (i.properties.id_indicator <= 5 ? 0.5 : 0.1),
                    },
                  }),
                },
              };
              this.setState((prevState) => ({ geometries: { ...prevState.geometries, ...geom } }));
            });
          }
          if (code === 3) {
            // TODO: Implement threat ecosystems geometries
          }
        }
      })
      .catch(() => {
        this.reportConnError();
      });
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
        let geoIds = [];
        if (res.values && res.code) {
          const x = [];
          // Putting the response on an Array to allow filtering and sorting functions
          Object.values(res.values).forEach((obj) => {
            obj.forEach((i) => {
              x.push(i);
            });
          });

          if (res.code === 1) {
            // Picking the biggest area for the last year
            if (x[0].id_indicator !== 26) {
              geoIds = [
                x.filter((f) => f.year === Math.max(...x.map((o) => o.year)))
                  .sort((a, b) => (
                    parseFloat(a.indicator_value) < parseFloat(b.indicator_value)
                  ))[0].id,
              ];
            }
          }
          if (res.code === 2) {
            // Picking all the geometries
            geoIds = x
              .filter((f) => f.id_indicator !== 9 && f.id_indicator !== 10 && f.id_indicator !== 11)
              .map((o) => o.id);
          }
          if (res.code === 3) {
            // TODO: include LRE geometries
          }
        }
        if (geoIds.length > 0) {
          this.loadIndicatorGeometry(res.code, geoIds);
        }
        // TODO: state.indicatorsValues - Process indicators
        state.data = GraphData.prepareData(res.code, res.values, res.biomes);
        const { results, groups } = GraphData.prepareData(res.code, res.values, res.biomes);
        state.data = results;
        state.dataGroups = groups;
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
      const data = fullData.filter((row) => row[0] === 'Bioma' || row[0] === selectedOption.label);
      const dumb = [' '].concat(data[0].slice(1).map(() => null));
      state.data = [data[0], dumb, data[1], dumb];
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

  setGraphWidth = (domElem) => {
    if (domElem) {
      this.setState((prevState) => ({
        graphSize: {
          height: prevState.graphSize.height,
          width: domElem.offsetWidth,
        },
      }));
    }
  }

  setGraphHeight = (domElem) => {
    if (domElem) {
      this.setState((prevState) => ({
        graphSize: {
          height: domElem.offsetHeight,
          width: prevState.graphSize.width,
        },
      }));
    }
  }

  setSelectHeight = (domElem) => {
    if (domElem) this.setState({ selectHeight: domElem.select.controlRef.offsetHeight });
  }

  render() {
    const {
      selectedOption,
      biomesList,
      connError,
      data,
      dataGroups,
      code,
      groupName,
      graphSize: { height: graphHeight, width: graphWidth },
      selectHeight,
      geometries,
    } = this.state;
    const { activeArea } = this.props;

    let biomesSelect = null;
    if (biomesList.length > 0) {
      biomesSelect = (
        <Select
          ref={this.setSelectHeight}
          value={selectedOption}
          onChange={this.handleBiomesSelect}
          options={biomesList}
          placeholder="Seleccione un bioma"
          isSearchable="true"
          isClearable="true"
        />
      );
    }

    let graph = null;
    if (data && graphHeight !== 0 && graphWidth !== 0) {
      graph = (
        <div className="indicator">
          {biomesSelect}
          <RenderGraph
            data={data}
            labelY="Hectáreas"
            graph={GraphData.validGraphType(code).validGraphType}
            title={groupName}
            width={graphWidth}
            height={graphHeight - selectHeight}
            padding={20}
            dataGroups={dataGroups}
          />
        </div>
      );
    }

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
        <section className="sectionintern" ref={this.setGraphHeight}>
          <div className="internheader" />
          <div className="sheet" ref={this.setGraphWidth}>
            {graph || 'cargando...'}
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
            {geometries
              && (
              <div id="miniMap" className="smallMap">
                <MapViewer
                  layers={geometries}
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
  indicatorIds: PropTypes.array,
  areaName: PropTypes.string.isRequired,
  setActiveArea: PropTypes.func,
};

Indicator.defaultProps = {
  activeArea: {},
  indicatorIds: null,
  setActiveArea: () => {},
};

export default Indicator;
