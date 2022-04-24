const API = 'https://zukhriddin-app.herokuapp.com'

const errorMessage = document.querySelector('#errorMessage')

let password = window.localStorage.getItem('password')
let token = window.localStorage.getItem('token')
password = JSON.parse(password)
token = JSON.parse(token)

;
(async function tokenChecker() {
	if (!token || !password) return

	let formData = new FormData()
	formData.append('token', token)
	formData.append('password', password)

	let response = await fetch(API + '/tokenChecker', {
		method: 'POST',
		body: formData
	})

	response = await response.json()
	if (response.status == 200) {
		errorMessage.textContent = response.message
		setTimeout(() => {
			window.location = '/'
		}, 2000)
	}

})()





registerForm.onsubmit = async (event) => {
	event.preventDefault()

	let formData = new FormData()
	formData.append('username', usernameInput.value)
	formData.append('password', passwordInput.value)
	formData.append('img', uploadInput.files[0])

	let response = await fetch(API + '/register', {
		method: 'POST',
		body: formData
	})
	response = await response.json()

	errorMessage.textContent = response.message


	if (response.token) {
		window.localStorage.setItem('token', JSON.stringify(response.token))
		window.localStorage.setItem('password', JSON.stringify(response.password))
		window.localStorage.setItem('avatar', JSON.stringify(response.avatar))

		usernameInput.value = ''
		passwordInput.value = ''

		setTimeout(() => {
			window.location = '/'
		}, 2000)
	}
	else errorMessage.textContent = 'User not registered. Please try later'
}




showButton.onclick = () => {
	if (passwordInput.type == 'password') {
		return passwordInput.type = 'text'
	}

	if (passwordInput.type == 'text') {
		return passwordInput.type = 'password'
	}
}