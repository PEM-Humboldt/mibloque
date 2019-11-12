/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout';
import MapViewer from './commons/MapViewer';

class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBlock: {},
    };
  }

  componentDidMount() {
    const { activeBlock } = this.props;
    this.setState({ activeBlock });
  }

  render() {
    const { activeBlock } = this.state;
    const { layers } = this.props;
    return (
      <Layout
        activeBlock={activeBlock}
        activateHome
        activateIndicators
      >
        <section className="sectionintern">
          <div className="internheader" />
          <div className="filtros">
            <div>
              Hola
            </div>
            {layers
              && (
              <div className="smallMap">
                <MapViewer
                  layers={layers}
                  controls={false}
                />
              </div>
              )}
            <div className="blockdata">
              <h1>¿Cómo leer esta cifra en el área?</h1>
              <div className="line" />
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.
                <br />
                <br />
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.
              </p>
              <div className="line" />
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

Indicator.propTypes = {
  activeBlock: PropTypes.object,
  layers: PropTypes.object,
};

Indicator.defaultProps = {
  activeBlock: {},
  layers: {},
};

export default Indicator;
