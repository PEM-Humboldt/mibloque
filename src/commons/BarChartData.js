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
        indicatorNamePositive = 'Superficie de áreas protegidas dentro del bloque';
        indicatorNameNegative = 'Superficie de áreas protegidas fuera del bloque';
        break;
      case 18:
        validIndicator = true;
        indicatorNamePositive = 'Área de reserva de ley 2da de 1959 dentro del bloque';
        indicatorNameNegative = 'Área de reserva de ley 2da de 1959 fuera del bloque';
        break;
      case 20:
        validIndicator = true;
        indicatorNamePositive = 'Área de territorios étnicos en el bloque';
        indicatorNameNegative = 'Área de territorios étnicos fuera del bloque';
        break;
      case 22:
        validIndicator = true;
        indicatorNamePositive = 'Área de ZRC dentro del bloque';
        indicatorNameNegative = 'Área de ZRC fuera del bloque';
        break;
      case 24:
        validIndicator = true;
        indicatorNamePositive = 'Area del ecosistema estrategicos dentro del bloque';
        indicatorNameNegative = 'Area del ecosistema estrategicos fuera del bloque';
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
    const row = [];
    const rowComputed = [];
    row.push(valueDescription);
    rawData.forEach((item) => {
      if (item.value_description === valueDescription) {
        row.push(parseFloat(item.indicator_value, 10));
      }
    });
    const desc = row[0];
    const value = row[1];
    const valueTransf = (((100 - row[2]) * row[1]) / row[2]);
    rowComputed.push(desc, value, -valueTransf);
    return rowComputed;
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
