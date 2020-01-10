// Pairs: [percentage, area]
const firstLevel = [17, 28];
const secondLevel = [16, 27];
const thirdLevel = [15, 14];

// Label to name the graph
const title = 'Ecosistemas en lista roja dentro del área de interés';
const noEndanger = 'Area sin amenaza identificada';

// Label to first area in the graph
const firstLevelLabel = 'Área con amenaza';

const redListColors = [
  { name: 'CR', value: 0, label: 'CR: Critically Endangered' }, // value: '#EF0928'
  { name: 'EN', value: 5, label: 'EN: Endangered' }, // value: '#FB6A2A'
  { name: 'VU', value: 10, label: 'VU: Vulnerable' }, // value: '#DF9735'
];

const getColor = (name) => redListColors.find((c) => name.includes(c.name)).value;

const TreeMapChartData = (rawData, activeArea) => {
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
      getColor(data.name),
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
};

export default TreeMapChartData;
