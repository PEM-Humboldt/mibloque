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
      geoIds:[],
      geometries:[],
      connError: false,
      data: null,
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
    this.loadBlockGeometry(areaName);
  }

  componentDidUpdate() {
    const { activeArea, areaName, setActiveArea } = this.props;
    if (!activeArea) {
      setActiveArea(areaName);
    }
  }

  loadBlockGeometry = (areaName) =>{
    
      RestAPI.requestGeometryByArea(areaName)
      .then((res)=>{
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
            }
          },
        });
      })
      .catch(()=> {
        this.reportConnError();
      });
     
  }

  /** 
   * Load geometry for the incoming indicator
   * @param {string} gids indicator ids for a selected area
   * 
  */
 
  LoadIndicatorGeometry = (gids) =>{
    
    const gidsQuery = gids.map((gid) => `ids=${gid}`).join('&');
    console.log('hola '+gids+'. ');
    RestAPI.requestGeometryByGid(gidsQuery)
    .then((res) => {
      if (res.features) {
        const aux_geom=this.state.geometries.areaBorder;
        console.log(aux_geom);
        console.log("entró");
        this.setState({geometries: {
            areaBorder:aux_geom,
            area: {
              displayName: "Foo",
              id: 2,
              active: true,
              layer: L.geoJSON(res.features[0].geometry, {
                style: {
                  color: '#fed0b4',
                  stroke: false,
                  fillColor: 'red',
                  fillOpacity: 0.5,
                },
              }),
            }
          }
        });
      console.log(res.features[0].geometry);
      //aux_geom.push(item);
      //this.setState({geometries: aux_geom});
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
    this.setState({geometries:[]});
    const idsQuery = ids.map((id) => `ids=${id}`).join('&');
    RestAPI.requestIndicatorsByArea(name, idsQuery)
      .then((res) => {
        const state = {};
        if (res.biomes) {
          state.biomesList = res.biomes.map((item) => ({ value: item.id, label: item.name }));
        }
        if(res.values && res.code){
          if(res.code===1){
            const x=[];
            for(const obj in res.values){
              for(const i in res.values[obj]){
                x.push(res.values[obj][i]);
              }
            }
            //Se toma el mayor area del último año
            const aux=[x.filter(f=>f.year===Math.max.apply(Math,x.map(o=>o.year))).sort((a,b)=>parseFloat(a.indicator_value)<parseFloat(b.indicator_value))[0].id];
            this.setState({geoIds:aux});
          }


        }
        if(this.state.geoIds){
          this.LoadIndicatorGeometry(this.state.geoIds);
        }
        // TODO: state.indicatorsValues - Process indicators
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
      const data = fullData.filter((row) => row[0] === 'Bioma' || row[0] === selectedOption.label);
      const dumb = [' ', null, null, null, null, null, null];
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
      code,
      groupName,
      graphSize: { height: graphHeight, width: graphWidth },
      selectHeight,
    } = this.state;
    const {  activeArea } = this.props;

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
            {this.state.geometries
              && (
              <div id="miniMap" className="smallMap">
                <MapViewer
                  layers={this.state.geometries}
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
