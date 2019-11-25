/** eslint verified */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Layout from './Layout';
import RestAPI from './commons/RestAPI';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedElement: null,
      toggledBar: true,
      data: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await RestAPI.requestANHAreas();
      const array = response.map((item) => item.name);
      this.setState({
        data: array.map((element) => ({
          name: element,
          label: element,
          id: element,
          rating: 'EXPLOTACIÓN',
          sedimentaryBasin: 'CS: Llanos Orientales',
        })),
      });
    } catch (error) {
      // TODO: Set state in a error (handling error)

    }
  }

  handleChange = (selectedElement) => {
    this.setState({ selectedElement });
  };

  showSideBar = () => {
    const { toggledBar } = this.state;
    this.setState({ toggledBar: !toggledBar });
  }

  hideSideBar = () => {
    const { toggledBar } = this.state;
    this.setState({ toggledBar: !toggledBar });
  }

  render() {
    const { selectedElement, toggledBar, data } = this.state;
    const { setActiveBlock } = this.props;
    const isToggled = toggledBar;
    return (
      <Layout
        activeBlock={null}
      >
        <section className="sectionhome">
          <div className="mancha" />
          <div className="columna">
            <h1>Cartografía e indicadores de prefactibilidad y monitoreo</h1>
            <div className="line" />
            <p>
              {/** eslint-disable-next-line max-len */ }
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at.
              <br />
              {/** eslint-disable-next-line max-len */ }
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </p>
          </div>
          <form action="" key="45">
            <p>
              Busca tu área de interés con su
              <b> identificador único. </b>
              El buscador muestra opciones desde tres caracteres de coincidencia.
            </p>
            <Select
              className="home_selector"
              value={selectedElement}
              onChange={this.handleChange}
              options={data}
              placeholder="Identificador de área de interés"
              isSearchable="true"
              isClearable="true"
            />
            <div className="formbtns">
              <button
                id="sideBarOpen"
                type="button"
                className={isToggled ? 'sidebtn' : 'sidebtnact'}
                onClick={isToggled ? this.hideSideBar : this.showSideBar}
              >
                cuencas sedimentarias
              </button>
              <Link to="/summary">
                <input
                  type="submit"
                  key="1-o"
                  value="ir a mi área"
                  onClick={() => setActiveBlock(selectedElement)}
                />
              </Link>
            </div>
          </form>
        </section>
        <div className={`sideguide ${isToggled ? 'vis' : ''}`}>
          <button
            id="sideBarClose"
            type="button"
            className="close"
            onClick={this.hideSideBar}
          >
            X
          </button>
          <h1>
            Abreviaturas de cuencas sedimentarias
          </h1>
          <div className="line" />
          <div className="col1">
            AMA
            <br />
            ANP
            <br />
            CAG PUT
            <br />
            CAT
            <br />
            CAU PAT
            <br />
            CES RAN
            <br />
            CHO
            <br />
            COR
            <br />
            GUA
            <br />
            LLA
            <br />
            SIN SJ
            <br />
            TUM
            <br />
            URA
            <br />
            VIM
            <br />
            VMM
            <br />
            VSM
            <br />
            VAU AMAZ
          </div>
          <div className="col2">
            AMAGA
            <br />
            AREA NO PROSPECTIVA
            <br />
            CAGUAN-PUTUMAYO
            <br />
            CATATUMBO
            <br />
            CAUCA PATIA
            <br />
            CESAR RANCHERIA
            <br />
            CHOCO
            <br />
            CORDILLERA ORIENTAL
            <br />
            GUAJIRA
            <br />
            LLANOS ORIENTALES
            <br />
            SINU-SAN JACINTO
            <br />
            TUMACO
            <br />
            URABA
            <br />
            VALLE INFERIOR DEL MAGDALENA
            <br />
            VALLE MEDIO DEL MAGDALENA
            <br />
            VALLE SUPERIOR DEL MAGDALENA
            <br />
            VAUPES-AMAZONAS
          </div>
        </div>
      </Layout>
    );
  }
}

Home.propTypes = {
  setActiveBlock: PropTypes.func,
};

Home.defaultProps = {
  setActiveBlock: () => {},
};

export default Home;
