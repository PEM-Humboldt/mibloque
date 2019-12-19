import ColumnChartData from './ColumnChartData';
import {
  firstLevelLabel, firstLevel, secondLevel, thirdLevel,
} from './TreeMapChartData';

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
    [firstLevelLabel, null, totalArea, 5],
    [areaLabel, firstLevelLabel, totalArea, 5],
    ];
    /* Second level */
    const threatAreas = rawData[27].map((item) => ({
      name: item.value_description,
      value: item.indicator_value,
    }));
    threatAreas.forEach((data) => {
      console.log(data);
      console.log(data.value);
      dataTransformed.push([data.name, areaLabel, Number(data.value), Number(data.value)]);
    });
    console.log(threatAreas[0]);
    // const threatPercentages = rawData[16]; // Level 2
    const detailAreas = rawData[14]; // Level 3
    // const detailPercentages = rawData[15]; // Level 3
    console.log(totalArea, threatAreas, detailAreas);
    
    titles.forEach((element) => {
      if (!element.name.includes('orcentaj')) {
        // threatAreas.forEach((threat) => (console.log(threat)));
        rawData[element.id].forEach((item) => {
          // if (!Object.values(dataTransformed).find((iter) => iter[0] === element.name)) {
          //   // console.log('Este dato', element.name, item);
          //   dataTransformed.push([element.name, areaLabel, Number(item.indicator_value), 12]);
          // }
          switch (item.id_indicator) {
            case element.id:
              threatAreas.forEach((threat) => {
                // console.log(threat.value_description);
                // if (element.name.includes(String(threat.value_description))) {
                //   // console.log(element.name);
                //   dataTransformed.push([element.name, threat.value_description, Number(item.indicator_value), 12]);
                // }
              });
              // console.log(Object.values(dataTransformed).find((iter) => iter[0] === element.name), element.name);
              // dataTransformed.push([item.value_description, element.name, Number(item.indicator_value), 12]);
              break;
            default:
              // console.log(element.name);
              dataTransformed.push([
                (`${item.value_description || 'Sin clasificación'} - ${item.indicator_value}` || 'Sin clasificación'),
                element.name,
                Number(item.indicator_value) || 0,
                Number(item.indicator_value) || 0,
              ]);
              break;
          }
        });
      }
    });
    console.log(dataTransformed);
    return { results: dataTransformed, groups: 1 };;
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
        return GraphData.barChartData(rawData);
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
