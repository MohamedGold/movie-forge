
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



// ! ================================================





// 'use client'
// import { Film } from '@/interfaces'
// import { MediaType } from '@/types'
// import { useEffect, useState } from 'react'
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
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(2)
//   const [onLoading, setOnLoading] = useState(false)
//   const [isInitialized, setIsInitialized] = useState(false) // Track initialization state
//   const router = useRouter()
//   const { listTitle } = useParams<any>()
//   const { query } = useQuery()

//   // Define a unique key for each page type and query combination
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
//   const fetch = async (reset = false) => {
//     if (!request || !isInitialized) return // Ensure initialization

//     setOnLoading(true)
//     const { films: newFilms, totalPages } = await request(currentPage)

//     setOnLoading(false)
//     setTotalPages(totalPages)
//     if (reset) {
//       setFilms(newFilms)
//     } else {
//       setFilms((arrs) => [...arrs, ...newFilms])
//     }
//   }

//   // Handle page change
//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return

//     // Save the current scroll position for the current page
//     sessionStorage.setItem(
//       `${scrollKey}-scrollPosition-${currentPage}`,
//       `${window.scrollY}`
//     )

//     setCurrentPage(pageNumber)

//     // Scroll to the top of the page when changing pages
//     setTimeout(() => {
//       window.scrollTo(0, 0)
//     }, 0)
//   }

//   // Fetch films when page changes
//   useEffect(() => {
//     if (isInitialized) {
//       fetch(true) // Fetch with reset
//       // Save the current page in sessionStorage
//       sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))

//       // Restore the scroll position when coming back to a page
//       const savedScrollPosition = sessionStorage.getItem(
//         `${scrollKey}-scrollPosition-${currentPage}`
//       )
//       if (savedScrollPosition) {
//         setTimeout(() => {
//           window.scrollTo(0, parseFloat(savedScrollPosition))
//         }, 100) // Ensure the page is loaded before restoring scroll position
//       }
//     }
//   }, [query, props.type, currentPage, isInitialized])

//   // Reset to page 1 on new search query
//   useEffect(() => {
//     setCurrentPage(1) // Reset to first page on new query
//   }, [query])

//   // Initialization effect to restore state
//   useEffect(() => {
//     const savedPage = sessionStorage.getItem(`${scrollKey}-currentPage`)
//     if (savedPage) {
//       setCurrentPage(parseInt(savedPage, 10))
//     }

//     // Restore scroll position for the current page
//     const savedScrollPosition = sessionStorage.getItem(
//       `${scrollKey}-scrollPosition-${currentPage}`
//     )
//     if (savedScrollPosition) {
//       setTimeout(() => {
//         window.scrollTo(0, parseFloat(savedScrollPosition))
//       }, 200)
//     }

//     setIsInitialized(true) // Mark component as initialized after restoring state

//     // Save scroll position on scroll
//     const handleScroll = () => {
//       sessionStorage.setItem(
//         `${scrollKey}-scrollPosition-${currentPage}`,
//         `${window.scrollY}`
//       )
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, []) // Run only once on component mount

