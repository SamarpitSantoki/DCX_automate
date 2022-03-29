import axios from "axios";
import React, { useEffect, useState } from "react";

const Coin = ({ coin, quantity }) => {
  const [hourlyPrice, setHourlyPrice] = useState();
  const [_8hourlyPrice, set8HourlyPrice] = useState();
  const [_16hourlyPrice, set16HourlyPrice] = useState();
  const [_24hourlyPrice, set24HourlyPrice] = useState();
  const [update, setUpdate] = useState(null);

  async function startInterval() {
    console.log("startInterval");
    if (update == null) {
      let time = new Date();
      let status = setInterval(async function () {
        const d = new Date();
        const res = await axios.get(
          `https://public.coindcx.com/market_data/candles?pair=I-${coin}_INR&interval=1h&limit=1`
        );
        const data = await res.data[0].open;

        switch (d.getHours()) {
          case 8:
            set8HourlyPrice(data);
            break;
          case 16:
            set16HourlyPrice(data);
            break;
          case 24:
            set24HourlyPrice(data);
          default:
            setHourlyPrice(data);
            break;
        }
      }, 30 * 1000);
      setUpdate(status);
    }
    console.log("update id is" + update);
  }
  useEffect(() => {
    const d = new Date();

    const timetostart = setTimeout(
      startInterval,
      (60 - d.getMinutes()) * 60 * 1000 + (60 - d.getSeconds()) * 1000
    );
    return () => {
      clearInterval(update);
      clearTimeout(timetostart);
      setUpdate(null);
    };
  }, []);
  return (
    <tr key={coin}>
      <th scope="col" className="px-6 py-3">
        {coin}
      </th>
      <th scope="col" className="px-6 py-3">
        {quantity}
      </th>
      <th scope="col" className="px-6 py-3">
        {hourlyPrice}
      </th>
      <th scope="col" className="px-6 py-3">
        {_8hourlyPrice}
      </th>
      <th scope="col" className="px-6 py-3">
        {_16hourlyPrice}
      </th>
      <th scope="col" className="px-6 py-3">
        {_24hourlyPrice}
      </th>
      <th>
        <button
          className="px-4 py-2 text-white bg-blue-300 mx-4 rounded-md hover:bg-blue-600"
          onClick={startInterval}
        >
          Start Bot
        </button>
      </th>
      <th>
        <button
          className="px-4 py-2 text-white bg-red-300 mx-4 rounded-md hover:bg-red-600"
          onClick={() => {
            clearInterval(update);
            console.log("stopped" + update);
            setUpdate(null);
          }}
        >
          Stop Bot
        </button>
      </th>
    </tr>
  );
};

export default Coin;
