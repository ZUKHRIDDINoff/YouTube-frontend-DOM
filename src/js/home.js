const API = 'https://zukhriddin-app.herokuapp.com'

const voiceButton = document.querySelector('.voice-btn')
const avatarImage = document.querySelector('.avatar-img')
const search = document.querySelector('.search-box')
const searchInput = document.querySelector('.search-input')
const voiceBtn = document.querySelector('.voice-btn')


let avatar = window.localStorage.getItem('avatar')
avatar = JSON.parse(avatar)
if (avatar) avatarImage.src = API + '/avatars/' + avatar


showUsers()

async function showUsers() {
	await fetch(API + '/users')
		.then(response => response.json())
		.then(data => {
			const users = data.users
			users.forEach(user => {
				const li = document.createElement('li')
				li.className = 'channel'
				li.innerHTML = `
					<a href="#">
					<img src="${API + '/avatars/'+user.profileImage}" alt="channel-icon" width="30px" height="30px">
					<span>${user.username}</span>
					</a>
					`
				usersList.append(li)

				li.onclick = async (event) => {
					event.preventDefault();
					videosList.innerHTML = null

					await fetch(API + '/videos')
						.then(response => response.json())
						.then(data => {
							const videos = data.videos
							const filtered = videos.filter(el => el.userId == user.userId)
							filtered.forEach(video => {
								const li = document.createElement('li')
								li.style.padding = '15px'
								li.innerHTML = `
								<video src="${ API + '/uploads/' + video.videoNameFile }" controls="" width="300px" height="180px"></video>
								<div class="iframe-footer">
									<img src="${ API + '/avatars/'+video.profileImage }" alt="channel-icon">
									<div class="iframe-footer-text">
										<h2 class="channel-name">${video.username}</h2>
										<h3 class="iframe-title">${video.videoTitle}</h3>
										<time class="uploaded-time">${video.date}</time>
										<a class="download" href="#">
											<span>${video.videoSize}</span>
											<img src="./img/download.png">
										</a>
									</div>                  
								</div>
									`
								videosList.append(li)
							})
						})
				}
			})
		}).catch(error => console.log(error))
}

showVideos()


async function showVideos() {
	await fetch(API + '/videos')
		.then(response => response.json())
		.then(data => {
			const videos = data.videos
			videos.forEach(video => {
				const li = document.createElement('li')
				li.style.padding = '15px'
				li.innerHTML = `
				<video src="${ API + '/uploads/' + video.videoNameFile }" controls="" width="300px" height="180px"></video>
				<div class="iframe-footer">
					<img src="${ API + '/avatars/'+video.profileImage }" alt="channel-icon">
					<div class="iframe-footer-text">
						<h2 class="channel-name">${video.username}</h2>
						<h3 class="iframe-title">${video.videoTitle}</h3>
						<time class="uploaded-time">${video.date}</time>
						<a class="download" href="#">
							<span>${video.videoSize}</span>
							<img src="./img/download.png">
						</a>
					</div>                  
				</div>
					`
				videosList.append(li)
			})

			// download.onclick = async(event) => {
			// 	event.preventDefault();
			// 	console.log('Hello');
			// }
		}).catch(error => console.log(error))
}

search.onsubmit = async (event) => {
	event.preventDefault()
	videosList.innerHTML = null
	if (searchInput.value == "") {
		return showVideos()
	}

	await fetch(API + '/videos')
		.then(response => response.json())
		.then(data => {
			const videos = data.videos
			console.log(videos);
			videos.forEach(video => {
				if (!video.videoTitle.includes(searchInput.value)) return
				else console.log('Yes')
				const li = document.createElement('li')
				li.style.padding = '15px'
				li.innerHTML = `
			<video src="${ API + '/uploads/' + video.videoNameFile }" controls="" width="300px" height="180px"></video>
			<div class="iframe-footer">
				<img src="${ API + '/avatars/'+video.profileImage }" alt="channel-icon">
				<div class="iframe-footer-text">
					<h2 class="channel-name">${video.username}</h2>
					<h3 class="iframe-title">${video.videoTitle}</h3>
					<time class="uploaded-time">${video.date}</time>
					<a class="download" href="#">
						<span>${video.videoSize}</span>
						<img src="./img/download.png">
					</a>
				</div>                  
			</div>
				`
				videosList.append(li)
			})
		})


}