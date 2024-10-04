
'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import { getGenres } from '@/api/tmdb-api'
import { MediaType } from '@/types'
import { Genre } from '@/interfaces'
import { FaArrowUp } from 'react-icons/fa'

type Genres = {
  [key in MediaType]: Genre[]
}

const GlobalContext = createContext<{
  genres: Genres
}>({
  genres: {
    movie: [],
    tv: [],
  },
})

export const useGlobalContext = () => useContext(GlobalContext)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [genres, setGenres] = useState<Genres>({
    movie: [],
    tv: [],
  })

  const [showScrollToTop, setShowScrollToTop] = useState(false)

  const fetchGenres = async () => {
    const movie = await getGenres('movie')
    const tv = await getGenres('tv')
    setGenres({
      movie,
      tv,
    })
  }

  // Track scroll position to show/hide the Scroll To Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    fetchGenres()
  }, [])

  if (!genres.movie.length || !genres.tv.length) {
    return (
      <div className="fixed left-0 right-0 bottom-0   top-0 flex items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <GlobalContext.Provider value={{ genres }}>
      <Header />
      <main className="pb-[65px]   ">{children}</main>
      <Footer />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-10 right-10 mobile:bottom-[80px] z-[11] bg-primary text-white p-3 rounded-full shadow-md hover:bg-body transition-all duration-500 ${
          showScrollToTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-0'
        }`}
        style={{ pointerEvents: showScrollToTop ? 'auto' : 'none' }} // Disable button when hidden
      >
        <FaArrowUp size={25} />
      </button>
    </GlobalContext.Provider>
  )
}














