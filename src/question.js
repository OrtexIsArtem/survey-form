//
export class Question {
	static create(question) {
		return window.fetch('', {
			method: 'POST',
			body: JSON.stringify(question),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				console.log(response)
			})
	}
}