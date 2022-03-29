import crypto from "crypto";
import axios from "axios";
import request from "request";
const baseurl = "https://api.coindcx.com";

// Place your API key and secret below. You can generate it from the website.

export default async function handler(req, res) {
  const timeStamp = Math.floor(Date.now());
  // To check if the timestamp is correct
  const body = {
    timestamp: timeStamp,
  };

  const payload = JSON.stringify(body);
  console.log(payload);

  const signature = crypto
    .createHmac("sha256", process.env.API_SECRET)
    .update(payload)
    .digest("hex");

  const options = {
    url: baseurl + "/exchange/v1/users/balances",
    headers: {
      "X-AUTH-APIKEY": process.env.API_KEY,
      "X-AUTH-SIGNATURE": signature,
    },
    json: true,
    body: body,
  };
  console.log("ERROR BEFORE REQ");

  const responce = await axios.post(options.url, options.body, {
    headers: options.headers,
  });

  const data = responce.data.filter((item) => item.balance > 0);
  res.status(200).json(data);
  // const balance = response.filter((item) => {
  //   if (parseFloat(item.balance) > 0) {
  //     return item;
  //   }
  // });
}
