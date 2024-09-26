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

// import { useRouter as uselocation } from 'next/router'

// // Utility function to get query params
// const useQuery = () => {
//   const params = useSearchParams()
//   const query = params.get('q') || '' // Extract the 'q' parameter
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

//   // const location = uselocation()

//   // Custom destructuring
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
//       title = `Search result for <i>${query}</i>`
//       request = (page: number) => search(query, page)
//       break

//     case 'list':
//       title = listTitle as string
//       if (title === 'top-rated-tv') {
//         request = (page: number) => getTopRated('tv',page)
//       } else if (title === 'top-rated-movies') {
//         request = (page: number) => getTopRated('movie',page)
//       }
//       break

//     default:
//       break
//   }

//   const fetch = async () => {
//     loadingRef.current = true
//     setOnLoading(true)

//     const { films, totalPages } = await request(page.current)

//     setOnLoading(false)
//     loadingRef.current = false

//     totalPage.current = totalPages
//     setFilms((arrs) => [...arrs, ...films])
//   }

//   // const onWindowScroll = () => {
//   //   if (loadingRef.current) return
//   //   if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
//   //     if (totalPage.current > page.current) {
//   //       page.current++
//   //       fetch()
//   //     }
//   //   }
//   // }

//   const onWindowScroll = () => {
//     if (loadingRef.current) return
//     // 200px as a buffer to trigger fetch slightly before the bottom of the page
//     if (
//       window.innerHeight + window.scrollY >=
//       document.body.scrollHeight - 200
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
//     <>
//       {/* background */}
//       <div className="h-[120px]  left-0 right-0 top-0 relative ">
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
//         <div className="grid lg:grid-cols-5 sm:grid-cols-4 mobile:grid-cols-3  relative z-[11]">
//           {films.map((film, i) => (
//             <div key={i}>
//               <Card
//                 onClick={() => router.push(`/${film.mediaType}/${film.id}`)}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 title={film.title}
//                 key={i}
//               ></Card>
//             </div>
//           ))}
//         </div>
//       </Section>
//     </>
//   )
// }

'use client'
import { Film } from '@/interfaces'
import { MediaType } from '@/types'
import { useEffect, useRef, useState } from 'react'
import Image from './Image'
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
  const page = useRef(1)
  const totalPage = useRef(2)
  const loadingRef = useRef(false)
  const [onLoading, setOnLoading] = useState(false)
  const router = useRouter()
  const { listTitle } = useParams<any>()
  const { query } = useQuery()

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
      title = `Search results for <i>${query}</i>`
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

  const fetch = async () => {
    if (loadingRef.current) return

    loadingRef.current = true
    setOnLoading(true)

    const { films, totalPages } = await request(page.current)

    setOnLoading(false)
    loadingRef.current = false

    totalPage.current = totalPages
    setFilms((arrs) => [...arrs, ...films])
  }

  const onWindowScroll = () => {
    if (loadingRef.current) return
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 200
    ) {
      if (totalPage.current > page.current) {
        page.current++
        fetch()
      }
    }
  }

  useEffect(() => {
    setFilms([])
    fetch()
  }, [query, props.type])

  useEffect(() => {
    window.addEventListener('scroll', onWindowScroll)

    return () => {
      window.removeEventListener('scroll', onWindowScroll)
    }
  }, [])

  return (
    <>
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
      {/* Films */}
      <Section>
        <div className="grid  mobile:grid-cols-2 vs:grid-cols-3  sm:grid-cols-4 lg:grid-cols-5 relative z-[11]  ">
          {films.map((film, i) => (
            <div className="mobile:max-w-[200px]   mobile:mx-auto " key={i}>
              <Card
                onClick={() => router.push(`/${film.mediaType}/${film.id}`)}
                imageSrc={tmdbImageSrc(film.posterPath)}
                title={film.title}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
              />
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
