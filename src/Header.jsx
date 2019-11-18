/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Images to import
import backIcon from './assets/img/back.png';
import homeIcon from './assets/img/home.png';

const Header = ({
  activeBlock, activateHome, activateSummary, activateIndicators,
}) => (
  <header>
    <Link to="/">
      <h3>
        <b>mi</b>
        area
      </h3>
    </Link>
    {activeBlock && (
    <nav>
      <h2>
        {activeBlock.id}
      </h2>
      <h4>
        {activeBlock.sedimentaryBasin}
        <br />
        <b>
          {activeBlock.rating}
        </b>
      </h4>
      <div className="navbtns">
        {activateSummary
          && (
            <Link to="/summary">
              <img
                src={backIcon}
                alt="Visor de Mi Bloque"
              />
            </Link>
          )}
        {activateIndicators
          && (
            <Link to="/indicatorsDash">
              <img
                src={backIcon}
                alt="Volver a Indicadores"
              />
            </Link>
          )}
        {activateHome
          && (
            <Link to="/">
              <img
                src={homeIcon}
                alt="Volver al inicio"
              />
            </Link>
          )}
      </div>
    </nav>
    )}
  </header>
);

Header.propTypes = {
  activeBlock: PropTypes.object,
  activateHome: PropTypes.bool,
  activateIndicators: PropTypes.bool,
  activateSummary: PropTypes.bool,
};

Header.defaultProps = {
  activeBlock: {},
  activateHome: false,
  activateIndicators: false,
  activateSummary: false,
};

export default Header;
