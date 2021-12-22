const axios = require("axios");

module.exports = () => new Promise(resolve =>
	axios.get("https://solved.ac/api/v3/user/show?handle=chansol").then(res => resolve({
		boj: res.data.solvedCount,
		solved: res.data.tier
	}))
);
