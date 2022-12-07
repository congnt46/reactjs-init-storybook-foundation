import React from 'react';
import PropTypes from 'prop-types';

import { PieLegendPropType } from 'types/prop-types';
import LegendGroup from '../Shared/LegendGroup';
import Title from 'components/Foundation/Title';

// To make total sum percentage equal to 100%
function getPiesPercentage(data) {
  let total = 1;
  return data.map(({ payload: { percent }}, index, self) => {
    let finalPercent = total;
    if (index !== self.length - 1) {
      finalPercent = Math.round(percent * 1000) / 1000; // To avoid problems with floating point
      total -= finalPercent;
    }
    return `${Math.round(finalPercent * 1000) / 10}%`;
  });
}

function PieLegend({ label, payload, showPercent, subCharts }) {
  const piesPercentage = getPiesPercentage(payload);

  const legendList = payload.map(({ value: legendLabel, color, payload: { value }}, index) => {
    const finalValue = showPercent ? piesPercentage[index] : value;
    return (
      <LegendGroup
        key={legendLabel}
        className="pie-legend__group"
        label={legendLabel}
        color={color}
        value={finalValue}
      />
    );
  });

  function renderTwoColumnLegend() {
    const halfIndex = Math.ceil(payload.length / 2);

    return (
      <>
        <ul className="pie-legend__list">
          {legendList.slice(0, halfIndex)}
        </ul>
        <ul className="pie-legend__list">
          {legendList.slice(halfIndex, payload.length)}
        </ul>
      </>
    );
  }

  function renderOneColumnLegend() {
    return (
      <ul className="pie-legend__list">
        {legendList}
      </ul>
    );
  }

  const legendContent = payload.length > 3 ? renderTwoColumnLegend() : renderOneColumnLegend();

  return (
    <div className="pie-legend">
      <div className="pie-legend__content-wrapper">
        {label && <Title className="pie-legend__label" tag="h3" size={18}>{label}</Title>}
        <div className="pie-legend__content">
          {legendContent}
        </div>
      </div>
      {subCharts?.length && (
        <div className="pie-legend__sub-chart-list">{
          subCharts.map((chart) => (
            <div className="pie-legend__sub-chart-item" key={chart.label}>
              <div className="pie-legend__sub-chart-container">
                {chart.content}
              </div>
              <Title className="pie-legend__sub-chart-label" tag="h4" size={15}>{chart.label}</Title>
            </div>
          ))
        }
        </div>
      )}
    </div>
  );
}

PieLegend.propTypes = {
  ...PieLegendPropType,
  showPercent: PieLegendPropType.showPercent,
  payload: PropTypes.arrayOf(PropTypes.object),
};

PieLegend.defaultProps = {
  showPercent: true,
  payload: [],
};

export default PieLegend;
