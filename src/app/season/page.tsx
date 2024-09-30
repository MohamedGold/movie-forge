'use client'
import { getSeason } from '@/api/tmdb-api'
import Image from '@/components/Image'
import Section from '@/components/Section'
import { Film, Season as SeasonInterface } from '@/interfaces'
import { formateDate, tmdbImageSrc } from '@/utilts'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Season() {
  const [season, setSeason] = useState<SeasonInterface | null>(null)

  const params = useParams<any>()

  const fetch = async () => {
    setSeason(
      await getSeason(
        parseInt(params.id as string),
        parseInt(params.seasonNumber as string)
      )
    )
  }

  useEffect(() => {
    fetch()
  }, [])

  if (!season) {
    return <div className='min-h-[100vh]'></div>
  }

  return (
    <div className='min-h-[100vh]'>
      {/* background */}
      <div className="h-[150px]  left-0 right-0 top-0 relative ">
        <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
        <Image
          className="rounded-0 rounded-none "
          src={tmdbImageSrc(season.posterPath)}
          alt=""
        ></Image>
      </div>
      {/* poster and text */}
      <Section className="-mt-[75px] flex items-center relative z-10 mobile:block ">
        <Image
          src={tmdbImageSrc(season.posterPath)}
          alt=""
          className="w-[150px] max-w-[150px] min-w-[200px] min-h-[200px] h-[250px] mobile:mx-auto  "
        ></Image>
        <div className="px-3 flex flex-col items-start gap-3 py-3  ">
          <p className="text-2xl font-semibold line-clamp-1 mobile:mx-auto mobile:mt-3 ">{season.filmName}</p>
          <div className="flex items-center  mobile:mx-auto">
            <p className=" tex-sm opacity-[0.9]   ">
              {season.name} ({new Date(season.airDate).getFullYear()})
            </p>
            <p className="text-sm opacity-[0.9] ml-3">
              &#8226; {season.episodes?.length} episodes
            </p>
          </div>
        </div>
      </Section>
      {/* episodes */}
      <Section className='mobile:text-center' title="Episodes">
        {season.episodes?.map((episode, i) => (
          <div
            className="my-6 flex items-stretch gap-4 rounded-md overflow-hidden cursor-pointer hover:bg-primary transition-all duration-200 px-3 py-1.5 mobile:block vs:block  "
            key={i}
          >
            <Image
              alt=""
              src={tmdbImageSrc(episode.stillPath)}
              className="min-w-[300px] w-[270px] mobile:mx-auto  h-[320px]"
            ></Image>
            <div className=" overflow-hidden flex flex-col gap-3  w-full mobile:py-3 ">
              <p className="text-lg truncate mobile:text-center mobile:mt-3">
                {episode.episodeNumber}. {episode.title}
              </p>
              <p className="opacity-[0.9] line-clamp-5 mobile:text-center ">
                {episode.overview}
              </p>
              <div className=" mt-auto pt-3  text-right ">
                {' '}
                {formateDate(episode.airDate)}
              </div>
            </div>
          </div>
        ))}
      </Section>
    </div>
  )
}
