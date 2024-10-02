
// catalog.tsx
'use client'
import { Film, Genre } from '@/interfaces'
import { MediaType } from '@/types'
import { useEffect, useState, useRef } from 'react'
import Section from './Section'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Card from './Card'
import { discover, getTopRated, search, getGenres } from '@/api/tmdb-api'
import { tmdbImageSrc } from '@/utilts'

const useQuery = () => {
  const params = useSearchParams()
  const query = params.get('q') || ''
  return { query }
}

interface Props {
  type: MediaType | 'search' | 'list'
}

export default function Catalog(props: Props) {
  let title = ''
  let request: (page: number) => Promise<{
    totalPages: number
    films: Film[]
  }>

  const [films, setFilms] = useState<Film[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(2)
  const [onLoading, setOnLoading] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [temporarySelectedGenres, setTemporarySelectedGenres] = useState<
    string[]
  >([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const router = useRouter()
  const { listTitle } = useParams<any>()
  const { query } = useQuery()

  const scrollKey = `${props.type}-${query || listTitle || 'catalog'}`

  const modalRef = useRef<HTMLDivElement>(null)

  // Fetch genres based on media type
  useEffect(() => {
    const fetchGenres = async () => {
      const mediaType =
        props.type === 'tv' || listTitle === 'top-rated-tv' ? 'tv' : 'movie'
      const fetchedGenres = await getGenres(mediaType as MediaType)
      setGenres(fetchedGenres)
    }

    fetchGenres()
  }, [props.type, listTitle])

  switch (props.type) {
    case 'movie':
      title = 'Popular Movies'
      request = (page: number) =>
        discover('movie', page, selectedGenres.join(','))
      break

    case 'tv':
      title = 'Popular TV'
      request = (page: number) => discover('tv', page, selectedGenres.join(','))
      break

    case 'search':
      title = `Search results for ${query}`
      request = (page: number) => search(query, page)
      break

    case 'list':
      if (listTitle === 'top-rated-tv') {
        title = 'Top Rated TV'
        request = (page: number) =>
          getTopRated('tv', page, selectedGenres.join(','))
      } else if (listTitle === 'top-rated-movies') {
        title = 'Top Rated Movies'
        request = (page: number) =>
          getTopRated('movie', page, selectedGenres.join(','))
      } else {
        title = listTitle as string // في حالة عدم وجود قيم محددة
      }
      break

    default:
      break
  }

  const fetch = async (reset = false) => {
    if (!request || !isInitialized) return

    setOnLoading(true)
    const { films: newFilms, totalPages } = await request(currentPage)

    setOnLoading(false)
    setTotalPages(totalPages)
    if (reset) {
      setFilms(newFilms)
    } else {
      setFilms((arrs) => [...arrs, ...newFilms])
    }

    sessionStorage.setItem(`${scrollKey}-films`, JSON.stringify(newFilms))
    sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))
    sessionStorage.setItem(
      `${scrollKey}-selectedGenres`,
      JSON.stringify(selectedGenres)
    )
    sessionStorage.setItem(
      `${scrollKey}-temporarySelectedGenres`,
      JSON.stringify(temporarySelectedGenres)
    )
  }

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return

    sessionStorage.setItem(
      `${scrollKey}-scrollPosition-${currentPage}`,
      `${window.scrollY}`
    )

    setCurrentPage(pageNumber)

    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }

  const handleGenreSelect = (genreId: number) => {
    const genreIdStr = String(genreId)
    if (temporarySelectedGenres.includes(genreIdStr)) {
      setTemporarySelectedGenres(
        temporarySelectedGenres.filter((id) => id !== genreIdStr)
      )
    } else {
      setTemporarySelectedGenres([...temporarySelectedGenres, genreIdStr])
    }

    sessionStorage.setItem(
      `${scrollKey}-temporarySelectedGenres`,
      JSON.stringify([...temporarySelectedGenres])
    )
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsFilterOpen(false)
    }
  }

  useEffect(() => {
    if (isFilterOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    } else {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [isFilterOpen])

  useEffect(() => {
    if (isInitialized) {
      fetch(true)
      sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))

      const savedScrollPosition = sessionStorage.getItem(
        `${scrollKey}-scrollPosition-${currentPage}`
      )
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseFloat(savedScrollPosition))
        }, 100)
      }
    }
  }, [query, props.type, currentPage, isInitialized, selectedGenres])

  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  useEffect(() => {
    const savedPage = sessionStorage.getItem(`${scrollKey}-currentPage`)
    const savedFilms = sessionStorage.getItem(`${scrollKey}-films`)
    const savedSelectedGenres = sessionStorage.getItem(
      `${scrollKey}-selectedGenres`
    )
    const savedTemporarySelectedGenres = sessionStorage.getItem(
      `${scrollKey}-temporarySelectedGenres`
    )
    const savedScrollPosition = sessionStorage.getItem(
      `${scrollKey}-scrollPosition-${currentPage}`
    )

    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10))
    }

    if (savedFilms) {
      setFilms(JSON.parse(savedFilms))
    }

    if (savedSelectedGenres) {
      setSelectedGenres(JSON.parse(savedSelectedGenres))
    }

    if (savedTemporarySelectedGenres) {
      setTemporarySelectedGenres(JSON.parse(savedTemporarySelectedGenres))
    }

    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseFloat(savedScrollPosition))
      }, 200)
    }

    setIsInitialized(true)

    const handleScroll = () => {
      sessionStorage.setItem(
        `${scrollKey}-scrollPosition-${currentPage}`,
        `${window.scrollY}`
      )
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const renderPageNumbers = () => {
    const pages = []
    const startPage = Math.max(1, currentPage - 1)
    const endPage = Math.min(totalPages, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`px-3 py-1 border mx-1 ${
            currentPage === i
              ? 'bg-primary text-yellow-300 font-bold border-white/60'
              : 'bg-body text-white border-white/60 hover:border-transparent transition-all duration-200'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }
    return pages
  }


  return (
    <div className="min-h-[calc(100vh_-_300px)]">
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>

      <Section
        className="-mt-[90px] flex items-center relative z-10"
        title={title}
      ></Section>

      {/* Filter and Clear All Filters Button */}
      {['movie', 'tv', 'list'].includes(props.type) && (
        <div className="flex  justify-center my-4 space-x-2">
          <button
            className="px-4 py-2 mt-5 bg-primary border tracking-wide hover:bg-blue-900 border-white/50 text-white rounded-lg"
            onClick={() => setIsFilterOpen(true)}
          >
            Filter
          </button>
          <button
            className="px-4 py-2 mt-5 bg-header border border-white/50 hover:bg-red-800 transition-all  text-white rounded-lg"
            onClick={() => {
              setTemporarySelectedGenres([])
              setSelectedGenres([])
              setCurrentPage(1)
              sessionStorage.removeItem(`${scrollKey}-selectedGenres`)
              sessionStorage.removeItem(`${scrollKey}-temporarySelectedGenres`)
              // مسح جميع الـ scroll position من sessionStorage
              Object.keys(sessionStorage).forEach((key) => {
                if (key.startsWith(`${scrollKey}-scrollPosition-`)) {
                  sessionStorage.removeItem(key)
                }
              })
            }}
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Filter Modal Popup */}
      {isFilterOpen && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 top-0 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-primary p-6 rounded-lg mt-10 shadow-lg w-[90%] max-w-lg"
          >
            <h2 className="text-lg font-bold mb-4">Select Genres</h2>
            <div className="grid grid-cols-3 mobile:grid-cols-2 mobile:max-h-64 overflow-y-auto gap-4 mt-10 mb-4">
              {genres.map((genre) => (
                <button
                  key={String(genre.id)}
                  onClick={() => handleGenreSelect(genre.id)}
                  className={`px-4 py-2 border rounded-lg ${
                    temporarySelectedGenres.includes(String(genre.id))
                      ? 'bg-yellow-500 text-black font-semibold'
                      : 'bg-header'
                  }`}
                >
                  {genre.name}
                </button>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-500  text-white rounded-lg"
                onClick={() => {
                  setTemporarySelectedGenres([])
                  sessionStorage.setItem(
                    `${scrollKey}-temporarySelectedGenres`,
                    JSON.stringify([])
                  )
                }}
              >
                Reset
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
                onClick={() => setIsFilterOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-700 text-white rounded-lg"
                onClick={() => {
                  setSelectedGenres(temporarySelectedGenres)
                  setCurrentPage(1)
                  setIsFilterOpen(false)
                  // مسح جميع الـ scroll position من sessionStorage
                  Object.keys(sessionStorage).forEach((key) => {
                    if (key.startsWith(`${scrollKey}-scrollPosition-`)) {
                      sessionStorage.removeItem(key)
                    }
                  })
                }}
              >
                Find
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center flex-wrap mb-3 mobile:gap-y-2 mt-7 space-x-2">
        <button
          hidden={currentPage === 1}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 border hover:border-transparent transition-all duration-200 rounded disabled:opacity-50"
        >
          First
        </button>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
        >
          Prev
        </button>
        {renderPageNumbers()}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
        >
          Next
        </button>
      </div>

      <div className="min-h-[calc(100vh_-_200px)]">
        <Section>
          <div className="grid mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
            {films.length > 0
              ? films.map((film, i) => (
                  <div key={i}>
                    <Card
                      onClick={() => {
                        router.push(`/${film.mediaType}/${film.id}`)
                      }}
                      imageSrc={tmdbImageSrc(film.posterPath)}
                      title={film.title}
                      rating={film.rating}
                      genreIds={film.genreIds}
                      views={film.views}
                      mediaType={film.mediaType}
                      releaseDate={film.releaseDate}
                    />
                  </div>
                ))
              : <div className='min-h-[calc(100vh_-_300px)]'></div>}
          </div>
        </Section>
        <div className="flex justify-center flex-wrap mobile:gap-y-2 mt-10 space-x-2">
          <button
            hidden={currentPage === 1}
            disabled={currentPage === 1}
            onClick={() => handlePageChange(1)}
            className="px-4 py-2 border hover:border-transparent transition-all duration-200 rounded disabled:opacity-50"
          >
            First
          </button>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
          >
            Prev
          </button>
          {renderPageNumbers()}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
