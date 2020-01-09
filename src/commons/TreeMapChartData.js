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

export {
  firstLevelLabel, firstLevel, secondLevel, thirdLevel, redListColors, title, noEndanger,
};
