const axios = require("axios");

module.exports = () => new Promise(resolve =>
	axios.get("https://m.blog.naver.com/sorisem4106").then(res => {
		let body = res.data;

		let start = "전체 ";
		let index = body.indexOf(start) + start.length;
		let endIndex = body.indexOf("</div>", index);

		resolve({blog: body.substr(index, endIndex - index)});
	})
);
