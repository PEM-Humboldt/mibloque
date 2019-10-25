/** eslint verified */

const areaData = {
  id: 'LLA 96', // text
  area: 101096, // number (hectareas)
  description: 'La información espacial que se muestra en la figura corresponde a la identificación de condiciones sociales, culturales, económicas y biofísicas, algunas de las cuales son determinantes ambientales del ordenamiento territorial y pueden generar restricciones al desarrollo de las actividades de exploración y explotación de hidrocarburos. Este análisis hace parte del procedimiento que la ANH ha establecido para la coordinación y concurrencia con las entidades territoriales y demás autoridades y entidades con presencia en el territorio, con el fin de posibilitar la definición y determinación de nuevas áreas de interés de hidrocarburos.',
  categories: [1, 7, 10], // TODO: Check categories with socioenvironmental record
};

const arrayData = [
  {
    id: 'LLA 96', // text
    area: 101096, // number (hectareas)
    description: 'La información espacial que se muestra en la figura corresponde a la identificación de condiciones sociales, culturales, económicas y biofísicas, algunas de las cuales son determinantes ambientales del ordenamiento territorial y pueden generar restricciones al desarrollo de las actividades de exploración y explotación de hidrocarburos. Este análisis hace parte del procedimiento que la ANH ha establecido para la coordinación y concurrencia con las entidades territoriales y demás autoridades y entidades con presencia en el territorio, con el fin de posibilitar la definición y determinación de nuevas áreas de interés de hidrocarburos.',
    categories: [1, 3, 7, 10],
  },
  {
    id: 'LLA 0970', // text
    area: 101096, // number (hectareas)
    description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    filters: [2, 3, 4, 5, 6, 7],
  },
];

const graphData1 = [
  { area: '357635.0000000', percentage: 1, type: 'Total' },
];

const graphData2 = [
  { area: '2186.0000000', type: 'X', percentage: 0.006112377144295161 },
];

const graphData3 = [
  { area: '137991.0000000', type: 'N', percentage: 0.38584310819690465 },
];

export {
  areaData, arrayData, graphData1, graphData2, graphData3,
};
