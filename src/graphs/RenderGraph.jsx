/** eslint verified */
import React from 'react';
import { ParentSize } from '@vx/responsive';
import GraphLoader from './GraphLoader';

const RenderGraph = (
  /**
   * Set the Parent size to render a graph
   *
   * @param {any} data Graph data, it can be null (data hasn't loaded), false (data not available)
   *  or an Object with the data.
   * @param {string} labelX axis X label
   * @param {string} labelY axis Y label
   * @param {string} graph graph type
   * @param {string} title graph title
   * @param {string} subtitle graph title
   * @param {array} colors color palette to sort elements inside the graph
   * @param {string} units to show in axis X
   */
  data, labelX, labelY, graph, title, subtitle, colors, units,
) => {
  // While data is being retrieved
  let errorMessage = null;
  // (data === null) while waiting for response
  if (data === null) errorMessage = 'Cargando información...';
  // (!data) there is not data available
  else if (!data) errorMessage = `Información${title ? ` de ${title}` : ''} no disponible`;
  // (data.length <= 0) if data in not object
  else if (data.length <= 0) errorMessage = 'Información no disponible';
  if (errorMessage) {
    // TODO: ask Cesar to make this message work with his own style
    return (
      <div className="errorData">
        {errorMessage}
      </div>
    );
  }
  return (
    <ParentSize>
      {(parent) => (
        parent.width ? (
          <GraphLoader
            width={parent.width}
            height={parent.height}
            graphType={graph}
            data={data}
            labelX={labelX}
            labelY={labelY}
            title={title}
            colors={colors}
            units={units}
            subtitle={subtitle}
          />
        ) : ('')
      )}
    </ParentSize>
  );
};

export default RenderGraph;
