

// 'use client'
// import Section from '@/components/Section'
// import TrendingsHero from '@/components/TrendingsHero'
// import { Film } from '@/interfaces'
// import { useEffect, useState } from 'react'
// import Slider from '../components/slider/slider'
// import Card from '@/components/Card'
// import { useRouter } from 'next/navigation'
// import {
//   getInTheaters,
//   getPopular,
//   getTopRated,
//   getTrailers,
//   getTrendings,
// } from '@/api/tmdb-api'
// import { isFilm, mergeFilms, tmdbImageSrc } from '@/utilts'
// import TrailerModal from '@/components/TrailerModal'
// import { MdPlayCircleOutline } from 'react-icons/md'
// import { useGlobalContext } from './RootLayout'

// export default function Home() {
//   const router = useRouter()

//   const [trendings, setTrendings] = useState<Film[]>([])
//   const [inTheaters, setInTheaters] = useState<Film[]>([])
//   const [popular, setPopular] = useState<Film[]>([])
//   const [topRatedTv, setTopRatedTv] = useState<Film[]>([])
//   const [topRatedMovie, setTopRatedMovie] = useState<Film[]>([])

//   const [trailerModelSrc, setTrailerModelSrc] = useState('')

//   const globalContext = useGlobalContext()

//   const playTrailer = async (film: Film) => {
//     const trailers = await getTrailers(film.mediaType, film.id)
//     setTrailerModelSrc(
//       `https://www.youtube.com/embed/${trailers[0].key}?autoplay=0`
//     )
//   }

//   // حفظ البيانات في sessionStorage
//   const saveDataToSession = (key: string, data: any) => {
//     sessionStorage.setItem(key, JSON.stringify(data))
//   }

//   // استرجاع البيانات من sessionStorage
//   const getDataFromSession = (key: string) => {
//     const data = sessionStorage.getItem(key)
//     return data ? JSON.parse(data) : null
//   }

//   const fetchTopRatedMovie = async () => {
//     const cachedMovies = getDataFromSession('topRatedMovies')
//     if (cachedMovies) {
//       setTopRatedMovie(cachedMovies)
//     } else {
//       const movies = (await getTopRated('movie')).films
//       setTopRatedMovie(movies)
//       saveDataToSession('topRatedMovies', movies)
//     }
//   }

//   const fetchTopRatedTv = async () => {
//     const cachedTvs = getDataFromSession('topRatedTv')
//     if (cachedTvs) {
//       setTopRatedTv(cachedTvs)
//     } else {
//       const tvs = (await getTopRated('tv')).films
//       setTopRatedTv(tvs)
//       saveDataToSession('topRatedTv', tvs)
//     }
//   }

//   const fetchPopular = async () => {
//     const cachedPopular = getDataFromSession('popular')
//     if (cachedPopular) {
//       setPopular(cachedPopular)
//     } else {
//       const movies = await getPopular('movie')
//       const tvs = await getPopular('tv')
//       const mergedFilms = mergeFilms(movies, tvs, 25)
//       setPopular(mergedFilms)
//       saveDataToSession('popular', mergedFilms)
//     }
//   }

//   const fetchInTheaters = async () => {
//     const cachedInTheaters = getDataFromSession('inTheaters')
//     if (cachedInTheaters) {
//       setInTheaters(cachedInTheaters)
//     } else {
//       const theaters = await getInTheaters()
//       setInTheaters(theaters)
//       saveDataToSession('inTheaters', theaters)
//     }
//   }

//   const fetchTrending = async () => {
//     const cachedTrending = getDataFromSession('trendings')
//     if (cachedTrending) {
//       setTrendings(cachedTrending)
//     } else {
//       const movies = await getTrendings('movie')
//       const tvs = await getTrendings('tv')
//       const mergedFilms = mergeFilms(movies, tvs)
//       setTrendings(mergedFilms)
//       saveDataToSession('trendings', mergedFilms)
//     }
//   }

//   useEffect(() => {
//     fetchTrending()
//     fetchInTheaters()
//     fetchPopular()
//     fetchTopRatedMovie()
//     fetchTopRatedTv()