//   // Generate page numbers for pagination
//   const renderPageNumbers = () => {
//     const pages = []
//     const startPage = Math.max(1, currentPage - 1)
//     const endPage = Math.min(totalPages, currentPage + 1)

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`px-3 py-1 border mx-1 ${
//             currentPage === i
//               ? 'bg-primary text-yellow-300 font-bold border-white/60'
//               : 'bg-body text-white border-white/60 hover:border-transparent transition-all duration-200'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       )
//     }
//     return pages
//   }

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

//       {/* Page Navigation - Top */}
//       <div className="flex justify-center flex-wrap mb-3 mobile:gap-y-2  mt-7 space-x-2 ">
//         <button
//           hidden={currentPage === 1}
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)} // زر للانتقال إلى الصفحة الأولى
//           className="px-4 py-2 border hover:border-transparent transition-all duration-200  rounded disabled:opacity-50"
//         >
//           First
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Prev
//         </button>
//         {renderPageNumbers()}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Next
//         </button>
//       </div>
//       <div className="min-h-[calc(100vh_-_200px)]">
//         {/* Films */}
//         <Section>
//           <div className="grid  mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 relative z-[11]">
//             {films.map((film, i) => (
//               <div key={i}>
//                 <Card
//                   onClick={() => {
//                     router.push(`/${film.mediaType}/${film.id}`)
//                   }}
//                   imageSrc={tmdbImageSrc(film.posterPath)}
//                   title={film.title}
//                   rating={film.rating}
//                   genreIds={film.genreIds}
//                   views={film.views}
//                   mediaType={film.mediaType}
//                   releaseDate={film.releaseDate}
//                 />
//               </div>
//             ))}
//           </div>
//         </Section>
//       </div>
//       {/* Page Navigation - Bottom */}
//       <div className="flex justify-center flex-wrap mobile:gap-y-3 mt-4 space-x-2">
//         <button
//           hidden={currentPage === 1}
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)} // زر للانتقال إلى الصفحة الأولى
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           First
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Prev
//         </button>
//         {renderPageNumbers()}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }





// 'use client'
// import { Film, Genre } from '@/interfaces'
// import { MediaType } from '@/types'
// import { useEffect, useState } from 'react'
// import Section from './Section'
// import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import Card from './Card'
// import { discover, getTopRated, search, getGenres } from '@/api/tmdb-api'
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
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(2)
//   const [onLoading, setOnLoading] = useState(false)
//   const [isInitialized, setIsInitialized] = useState(false) // Track initialization state
//   const [genres, setGenres] = useState<Genre[]>([]) // Store fetched genres
//   const [selectedGenre, setSelectedGenre] = useState<string>('') // Track selected genre
//   const router = useRouter()
//   const { listTitle } = useParams<any>()
//   const { query } = useQuery()

//   const scrollKey = `${props.type}-${query || listTitle || 'catalog'}`

//   // Fetch available genres
//   useEffect(() => {
//     const fetchGenres = async () => {
//       if (props.type === 'movie' || props.type === 'tv') {
//         const fetchedGenres = await getGenres(props.type)
//         setGenres(fetchedGenres)
//       }
//     }
//     fetchGenres()
//   }, [props.type])

//   switch (props.type) {
//     case 'movie':
//       title = 'Movies'
//       request = (page: number) => discover('movie', page, selectedGenre) // Pass genre
//       break

//     case 'tv':
//       title = 'TV'
//       request = (page: number) => discover('tv', page, selectedGenre) // Pass genre
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

//   const fetch = async (reset = false) => {
//     if (!request || !isInitialized) return // Ensure initialization

//     setOnLoading(true)
//     const { films: newFilms, totalPages } = await request(currentPage)

//     setOnLoading(false)
//     setTotalPages(totalPages)
//     if (reset) {
//       setFilms(newFilms)
//     } else {
//       setFilms((arrs) => [...arrs, ...newFilms])
//     }
//   }

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return

//     sessionStorage.setItem(
//       `${scrollKey}-scrollPosition-${currentPage}`,
//       `${window.scrollY}`
//     )

//     setCurrentPage(pageNumber)

//     setTimeout(() => {
//       window.scrollTo(0, 0)
//     }, 0)
//   }

//   useEffect(() => {
//     if (isInitialized) {
//       fetch(true)
//       sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))

//       const savedScrollPosition = sessionStorage.getItem(
//         `${scrollKey}-scrollPosition-${currentPage}`
//       )
//       if (savedScrollPosition) {
//         setTimeout(() => {
//           window.scrollTo(0, parseFloat(savedScrollPosition))
//         }, 100)
//       }
//     }
//   }, [query, props.type, currentPage, isInitialized, selectedGenre])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [query])

//   useEffect(() => {
//     const savedPage = sessionStorage.getItem(`${scrollKey}-currentPage`)
//     if (savedPage) {
//       setCurrentPage(parseInt(savedPage, 10))
//     }

//     const savedScrollPosition = sessionStorage.getItem(
//       `${scrollKey}-scrollPosition-${currentPage}`
//     )
//     if (savedScrollPosition) {
//       setTimeout(() => {
//         window.scrollTo(0, parseFloat(savedScrollPosition))
//       }, 200)
//     }

//     setIsInitialized(true)

//     const handleScroll = () => {
//       sessionStorage.setItem(
//         `${scrollKey}-scrollPosition-${currentPage}`,
//         `${window.scrollY}`
//       )
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const renderPageNumbers = () => {
//     const pages = []
//     const startPage = Math.max(1, currentPage - 1)
//     const endPage = Math.min(totalPages, currentPage + 1)

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`px-3 py-1 border mx-1 ${
//             currentPage === i
//               ? 'bg-primary text-yellow-300 font-bold border-white/60'
//               : 'bg-body text-white border-white/60 hover:border-transparent transition-all duration-200'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       )
//     }
//     return pages
//   }

//   return (
//     <div className="min-h-[calc(100vh_-_300px)]">
//       <div className="h-[120px] left-0 right-0 top-0 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
//         <div className="h-full w-full bg-primary"></div>
//       </div>

//       <Section
//         className="-mt-[90px] flex items-center relative z-10"
//         title={title}
//       ></Section>

//       {/* Genre Filter */}
//       {genres.length > 0 && (
//         <div className="my-4 flex justify-center">
//           <select
//             className="px-4 py-2 border rounded"
//             value={selectedGenre}
//             onChange={(e) => setSelectedGenre(e.target.value)}
//           >
//             <option value="">All Genres</option>
//             {genres.map((genre) => (
//               <option key={genre.id} value={genre.id}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       <div className="flex justify-center flex-wrap mb-3 mobile:gap-y-2  mt-7 space-x-2 ">
//         <button
//           hidden={currentPage === 1}
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)}
//           className="px-4 py-2 border hover:border-transparent transition-all duration-200  rounded disabled:opacity-50"
//         >
//           First
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Prev
//         </button>
//         {renderPageNumbers()}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Next
//         </button>
//       </div>

