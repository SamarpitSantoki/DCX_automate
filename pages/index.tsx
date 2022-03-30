import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "../components/Coin";

export default function Home() {
  const [coins, setCoins] = useState([]);
  let update = null;
  console.log("fromHere");
  useEffect(() => {
    update = setInterval(() => {
      async function fetch_data() {
        const { data } = await axios.get("http://localhost:4000/fetchbalance");
        console.log("from too");
        setCoins(data);
      }
      fetch_data();
    }, 1000 * 15);
    console.log("fromThere");
  }, []);
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Coins
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                1 min Hour Price
              </th>
              <th scope="col" className="px-6 py-3">
                5 min 8 Hour Price
              </th>
              <th scope="col" className="px-6 py-3">
                10 min 16 Hour Price
              </th>
              <th scope="col" className="px-6 py-3">
                24 Hour Price
              </th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => {
              return (
                <Coin
                  currency={coin.currency}
                  balance={coin.balance}
                  hourlyPrice={coin.hourlyPrice}
                  _8hourlyPrice={coin._8hourlyPrice}
                  _16hourlyPrice={coin._16hourlyPrice}
                  _24hourlyPrice={coin._24hourlyPrice}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
