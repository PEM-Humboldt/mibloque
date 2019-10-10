/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
  activeBlock, moduleName, sedimentaryBasin, blockType,
}) => (
  <header>
    <h3>
      <b>mi</b>
      bloque
    </h3>
    {moduleName && (<nav>
      <h2>
        {activeBlock}
      </h2>
      <h4>
        {sedimentaryBasin}
        <b>
          {blockType}
        </b>
      </h4>
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
};

export default Header;
