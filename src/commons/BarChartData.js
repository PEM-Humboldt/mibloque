class BarChartData {
  /**
   * Validate behavior of graph according to id indicator
   *
   * @param {Integer} idIndicator id indicator to be validated
   */
  static validateIndicator(idIndicator) {
    let validIndicator = false;
    let indicatorNamePositive = 'No definido';
    let indicatorNameNegative = 'No definido';

    switch (idIndicator) {
      case 12:
        validIndicator = true;
        indicatorNamePositive = 'Superficie del área protegida dentro del bloque';
        indicatorNameNegative = 'Superficie del área protegida fuera del bloque';
        break;
      case 18:
        validIndicator = true;
        indicatorNamePositive = 'Superficie del área de reserva de ley 2da de 1959 dentro del bloque';
        indicatorNameNegative = 'Superficie del área de reserva de ley 2da de 1959 fuera del bloque';
        break;
      case 20:
        validIndicator = true;
        indicatorNamePositive = 'Superficie del área del territorio étnico dentro del bloque';
        indicatorNameNegative = 'Superficie del área del territorio étnico fuera del bloque';
        break;
      case 22:
        validIndicator = true;
        indicatorNamePositive = 'Superficie del área de la ZRC dentro del bloque';
        indicatorNameNegative = 'Superficie del área de la ZRC fuera del bloque';
        break;
      case 24:
        validIndicator = true;
        indicatorNamePositive = 'Superficie del área del ecosistema estrategico dentro del bloque';
        indicatorNameNegative = 'Superficie del área del ecosistema estrategico fuera del bloque';
        break;
      default:
        validIndicator = false;
        break;
    }

    return { validIndicator, indicatorNamePositive, indicatorNameNegative };
  }

  /**
   * Construct an array to be inserted in the transformed graph data
   *
   * @param {Array} rawData
   * @param {String} valueDescription
   */
  static processOneRow(rawData, valueDescription) {
    const row = {
      description: valueDescription,
      value: 0,
      perc: 0,
    };
    const rowComputed = [];
    rawData.forEach((item) => {
      if (item.value_description === valueDescription) {
        if (this.validateValuePercentage(item.id_indicator)) {
          row.value = parseFloat(item.indicator_value, 10);
        } else {
          row.perc = parseFloat(item.indicator_value, 10);
        }
      }
    });
    const desc = row.description;
    const { value, perc } = row;
    const valueTransf = (((100 - perc) * value) / perc);
    rowComputed.push(desc, value, -valueTransf);
    return rowComputed;
  }

  /**
   * Validate indicator value vs percentage
   *
   * @param {Integer} idIndicator id indicator to be validated
   */
  static validateValuePercentage(idIndicator) {
    let isValue = false;
    switch (idIndicator) {
      case 12:
        isValue = true;
        break;
      case 18:
        isValue = true;
        break;
      case 20:
        isValue = true;
        break;
      case 22:
        isValue = true;
        break;
      case 24:
        isValue = true;
        break;
      case 13:
        isValue = false;
        break;
      case 19:
        isValue = false;
        break;
      case 21:
        isValue = false;
        break;
      case 23:
        isValue = false;
        break;
      case 25:
        isValue = false;
        break;
      default:
        isValue = false;
        break;
    }

    return isValue;
  }

  /**
   * Transform data to a format accepted by google charts to construct a bar chart graph
   *
   * @param {Object} rawData object data to be transformed
   */
  static prepareData(rawData) {
    const results = [];
    if (Array.isArray(rawData)) {
      rawData.forEach((item) => {
        const {
          indicatorNamePositive,
          validIndicator,
          indicatorNameNegative,
        } = this.validateIndicator(item.id_indicator);
        if (validIndicator) {
          const row = this.processOneRow(rawData, item.value_description);
          results.push(['', indicatorNamePositive, indicatorNameNegative]);
          results.push(row);
        }
      });
    }
    return { results, groups: 1 };
  }
}

export default BarChartData;
