
// 'use client'
// import { Film } from '@/interfaces'
// import { MediaType } from '@/types'
// import { useEffect, useRef, useState } from 'react'
// import Image from './Image'
// import Section from './Section'
// import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import Card from './Card'
// import { discover, getTopRated, search } from '@/api/tmdb-api'
// import { tmdbImageSrc } from '@/utilts'

// const useQuery = () => {
//   const params = useSearchParams()
//   const query = params.get('q') || ''
//   return { query }
// }

// interface Props {
//   type: MediaType | 'search' | 'list'
// }

// export default function Catalog(props: Props) {
//   let title = ''
//   let request: (page: number) => Promise<{
//     totalPages: number
//     films: Film[]
//   }>

//   const [films, setFilms] = useState<Film[]>([])
//   const page = useRef(1)
//   const totalPage = useRef(2)
//   const loadingRef = useRef(false)
//   const [onLoading, setOnLoading] = useState(false)
//   const router = useRouter()
//   const { listTitle } = useParams<any>()
//   const { query } = useQuery()

//   switch (props.type) {
//     case 'movie':
//       title = 'Movies'
//       request = (page: number) => discover('movie', page)
//       break

//     case 'tv':
//       title = 'TV'
//       request = (page: number) => discover('tv', page)
//       break

//     case 'search':
//       title = `Search results for <i>${query}</i>`
//       request = (page: number) => search(query, page)
//       break

//     case 'list':
//       title = listTitle as string
//       if (title === 'top-rated-tv') {
//         request = (page: number) => getTopRated('tv', page)
//       } else if (title === 'top-rated-movies') {
//         request = (page: number) => getTopRated('movie', page)
//       }
//       break

//     default:
//       break
//   }

//   const fetch = async () => {
//     if (loadingRef.current) return

//     loadingRef.current = true
//     setOnLoading(true)

//     const { films, totalPages } = await request(page.current)

//     setOnLoading(false)
//     loadingRef.current = false

//     totalPage.current = totalPages
//     setFilms((arrs) => [...arrs, ...films])
//   }

//   const onWindowScroll = () => {
//     if (loadingRef.current) return
//     if (
//       window.innerHeight + window.scrollY >=
//       document.body.scrollHeight - 400
//     ) {
//       if (totalPage.current > page.current) {
//         page.current++
//         fetch()
//       }
//     }
//   }

//   useEffect(() => {
//     setFilms([])
//     fetch()
//   }, [query, props.type])

//   useEffect(() => {
//     window.addEventListener('scroll', onWindowScroll)

//     return () => {
//       window.removeEventListener('scroll', onWindowScroll)
//     }
//   }, [])

//   return (
//     <div className="min-h-[calc(100vh_-_300px)]">
//       {/* background */}
//       <div className="h-[120px] left-0 right-0 top-0 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
//         <div className="h-full w-full bg-primary"></div>
//       </div>
//       {/* PAGE TITLE */}
//       <Section
//         className="-mt-[90px] flex items-center relative z-10"
//         title={title}
//       ></Section>
//       {/* Films */}
//       <Section >
//         <div className="grid grid-flow-row   mobile:grid-cols-2   vs:grid-cols-3  sm:grid-cols-4 lg:grid-cols-5 relative z-[11]  ">
//           {films.map((film, i) => (
//             <div className="      " key={i}>
//               <Card
//                 onClick={() => router.push(`/${film.mediaType}/${film.id}`)}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 title={film.title}
//                 rating={film.rating} // التقييم
//                 genreIds={film.genreIds} // تمرير الـ genreIds
//                 views={film.views} // عدد المشاهدات
//                 mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
//                 releaseDate={film.releaseDate}
//               />
//             </div>
//           ))}
//         </div>
//       </Section>
//     </div>
//   )
// }







// !=============================================================================






// 'use client'
// import { Film } from '@/interfaces'
// import { MediaType } from '@/types'
// import { useEffect, useRef, useState } from 'react'
// import Section from './Section'
// import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import Card from './Card'
// import { discover, getTopRated, search } from '@/api/tmdb-api'
// import { tmdbImageSrc } from '@/utilts'

// const useQuery = () => {
//   const params = useSearchParams()
//   const query = params.get('q') || ''
//   return { query }
// }

// interface Props {
//   type: MediaType | 'search' | 'list'
// }

