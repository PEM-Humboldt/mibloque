/** eslint verified */
import React from 'react';
import Layout from './Layout';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moduleName: '',
      activeBlock: '',
    };
  }

  render() {
    const { activeBlock, moduleName } = this.state;
    return (
      <Layout
        moduleName={moduleName}
      >
        {activeBlock}
        <section className="sectionhome">
          <div className="mancha"></div>
          <div className="columna">
            <h1>Cartografía e indicadores de prefactibilidad y monitoreo</h1>
            <div className="line"></div>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.<br /><br />
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
          </div>
          <form action="" key="45">
            <p>Busca tu bloque con su <b>identificador único.</b><br />El buscador muestra opciones desde tres caracteres de coincidencia.</p>
            <input id="" type="search" placeholder="Identificador del bloque" />
            <div className="formbtns">
              <a href="/" className="sidebtn">cuencas sedimentarias</a>
              <input type="submit" key="1-o" value="ir a mi bloque"></input>
            </div>
          </form>
        </section>
        {moduleName}
      </Layout>
    );
  }
}

export default Home;
