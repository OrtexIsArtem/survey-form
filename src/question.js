//
export class Question {
	static create(question) {
		return window.fetch('https://questionnaire-app-vm.firebaseio.com/question.json', {
			method: 'POST',
			body: JSON.stringify(question),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(response => {
				question.id = response.name
				return question
			})
			.then(setLocalS)
			.then(Question.renderList)
	}

	static fetch(token) {
		if (!token) {
			return Promise.resolve('<h4 class="error">Некорректный email или пароль</h4>')
		}
		return window.fetch(`https://questionnaire-app-vm.firebaseio.com/question.json?auth=${token}`)
			.then(r => r.json())
			.then(r => {
				if (r && r.error) {
					return `<p class="error">${r.error}</p>`
				}
				return r ? Object.keys(r).map(key => ({
					...r[key],
					id: key
				})) : []
			})
	}

	static listToHTML(questions) {
		return questions.length
			? `<ol>${questions.map(q => `
					<li class="questions-text-all">
						<span>${q.text}</span>
						<span class="questions-date-all">${new Date(q.date).toLocaleDateString()}</span>
					</li>
				`).join('')}</ol>`
			: '<h3>Вопросов пока нет</h3>'
	}

	static renderList() {
		const question = getLocalS()
		document.getElementById('list').innerHTML = question.length
			? question.map(toCard).join('')
			: `<div class="mui--text-headline">Вопросов пока нет.</div>`
	}
}

const getLocalS = () => JSON.parse(localStorage.getItem('question') || "[]")

const setLocalS = question => {
	const allQuestion = getLocalS()
	allQuestion.push(question);
	localStorage.setItem('question', JSON.stringify(allQuestion))
}

const toCard = question => {
	return `
		<div class="list-items">
			<div class="mui--text-black-54 question-date">
			<span>${new Date(question.date).toLocaleDateString()}</span>
			<span class="question-time">${new Date(question.date).toLocaleTimeString()}</span>
			</div>
			<h4 class="question-text">${question.text}</h4>
      </div>
	`
}



