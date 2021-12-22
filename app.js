process.env.TZ = "Asia/Seoul";

const express = require("express");
const cors = require("cors");
const app = express();

const axios = require("axios");
axios.interceptors.response.use(r => r, e => e.response);

const config = require("./config");

const loadData = async () => {
	let ret = {};
	await Promise.all([
		require("./lib/blog")(),
		require("./lib/github")(),
		require("./lib/cf")(config.cf),
		require("./lib/boj")(),
	]).then(r => r.forEach(data => Object.assign(ret, data)));
	console.log(`${(new Date()).toLocaleString()} / ${JSON.stringify(ret)}`);
	return ret;
};

loadData().then(data => {
	require("node-schedule").scheduleJob("*/10 * * * *", async () => data = await loadData());

	app.use(cors({origin: "nlog.dev"}));
	app.get("/", (req, res) => {
		res.header("Content-Type", "application/json");
		res.end(JSON.stringify(data));
	});
	app.use((req, res) => {
		res.status(400).end("{}");
	});
	app.listen(config.port, () => console.log(`Server is listening on port ${config.port}.`));
});
