// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  const response = await axios(
    `http://localhost:4000/price/${encodeURIComponent("I-SC_INR")}`
  );
  res.status(200).json({ msg: response.data.msg });
}
