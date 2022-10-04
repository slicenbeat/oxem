import React, { useEffect, useState } from "react";
import "./Input.sass";
import { NumericFormat } from "react-number-format";
import { Range } from "react-range";
const Input = (props) => {
  const [amount, setAmount] = useState(props.startAmount);
  const [percent, setPercent] = useState(props.startPercent);
  const [month, setMonth] = useState(props.startMonth);
  const [contribution, setContribution] = useState(0);

  const updateContribution = (percent) => {
    const tempContribution = (percent * props.currentAmount) / 100;
    setContribution(tempContribution);
    if (props.handleContribution) {
      props.handleContribution(tempContribution);
    }
  };

  useEffect(() => {
    updateContribution(percent);
  }, [props.currentAmount]);

  switch (props.unit) {
    case "percent":
      return (
        <div className="search-block">
          <p className="search-block__title">{props.label}</p>
          <div className="search-block__inputs">
            <div
              className={`search-block__main-input-wrapper search-block__main-input-wrapper_${props.unit}`}
            >
              <input
                className={`search-block__main-input`}
                type={"number"}
                step={1}
                value={contribution}
                onChange={() => {
                  updateContribution(percent);
                }}
              />
              <NumericFormat
                className={`search-block__option-input_percent`}
                value={percent}
                suffix={"%"}
                onValueChange={({ floatValue }) => {
                  setPercent(floatValue);
                }}
                onBlur={(e) => {
                  if (percent > 60) {
                    setPercent(60);
                    updateContribution(60);
                  } else if (percent < 10) {
                    setPercent(10);
                    updateContribution(10);
                  } else {
                    updateContribution(percent);
                  }
                }}
              />
            </div>
            <NumericFormat
              className={`search-block__range-input styled-slider slider-progress`}
              type={"range"}
              min={props.min}
              max={props.max}
              value={percent}
              step={1}
              onValueChange={({ floatValue }) => {
                setPercent(floatValue);
                updateContribution(floatValue);
              }}
            />
          </div>
        </div>
      );
    case "ruble":
      return (
        <div className="search-block">
          <p className="search-block__title">{props.label}</p>
          <div className="search-block__inputs">
            <div
              className={`search-block__main-input-wrapper search-block__main-input-wrapper_${props.unit}`}
            >
              <NumericFormat
                className={`search-block__main-input`}
                type={"number"}
                value={amount}
                step={1}
                onValueChange={({ floatValue }) => {
                  setAmount(floatValue);
                }}
                onBlur={(e) => {
                  if (amount > 6000000) {
                    setAmount(6000000);
                    props.handleAmount(6000000);
                  } else if (amount < 1000000) {
                    setAmount(1000000);
                    props.handleAmount(1000000);
                  } else {
                    props.handleAmount(amount);
                  }
                }}
              />
            </div>

            <NumericFormat 
              min={props.min}
              max={props.max}
              value={amount}
              className={`search-block__range-input styled-slider slider-progress`}
              type={"range"}
              onValueChange={({ floatValue }) => {
                setAmount(floatValue);
                props.handleAmount(floatValue);
              }}
            />
          </div>
        </div>
      );
    case "month":
      return (
        <div className="search-block">
          <p className="search-block__title">{props.label}</p>
          <div className="search-block__inputs">
            <div
              className={`search-block__main-input-wrapper search-block__main-input-wrapper_${props.unit}`}
            >
              <NumericFormat
                className={`search-block__main-input`}
                type={"number"}
                min={props.min}
                max={props.max}
                value={month}
                step={1}
                onChange={(e) => {
                  setMonth(e.target.value);
                }}
                onBlur={(e) => {
                  if (month > 60) {
                    setMonth(60);
                    props.handleMonth(60);
                  } else if (month < 1) {
                    setMonth(1);
                    props.handleMonth(1);
                  } else {
                    props.handleMonth(month);
                  }
                }}
              />
            </div>

            <NumericFormat
              className={`search-block__range-input styled-slider slider-progress`}
              type={"range"}
              value={month}
              onValueChange={({ floatValue }) => {
                setMonth(floatValue);
                props.handleMonth(floatValue);
              }}
              min={props.min}
              max={props.max}
              step={1}
            />
          </div>
        </div>
      );
    default:
  }
};
export default Input;
