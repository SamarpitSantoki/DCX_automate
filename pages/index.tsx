import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "../components/Coin";

export default function Home() {
  const [coins, setCoins] = useState([]);

  console.log("fromHere");
  useEffect(() => {
    async function fetch_data() {
      const { data } = await axios.get("/api/getBalance");
      console.log("from too");
      setCoins(data);
    }
    fetch_data();
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
                  coin={coin.currency}
                  quantity={coin.balance}
                  key={coin.currency}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
