//
import {Question} from './question'
import {isValid} from "./utils"
import './style.css'

const form = document.getElementById('form'),
	input = form.querySelector('#question-input'),
	btnSubmit = form.querySelector('#btn-submit')

const submitForm = e => {
	e.preventDefault()

	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON()
		}
		btnSubmit.disabled = true
		// server request
		Question.create(question).then(() => {
			input.value = ''
			input.className = ''
			btnSubmit.disabled = false
		})

	}
}

form.addEventListener('submit', submitForm)
input.addEventListener('input', () => {
	btnSubmit.disabled = !isValid(input.value)
})