// export default function Catalog(props: Props) {
//   let title = ''
//   let request: (page: number) => Promise<{
//     totalPages: number
//     films: Film[]
//   }>

//   const [films, setFilms] = useState<Film[]>([])
//   const page = useRef(1)
//   const totalPage = useRef(2)
//   const loadingRef = useRef(false)
//   const [onLoading, setOnLoading] = useState(false)
//   const router = useRouter()
//   const { listTitle } = useParams<any>()
//   const { query } = useQuery()

//   // مفتاح فريد لحفظ مكان التمرير لكل صفحة بناءً على نوع الصفحة أو نتائج البحث
//   const scrollKey = `${props.type}-${query || listTitle || 'catalog'}`

//   // Fetch data based on type (movies, tv, search, list)
//   switch (props.type) {
//     case 'movie':
//       title = 'Movies'
//       request = (page: number) => discover('movie', page)
//       break

//     case 'tv':
//       title = 'TV'
//       request = (page: number) => discover('tv', page)
//       break

//     case 'search':
//       title = `Search results for ${query}`
//       request = (page: number) => search(query, page)
//       break

//     case 'list':
//       title = listTitle as string
//       if (title === 'top-rated-tv') {
//         request = (page: number) => getTopRated('tv', page)
//       } else if (title === 'top-rated-movies') {
//         request = (page: number) => getTopRated('movie', page)
//       }
//       break

//     default:
//       break
//   }

//   // Function to fetch the films
//   const fetch = async () => {
//     if (loadingRef.current) return

//     loadingRef.current = true
//     setOnLoading(true)

//     const { films, totalPages } = await request(page.current)

//     setOnLoading(false)
//     loadingRef.current = false

//     totalPage.current = totalPages
//     setFilms((arrs) => [...arrs, ...films])
//   }

//   // Infinite scroll handling
//   const onWindowScroll = () => {
//     if (loadingRef.current) return
//     if (
//       window.innerHeight + window.scrollY >=
//       document.body.scrollHeight - 400
//     ) {
//       if (totalPage.current > page.current) {
//         page.current++
//         fetch()
//       }
//     }
//   }

//   useEffect(() => {
//     // استعادة مكان التمرير عند تحميل صفحة الكاتالوج
//     const savedScrollPosition = sessionStorage.getItem(scrollKey)
//     if (savedScrollPosition) {
//       // استعادة مكان التمرير بعد تحميل الصفحة بالكامل
//       setTimeout(() => {
//         window.scrollTo(0, parseFloat(savedScrollPosition))
//       }, 500)
//     }

//     // Event listener to save scroll position in session storage live
//     const handleScroll = () => {
//       sessionStorage.setItem(scrollKey, `${window.scrollY}`)
//     }

//     // Add scroll event listener to track scroll position live
//     window.addEventListener('scroll', handleScroll)

//     // Cleanup the event listener on component unmount
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [query, props.type])

//   useEffect(() => {
//     setFilms([]) // إعادة ضبط الأفلام عند تغيير النوع أو البحث
//     page.current = 1 // إعادة تعيين الصفحة إلى 1
//     fetch()
//   }, [query, props.type])

//   useEffect(() => {
//     window.addEventListener('scroll', onWindowScroll)

//     return () => {
//       window.removeEventListener('scroll', onWindowScroll)
//     }
//   }, [])

//   return (
//     <div className="min-h-[calc(100vh_-_300px)]">
//       {/* background */}
//       <div className="h-[120px] left-0 right-0 top-0 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
//         <div className="h-full w-full bg-primary"></div>
//       </div>
//       {/* PAGE TITLE */}
//       <Section
//         className="-mt-[90px] flex items-center relative z-10"
//         title={title}
//       ></Section>
//       {/* Films */}
//       <Section>
//         <div className="grid grid-flow-row mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 relative z-[11]">
//           {films.map((film, i) => (
//             <div key={i}>
//               <Card
//                 onClick={() => {
//                   router.push(`/${film.mediaType}/${film.id}`)
//                 }}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 title={film.title}
//                 rating={film.rating} // التقييم
//                 genreIds={film.genreIds} // تمرير الـ genreIds
//                 views={film.views} // عدد المشاهدات
//                 mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
//                 releaseDate={film.releaseDate}
//               />
//             </div>
//           ))}
//         </div>
//       </Section>
//     </div>
//   )
// }









