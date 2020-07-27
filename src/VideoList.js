export default function VideoList(name = '') {
  const element = document.createElement('div')
  element.setAttribute('class', 'videoList')
  element.innerHTML = `
  <h2>${name}</h2>
  <div class="videoList-box">
    <div class="videoList-image"></div>
    <div class="videoList-title">
      Title
    </div>
  </div>
  <div class="videoList-box">
    <div class="videoList-image"></div>
    <div class="videoList-title">
      Title
    </div>
  </div>
  <div class="videoList-box">
    <div class="videoList-image"></div>
    <div class="videoList-title">
      Title
    </div>
  </div>
  <div class="videoList-box">
    <div class="videoList-image"></div>
    <div class="videoList-title">
      Title
    </div>
  </div>
  `

  return element
}
