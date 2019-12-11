import ColumnChartData from './ColumnChartData';

class GraphData {
  static sankeyData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
  }

  static treeMapData(rawData, titles, graphDescription) {
    const graphTitle = graphDescription || 'Ecosistemas amenazados dentro del bloque';
    const dataTransformed = [[
      'Indicador',
      'Padre',
      'Area',
      'Color',
      // 'Porcentaje',
    ],
    [graphTitle, null, 0, -5]];
    titles.forEach((element) => {
      dataTransformed.push([element.name, graphTitle, 0, 12]);
      rawData[element.id].forEach((item) => {
        dataTransformed.push([
          (`${item.value_description || 'Sin clasificación'} - ${item.indicator_value}` || 'Sin clasificación'),
          element.name,
          Number(item.indicator_value) || 0,
          Number(item.indicator_value) || 0,
        ]);
      });
    });
    return dataTransformed;
  }


  static barChartData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
  }

  static prepareData(code, rawData, titles) {
    switch (code) {
      case 1:
        return ColumnChartData.prepareData(rawData);
      case 2:
        return GraphData.sankeyData(rawData);
      case 3:
        return GraphData.treeMapData(rawData, titles);
      case 4:
        return GraphData.barChartData(rawData);
      default:
        return GraphData.barChartData(rawData);
    }
  }

  /**
   * Return correct graph type based on card code
   *
   * @param {string} code Indicator card code to find graph type
   */
  static validGraphType = (code) => {
    let validGraphType = null;
    switch (code) {
      case 1:
        validGraphType = 'ColumnChart';
        break;
      case 2:
        validGraphType = 'Sankey';
        break;
      case 3:
        validGraphType = 'TreeMap';
        break;
      case 4:
        validGraphType = 'BarChart';
        break;
      default:
        validGraphType = 'BarChart';
        break;
    }
    return { validGraphType };
  };
}

export default GraphData;