//       <div className="min-h-[calc(100vh_-_200px)]">
//         <Section>
//           <div className="grid  mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 relative z-[11]">
//             {films.map((film, i) => (
//               <div key={i}>
//                 <Card
//                   onClick={() => {
//                     router.push(`/${film.mediaType}/${film.id}`)
//                   }}
//                   imageSrc={tmdbImageSrc(film.posterPath)}
//                   title={film.title}
//                   rating={film.rating}
//                   genreIds={film.genreIds}
//                   views={film.views}
//                   mediaType={film.mediaType}
//                   releaseDate={film.releaseDate}
//                 />
//               </div>
//             ))}
//           </div>
//         </Section>
//       </div>

//       <div className="flex justify-center flex-wrap mobile:gap-y-3 mt-4 space-x-2">
//         <button
//           hidden={currentPage === 1}
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           First
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Prev
//         </button>
//         {renderPageNumbers()}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   )
// }









// ! =================================================================================================




// // catalog.tsx:
// 'use client'
// import { Film, Genre } from '@/interfaces'
// import { MediaType } from '@/types'
// import { useEffect, useState, useRef } from 'react'
// import Section from './Section'
// import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import Card from './Card'
// import { discover, getTopRated, search, getGenres } from '@/api/tmdb-api'
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
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(2)
//   const [onLoading, setOnLoading] = useState(false)
//   const [isInitialized, setIsInitialized] = useState(false) // Track initialization state
//   const [genres, setGenres] = useState<Genre[]>([]) // Store fetched genres
//   const [selectedGenres, setSelectedGenres] = useState<string[]>([]) // Final selected genres
//   const [temporarySelectedGenres, setTemporarySelectedGenres] = useState<string[]>([]) // Temporary genre selections
//   const [isFilterOpen, setIsFilterOpen] = useState(false) // Track modal state
//   const router = useRouter()
//   const { listTitle } = useParams<any>()
//   const { query } = useQuery()

