/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Images to import
import backIcon from './assets/img/back.png';
import homeIcon from './assets/img/home.png';

const Header = ({
  activeBlock, activateHome, activateSummary, activateIndicators, moduleName, sedimentaryBasin, blockType,
}) => (
  <header>
    <h3>
      <b>mi</b>
      bloque
    </h3>
    {moduleName && (<nav>
      <h2>
        {activeBlock} LLA 0970
      </h2>
      <h4>
        {sedimentaryBasin} CS: Llanos Orientales
        <br />
        <b>
          {blockType} EXPLOTACIÓN
        </b>        
      </h4>
      <div className='navbtns'>
          {activateSummary && (<Link to="/summary">
            <img src={backIcon} alt="Visor de Mi Bloque" />
            </Link>)}
          {activateIndicators && (<Link to="/indicatorsDash"><img src={backIcon} alt="Volver a Indicadores" /></Link>)}
          {activateHome && (<Link to="/"><img src={homeIcon} alt="Volver al inicio" /></Link>)}
        </div>
    </nav>)}
  </header>
);

Header.propTypes = {
  activeBlock: PropTypes.string,
  blockType: PropTypes.string,
  moduleName: PropTypes.string,
  sedimentaryBasin: PropTypes.string,
};

Header.defaultProps = {
  activeBlock: '',
  activateHome: false,
  activateIndicators: false,
  activateSummary: false,
};

export default Header;
