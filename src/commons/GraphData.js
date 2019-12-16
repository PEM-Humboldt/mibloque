import ColumnChartData from './ColumnChartData';

class GraphData {
  static sankeyData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
  }

  static treeMapData(rawData, titles, areaTitle) {
    const totalArea = Number(rawData[28][0].indicator_value); // Level 1
    // const totalPercentage = rawData[17]; // Level 1
    const threatAreas = rawData[27]; // Level 2
    // const threatPercentages = rawData[16]; // Level 2
    const detailAreas = rawData[14]; // Level 3
    // const detailPercentages = rawData[15]; // Level 3
    const firstLevelLabel = 'Ecosistemas en lista roja dentro del área de interés';
    const areaLabel = `${areaTitle} - ${totalArea} ha`;
    console.log(totalArea, threatAreas, detailAreas);
    const dataTransformed = [[
      'Indicador',
      'Padre',
      'Area',
      'Color',
      // 'Porcentaje',
    ],
    [firstLevelLabel, null, totalArea, totalArea],
    [areaLabel, firstLevelLabel, totalArea, totalArea],
    ];
    titles.forEach((element) => {
      if (!element.name.includes('orcentaj')) {
        rawData[element.id].forEach((item) => {
          switch (item.id_indicator) {
            case element.id:
              threatAreas.forEach((threat) => {
                console.log(threat.value_description);
                if (element.name.includes(String(threat.value_description))) {
                  console.log(element.name);
                  dataTransformed.push([element.name, threat.value_description, Number(item.indicator_value), 12]);
                }
              });
              console.log(Object.values(dataTransformed).find((iter) => iter[0] === element.name), element.name);
              if (!Object.values(dataTransformed).find((iter) => iter[0] === element.name)) {
                dataTransformed.push([element.name, areaLabel, Number(item.indicator_value), 12]);
              }
              dataTransformed.push([item.value_description, element.name, Number(item.indicator_value), 12]);
              break;
            default:
              console.log(element.name);
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
    return dataTransformed;
  }


  static barChartData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
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
