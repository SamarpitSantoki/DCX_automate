import axios from "axios";
import React, { useEffect, useState } from "react";

const Coin = (coin) => {
  const [update, setUpdate] = useState(null);
  const [coins, setCoins] = useState(coin);
  const stopbot = async () => {
    await axios.get(`http://localhost:4000/stopbot?coin=${coins.currency}`);
    console.log("stop bot");
  };
  const startbot = async () => {
    await axios.get(
      `http://localhost:4000/startbot?method=start&coin=${coins.currency}`
    );
    console.log("start bot");
  };
  useEffect(() => {
    setCoins(coin);
  }, []);
  // async function startInterval() {
  //   console.log("startInterval");
  //   if (update == null) {
  //     let status = setInterval(async function () {
  //       const d = new Date();
  //       const res = await axios.get(
  //         `https://public.coindcx.com/market_data/candles?pair=I-${coin}_INR&interval=1h&limit=1`
  //       );
  //       const data = await res.data[0].open;

  //       switch (d.getHours()) {
  //         case 8:
  //           set8HourlyPrice(data);
  //           break;
  //         case 16:
  //           set16HourlyPrice(data);
  //           break;
  //         case 24:
  //           set24HourlyPrice(data);
  //         default:
  //           setHourlyPrice(data);
  //           break;
  //       }
  //     }, 30 * 1000);
  //     setUpdate(status);
  //   }
  //   console.log("update id is" + update);
  // }

  // useEffect(() => {
  //   const d = new Date();

  //   const timetostart = setTimeout(
  //     startInterval,
  //     (60 - d.getMinutes()) * 60 * 1000 + (60 - d.getSeconds()) * 1000
  //   );
  //   return () => {
  //     clearInterval(update);
  //     clearTimeout(timetostart);
  //     setUpdate(null);
  //   };
  // }, []);

  return (
    <tr key={coins.currency}>
      <td scope="col" className="px-6 py-3">
        {coin.currency}
      </td>
      <td scope="col" className="px-6 py-3">
        {coins.balance}
      </td>
      <td scope="col" className="px-6 py-3">
        {coins.hourlyPrice}
      </td>
      <td scope="col" className="px-6 py-3">
        {coins._8hourlyPrice}
      </td>
      <td scope="col" className="px-6 py-3">
        {coins._16hourlyPrice}
      </td>
      <td scope="col" className="px-6 py-3">
        {coins._24hourlyPrice}
      </td>
      <td>
        <button
          className="px-4 py-2 text-white bg-blue-300 mx-4 rounded-md hover:bg-blue-600"
          onClick={startbot}
        >
          Start Bot
        </button>
      </td>
      <td>
        <button
          className="px-4 py-2 text-white bg-red-300 mx-4 rounded-md hover:bg-red-600"
          onClick={stopbot}
        >
          Stop Bot
        </button>
      </td>
    </tr>
  );
};

export default Coin;
