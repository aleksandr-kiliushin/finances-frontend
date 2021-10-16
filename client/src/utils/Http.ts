export class Http {
	private static get requestOptions() {
		return {
			headers: {
				Authorization: 'Bearer ' + localStorage.authToken,
				'Content-Type': 'application/json',
			},
		}
	}

	static async get({ url }: IRequestDataWithoutPayload) {
		const response = await fetch(url, this.requestOptions)
		return await response.json()
	}
}

interface IRequestDataWithoutPayload {
	url: string
}