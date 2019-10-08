/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import logoanh from './assets/img/Logo_ANH.png';
import logohumboldt from './assets/img/Logo_HUM.png';

const Footer = (
  {
    showLogos,
  },
) => (
  <footer>
    <div class="logos">
			<a href="http://www.anh.gov.co/"
        target="_blank"
        rel="noopener noreferrer">
        <img
          src={logoanh}
          alt="Agencia Nacional de Hidrocarburos"
        />
      </a>
			<a href="http://www.humboldt.org.co/"
        target="_blank"
        rel="noopener noreferrer">
        <img
          src={logohumboldt}
			    alt="Instituto Alexander von Humboldt"
        />
      </a>
		</div>
    <div class="mapasitio">
			<a href="mailto:svargas@humboldt.org.co">
        <h2>Contacto</h2>
      </a>
      <a href="https://geovisor.anh.gov.co/tierras/"
        target="_blank"
        rel="noopener noreferrer">
        <h2>Mapa de Tierras</h2>
      </a>
		</div>
  </footer>
);

Footer.propTypes = {
  showLogos: PropTypes.bool,
};

Footer.defaultProps = {
  showLogos: false,
};

export default Footer;