//     // تأخير استعادة موقع التمرير للتأكد من اكتمال تحميل الصفحة
//     const savedScrollPosition = sessionStorage.getItem('home-scroll-position')
//     if (savedScrollPosition) {
//       setTimeout(() => {
//         window.scrollTo(0, parseFloat(savedScrollPosition))
//       }, 500) // تأخير لمدة نصف ثانية
//     }

//     // حفظ موقع التمرير عند مغادرة الصفحة
//     const saveScrollPosition = () => {
//       sessionStorage.setItem('home-scroll-position', `${window.scrollY}`)
//     }

//     window.addEventListener('scroll', saveScrollPosition) // استخدم scroll بدلاً من beforeunload
//     return () => {
//       window.removeEventListener('scroll', saveScrollPosition)
//     }
//   }, []) // قم بتنفيذ هذا مرة واحدة عند تحميل المكون

//   const goToDetailPage = (film: Film) => {
//     sessionStorage.setItem('home-scroll-position', `${window.scrollY}`)
//     router.push(`/${film.mediaType}/${film.id}`)
//   }

//   return (
//     <div className="min-h-[calc(100vh_-_200px)]">
//       {/* Trailer Modal */}
//       <TrailerModal
//         onHide={() => setTrailerModelSrc('')}
//         src={trailerModelSrc}
//       ></TrailerModal>

//       {/* trendings */}
//       <Section className="py-0 " hidden={trendings.length === 0}>
//         <Slider
//           className="slick-hero"
//           autoplay={true}
//           slidesToShow={1}
//           slidesToScroll={1}
//           dots={true}
//         >
//           {(onSwipe) =>
//             trendings.map((film, i) => (
//               <div key={i} className="relative">
//                 {/* Card for film details */}
//                 <TrendingsHero
//                   film={film}
//                   genresIds={film.genreIds}
//                   onClick={() => {
//                     if (!onSwipe) {
//                       goToDetailPage(film)
//                     }
//                   }}
//                 />

//                 {/* Play Trailer Button (completely independent) */}
//                 <button
//                   className="absolute bottom-12 left-10 ml-5 hover:bg-header px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md z-20"
//                   onClick={(e) => {
//                     e.stopPropagation() // منع التفاعل مع الـ slider
//                     playTrailer(film)
//                   }}
//                 >
//                   <MdPlayCircleOutline size={18} />
//                   <span>Play trailers</span>
//                 </button>
//               </div>
//             ))
//           }
//         </Slider>
//       </Section>

//       {/* in theaters */}
//       <Section title="In Theaters" hidden={inTheaters.length === 0}>
//         <Slider isMoviesCard={true}>
//           {(onSwipe) =>
//             inTheaters.map((film, i) => (
//               <Card
//                 key={i}
//                 onClick={() => {
//                   if (!onSwipe) {
//                     goToDetailPage(film)
//                   }
//                 }}
//                 title={film.title}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 rating={film.rating} // التقييم
//                 genreIds={film.genreIds} // تمرير الـ genreIds
//                 views={film.views} // عدد المشاهدات
//                 mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
//                 releaseDate={film.releaseDate}
//                 onSwipe={onSwipe} // Passing the onSwipe state to Card
//               ></Card>
//             ))
//           }
//         </Slider>
//       </Section>

//       {/* popular */}
//       <Section title="What's Popular" hidden={popular.length === 0}>
//         <Slider isMoviesCard={true}>
//           {(onSwipe) =>
//             popular.map((film, i) => (
//               <Card
//                 key={i}
//                 onClick={() => {
//                   if (!onSwipe) {
//                     goToDetailPage(film)
//                   }
//                 }}
//                 title={film.title}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 rating={film.rating} // التقييم
//                 genreIds={film.genreIds} // تمرير الـ genreIds
//                 views={film.views} // عدد المشاهدات
//                 mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
//                 releaseDate={film.releaseDate}
//                 onSwipe={onSwipe} // Passing the onSwipe state to Card
//               ></Card>
//             ))
//           }
//         </Slider>
//       </Section>

