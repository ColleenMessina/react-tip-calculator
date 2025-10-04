import { useState } from "react";
import "./styles.css";

export default function App() {
  const [bill, setBill] = useState("");
  const [myTip, setMyTip] = useState(0);
  const [friendTip, setFriendTip] = useState(0);

  function clearValues() {
    setBill("");
    setMyTip(0);
    setFriendTip(0);
  }

  return (
    <div className="App">
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage tip={myTip} onSetTip={setMyTip}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage tip={friendTip} onSetTip={setFriendTip}>
        How did your friend like the service?
      </SelectPercentage>
      <Output bill={bill} myTip={myTip} friendTip={friendTip} />
      <ResetButton onClearValues={clearValues} />
    </div>
  );
}

function BillInput({ bill, onSetBill }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function SelectPercentage({ tip, onSetTip, children }) {
  return (
    <div>
      <label>{children}</label>
      <select value={tip} onChange={(e) => onSetTip(Number(e.target.value))}>
        <option value={0}>Not good (0%)</option>
        <option value={5}>Good (5%)</option>
        <option value={10}>Great (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, myTip, friendTip }) {
  const avgTip = (Number(myTip) + Number(friendTip)) / 2;
  const tip = avgTip === 0 ? 0 : Number(bill) / avgTip;
  const total = bill + Number(tip.toFixed(2));

  return (
    bill > 0 && (
      <h1>
        You pay ${total} (${bill} + ${tip.toFixed(2)} tip)
      </h1>
    )
  );
}

function ResetButton({ onClearValues }) {
  return <button onClick={onClearValues}> Reset</button>;
}
