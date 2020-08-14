export default async function VideoCard(data) {
  const element = document.createElement('div')
  element.setAttribute('class', 'videoList-box')

  element.innerHTML += `
<div class="videoList-image">
  <a href="details.html#${data.url}">
    <img src="${data.image}" />
  </a>
  </div>
  <div class="videoList-title">
  <a href="details.html#${data.url}">
    ${data.title}
  </a>
</div>`
  return element
}
