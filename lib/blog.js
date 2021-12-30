const axios = require("axios");

module.exports = () => new Promise(resolve =>
	axios.get("https://m.blog.naver.com/sorisem4106").then(res => {
		try {
			let body = res.data;

			let start = `totalVisitorCount\":`;
			let index = body.indexOf(start) + start.length;
			let endIndex = body.indexOf(",", index);

			resolve({blog: body.substr(index, endIndex - index).replace(/\B(?=(\d{3})+(?!\d))/g, ",")});
		} catch (e) {
			resolve({});
		}
	})
);
