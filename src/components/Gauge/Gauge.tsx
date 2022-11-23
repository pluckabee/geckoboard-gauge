import React, { useMemo, useState } from "react";
import { GaugeData } from "../../types";
import { Money, Currencies } from "ts-money";
import './Gauge.css'
import { getGaugeAngle } from "../../helpers/helpers";

const colors = ["#a8e6cf ", "#dcedc1", "#ff8b94", "#ffd3b6", "#ffaaa5"];

export const Gauge = (props: GaugeData) => {
  const { max, min, value: rawValue, format, unit } = props;

  const [gaugeValue, setGaugeValue] = useState(rawValue);

  const gaugeIndicatorRotation = useMemo(
    () => getGaugeAngle({ max, min, value: gaugeValue }),
    [max, min, gaugeValue]
  );

  const gaugeWidth = 300;
  const gaugeRadius = gaugeWidth / 2;
  const gaugeIndicatorExtrusion = 15
  const gaugeContainerHeight = gaugeRadius + gaugeIndicatorExtrusion;

  const gaugeIndicatorX =
    gaugeRadius -
    Math.cos((gaugeIndicatorRotation * Math.PI) / 180) * gaugeRadius;

  const gaugeIndicatorY =
    gaugeContainerHeight -
    Math.sin((gaugeIndicatorRotation * Math.PI) / 180) * gaugeRadius;

  const formatValue = (value: number) => {
    if (format && format === "currency" && unit) {
      const currency = Currencies[unit];
      return `${currency.symbol}${new Money(value * 100, currency)}`;
    } else {
      return value;
    }
  };
  return (
    <>
      <div>
        <span className='indicator-text'>{formatValue(gaugeValue)}</span>
      </div>
      <span className='indicator-text'>{formatValue(min)}</span>
      <svg width={`${gaugeWidth}px`} height={`${gaugeContainerHeight}px`}>
        <path
          id="gauge-body"
          d={`M0,${gaugeContainerHeight} a${gaugeRadius},${gaugeRadius} 0 0,1 ${gaugeWidth},0 z`}
          fill={colors[1]}
        />
        <path
          id="gauge-fill-indicator"
          d={`M ${gaugeRadius} ${gaugeContainerHeight} L 0 ${gaugeContainerHeight} A${gaugeRadius}, ${gaugeRadius} 0 0 1 ${gaugeIndicatorX} ${gaugeIndicatorY}`}
          fill={colors[3]}
        />
        <ellipse
          id="gauge-dial-base"
          cx={gaugeRadius}
          cy={gaugeContainerHeight}
          rx="4"
          ry="4"
          fill={colors[2]}
        />
        <line
          id="gauge-dial"
          x1={gaugeRadius}
          y1={gaugeContainerHeight}
          x2={-gaugeIndicatorExtrusion}
          y2={gaugeContainerHeight}
          stroke={colors[2]}
          strokeWidth="2"
          transform-origin={`${gaugeRadius}px ${gaugeContainerHeight}px`}
          transform={`rotate(${gaugeIndicatorRotation})`}
        />
      </svg>
      <span className='indicator-text'>{formatValue(max)}</span>
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
