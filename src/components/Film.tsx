
// film.tsx
'use client'
import { MediaType } from '@/types'
import { useParams, useRouter } from 'next/navigation'
import Image from './Image'
import Section from './Section'
import { useEffect, useState } from 'react'
import { Cast, Film as FilmInterface, Trailer } from '@/interfaces'
import Card from './Card'
import Slider from '../components/slider/slider'
import { MdStar, MdVisibility } from 'react-icons/md'
import { FaRegCalendarAlt } from 'react-icons/fa'
import {
  getCasts,
  getDetail,
  getRecommendations,
  getTrailers,
} from '@/api/tmdb-api'
import { tmdbImageSrc, youtubeThubnail } from '@/utilts'
import { useGlobalContext } from '@/app/RootLayout'
import Loading from './Loading'
import TrailerModal from './TrailerModal'

interface Props {
  mediaType: MediaType
  id?: string | number
}

export default function Film(props: Props) {
  const [trailerModelSrc, setTrailerModelSrc] = useState('')
  const playTrailer = async (key: string) => {
    setTrailerModelSrc(`https://www.youtube.com/embed/${key}?autoplay=0`)
  }

  const { id } = useParams<any>()
  const router = useRouter()
  const [film, setFilm] = useState<FilmInterface | null | undefined>(null)
  const [casts, setCasts] = useState<Cast[]>([])
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [recommendations, setRecommendations] = useState<FilmInterface[]>([])
  const globalContext = useGlobalContext()

  const saveDataToSession = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  const getDataFromSession = (key: string) => {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  const fetchFilmDetails = async () => {
    const cachedFilmData = getDataFromSession(`film-data-${id}`)
    if (cachedFilmData) {
      setFilm(cachedFilmData.film)
      setCasts(cachedFilmData.casts)
      setTrailers(cachedFilmData.trailers)
      setRecommendations(cachedFilmData.recommendations)
    } else {
      const filmDetail = await getDetail(
        props.mediaType,
        parseInt(id as string)
      )
      if (filmDetail) {
        setFilm(filmDetail)
        const filmCasts = await getCasts(filmDetail.mediaType, filmDetail.id)
        const filmTrailers = await getTrailers(
          filmDetail.mediaType,
          filmDetail.id
        )
        const filmRecommendations = await getRecommendations(
          filmDetail.mediaType,
          filmDetail.id
        )

        setCasts(filmCasts)
        setTrailers(filmTrailers)
        setRecommendations(filmRecommendations)

        saveDataToSession(`film-data-${id}`, {
          film: filmDetail,
          casts: filmCasts,
          trailers: filmTrailers,
          recommendations: filmRecommendations,
        })
      }
    }
  }

  useEffect(() => {
    fetchFilmDetails()

    const savedScrollPosition = sessionStorage.getItem(
      `film-${id}-scroll-position`
    )
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseFloat(savedScrollPosition))
      }, 200)
    }

    const saveScrollPosition = () => {
      sessionStorage.setItem(`film-${id}-scroll-position`, `${window.scrollY}`)
    }

    window.addEventListener('scroll', saveScrollPosition)

    const intervalId = setInterval(saveScrollPosition, 1000)

    return () => {
      window.removeEventListener('scroll', saveScrollPosition)
      clearInterval(intervalId)
    }
  }, [id])

  if (film === null) {
    return <div className='min-h-[100vh]'></div>
  } else if (film === undefined) {
    return (
      <div className="text-center p-6 items-center justify-center h-[100vh] flex">
        <Loading />
      </div>
    )
  }

  const formatNumber = (number: number) => {
    const numberParts = number.toString().split('.')
    numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return numberParts.join(',')
  }

  return (
    <div className="min-h-[100vh]  ">
      <TrailerModal
        onHide={() => setTrailerModelSrc('')}
        src={trailerModelSrc}
      />

      <div className="h-[300px] left-0 right-0 top-0 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-body via-transparent to-body overlay-film-cover"></div>
        <Image src={tmdbImageSrc(film.coverPath)} alt="" />
      </div>
      {/* poster and text  */}
      <Section className="-mt-[150px] flex items-center relative z-10 mobile:block">
        <Image
          src={tmdbImageSrc(film.posterPath)}
          alt=""
          className="w-[200px] max-w-[200px] min-w-[200px] min-h-[300px] h-[300px] mobile:mx-auto"
        />
        <div className="px-3 flex flex-col items-start gap-3">
          <p className="text-2xl font-semibold tracking-wide line-clamp-1 mobile:mt-6 mobile:items-center mobile:mx-auto">
            {film.title}
          </p>

          <ul className="flex items-center mobile:mx-auto mobile:flex-wrap mobile:justify-evenly gap-3">
            {film.genreIds.map((id, i) => (
              <li
                key={id}
                className="px-3 py-1.5 bg-primary rounded-lg text-sm"
              >
                {
                  globalContext.genres[film.mediaType]?.find((g) => g.id === id)
                    ?.name
                }
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1 mobile:mx-auto">
            <span className="capitalize mr-2">{film.mediaType}</span>
            <MdStar className="text-yellow-300" />
            <span>{film.rating?.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 mobile:mx-auto">
            <FaRegCalendarAlt />
            <span>{new Date(film.releaseDate).getFullYear()}</span>
            <div className="ml-3 flex items-center gap-1 flex-1">
              <MdVisibility />
              <span>{formatNumber(film.views)}</span>
            </div>
          </div>
          <p className="line-clamp-3 opacity-[0.9] mobile:text-center">
            {film.description}
          </p>
        </div>
      </Section>

      {/* Casts  */}
      <Section
        className="mobile:text-center "
        title="Casts"
        hidden={casts.length === 0}
      >
        <div className="scrollbar scrollbar-thumb-primary  scrollbar-track-header overflow-x-auto">
          <div className="flex items-center gap-3  w-max">
            {casts.map((cast, i) => (
              <div key={i} className="flex-shrink-0 w-[240px] mb-6">
                <Card
                  withPlay={false}
                  imageSrc={tmdbImageSrc(cast.profilePath)}
                  cardType="cast"
                  mediaType={film.mediaType}
                  releaseDate={film.releaseDate}
                ></Card>
                <p className="opacity-[0.9] text-sm text-center">
                  {cast.characterName.split(' / ')[0]}
                </p>
                <p className="font-semibold text-center "> {cast.name}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Trailers  */}
      <Section
        className="mobile:text-center"
        title="Trailers"
        hidden={trailers.length === 0}
      >
        <Slider
          sliderKey={`trailer-slider-${id}`}
          isTrailerCard={true}
          trailers={trailers}
        >
          {(onSwipe) =>
            trailers.map((trailer, i) => (
              <div
                key={i}
                className={`flex items-center d-block  justify-center overflow-y-hidden ${
                  trailers.length === 1 ? 'mx-auto   max-w-[500px]' : ''
                }`}
              >
                <Card
                  onClick={() => playTrailer(trailer.key)}
                  key={i}
                  imageSrc={youtubeThubnail(trailer.key)}
                  className=" mb-6  rounded-lg overflow-hidden"
                  cardType="trailer"
                  mediaType={film.mediaType}
                  releaseDate={film.releaseDate}
                  onSwipe={onSwipe}
                ></Card>
              </div>
            ))
          }
        </Slider>
      </Section>

      {/* Seasons  */}
      <Section
        className="mobile:text-center  "
        title="Seasons"
        hidden={film.seasons.length === 0}
      >
        <Slider
          sliderKey={`season-slider-${id}`}
          isSeasonsCard={true}
          season={film.seasons}
        >
          {(onSwipe) =>
            film.seasons.map((season, i) => (
              <div
                key={i}
                className={`flex items-center d-block  overflow-y-hidden ${
                  film.seasons.length === 1
                    ? 'mx-auto lg:mb-5 max-w-[500px]'
                    : ''
                }`}
              >
                <Card
                  className="lg:h-[300px]  mobile:h-[200px] vs:h-[200px] sm:h-[200px] mb-16"
                  onClick={() =>
                    router.push(`/tv/${film.id}/season/${season.seasonNumber}`)
                  }
                  title={season.name}
                  imageSrc={tmdbImageSrc(season.posterPath)}
                  key={i}
                  cardType="season"
                  mediaType={film.mediaType}
                  releaseDate={film.releaseDate}
                  onSwipe={onSwipe}
                ></Card>
              </div>
            ))
          }
        </Slider>
      </Section>
      {/* Recommendations  */}
      <Section
        className="mobile:text-center  "
        title="Recommendations"
        hidden={recommendations.length === 0}
      >
        <Slider sliderKey={`recommendations-slider-${id}`} isMoviesCard={true}>
          {(onSwipe) =>
            recommendations.map((film, i) => (
              <Card
                onClick={() => router.push(`/${props.mediaType}/${film.id}`)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                key={i}
                rating={film.rating}
                genreIds={film.genreIds}
                views={film.views}
                mediaType={film.mediaType}
                releaseDate={film.releaseDate}
                onSwipe={onSwipe}
              ></Card>
            ))
          }
        </Slider>
      </Section>
    </div>
  )
}
