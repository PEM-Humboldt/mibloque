import ColumnChartData from './ColumnChartData';

class GraphData {
  static sankeyData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
  }

  static treeMapData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
  }

  static barChartData(rawData) {
    // TODO: If requires a lot of functions please create a new class.
    return rawData;
  }

  static prepareData(code, rawData) {
    switch (code) {
      case 1:
        return ColumnChartData.prepareData(rawData);
      case 2:
        return GraphData.sankeyData(rawData);
      case 3:
        return GraphData.treeMapData(rawData);
      case 4:
        return GraphData.barChartData(rawData);
      default:
        return GraphData.barChartData(rawData);
    }
  }
}

export default GraphData;
