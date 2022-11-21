import React, { useMemo, useState } from "react";
import { GaugeData } from "../../types";
import { Money, Currencies } from "ts-money";

import {
  normaliseGaugeRangeData,
  getPercentage,
  getAngleFromPercentage,
} from "../../helpers/helpers";

const colors = ["#a8e6cf ", "#dcedc1", "#ff8b94", "#ffd3b6",  "#ffaaa5"];

export const Gauge = (props: GaugeData) => {
  const { max, min, value: rawValue, format, unit } = props;

  const [value, setGaugeValue] = useState(rawValue);

  const normalisedValues = useMemo(
    () => normaliseGaugeRangeData({ max, min, value: value }),
    [min, max, value]
  );

  const valuePer = getPercentage(normalisedValues.value, normalisedValues.max);
  const gaugeIndicatorRotation = getAngleFromPercentage(valuePer);

  const gaugeWidth = 300;
  const gaugeContainerHeight = 188;
  const gaugeRadius = gaugeWidth / 2;

  const gaugeIndicatorX =
    gaugeRadius -
    Math.cos((gaugeIndicatorRotation * Math.PI) / 180) * gaugeRadius;

  const gaugeIndicatorY =
    gaugeContainerHeight -
    Math.sin((gaugeIndicatorRotation * Math.PI) / 180) * gaugeRadius;

  const formatValue = (toFormat: number) => {
    if (format && format === "currency" && unit) {
      const currency = Currencies[unit];
      return `${currency.symbol}${new Money(toFormat * 100, currency)}`;
    } else {
      return toFormat;
    }
  };
  return (
    <>
      <div>
        <span>{formatValue(value)}</span>
      </div>
      <span>{formatValue(min)}</span>
      <svg width="300px" height="188px">
        <path
          id="gauge-body"
          d="M0,188 a150,150 0 0,1 300,0 z"
          fill={colors[1]}
          stroke={colors[0]}
          strokeWidth="2"
        />

        <path
          id="gauge-fill-indicator"
          d={`M 150 188 L 0 188 A150, 150 0 0 1 ${gaugeIndicatorX} ${gaugeIndicatorY}`}
          stroke={colors[4]}
          strokeWidth="2"
          fill={colors[3]}
        />
        <ellipse
          id="gauge-dial-base"
          cx="150"
          cy="188"
          rx="4"
          ry="4"
          fill={colors[2]}
        />
        <line
          id="gauge-dial"
          x1="150"
          y1="188"
          x2="-15"
          y2="188"
          stroke={colors[2]}
          strokeWidth="2"
          transform-origin="150px 188px"
          transform={`rotate(${gaugeIndicatorRotation})`}
        />
      </svg>
      <span>{formatValue(max)}</span>
      <div>
        <input
          type="number"
          id="gauge"
          name="gauge"
          min={props.min}
          max={props.max}
          value={value}
          onChange={(e) => {
            setGaugeValue(Number(e.target.value));
          }}
        />
      </div>
    </>
  );
};
