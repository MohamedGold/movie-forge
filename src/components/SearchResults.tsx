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

  const searchTimeout = useRef<any>('')

  const globalContext = useGlobalContext()

  const router = useRouter()

  const fetch = async () => {
    // if(props.keyword) return

    clearTimeout(searchTimeout.current)
    searchTimeout.current = setTimeout(async () => {
      const res = await search(props.keyword)
      setTotalItem(res.totalResults)
      setItems(res.films)
    }, 120)
  }

  useEffect(() => {
    fetch()
  }, [props.keyword])

  return (
    <div className="absolute top-[48px]   left-0 right-0 rounded-md overflow-auto scrollbar scrollbar-thumb-primary scrollbar-track-header bg-header max-h-[480px] shadow-lg  ">
      {items.map((film, i) => (
        <div
          key={i}
          className="flex items-start p-1.5 mobile:flex-col mobile:items-center mobile:justify-center   rounded-lg hover:bg-primary cursor-pointer my-1.5"
          onClick={() => router.push(`/${film.mediaType}/${film.id}`)}
        >
          {/* image */}
          <Image
            alt=""
            src={tmdbImageSrc(film.posterPath)}
            className="h-[72px] min-h-[72px] mobile:max-w-[150px]  max-h-[72px] max-w-[102px] min-w-[102px] w-[102px] rounded-md"
          ></Image>
          {/* title and genres */}
          <div className="px-3 text-center truncate">
            <p className="text-base  mt-1 mobile:text-wrap truncate">
              {film.title}
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
      ))}

      {totalItem > 5 ? (
        <button
          onClick={() => props.goToSearchPage()}
          className="px-3 py-1.5 bg-primary w-full hover:text-white/20 sticky bottom-0 shadow-lg  "
        >
          More results
        </button>
      ) : (
        ''
      )}
    </div>
  )
}
