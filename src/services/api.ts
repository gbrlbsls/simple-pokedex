export default class {

	static baseUrl: string;

	static async post(endpoint: string, data: any) {

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		};

		return await fetch(`${this.baseUrl}${endpoint}`, requestOptions);
	}

	static async get(endpoint: string) {

		const requestOptions: RequestInit = {
			method: 'GET',
			mode: "cors",
			redirect: "follow"
		};

		return await fetch(`${this.baseUrl}${endpoint}`, requestOptions);
	}

}