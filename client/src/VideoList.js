export default async function VideoList(
  name = '',
  link = 'http://localhost:3000/',
  amount = 10,
) {
  const element = document.createElement('div')
  element.setAttribute('class', 'videoList')
  let data = { success: false }

  try {
    data = await (await fetch(link)).json()
  } catch (e) {
    console.log(e)
  }
  if (data.success) {
    for (let i = 0; i < Math.min(data.movies.length, 20); i++) {
      element.innerHTML += `
      <div class="videoList-box">
        <div class="videoList-image">
          <a href="details.html#${data.movies[i].url}">
            <img src="${data.movies[i].image}" />
          </a>
        </div>
        <div class="videoList-title">
          <a href="details.html#${data.movies[i].url}">
            ${data.movies[i].title}
          </a>
        </div>
      </div>`
    }
  } else {
    for (let i = 0; i < amount; i++) {
      element.innerHTML += `
  <div class="videoList-box">
    <div class="videoList-image"></div>
    <div class="videoList-title">
      Title
    </div>
  </div>`
    }
  }
  const container = document.createElement('div')
  container.setAttribute('class', 'listContainer')
  container.innerHTML = ` <h2>${name}</h2>`
  container.appendChild(element)
  return container
}
