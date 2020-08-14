export default async function VideoList(
  name = '',
  predicate = () => true,
  amount = 10,
) {
  const element = document.createElement('div')
  const link = `http://localhost:3000/`
  element.setAttribute('class', 'videoList')
  let data = { success: false }

  try {
    data = await (await fetch(link)).json()
  } catch (e) {
    console.log(e)
  }
  if (data.success) {
    data = data.movies.filter(predicate)
    for (let i = 0; i < Math.min(data.length, 20); i++) {
      element.innerHTML += `
      <div class="videoList-box">
        <div class="videoList-image">
          <a href="details.html#${data[i].url}">
            <img src="${data[i].image}" />
          </a>
        </div>
        <div class="videoList-title">
          <a href="details.html#${data[i].url}">
            ${data[i].title}
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