//   const scrollKey = `${props.type}-${query || listTitle || 'catalog'}`

//   const modalRef = useRef<HTMLDivElement>(null)

//   // Fetch available genres
//   useEffect(() => {
//     const fetchGenres = async () => {
//       if (['movie', 'tv', 'search', 'list'].includes(props.type)) {
//         const fetchedGenres = await getGenres('movie') // Adjust fetch logic for generic usage
//         setGenres(fetchedGenres)
//       }
//     }
//     fetchGenres()
//   }, [props.type])

//   // Handle genre filtering logic
//   switch (props.type) {
//     case 'movie':
//       title = 'Movies'
//       request = (page: number) =>
//         discover('movie', page, selectedGenres.join(',')) // Pass final selected genres
//       break

//     case 'tv':
//       title = 'TV'
//       request = (page: number) => discover('tv', page, selectedGenres.join(',')) // Pass final selected genres
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

//   const fetch = async (reset = false) => {
//     if (!request || !isInitialized) return // Ensure initialization

//     setOnLoading(true)
//     const { films: newFilms, totalPages } = await request(currentPage)

//     setOnLoading(false)
//     setTotalPages(totalPages)
//     if (reset) {
//       setFilms(newFilms)
//     } else {
//       setFilms((arrs) => [...arrs, ...newFilms])
//     }
//   }

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return

//     sessionStorage.setItem(
//       `${scrollKey}-scrollPosition-${currentPage}`,
//       `${window.scrollY}`
//     )

//     setCurrentPage(pageNumber)

//     setTimeout(() => {
//       window.scrollTo(0, 0)
//     }, 0)
//   }

//   // Genre selection handler (Temporary)
//   const handleGenreSelect = (genreId: number) => {
//     const genreIdStr = String(genreId) // Convert number to string
//     if (temporarySelectedGenres.includes(genreIdStr)) {
//       setTemporarySelectedGenres(
//         temporarySelectedGenres.filter((id) => id !== genreIdStr)
//       )
//     } else {
//       setTemporarySelectedGenres([...temporarySelectedGenres, genreIdStr])
//     }
//   }

//   // Close the modal when clicking outside
//   const handleOutsideClick = (event: MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//       setIsFilterOpen(false)
//     }
//   }

//   useEffect(() => {
//     if (isFilterOpen) {
//       document.addEventListener('mousedown', handleOutsideClick)
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClick)
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick)
//     }
//   }, [isFilterOpen])

//   useEffect(() => {
//     if (isInitialized) {
//       fetch(true)
//       sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))

//       const savedScrollPosition = sessionStorage.getItem(
//         `${scrollKey}-scrollPosition-${currentPage}`
//       )
//       if (savedScrollPosition) {
//         setTimeout(() => {
//           window.scrollTo(0, parseFloat(savedScrollPosition))
//         }, 100)
//       }
//     }
//   }, [query, props.type, currentPage, isInitialized, selectedGenres])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [query])

//   useEffect(() => {
//     const savedPage = sessionStorage.getItem(`${scrollKey}-currentPage`)
//     if (savedPage) {
//       setCurrentPage(parseInt(savedPage, 10))
//     }

//     const savedScrollPosition = sessionStorage.getItem(
//       `${scrollKey}-scrollPosition-${currentPage}`
//     )
//     if (savedScrollPosition) {
//       setTimeout(() => {
//         window.scrollTo(0, parseFloat(savedScrollPosition))
//       }, 200)
//     }

