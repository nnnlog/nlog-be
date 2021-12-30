const axios = require("axios");
const crypto = require("crypto");

module.exports = config => new Promise(resolve => {
	let methodName = "user.info";

	let time = Math.floor(Date.now() / 1000);
	let rand = crypto.randomBytes(3).toString("hex");
	let params = {
		apiKey: config.key,
		time,
		handles: "nlog",
	};

	params.apiSig = `${rand}${crypto.createHash("sha512").update(
		`${rand}/${methodName}?${Object.keys(params).sort((a, b) => a.localeCompare(b))
			.map(k => `${k}=${params[k]}`).join("&")
		}#${config.secret}`
	).digest().toString("hex")}`;

	axios.get(`https://codeforces.com/api/${methodName}?${Object.keys(params).map(k => `${k}=${params[k]}`).join("&")}`).then(res => {
		try {
			resolve({cf: res.data.result.shift().maxRating});
		} catch (e) {
			resolve({});
		}
	})
});
