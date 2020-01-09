import ColumnChartData from './ColumnChartData';
import {
  firstLevelLabel, firstLevel, secondLevel, thirdLevel, redListColors, title, noEndanger,
} from './TreeMapChartData';
import BarChartData from './BarChartData';
import SankeyChartData from './SankeyChartData';

class GraphData {
  static treeMapData(rawData, activeArea) {
    /* First level */
    const focusedArea = Number(rawData[firstLevel[1]][0].indicator_value);
    const dataTransformed = [
      [{ v: title, f: title }, null, focusedArea, -10],
      [{ v: noEndanger, f: noEndanger }, title, activeArea.area - focusedArea, 10],
      [{ v: firstLevelLabel, f: firstLevelLabel }, title, focusedArea, 0],
    ];
    /* Second level */
    const threatAreas = rawData[secondLevel[1]].map((item) => ({
      name: item.value_description,
      value: item.indicator_value,
    }));
    threatAreas.forEach((data) => {
      const id = redListColors.find((c) => c.name === data.name);
      dataTransformed.push([
        { v: data.name, f: id.label },
        firstLevelLabel,
        Number(data.value),
        Number(data.value),
      ]);
    });
    /* Third level */
    rawData[thirdLevel[1]].map((item) => {
      redListColors.forEach((color) => {
        if (item.value_description.includes(`${color.name}:`)) {
          dataTransformed.push(
            [
              { v: item.value_description, f: item.value_description },
              dataTransformed.find((element) => element[0].v.includes(color.name))[0],
              Number(item.indicator_value),
              color.value,
            ],
          );
        }
      });
      return true;
    });
    dataTransformed.unshift(['Indicador', 'Padre', 'Area', 'Color']);
    return { results: dataTransformed, groups: 1 };
  }

  static prepareData(code, rawData, order, activeArea) {
    switch (code) {
      case 1:
        return ColumnChartData.prepareData(rawData, order);
      case 2:
        return SankeyChartData.prepareData(rawData);
      case 3:
        return GraphData.treeMapData(rawData, activeArea);
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
