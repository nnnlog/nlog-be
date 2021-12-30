const axios = require("axios");

module.exports = () => new Promise(resolve =>
	axios.get("https://api.github.com/users/nnnlog").then(res => {
		try {
			resolve({github: res.data.followers})
		} catch (e) {
			resolve({});
		}
	})
);
