/** eslint verified */
import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import MapViewer from './commons/MapViewer';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom';
import Layout from './Layout';

// Images to import
import protegidas from './assets/img/protegidas.png';
import reservas from './assets/img/reservas.png';
import estrategicos from './assets/img/estrategicos.png';
import etnicas from './assets/img/etnicas.png';
import campesinas from './assets/img/campesinas.png';
import infraestructura from './assets/img/infraestructura.png';
import ordenamiento from './assets/img/ordenamiento.png';

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: 'summary',
      activeBlock: null,
      connError: false,
    };
  }

  componentDidMount() {
    const { activeBlock } = this.props;
    this.setState((prevState) => {
        const newState = { ...prevState };
        newState.activeBlock = { activeBlock };
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
  handleCloseModal = state => () => {
    this.setState({ [state]: false });
  };

  render() {
    const { moduleName, connError } = this.state;
    return (
      <Layout
        moduleName={moduleName}
        activateHome
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
                <div className="internheader"></div>
                <div className="map">
                    <MapViewer /> 
                </div>
                <div className="blockdata">
                  <Link to="/indicatorsDash">
                    <button className="generalbtn absright">indicadores</button>
                  </Link>
                    <h1>Sobre el bloque</h1>
                    <div className="line"></div>
                    <h5 className="hectareas"><b>101,096</b> ha</h5>
                    <div className="iconos">
                        <img className="nogo" src={protegidas} alt="Áreas protegidas" title="Áreas protegidas"></img>
                        <img src={reservas} alt="Reservas forestales" title="Reservas forestales"></img>
                        <img src={estrategicos} alt="Ecosistemas estratégicos" title="Ecosistemas estratégicos"></img>
                        <img src={etnicas} alt="Territorios étnicos" title="Territorios étnicos"></img>
                        <img src={campesinas} alt="Zonas de reserva campesina" title="Zonas de reserva campesina"></img>
                        <img src={infraestructura} alt="Proyectos e infraestructura" title="Proyectos e infraestructura"></img>
                        <img src={ordenamiento} alt="Ordenamiento" title="Ordenamiento"></img>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.<br />
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                    <h1>Biomas</h1>
                    <div className="line"></div>
                </div>
             </section>
      </Layout>
    );
  }
}

export default Summary;
