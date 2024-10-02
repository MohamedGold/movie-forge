// 'use client'
// import { Film } from '@/interfaces'
// import { useEffect, useRef, useState } from 'react'
// import Image from './Image'
// import { search } from '@/api/tmdb-api'
// import { tmdbImageSrc } from '@/utilts'
// import { useGlobalContext } from '@/app/RootLayout'
// import { useRouter } from 'next/navigation'

// interface Props {
//   keyword: string
//   goToSearchPage: Function
// }

// export default function SearchResults(props: Props) {
//   const [items, setItems] = useState<Film[]>([])

//   const [totalItem, setTotalItem] = useState(0)

//   const searchTimeout = useRef<any>('')

//   const globalContext = useGlobalContext()

//   const router = useRouter()

//   const fetch = async () => {
//     // if(props.keyword) return

//     clearTimeout(searchTimeout.current)
//     searchTimeout.current = setTimeout(async () => {
//       const res = await search(props.keyword)
//       setTotalItem(res.totalResults)
//       setItems(res.films)
//     }, 120)
//   }

//   useEffect(() => {
//     fetch()
//   }, [props.keyword])

//   return (
//     <div className="absolute top-[48px]   left-0 right-0 rounded-md overflow-auto scrollbar scrollbar-thumb-primary scrollbar-track-header bg-header max-h-[480px] shadow-lg  ">
//       {items.map((film, i) => (
//         <div
//           key={i}
//           className="flex items-start p-1.5 mobile:flex-col mobile:items-center mobile:justify-center   rounded-lg hover:bg-primary cursor-pointer my-1.5"
//           onClick={() => router.push(`/${film.mediaType}/${film.id}`)}
//         >
//           {/* image */}
//           <Image
//             alt=""
//             src={tmdbImageSrc(film.posterPath)}
//             className="h-[72px] min-h-[72px]  mobile:max-w-[150px]  max-h-[72px] max-w-[102px] min-w-[102px] w-[102px] rounded-md"
//           ></Image>
//           {/* title and genres */}
//           <div className="px-3 mobile:text-center truncate">
//             <p className="text-base  mt-1 mobile:text-wrap truncate">
//               {film.title}
//             </p>
//             <ul className="flex  flex-wrap mobile:justify-center gap-x-1.5 text-sm opacity-[0.7]">
//               {film.genreIds.map((id, i) => (
//                 <li key={i}>
//                   {
//                     globalContext.genres[film.mediaType].find(
//                       (g) => g.id === id
//                     )?.name
//                   }
//                   {i !== film.genreIds.length - 1 ? ' ,' : ''}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       ))}

//       {totalItem > 5 ? (
//         <button
//           onClick={() => props.goToSearchPage()}
//           className="px-3 py-1.5 bg-primary w-full hover:text-white/20 sticky bottom-0 shadow-lg  "
//         >
//           More results
//         </button>
//       ) : (
//         ''
//       )}
//     </div>
//   )
// }











'use client'
import { Film } from '@/interfaces'
import { useEffect, useRef, useState } from 'react'
import Image from './Image'
import { search } from '@/api/tmdb-api'
import { tmdbImageSrc } from '@/utilts'
import { useGlobalContext } from '@/app/RootLayout'
import { useRouter } from 'next/navigation'

interface Props {
  keyword: string
  goToSearchPage: Function
}

export default function SearchResults(props: Props) {
  const [items, setItems] = useState<Film[]>([])
  const [totalItem, setTotalItem] = useState(0)
  const [loading, setLoading] = useState(false)
  const searchTimeout = useRef<any>(null)

  const globalContext = useGlobalContext()
  const router = useRouter()

  // Function to handle the keyword and add space if missing
  const handleKeyword = (keyword: string): string => {
    const trimmedKeyword = keyword.trim()
    // Add space if there is no space at the end
    return trimmedKeyword.length > 0 && keyword[keyword.length - 1] !== ' '
      ? keyword + ' '
      : keyword
  }

  const fetch = async () => {
    clearTimeout(searchTimeout.current)
    setLoading(true)
    searchTimeout.current = setTimeout(async () => {
      const modifiedKeyword = handleKeyword(props.keyword) // Handle the keyword
      if (modifiedKeyword.trim()) {
        const res = await search(modifiedKeyword)
        setTotalItem(res.totalResults)
        setItems(res.films)
      } else {
        setTotalItem(0)
        setItems([])
      }
      setLoading(false)
    }, 300) // Adjust debounce delay
  }

  useEffect(() => {
    fetch()
  }, [props.keyword])

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="bg-yellow-800">
          {part}
        </span>
      ) : (
        part
      )
    )
  }

  return (
    <div
      className="absolute top-[44px] left-0 right-0 rounded-md overflow-auto scrollbar scrollbar-thumb-primary scrollbar-track-header bg-header max-h-[480px] shadow-lg"
      role="listbox"
    >
      {loading ? (
        <div className="flex justify-center py-4">Loading...</div>
      ) : items.length > 0 ? (
        items.map((film, i) => (
          <div
            key={i}
            role="option"
            aria-selected="false"
            className="flex items-start p-1.5 mobile:flex-col mobile:items-center mobile:justify-center   rounded-lg hover:bg-primary cursor-pointer my-1.5"
            onClick={() => router.push(`/${film.mediaType}/${film.id}`)}
          >
            <Image
              alt=""
              src={tmdbImageSrc(film.posterPath)}
              className="h-[72px] min-h-[72px] mobile:max-w-[150px] max-h-[72px] max-w-[102px] min-w-[102px] w-[102px] rounded-md"
            />
            <div className="px-3 mobile:text-center truncate">
              <p className="text-base mt-1 mobile:text-wrap truncate">
                {highlightText(film.title, props.keyword)}
              </p>
              <ul className="flex flex-wrap mobile:justify-center gap-x-1.5 text-sm opacity-[0.7]">
                {film.genreIds.map((id, i) => (
                  <li key={i}>
                    {
                      globalContext.genres[film.mediaType].find(
                        (g) => g.id === id
                      )?.name
                    }
                    {i !== film.genreIds.length - 1 ? ' ,' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center py-4">No results found</div>
      )}

      {totalItem > 5 && (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-1.5 bg-primary w-full hover:text-white/20 sticky bottom-0 shadow-lg"
        >
          More results
        </button>
      )}
    </div>
  )
}

