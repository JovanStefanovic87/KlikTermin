const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = true;

	if (token) {
		res.status(200).json({
			success: true,
		});
	} else {
		res.status(401).json({
			success: false,
			error: 'missing creditians',
		});
	}
	return console.log(token);
};