//     setIsInitialized(true)

//     const handleScroll = () => {
//       sessionStorage.setItem(
//         `${scrollKey}-scrollPosition-${currentPage}`,
//         `${window.scrollY}`
//       )
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const renderPageNumbers = () => {
//     const pages = []
//     const startPage = Math.max(1, currentPage - 1)
//     const endPage = Math.min(totalPages, currentPage + 1)

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`px-3 py-1 border mx-1 ${
//             currentPage === i
//               ? 'bg-primary text-yellow-300 font-bold border-white/60'
//               : 'bg-body text-white border-white/60 hover:border-transparent transition-all duration-200'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       )
//     }
//     return pages
//   }

//   return (
//     <div className="min-h-[calc(100vh_-_300px)]">
//       <div className="h-[120px] left-0 right-0 top-0 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
//         <div className="h-full w-full bg-primary"></div>
//       </div>

//       <Section
//         className="-mt-[90px] flex items-center relative z-10"
//         title={title}
//       ></Section>

//       {/* Filter Button */}
//       {['movie', 'tv', 'search', 'list'].includes(props.type) && (
//         <div className="flex justify-center my-4">
//           <button
//             className="px-4 py-2 mt-5 bg-primary text-white rounded-lg"
//             onClick={() => setIsFilterOpen(true)}
//           >
//             Filter
//           </button>
//         </div>
//       )}

//       {/* Filter Modal Popup */}
//       {isFilterOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 top-0 flex justify-center items-center z-50">
//           <div
//             ref={modalRef}
//             className="bg-primary p-6 rounded-lg mt-10 shadow-lg w-[90%] max-w-lg"
//           >
//             <h2 className="text-lg font-bold mb-4">Select Genres</h2>
//             <div className="grid grid-cols-3 gap-4 mt-10 mb-4">
//               {genres.map((genre) => (
//                 <button
//                   key={String(genre.id)} // Convert genre.id to string
//                   onClick={() => handleGenreSelect(genre.id)}
//                   className={`px-4 py-2 border rounded-lg ${
//                     temporarySelectedGenres.includes(String(genre.id))
//                       ? 'bg-yellow-500 text-black font-semibold'
//                       : 'bg-header'
//                   }`}
//                 >
//                   {genre.name}
//                 </button>
//               ))}
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-500  text-white rounded-lg"
//                 onClick={() => {
//                   setTemporarySelectedGenres([]) // Clear all selected genres
//                 }}
//               >
//                 Reset
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                 onClick={() => setIsFilterOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-700 text-white rounded-lg"
//                 onClick={() => {
//                   setSelectedGenres(temporarySelectedGenres)
//                   setCurrentPage(1) // Reset to the first page
//                   fetch(true)
//                   setIsFilterOpen(false)
//                 }}
//               >
//                 Find
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center flex-wrap mb-3 mobile:gap-y-2 mt-7 space-x-2">
//         <button
//           hidden={currentPage === 1}
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)}
//           className="px-4 py-2 border hover:border-transparent transition-all duration-200 rounded disabled:opacity-50"
//         >
//           First
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Prev
//         </button>
//         {renderPageNumbers()}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Next
//         </button>
//       </div>

//       <div className="min-h-[calc(100vh_-_200px)]">
//         <Section>
//           <div className="grid mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
//             {films.length > 0 ? (
//               films.map((film, i) => (
//                 <div key={i}>
//                   <Card
//                     onClick={() => {
//                       router.push(`/${film.mediaType}/${film.id}`)
//                     }}
//                     imageSrc={tmdbImageSrc(film.posterPath)}
//                     title={film.title}
//                     rating={film.rating}
//                     genreIds={film.genreIds}
//                     views={film.views}
//                     mediaType={film.mediaType}
//                     releaseDate={film.releaseDate}
//                   />
//                 </div>
//               ))
//             ) : (
//               ''
//             )}
//           </div>
//         </Section>
//       </div>
//     </div>
//   )
// }




// !================================================================================================



// !best one yet
// // catalog.tsx:
// 'use client'
// import { Film, Genre } from '@/interfaces'
// import { MediaType } from '@/types'
// import { useEffect, useState, useRef } from 'react'
// import Section from './Section'
// import { useParams, useRouter, useSearchParams } from 'next/navigation'
// import Card from './Card'
// import { discover, getTopRated, search, getGenres } from '@/api/tmdb-api'
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
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(2)
//   const [onLoading, setOnLoading] = useState(false)
//   const [isInitialized, setIsInitialized] = useState(false) // Track initialization state
//   const [genres, setGenres] = useState<Genre[]>([]) // Store fetched genres
//   const [selectedGenres, setSelectedGenres] = useState<string[]>([]) // Final selected genres
//   const [temporarySelectedGenres, setTemporarySelectedGenres] = useState<string[]>([]) // Temporary genre selections
//   const [isFilterOpen, setIsFilterOpen] = useState(false) // Track modal state
//   const router = useRouter()
//   const { listTitle } = useParams<any>()
//   const { query } = useQuery()

//   const scrollKey = `${props.type}-${query || listTitle || 'catalog'}`

//   const modalRef = useRef<HTMLDivElement>(null)

//   // Fetch available genres
//   useEffect(() => {
//     const fetchGenres = async () => {
//       if (['movie', 'tv', 'search', 'list'].includes(props.type)) {
//         const fetchedGenres = await getGenres('movie') // Adjust fetch logic for generic usage
//         setGenres(fetchedGenres)
//       }
//     }
//     fetchGenres()
//   }, [props.type])

//   // Handle genre filtering logic
//   switch (props.type) {
//     case 'movie':
//       title = 'Movies'
//       request = (page: number) =>
//         discover('movie', page, selectedGenres.join(',')) // Pass final selected genres
//       break

//     case 'tv':
//       title = 'TV'
//       request = (page: number) => discover('tv', page, selectedGenres.join(',')) // Pass final selected genres
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

//   const fetch = async (reset = false) => {
//     if (!request || !isInitialized) return // Ensure initialization

//     setOnLoading(true)
//     const { films: newFilms, totalPages } = await request(currentPage)

//     setOnLoading(false)
//     setTotalPages(totalPages)
//     if (reset) {
//       setFilms(newFilms)
//     } else {
//       setFilms((arrs) => [...arrs, ...newFilms])
//     }

//     // Save state to session storage
//     sessionStorage.setItem(`${scrollKey}-films`, JSON.stringify(newFilms))
//     sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))
//     sessionStorage.setItem(`${scrollKey}-selectedGenres`, JSON.stringify(selectedGenres))
//     sessionStorage.setItem(`${scrollKey}-temporarySelectedGenres`, JSON.stringify(temporarySelectedGenres))
//   }

//   const handlePageChange = (pageNumber: number) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return

//     sessionStorage.setItem(
//       `${scrollKey}-scrollPosition-${currentPage}`,
//       `${window.scrollY}`
//     )

//     setCurrentPage(pageNumber)

//     setTimeout(() => {
//       window.scrollTo(0, 0)
//     }, 0)
//   }

//   // Genre selection handler (Temporary)
//   const handleGenreSelect = (genreId: number) => {
//     const genreIdStr = String(genreId) // Convert number to string
//     if (temporarySelectedGenres.includes(genreIdStr)) {
//       setTemporarySelectedGenres(
//         temporarySelectedGenres.filter((id) => id !== genreIdStr)
//       )
//     } else {
//       setTemporarySelectedGenres([...temporarySelectedGenres, genreIdStr])
//     }

//     // Save temporary selections to sessionStorage
//     sessionStorage.setItem(`${scrollKey}-temporarySelectedGenres`, JSON.stringify([...temporarySelectedGenres]))
//   }

//   // Close the modal when clicking outside
//   const handleOutsideClick = (event: MouseEvent) => {
//     if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
//       setIsFilterOpen(false)
//     }
//   }

//   useEffect(() => {
//     if (isFilterOpen) {
//       document.addEventListener('mousedown', handleOutsideClick)
//     } else {
//       document.removeEventListener('mousedown', handleOutsideClick)
//     }
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick)
//     }
//   }, [isFilterOpen])

