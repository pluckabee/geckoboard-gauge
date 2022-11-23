import React, { useMemo, useState } from "react";
import { GaugeData } from "../../types/GaugeDataTypes";
import "./Gauge.css";
import { getGaugeAngle, formatGaugeDataValue } from "../../helpers/helpers";

export const Gauge = (props: GaugeData) => {
  const { max, min, value: rawValue } = props;

  const [gaugeValue, setGaugeValue] = useState(rawValue);

  const gaugeNeedleRotation = useMemo(
    () => getGaugeAngle({ max, min, value: gaugeValue }),
    [max, min, gaugeValue]
  );

  const gaugeWidth = 300;
  const gaugeNeedleExtrusion = 15;

  const gaugeRadius = gaugeWidth / 2;
  const gaugeContainerHeight = gaugeRadius + gaugeNeedleExtrusion;

  const gaugeNeedleX = useMemo(() => {
    return (
      gaugeRadius -
      Math.cos((gaugeNeedleRotation * Math.PI) / 180) * gaugeRadius
    );
  }, [gaugeRadius, gaugeNeedleRotation]);

  const gaugeNeedleY = useMemo(() => {
    return (
      gaugeContainerHeight -
      Math.sin((gaugeNeedleRotation * Math.PI) / 180) * gaugeRadius
    );
  }, [gaugeContainerHeight, gaugeRadius, gaugeNeedleRotation]);

  return (
    <>
      <div
        role="meter"
        id="gauge"
        aria-valuenow={gaugeValue}
        aria-valuemin={min}
        aria-valuemax={max}
      >
        <span className="indicator-text">
          {formatGaugeDataValue(gaugeValue, props)}
        </span>
      </div>
      <span className="indicator-text">{formatGaugeDataValue(min, props)}</span>
      <svg width={`${gaugeWidth}px`} height={`${gaugeContainerHeight}px`}>
        <path
          id="gauge-body"
          className="gauge-body"
          d={`M0,${gaugeContainerHeight} a${gaugeRadius},${gaugeRadius} 0 0,1 ${gaugeWidth},0 z`}
        />
        <path
          id="gauge-fill-indicator"
          className="gauge-fill-indicator"
          d={`M ${gaugeRadius} ${gaugeContainerHeight} L 0 ${gaugeContainerHeight} A${gaugeRadius}, ${gaugeRadius} 0 0 1 ${gaugeNeedleX} ${gaugeNeedleY}`}
        />
        <g>
          <ellipse
            id="gauge-dial-base"
            className="gauge-dial"
            cx={gaugeRadius}
            cy={gaugeContainerHeight}
            rx="4"
            ry="4"
          />
          <line
            id="gauge-dial"
            className="gauge-dial"
            x1={gaugeRadius}
            y1={gaugeContainerHeight}
            x2={-gaugeNeedleExtrusion}
            y2={gaugeContainerHeight}
            strokeWidth="2"
            transform-origin={`${gaugeRadius}px ${gaugeContainerHeight}px`}
            transform={`rotate(${gaugeNeedleRotation})`}
          />
        </g>
      </svg>
      <span className="indicator-text">{formatGaugeDataValue(max, props)}</span>
      <div>
        <input
          type="number"
          id="gauge"
          name="gauge"
          min={props.min}
          max={props.max}
          value={gaugeValue}
          onChange={(e) => {
            setGaugeValue(Number(e.target.value));
          }}
        />
      </div>
    </>
  );
};