//       {/* top rated tv */}
//       <Section
//         title="Top Rated TV"
//         hidden={topRatedTv.length === 0}
//         onTitleClick={() => router.push(`/list/top-rated-tv`)}
//         viewMoreButton={true}
//         onViewMoreClick={() => router.push(`/list/top-rated-tv`)}
//       >
//         <Slider isMoviesCard={true}>
//           {(onSwipe) =>
//             topRatedTv.map((film, i) => (
//               <Card
//                 key={i}
//                 onClick={() => {
//                   if (!onSwipe) {
//                     goToDetailPage(film)
//                   }
//                 }}
//                 title={film.title}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 rating={film.rating} // التقييم
//                 genreIds={film.genreIds} // تمرير الـ genreIds
//                 views={film.views} // عدد المشاهدات
//                 mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
//                 releaseDate={film.releaseDate}
//                 onSwipe={onSwipe} // Passing the onSwipe state to Card
//               ></Card>
//             ))
//           }
//         </Slider>
//       </Section>

//       {/* top rated movies */}
//       <Section
//         title="Top Rated Movies"
//         hidden={topRatedMovie.length === 0}
//         onTitleClick={() => router.push(`/list/top-rated-movies`)}
//         viewMoreButton={true}
//         onViewMoreClick={() => router.push(`/list/top-rated-movies`)}
//       >
//         <Slider isMoviesCard={true}>
//           {(onSwipe) =>
//             topRatedMovie.map((film, i) => (
//               <Card
//                 key={i}
//                 onClick={() => {
//                   if (!onSwipe) {
//                     goToDetailPage(film)
//                   }
//                 }}
//                 title={film.title}
//                 imageSrc={tmdbImageSrc(film.posterPath)}
//                 rating={film.rating} // التقييم
//                 genreIds={film.genreIds} // تمرير الـ genreIds
//                 views={film.views} // عدد المشاهدات
//                 mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
//                 releaseDate={film.releaseDate}
//                 onSwipe={onSwipe} // Passing the onSwipe state to Card
//               ></Card>
//             ))
//           }
//         </Slider>
//       </Section>
//     </div>
//   )
// }