//   useEffect(() => {
//     if (isInitialized) {
//       fetch(true)
//       sessionStorage.setItem(`${scrollKey}-currentPage`, String(currentPage))

//       const savedScrollPosition = sessionStorage.getItem(
//         `${scrollKey}-scrollPosition-${currentPage}`
//       )
//       if (savedScrollPosition) {
//         setTimeout(() => {
//           window.scrollTo(0, parseFloat(savedScrollPosition))
//         }, 100)
//       }
//     }
//   }, [query, props.type, currentPage, isInitialized, selectedGenres])

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [query])

//   useEffect(() => {
//     const savedPage = sessionStorage.getItem(`${scrollKey}-currentPage`)
//     const savedFilms = sessionStorage.getItem(`${scrollKey}-films`)
//     const savedSelectedGenres = sessionStorage.getItem(`${scrollKey}-selectedGenres`)
//     const savedTemporarySelectedGenres = sessionStorage.getItem(`${scrollKey}-temporarySelectedGenres`)
//     const savedScrollPosition = sessionStorage.getItem(
//       `${scrollKey}-scrollPosition-${currentPage}`
//     )

//     if (savedPage) {
//       setCurrentPage(parseInt(savedPage, 10))
//     }

//     if (savedFilms) {
//       setFilms(JSON.parse(savedFilms))
//     }

