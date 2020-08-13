const { insertMovies, reflixMovie, removeAll } = require('./src/db')
const puppeteer = require('puppeteer')

const ratedUrl = `https://www.imdb.com/chart/top`
const popularUrl = `https://www.imdb.com/chart/moviemeter`
const movieUrl = (id) => `https://www.imdb.com/title/${id}`

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

const getPageContent = async (url, callback) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  const data = await page.evaluate(() => {
    return document.body.innerHTML
  })
  await browser.close()
  return callback(data)
}

const getIds = (data) => {
  return [...data.matchAll(/<a href="\/title\/(tt[\d]+)\//g)]
    .map((e) => e[1])
    .filter(onlyUnique)
}

const getImg = (url, width) =>
  `${url}${width}_CR0,0,${width},${Math.floor(width / 0.675)}_AL_.jpg`

const getMoviesData = async (ids) => {
  const start = new Date().getTime()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  let movies = []
  for (let i = 0; i < ids.length; i++) {
    try {
      console.log(`${i + 1}/${ids.length}\n${movieUrl(ids[i])}`)
      await page.goto(movieUrl(ids[i]))
      const data = await page.evaluate(() => {
        const title = [
          ...document.title.matchAll(/([\u0000-\uffff]+)\s\([\d]+\)\s-\sIMDb/g),
        ][0][1]
        const imgSrc = [...document.getElementsByTagName('img')].filter(
          (e) => e.alt === title + ' Poster',
        )[0].src
        const description = [...document.getElementsByName('description')][0]
          .content
        return {
          title,
          image: imgSrc,
          description,
        }
      })

      try {
        await insertMovies([
          {
            ...data,
            image: [...data.image.matchAll(/(.+_V1_U(X|Y))/g)][0][0],
          },
        ])
      } catch (e) {
        console.log(e)
      }
      movies.push({
        ...data,
        image: [...data.image.matchAll(/(.+_V1_U(X|Y))/g)][0][0],
      })
    } catch (e) {
      console.log(e)
    }
    console.log('time', new Date().getTime() - start)
  }
  await browser.close()
  return movies
}

;(async () => {
  const urls = [ratedUrl, popularUrl]
  let ids = []
  let movies = []
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i]
    console.log('Getting data from ' + url)
    const collectedIds = await getPageContent(url, getIds)
    ids = [...ids, ...collectedIds.filter(onlyUnique)]
  }
  await removeAll()
  movies = await getMoviesData(ids)
})()
