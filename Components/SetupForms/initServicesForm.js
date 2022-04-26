const initServicesForm = {
	id: null,
	serviceName: {
		value: '',
		touched: false,
		valid: true,
	},
	duration: {
		value: '',
		touched: false,
		valid: true,
	},
	price: {
		value: '',
		touched: false,
		valid: true,
	},
	description: {
		value: '',
		touched: false,
		valid: true,
	},
	serviceProviderId: {
		value: null,
		touched: false,
		valid: true,
	},
	deleted: false,
};

export default initServicesForm;
