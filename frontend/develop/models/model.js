class model {

	constructor() {
		this.isLoading = false;
	};

	static reduceModel = (state) => {
		return {
			...state,
			isLoading: false
		}
	};

	static reduceModelRequest = (state) => {
		return {
			...state,
			isLoading: true
		}
	};
}

export default model;
