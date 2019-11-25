/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

import Layout from './Layout';
import MapViewer from './commons/MapViewer';
import RenderGraph from './graphs/RenderGraph';

// Data mockups
import { graphData1 } from './assets/mockups/summaryData';

class Indicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeArea: {},
    };
  }

  componentDidMount() {
    const { activeArea } = this.props;
    this.setState({ activeArea });
  }

  render() {
    const { activeArea } = this.state;
    const { layers } = this.props;
    return (
      <Layout
        activeArea={activeArea}
        activateHome
        activateIndicators
      >
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
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.
            </p>
            <div className="line" />
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
