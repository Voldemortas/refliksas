import './assets/styles.scss'

const movieDetails = () => {
  const element = document.createElement('main')

  element.innerHTML += `<div class="details">
  <h1>A Pretty Long Title</h1>
  <div class="details-grid">
    <div class="details-grid-image">Image placeholder</div>
    <div class="details-grid-player">Video placeholder</div>
    <div class="details-grid-button"><button>Add to Favourites</button></div>
    <div class="details-grid-info">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis pharetra neque vel pulvinar. Aliquam arcu mi, condimentum vitae pretium sed, porta eget sem. Suspendisse vitae dignissim enim. Pellentesque purus diam, mollis eget varius sit amet, auctor et nisl. Mauris volutpat est et enim lacinia cursus. Donec in eros tellus. Nam nulla ante, interdum ac euismod sit amet, tempus id sem. Duis tempus diam eros. Sed nibh ipsum, sodales id vestibulum sit amet, ultrices tristique risus. Praesent fringilla lacus sed lectus tempor ultrices interdum nec lectus. Nunc sed viverra nisl, nec tristique eros. Vestibulum in nulla nec lorem viverra eleifend fermentum non diam. Morbi maximus vulputate nunc, nec lobortis nisi dignissim in. Donec eu porta leo, a faucibus est. Morbi in felis eleifend, venenatis ex a, pulvinar mauris. Morbi ut libero non elit congue aliquam eget id velit.
    </div>  
  </div>
</div>`
  return element
}

document.body.appendChild(movieDetails())