//     if (savedSelectedGenres) {
//       setSelectedGenres(JSON.parse(savedSelectedGenres))
//     }

//     if (savedTemporarySelectedGenres) {
//       setTemporarySelectedGenres(JSON.parse(savedTemporarySelectedGenres))
//     }

//     if (savedScrollPosition) {
//       setTimeout(() => {
//         window.scrollTo(0, parseFloat(savedScrollPosition))
//       }, 200)
//     }

//     setIsInitialized(true)

//     const handleScroll = () => {
//       sessionStorage.setItem(
//         `${scrollKey}-scrollPosition-${currentPage}`,
//         `${window.scrollY}`
//       )
//     }

//     window.addEventListener('scroll', handleScroll)
//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   const renderPageNumbers = () => {
//     const pages = []
//     const startPage = Math.max(1, currentPage - 1)
//     const endPage = Math.min(totalPages, currentPage + 1)

//     for (let i = startPage; i <= endPage; i++) {
//       pages.push(
//         <button
//           key={i}
//           className={`px-3 py-1 border mx-1 ${
//             currentPage === i
//               ? 'bg-primary text-yellow-300 font-bold border-white/60'
//               : 'bg-body text-white border-white/60 hover:border-transparent transition-all duration-200'
//           }`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       )
//     }
//     return pages
//   }

//   return (
//     <div className="min-h-[calc(100vh_-_300px)]">
//       <div className="h-[120px] left-0 right-0 top-0 relative">
//         <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
//         <div className="h-full w-full bg-primary"></div>
//       </div>

//       <Section
//         className="-mt-[90px] flex items-center relative z-10"
//         title={title}
//       ></Section>