'use client'
import { Film } from '@/interfaces'
import { MediaType } from '@/types'
import { useEffect, useState } from 'react'
import Section from './Section'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Card from './Card'
import { discover, getTopRated, search } from '@/api/tmdb-api'
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
  const [isInitialized, setIsInitialized] = useState(false) // Track initialization state
  const router = useRouter()
  const { listTitle } = useParams<any>()
  const { query } = useQuery()

  // Define a unique key for each page type and query combination
  const scrollKey = `${props.type}-${query || listTitle || 'catalog'}`

  // Fetch data based on type (movies, tv, search, list)
  switch (props.type) {
    case 'movie':
      title = 'Movies'
      request = (page: number) => discover('movie', page)
      break

    case 'tv':
      title = 'TV'
      request = (page: number) => discover('tv', page)
      break

    case 'search':
      title = `Search results for ${query}`
      request = (page: number) => search(query, page)
      break

    case 'list':
      title = listTitle as string
      if (title === 'top-rated-tv') {
        request = (page: number) => getTopRated('tv', page)
      } else if (title === 'top-rated-movies') {
        request = (page: number) => getTopRated('movie', page)
      }
      break

    default:
      break
  }

  // Function to fetch the films
  const fetch = async (reset = false) => {
    if (!request || !isInitialized) return // Ensure initialization

    setOnLoading(true)
    const { films: newFilms, totalPages } = await request(currentPage)

    setOnLoading(false)
    setTotalPages(totalPages)
    if (reset) {
      setFilms(newFilms)
    } else {
      setFilms((arrs) => [...arrs, ...newFilms])
    }
  }

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return

    // Save the current scroll position for the current page
    sessionStorage.setItem(
      `${scrollKey}-scrollPosition-${currentPage}`,
      `${window.scrollY}`
    )

    setCurrentPage(pageNumber)

    // Scroll to the top of the page when changing pages
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)
  }

  // Fetch films when page changes
  useEffect(() => {
    if (isInitialized) {
      fetch(true) // Fetch with reset
      // Save the current page in sessionStorage
      sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))

      // Restore the scroll position when coming back to a page
      const savedScrollPosition = sessionStorage.getItem(
        `${scrollKey}-scrollPosition-${currentPage}`
      )
      if (savedScrollPosition) {
        setTimeout(() => {
          window.scrollTo(0, parseFloat(savedScrollPosition))
        }, 100) // Ensure the page is loaded before restoring scroll position
      }
    }
  }, [query, props.type, currentPage, isInitialized])

  // Reset to page 1 on new search query
  useEffect(() => {
    setCurrentPage(1) // Reset to first page on new query
  }, [query])

  // Initialization effect to restore state
  useEffect(() => {
    const savedPage = sessionStorage.getItem(`${scrollKey}-currentPage`)
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10))
    }

    // Restore scroll position for the current page
    const savedScrollPosition = sessionStorage.getItem(
      `${scrollKey}-scrollPosition-${currentPage}`
    )
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseFloat(savedScrollPosition))
      }, 200)
    }

    setIsInitialized(true) // Mark component as initialized after restoring state

    // Save scroll position on scroll
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
  }, []) // Run only once on component mount

  // Generate page numbers for pagination
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
      {/* background */}
      <div className="h-[120px] left-0 right-0 top-0 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
        <div className="h-full w-full bg-primary"></div>
      </div>
      {/* PAGE TITLE */}
      <Section
        className="-mt-[90px] flex items-center relative z-10"
        title={title}
      ></Section>

      {/* Page Navigation - Top */}
      <div className="flex justify-center flex-wrap mb-3 mobile:gap-y-2  mt-7 space-x-2 ">
        <button
          hidden={currentPage === 1}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)} // زر للانتقال إلى الصفحة الأولى
          className="px-4 py-2 border hover:border-transparent transition-all duration-200  rounded disabled:opacity-50"
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
        {/* Films */}
        <Section>
          <div className="grid  mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 relative z-[11]">
            {films.map((film, i) => (
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
            ))}
          </div>
        </Section>
      </div>
      {/* Page Navigation - Bottom */}
      <div className="flex justify-center flex-wrap mobile:gap-y-3 mt-4 space-x-2">
        <button
          hidden={currentPage === 1}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(1)} // زر للانتقال إلى الصفحة الأولى
          className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
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
  )
}


