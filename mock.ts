// @deno-types="npm:@types/express@4.17.15"
// @deno-types="npm:@types/cors"
import express from "npm:express@4.18.2";
import cors from "npm:cors";

const app = express();

app.get("/ekonyv", cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }), (req, res) => {
	res.send("Nice");
});

app.listen(80);