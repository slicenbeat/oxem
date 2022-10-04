import { useEffect, useState } from "react";
import "./App.sass";
import Button from "./components/Button";
import Header from "./components/Header";
import Input from "./components/Input";
import PriceLabel from "./components/PriceLabel/";
import axios from "axios";

function App() {
  const [currentAmount, setCurrentAmount] = useState(3300000);
  const [currentMonth, setCurrentMonth] = useState(60);
  const [currentContribution, setCurrentContribution] = useState(420000);
  const [monthPayment, setMonthPayment] = useState(0);
  const [dealAmount, setDealAmount] = useState(0);
  const [flag, setFlag] = useState(false);
  function handleRequest(e) {
    e.preventDefault();
    const postDataStringify = JSON.stringify({
      currentAmount,
      currentMonth,
      currentContribution,
      monthPayment,
      dealAmount,
    });
    console.log(postDataStringify);
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(
        "https://eoj3r7f3r4ef6v4.m.pipedream.net",
        postDataStringify,
        customConfig
      )
      .then((res) => {
        console.log(res);
        setFlag(false);
      })
      .catch((e) => {
        console.log(e);
        setFlag(false);
      });
  }
  function handleRequestButton(e) {
    setFlag(true);
  }
  useEffect(() => {
    setMonthPayment(
      Math.floor(
        (currentAmount - currentContribution) *
          ((0.035 * Math.pow(1 + 0.035, currentMonth)) /
            (Math.pow(1 + 0.035, currentMonth) - 1))
      )
    );
  }, [currentMonth, currentContribution]);
  useEffect(() => {
    setDealAmount(
      Math.floor(currentContribution + currentMonth * monthPayment)
    );
  }, [monthPayment]);
  return (
    <form className="calculator" onSubmit={handleRequest}>
      <Header></Header>
      <div className="search-blocks-wrapper">
        <Input
          label={`Стоимость автомобиля`}
          startAmount={3300000}
          unit={"ruble"}
          min={1000000}
          max={6000000}
          handleAmount={setCurrentAmount}
        ></Input>
        <Input
          label={`Первоначальный взнос`}
          startPercent={10}
          startContribution={420000}
          unit={"percent"}
          min={10}
          max={60}
          currentAmount={currentAmount}
          handleContribution={setCurrentContribution}
        ></Input>
        <Input
          label={`Срок лизинга`}
          startMonth={60}
          unit={"month"}
          min={1}
          max={60}
          handleMonth={setCurrentMonth}
        ></Input>
      </div>
      <div className="prices-wrapper">
        <PriceLabel label={`leasing`} dealAmount={dealAmount}></PriceLabel>
        <PriceLabel
          label={"monthPayment"}
          monthPayment={monthPayment}
        ></PriceLabel>
        <Button flagBlock={flag} onClick={handleRequestButton}></Button>
      </div>
    </form>
  );
}

export default App;
