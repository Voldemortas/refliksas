import * as React from 'react'

const Search = () => {
  //@ts-ignore
  function uniqBy(a, key) {
    //@ts-ignore
    return [...new Map(a.map(x => [x[key], x])).values()]
  }
  const ref = React.useRef<HTMLInputElement>(null)
  const searchRef = React.useRef<HTMLDataListElement>(null)
  React.useEffect(() => {
    if (ref.current !== null && searchRef.current !== null) {
      ref.current.addEventListener('keyup', async e => {
        const value = (e.target! as HTMLInputElement).value
        if (e.key === undefined || e.key === 'Enter') {
          console.log('enter')
          document.location.href =
            'movies/' +
            Array.from(searchRef.current!.options).filter(
              f => f.value == value,
            )[0].dataset.url
          document.location.reload()
          return
        }
        let search = null
        try {
          let search = await (
            await fetch('http://localhost:3000/search/' + value)
          ).json()

          let searchList = Array.from(searchRef.current!.options).map(
            e => e.value,
          )
          if (search.success && Array.isArray(search.movies)) {
            let uniq = uniqBy(search.movies, 'url')
            uniq = uniq.filter((e, i) => i < 5)
            if (JSON.stringify(searchList) !== JSON.stringify(uniq)) {
              searchList = uniq
              searchRef.current!.innerHTML = uniq
                .map(e => `<option value="${e.title}" data-url="${e.url}" />`)
                .join('')
            }
          }
        } catch (e) {}
      })
    }
  })
  return (
    <>
      <div className="searchBar">
        <input
          ref={ref}
          type="text"
          list="search-list"
          className="searchBar-input"
          placeholder="Find a movie!"
          id="search-input"
          autoComplete="off"
        />
      </div>
      <datalist id="search-list" ref={searchRef}>
        {' '}
      </datalist>
    </>
  )
}

export default Search
