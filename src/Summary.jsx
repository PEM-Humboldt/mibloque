/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import MapViewer from './commons/MapViewer';
import Layout from './Layout';
import RenderGraph from './graphs/RenderGraph';

// Data mockups
import { areaData, graphData1 } from './assets/mockups/summaryData';

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
      activeBlock: {},
      connError: false,
    };
  }

  componentDidMount() {
    const { activeBlock } = this.props;
    this.setState((prevState) => {
      const newState = { ...prevState };
      newState.activeBlock = activeBlock;
      return newState;
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
    const { activeBlock, connError } = this.state;
    return (
      <Layout
        activateHome
        activeBlock={activeBlock}
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
            <MapViewer />
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
            <h1>Sobre el bloque</h1>
            <div className="line" />
            <h5 className="hectareas">
              <b>{numberWithCommas(areaData.area)}</b>
              {' '}
              ha
            </h5>
            <div className="iconos">
              <img
                className={areaData.categories.find((item) => item === 1) ? '' : 'nogo'}
                src={protegidas}
                alt="Áreas protegidas"
                title="Áreas protegidas"
              />
              <img
                className={areaData.categories.find((item) => item === 2) ? '' : 'nogo'}
                src={reservas}
                alt="Reservas forestales"
                title="Reservas forestales"
              />
              <img
                className={areaData.categories.find((item) => item === 3) ? '' : 'nogo'}
                src={estrategicos}
                alt="Ecosistemas estratégicos"
                title="Ecosistemas estratégicos"
              />
              <img
                className={areaData.categories.find((item) => item === 4) ? '' : 'nogo'}
                src={etnicas}
                alt="Territorios étnicos"
                title="Territorios étnicos"
              />
              <img
                className={areaData.categories.find((item) => item === 5) ? '' : 'nogo'}
                src={campesinas}
                alt="Zonas de reserva campesina"
                title="Zonas de reserva campesina"
              />
              <img
                className={areaData.categories.find((item) => item === 6) ? '' : 'nogo'}
                src={infraestructura}
                alt="Proyectos e infraestructura"
                title="Proyectos e infraestructura"
              />
              <img
                className={areaData.categories.find((item) => item === 7) ? '' : 'nogo'}
                src={ordenamiento}
                alt="Ordenamiento"
                title="Ordenamiento"
              />
            </div>
            <p>{areaData.description}</p>
            <h1>Biomas</h1>
            <div className="line" />
            <br />
            <div>
              {graphData1
                ? RenderGraph(
                  graphData1, '', '', 'SmallBarStackGraph',
                  'Zoonobioma', ['#5f8f2c', '#fff'], null, null,
                  '', '%',
                )
                : 'Cargando...'}
            </div>
            <br />
            {graphData1
              ? RenderGraph(
                graphData1, '', '', 'SmallBarStackGraph',
                'Zoonobioma', ['#5f8f2c', '#fff'], null, null,
                '', '%',
              )
              : 'Cargando...'}
          </div>
        </section>
      </Layout>
    );
  }
}

Summary.propTypes = {
  activeBlock: PropTypes.object,
};

Summary.defaultProps = {
  activeBlock: null,
};

export default Summary;
