import ColumnChartData from './ColumnChartData';
<<<<<<< HEAD
import {
  firstLevelLabel, firstLevel, secondLevel, thirdLevel, redListColors,
} from './TreeMapChartData';
=======
import BarChartData from './BarChartData';
>>>>>>> 72c6856d5df28acaa1fc904f9b64fd381aba1903

class GraphData {
  static sankeyData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return { results: rawData, groups: 1 };
  }

  static treeMapData(rawData, titles, areaTitle) {
    /* First level */
    const totalArea = Number(rawData[firstLevel[1]][0].indicator_value);
    const areaLabel = `${areaTitle} - ${totalArea} ha`;
    const dataTransformed = [[
      'Indicador',
      'Padre',
      'Area',
      'Color',
      // 'Porcentaje',
    ],
    // Set level 1 data in dataTransformed
    [firstLevelLabel, null, totalArea, -10],
    [areaLabel, firstLevelLabel, totalArea, 5],
    ];
    /* Second level */
    const threatAreas = rawData[secondLevel[1]].map((item) => ({
      name: item.value_description,
      value: item.indicator_value,
    }));
    threatAreas.forEach((data) => {
      dataTransformed.push([data.name, areaLabel, Number(data.value), Number(data.value)]);
    });
    /* Third level */
    rawData[thirdLevel[1]].map((item) => {
      redListColors.forEach((color) => {
        if (item.value_description.includes(`${color.name}:`)) {
          dataTransformed.push(
            [
              item.value_description,
              color.name,
              Number(item.indicator_value),
              color.value,
            ],
          );
        }
      });
      return true;
    });
    return { results: dataTransformed, groups: 1 };
  }


  static barChartData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return { results: rawData, groups: 1 };
  }

  static prepareData(code, rawData, order, titles, name) {
    switch (code) {
      case 1:
        return ColumnChartData.prepareData(rawData, order);
      case 2:
        return GraphData.sankeyData(rawData);
      case 3:
        return GraphData.treeMapData(rawData, titles, name);
      case 4:
        return BarChartData.prepareData(rawData);
      default:
        return { results: rawData, groups: 1 };
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
