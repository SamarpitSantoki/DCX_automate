import axios from "axios";
import { useEffect, useState } from "react";

const server = () => {
  const [servervalue, setServervalue] = useState(null);
  useEffect(() => {
    async function getData() {
      const responce = await axios.get("http://localhost:4000");
      console.log(responce);
      setServervalue(responce.data.a);
    }
    getData();
  }, []);

  const changeValue = async () => {
    await axios.post("http://localhost:4000/?value=");
  };

  return (
    <div>
      server value is {servervalue}
      <button onClick={changeValue}>ChangeValue at server</button>
    </div>
  );
};

export default server;
