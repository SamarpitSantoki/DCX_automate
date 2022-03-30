let timer = null;
export default function handler(req, res) {
  if (req.query.method == "set") {
    let i = 0;
    timer = setInterval(() => {
      console.log("interval working " + i++);
    }, 1000);
    res.status(200).send("interval set");
  } else if (req.query.method == "clear") {
    if (timer) {
      clearInterval(timer);
      res.status(200).send("interval cleared");
    } else {
      res.status(200).send("no interval set");
    }
  }
}
