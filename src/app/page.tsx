'use client'
import Section from '@/components/Section'
import TrendingsHero from '@/components/TrendingsHero'
import { Film } from '@/interfaces'
import { useEffect, useState } from 'react'
import Slider from '../components/slider/slider'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import {
  getInTheaters,
  getPopular,
  getTopRated,
  getTrailers,
  getTrendings,
} from '@/api/tmdb-api'
// import Film from '@/components/Film'
import { isFilm, mergeFilms, tmdbImageSrc } from '@/utilts'
import TrailerModal from '@/components/TrailerModal'
import { MdPlayCircleOutline } from 'react-icons/md';
import { useGlobalContext } from './RootLayout';

export default function Home() {
  const router = useRouter()

  const [trendings, setTrendings] = useState<Film[]>([])
  const [inTheaters, setInTheaters] = useState<Film[]>([])
  const [popular, setPopular] = useState<Film[]>([])
  const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
  const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])

  const [trailerModelSrc, setTrailerModelSrc] = useState('')

  const globalContext = useGlobalContext()


  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.mediaType, film.id)

    setTrailerModelSrc(
      `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
    )
  }

  const fetchTopRatedMovie = async () => {
    setTopRatedMovie((await getTopRated('movie')).films)
  }
  const fetchTopRatedTv = async () => {
    setTopRatedTv((await getTopRated('tv')).films)
  }

  const fetchPopular = async () => {
    const movies = await getPopular('movie')
    const tvs = await getPopular('tv')

    setPopular(mergeFilms(movies, tvs, 25))
  }

  const fetchInTheaters = async () => {
    setInTheaters(await getInTheaters())
  }

  const fetchTrending = async () => {
    const movies = await getTrendings('movie')
    const tvs = await getTrendings('tv')

    setTrendings(mergeFilms(movies, tvs))
  }

  useEffect(() => {
    fetchTrending()
    fetchInTheaters()
    fetchPopular()
    fetchTopRatedMovie()
    fetchTopRatedTv()
  }, [])

  const goToDetailPage = (film: Film) => {
    router.push(`/${film.mediaType}/${film.id}`)
  }

  return (
    <>
      {/* Trailer Modal */}
      <TrailerModal
        onHide={() => setTrailerModelSrc('')}
        src={trailerModelSrc}
      ></TrailerModal>

      {/* trendings */}

      <Section className="py-0 " hidden={trendings.length === 0}>
        <Slider
          className="slick-hero"
          autoplay={true}
          slidesToShow={1}
          slidesToScroll={1}
          dots={true}
        >
          {(onSwipe) =>
            trendings.map((film, i) => (
              <div key={i} className="relative">
                {/* Card for film details */}
                <TrendingsHero
                  film={film}
                  genresIds={film.genreIds}
                  onClick={() => {
                    if (!onSwipe) {
                      goToDetailPage(film)
                    }
                  }}
                />

                {/* Play Trailer Button (completely independent) */}
                <button
                  className="absolute bottom-12 left-10 ml-5 hover:bg-header px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md z-20"
                  onClick={(e) => {
                    e.stopPropagation() // منع التفاعل مع الـ slider
                    playTrailer(film)
                  }}
                >
                  <MdPlayCircleOutline size={18} />
                  <span>Play trailers</span>
                </button>
              </div>
            ))
          }
        </Slider>
      </Section>

      {/* in theaters */}
      <Section title="In Theaters" hidden={inTheaters.length === 0}>
        <Slider isMoviesCard={true}>
          {(_) =>
            inTheaters.map((film, i) => (
              <Card
                key={i}
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/* popular */}
      <Section title="What's Popular" hidden={popular.length === 0}>
        <Slider isMoviesCard={true}>
          {(_) =>
            popular.map((film, i) => (
              <Card
                key={i}
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* top rated tv*/}
      <Section
        title="Top Rated TV"
        hidden={topRatedTv.length === 0}
        onTitleClick={() => router.push(`/list/top-rated-tv`)}
      >
        <Slider isMoviesCard={true}>
          {(_) =>
            topRatedTv.map((film, i) => (
              <Card
                key={i}
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
              ></Card>
            ))
          }
        </Slider>
      </Section>
      {/* top rated movies */}
      <Section
        hidden={topRatedMovie.length === 0}
        onTitleClick={() => router.push(`/list/top-rated-movies`)}
        title="Top Rated Movies"
      >
        <Slider isMoviesCard={true}>
          {(_) =>
            topRatedMovie.map((film, i) => (
              <Card
                key={i}
                onClick={() => goToDetailPage(film)}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
              ></Card>
            ))
          }
        </Slider>
      </Section>
    </>
  )
}
