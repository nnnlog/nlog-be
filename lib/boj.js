const axios = require("axios");

module.exports = () => new Promise(resolve =>
	axios.get("https://solved.ac/api/v3/user/show?handle=chansol").then(res => resolve({
		boj: res.data.solvedCount,
		solved_tier: res.data.tier,
		solved_rat: res.data.rating,
	}))
);
