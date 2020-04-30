//
import {Question} from './question'
import {createModal, isValid} from "./utils"
import {authWithEmailAndPassword, getAuthForm} from "./auth";
import './style.css'

const form = document.getElementById('form'),
	input = form.querySelector('#question-input'),
	btnSubmit = form.querySelector('#btn-submit'),
	btnModal = document.getElementById('modal-btn')

const submitForm = e => {
	e.preventDefault()

	if (isValid(input.value)) {
		const question = {
			text: input.value.trim(),
			date: new Date().toJSON()
		}
		btnSubmit.disabled = true
		Question.create(question).then(() => {
			input.value = ''
			input.className = ''
			btnSubmit.disabled = false
		})

	}
}

const openModal = () => {
	createModal('Войти, чтобы увидеть все', getAuthForm())
	document
		.getElementById('auth-form')
		.addEventListener('submit', authFormHandler, {once: true})
}

const authFormHandler = e => {
	e.preventDefault()
	const {target} = e,
		btn = target.querySelector('button'),
		email = target.querySelector('#email').value,
		password = target.querySelector('#password').value
	btn.disabled = true

	authWithEmailAndPassword(email, password)
		.then(Question.fetch)
		.then(renderModal)
		.then(() => btn.disabled = false)
}

const renderModal = content => {
	if (typeof content !== 'string') {
		createModal('Все впросы', Question.listToHTML(content))
	} else {
		createModal('Ошибка!', content)
	}
}

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitForm)
input.addEventListener('input', () => {
	btnSubmit.disabled = !isValid(input.value)
})
btnModal.addEventListener('click', openModal)


