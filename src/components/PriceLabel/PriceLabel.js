import React from "react";
import "./PriceLabel.sass";
import { NumericFormat } from 'react-number-format';
const PriceLabel = ({ label, dealAmount, monthPayment }) => {
  if (label === "leasing") {
    return (
      <div className="price-label">
        <p className="price-label__label">Сумма договора лизинга</p>
        <NumericFormat
          value={dealAmount}
          displayType={"text"}
          thousandSeparator={` `}
          suffix={" ₽"}
          renderText={(dealAmount) => (
            <p className="price-label__price">{dealAmount}</p>
          )}
        />
      </div>
    );
  } else
    return (
      <div className="price-label">
        <p className="price-label__label">Ежемесячный платеж от</p>
        <NumericFormat
          value={monthPayment}
          displayType={"text"}
          thousandSeparator={` `}
          suffix={" ₽"}
          renderText={(monthPayment) => (
            <p className="price-label__price">{monthPayment}</p>
          )}
        />
      </div>
    );
};
export default PriceLabel;