//       {/* Filter and Clear All Filters Button */}
//       {['movie', 'tv', 'search', 'list'].includes(props.type) && (
//         <div className="flex  justify-center my-4 space-x-2">
//           <button
//             className="px-4 py-2 mt-5 bg-primary border tracking-wide hover:bg-blue-900 border-white/50 text-white rounded-lg"
//             onClick={() => setIsFilterOpen(true)}
//           >
//             Filter
//           </button>
//           <button
//             className="px-4 py-2 mt-5 bg-header border border-white/50 hover:bg-red-800 transition-all  text-white rounded-lg"
//             onClick={() => {
//               setTemporarySelectedGenres([])
//               setSelectedGenres([])
//               setCurrentPage(1)
//               // fetch(true)
//               sessionStorage.removeItem(`${scrollKey}-selectedGenres`)
//               sessionStorage.removeItem(`${scrollKey}-temporarySelectedGenres`)
//             }}
//           >
//             Clear All Filters
//           </button>
//         </div>
//       )}

//       {/* Filter Modal Popup */}
//       {isFilterOpen && (
//         <div className="fixed  inset-0 bg-black bg-opacity-50 top-0 flex justify-center items-center z-50">
//           <div
//             ref={modalRef}
//             className="bg-primary p-6 rounded-lg mt-10 shadow-lg w-[90%] max-w-lg"
//           >
//             <h2 className="text-lg font-bold mb-4">Select Genres</h2>
//             <div className="grid grid-cols-3 mobile:grid-cols-2 mobile:max-h-64 overflow-y-auto gap-4 mt-10 mb-4">
//               {genres.map((genre) => (
//                 <button
//                   key={String(genre.id)} // Convert genre.id to string
//                   onClick={() => handleGenreSelect(genre.id)}
//                   className={`px-4 py-2 border rounded-lg ${
//                     temporarySelectedGenres.includes(String(genre.id))
//                       ? 'bg-yellow-500 text-black font-semibold'
//                       : 'bg-header'
//                   }`}
//                 >
//                   {genre.name}
//                 </button>
//               ))}
//             </div>
//             <div className="flex justify-end space-x-2">
//               <button
//                 className="px-4 py-2 bg-gray-500  text-white rounded-lg"
//                 onClick={() => {
//                   setTemporarySelectedGenres([]) // Clear all selected genres
//                   sessionStorage.setItem(
//                     `${scrollKey}-temporarySelectedGenres`,
//                     JSON.stringify([])
//                   )
//                 }}
//               >
//                 Reset
//               </button>
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg"
//                 onClick={() => setIsFilterOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-700 text-white rounded-lg"
//                 onClick={() => {
//                   setSelectedGenres(temporarySelectedGenres)
//                   setCurrentPage(1) // Reset to the first page
//                   // fetch(true)
//                   setIsFilterOpen(false)
//                 }}
//               >
//                 Find
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="flex justify-center flex-wrap mb-3 mobile:gap-y-2 mt-7 space-x-2">
//         <button
//           hidden={currentPage === 1}
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(1)}
//           className="px-4 py-2 border hover:border-transparent transition-all duration-200 rounded disabled:opacity-50"
//         >
//           First
//         </button>
//         <button
//           disabled={currentPage === 1}
//           onClick={() => handlePageChange(currentPage - 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Prev
//         </button>
//         {renderPageNumbers()}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="px-4 py-2 border rounded disabled:opacity-50 hover:border-transparent transition-all duration-200"
//         >
//           Next
//         </button>
//       </div>

//       <div className="min-h-[calc(100vh_-_200px)]">
//         <Section>
//           <div className="grid mobile:grid-cols-2 vs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5">
//             {films.length > 0
//               ? films.map((film, i) => (
//                   <div key={i}>
//                     <Card
//                       onClick={() => {
//                         router.push(`/${film.mediaType}/${film.id}`)
//                       }}
//                       imageSrc={tmdbImageSrc(film.posterPath)}
//                       title={film.title}
//                       rating={film.rating}
//                       genreIds={film.genreIds}
//                       views={film.views}
//                       mediaType={film.mediaType}
//                       releaseDate={film.releaseDate}
//                     />
//                   </div>
//                 ))
//               : ''}
//           </div>
//         </Section>
//       </div>
//     </div>
//   )
// }





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
