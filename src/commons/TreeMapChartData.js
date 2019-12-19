// Pairs: [percentage, area]
const firstLevel = [17, 28];
const secondLevel = [16, 27];
const thirdLevel = [15, 14];

// Label to name the graph
const title = 'Ecosistemas en lista roja dentro del área de interés';

// Label to first area in the graph
const firstLevelLabel = 'Area total del bloque con algún grado de amenaza';

const redListColors = [
  { name: 'CR', value: 0 }, // value: '#EF0928'
  { name: 'EN', value: 5 }, // value: '#FB6A2A'
  { name: 'VU', value: 10 }, // value: '#DF9735'
];

export {
  firstLevelLabel, firstLevel, secondLevel, thirdLevel, redListColors, title,
};
