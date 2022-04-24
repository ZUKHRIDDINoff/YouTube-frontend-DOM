const API = 'https://zukhriddin-app.herokuapp.com'

let profileImage = window.localStorage.getItem('avatar')
let password = window.localStorage.getItem('password')
let token = window.localStorage.getItem('token')
profileImage = JSON.parse(profileImage)
password = JSON.parse(password)
token = JSON.parse(token)


;(async function tokenChecker() {
	if (!token || !password) return window.location = '/login'

	let formData = new FormData()
	formData.append('token', token)
	formData.append('password', password)

	let response = await fetch(API + '/tokenChecker', {
		method: 'POST',
		body: formData
	})

	response = await response.json()
	if (response.status != 200) {
		window.location = '/login'
	}

})()






privateVideos()

async function privateVideos() {
	videosList.innerHTML = null

	let formData = new FormData()
	formData.append('token', token)

	let response = await fetch(API + '/privateVideos', {
		method: 'POST',
		body: formData
	})

	response = await response.json()

	if(response.status == 405) return errorMessage.textContent = response.message

	errorMessage.textContent = response.message
	const videos = response.video

	videos.forEach(video => {
		const li = document.createElement('li')
		li.className = 'video-item'

		const inputVideo = document.createElement('video')
		inputVideo.controls = true
		inputVideo.src = API + '/uploads/' + video.videoNameFile

		const p = document.createElement('p')
		p.textContent = video.videoTitle
		p.setAttribute('contenteditable', true)

		const img = document.createElement('img')
		img.src = './img/delete.png'
		li.append(inputVideo, p, img)
		videosList.append(li)

		p.onkeydown = async (event) => {
			if (event.keyCode == 13) {
				p.blur()
				let formData = new FormData()
				formData.append('newTitle', p.textContent)
				formData.append('videoId', video.videoId)
				
				let response = await fetch(API + '/changeVideoName', {
					method: 'PUT',
					body: formData
				})

				response = await response.json()

			}
		}

		img.onclick = async (event) => {
			event.preventDefault()
			let formData = new FormData()
			formData.append('videoId', video.videoId)
			let response = await fetch(API + '/deleteVideo', {
				method: 'DELETE',
				body: formData
			})
			response = await response.json()
			errorMessage.textContent = response.message
			li.remove()
		}
	})
}




videoForm.onsubmit = async (event) => {
	event.preventDefault()
	errorMessage.textContent = null
	let formData = new FormData()
	formData.append('videoTitle', videoInput.value)
	formData.append('video', uploadInput.files[0])
	formData.append('token', token)
	formData.append('profileImage', profileImage)
	let response = await fetch(API + '/uploadVideo', {
		method: 'POST',
		body: formData
	})
	response = await response.json()
	errorMessage.textContent = response.message
	
	// tokenChecker()
	
	privateVideos()
}




logoutBtn.onclick = (event) => {
	event.preventDefault()
	window.localStorage.removeItem('token')
	window.localStorage.removeItem('password')
	window.localStorage.removeItem('avatar')
	window.location = '/login'
}