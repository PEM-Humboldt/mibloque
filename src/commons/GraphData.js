import ColumnChartData from './ColumnChartData';
import {
  firstLevelLabel, firstLevel, secondLevel, thirdLevel, redListColors, title,
} from './TreeMapChartData';
import BarChartData from './BarChartData';
import SankeyChartData from './SankeyChartData';

class GraphData {
  static treeMapData(rawData) {
    /* First level */
    const totalArea = Number(rawData[firstLevel[1]][0].indicator_value);
    const areaLabel = `${firstLevelLabel} - ${totalArea} ha`;
    const dataTransformed = [[
      'Indicador',
      'Padre',
      'Area',
      'Color',
      // 'Porcentaje',
    ],
    // Set level 1 data in dataTransformed
    [title, null, totalArea, -10],
    [areaLabel, title, totalArea, 5],
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

<<<<<<< HEAD

  static barChartData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return { results: rawData, groups: 1 };
  }

=======
>>>>>>> 4ff2662b27a756f96ab12983ae1981bc2b8683ec
  static prepareData(code, rawData, order) {
    switch (code) {
      case 1:
        return ColumnChartData.prepareData(rawData, order);
      case 2:
        return SankeyChartData.prepareData(rawData);
      case 3:
        return GraphData.treeMapData(rawData);
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