// !==========================













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
import { isFilm, mergeFilms, tmdbImageSrc } from '@/utilts'
import TrailerModal from '@/components/TrailerModal'
import { MdPlayCircleOutline } from 'react-icons/md'
import { useGlobalContext } from './RootLayout'

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

  // حفظ البيانات في sessionStorage
  const saveDataToSession = (key: string, data: any) => {
    sessionStorage.setItem(key, JSON.stringify(data))
  }

  // استرجاع البيانات من sessionStorage
  const getDataFromSession = (key: string) => {
    const data = sessionStorage.getItem(key)
    return data ? JSON.parse(data) : null
  }

  const fetchTopRatedMovie = async () => {
    const cachedMovies = getDataFromSession('topRatedMovies')
    if (cachedMovies) {
      setTopRatedMovie(cachedMovies)
    } else {
      const movies = (await getTopRated('movie')).films
      setTopRatedMovie(movies)
      saveDataToSession('topRatedMovies', movies)
    }
  }

  const fetchTopRatedTv = async () => {
    const cachedTvs = getDataFromSession('topRatedTv')
    if (cachedTvs) {
      setTopRatedTv(cachedTvs)
    } else {
      const tvs = (await getTopRated('tv')).films
      setTopRatedTv(tvs)
      saveDataToSession('topRatedTv', tvs)
    }
  }

  const fetchPopular = async () => {
    const cachedPopular = getDataFromSession('popular')
    if (cachedPopular) {
      setPopular(cachedPopular)
    } else {
      const movies = await getPopular('movie')
      const tvs = await getPopular('tv')
      const mergedFilms = mergeFilms(movies, tvs, 25)
      setPopular(mergedFilms)
      saveDataToSession('popular', mergedFilms)
    }
  }

  const fetchInTheaters = async () => {
    const cachedInTheaters = getDataFromSession('inTheaters')
    if (cachedInTheaters) {
      setInTheaters(cachedInTheaters)
    } else {
      const theaters = await getInTheaters()
      setInTheaters(theaters)
      saveDataToSession('inTheaters', theaters)
    }
  }

  const fetchTrending = async () => {
    const cachedTrending = getDataFromSession('trendings')
    if (cachedTrending) {
      setTrendings(cachedTrending)
    } else {
      const movies = await getTrendings('movie')
      const tvs = await getTrendings('tv')
      const mergedFilms = mergeFilms(movies, tvs)
      setTrendings(mergedFilms)
      saveDataToSession('trendings', mergedFilms)
    }
  }

  useEffect(() => {
    fetchTrending()
    fetchInTheaters()
    fetchPopular()
    fetchTopRatedMovie()
    fetchTopRatedTv()

    // تأخير استعادة موقع التمرير للتأكد من اكتمال تحميل الصفحة
    const savedScrollPosition = sessionStorage.getItem('home-scroll-position')
    if (savedScrollPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseFloat(savedScrollPosition))
      }, 500) // تأخير لمدة نصف ثانية
    }

    // حفظ موقع التمرير عند مغادرة الصفحة
    const saveScrollPosition = () => {
      sessionStorage.setItem('home-scroll-position', `${window.scrollY}`)
    }

    window.addEventListener('scroll', saveScrollPosition) // استخدم scroll بدلاً من beforeunload
    return () => {
      window.removeEventListener('scroll', saveScrollPosition)
    }
  }, []) // قم بتنفيذ هذا مرة واحدة عند تحميل المكون

  const goToDetailPage = (film: Film) => {
    sessionStorage.setItem('home-scroll-position', `${window.scrollY}`)
    router.push(`/${film.mediaType}/${film.id}`)
  }

  return (
    <div className="min-h-[calc(100vh_-_200px)]">
      {/* Trailer Modal */}
      <TrailerModal
        onHide={() => setTrailerModelSrc('')}
        src={trailerModelSrc}
      ></TrailerModal>

      {/* trendings */}
      <Section className="py-0 " hidden={trendings.length === 0}>
        <Slider
          sliderKey="trendings-slider"
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
        <Slider sliderKey="inTheaters-slider" isMoviesCard={true}>
          {(onSwipe) =>
            inTheaters.map((film, i) => (
              <Card
                key={i}
                onClick={() => {
                  if (!onSwipe) {
                    goToDetailPage(film)
                  }
                }}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
                onSwipe={onSwipe} // Passing the onSwipe state to Card
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* popular */}
      <Section title="What's Popular" hidden={popular.length === 0}>
        <Slider sliderKey="popular-slider" isMoviesCard={true}>
          {(onSwipe) =>
            popular.map((film, i) => (
              <Card
                key={i}
                onClick={() => {
                  if (!onSwipe) {
                    goToDetailPage(film)
                  }
                }}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
                onSwipe={onSwipe} // Passing the onSwipe state to Card
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* top rated tv */}
      <Section
        title="Top Rated TV"
        hidden={topRatedTv.length === 0}
        onTitleClick={() => router.push(`/list/top-rated-tv`)}
        viewMoreButton={true}
        onViewMoreClick={() => router.push(`/list/top-rated-tv`)}
      >
        <Slider sliderKey="topRatedTv-slider" isMoviesCard={true}>
          {(onSwipe) =>
            topRatedTv.map((film, i) => (
              <Card
                key={i}
                onClick={() => {
                  if (!onSwipe) {
                    goToDetailPage(film)
                  }
                }}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
                onSwipe={onSwipe} // Passing the onSwipe state to Card
              ></Card>
            ))
          }
        </Slider>
      </Section>

      {/* top rated movies */}
      <Section
        title="Top Rated Movies"
        hidden={topRatedMovie.length === 0}
        onTitleClick={() => router.push(`/list/top-rated-movies`)}
        viewMoreButton={true}
        onViewMoreClick={() => router.push(`/list/top-rated-movies`)}
      >
        <Slider sliderKey="topRatedMovie-slider" isMoviesCard={true}>
          {(onSwipe) =>
            topRatedMovie.map((film, i) => (
              <Card
                key={i}
                onClick={() => {
                  if (!onSwipe) {
                    goToDetailPage(film)
                  }
                }}
                title={film.title}
                imageSrc={tmdbImageSrc(film.posterPath)}
                rating={film.rating} // التقييم
                genreIds={film.genreIds} // تمرير الـ genreIds
                views={film.views} // عدد المشاهدات
                mediaType={film.mediaType} // تمرير نوع الوسائط (فيلم/مسلسل)
                releaseDate={film.releaseDate}
                onSwipe={onSwipe} // Passing the onSwipe state to Card
              ></Card>
            ))
          }
        </Slider>
      </Section>
    </div>
  )
}