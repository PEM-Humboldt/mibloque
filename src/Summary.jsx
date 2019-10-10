/** eslint verified */
import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Layout from './Layout';

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
      </Layout>
    );
  }
}

export default Summary;
