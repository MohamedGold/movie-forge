'use client'
import Link from 'next/link'
import Container from './Container'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { mergeClassName } from '@/utilts'
import { IoIosSearch } from 'react-icons/io'
import { useEffect, useRef, useState, useCallback } from 'react'
import SearchResults from './SearchResults'

const MENU_CLASS = `
py-1
px-1.5
hover:bg-primary
rounded-md
mobile:px-6
`

const MENU_CLASS_ACTIVE = `
bg-primary
`

export default function Header() {
  const pathname = usePathname()
  const params = useSearchParams()
  const router = useRouter()
  const defaultKeyword = useRef('')
  const pathnameRef = useRef('')
  const [keyword, setKeyword] = useState('')

  const [isSearchFocus, setSearchFocus] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const goToSearchPage = () => {
    if (keyword) {
      defaultKeyword.current = keyword
      router.push(`/search?q=${keyword}`)
      setSearchFocus(false)
      searchRef.current?.blur()
    }
  }

  const initKeyword = useCallback(() => {
    if (pathnameRef.current === '/search') {
      setKeyword(defaultKeyword.current)
    } else {
      setKeyword('')
    }
  }, [params]) // Added params as a dependency

  const onWindowClick = useCallback(() => {
    setSearchFocus(false)
    initKeyword()
  }, [initKeyword]) // Added initKeyword as a dependency

  const getMenuClass = (path: string) => {
    return path === pathname
      ? mergeClassName(MENU_CLASS, MENU_CLASS_ACTIVE)
      : MENU_CLASS
  }

  useEffect(() => {
    pathnameRef.current = pathname
    defaultKeyword.current = params.get('q') || ''

    initKeyword()
  }, [pathname, initKeyword]) // Added initKeyword as a dependency

  useEffect(() => {
    window.addEventListener('click', onWindowClick)
    return () => {
      window.removeEventListener('click', onWindowClick) // Cleanup on unmount
    }
  }, [onWindowClick]) // Added onWindowClick as a dependency

  return (
    <div className="bg-header sticky  top-0 left-0 right-0 z-[99] ">
      <Container className="flex items-center mobile:flex-wrap mobile:justify-evenly  justify-between gap-3  ">
        {/* brand & menu */}
        <div className="flex items-center gap-6">
          {/* brand */}
          <h1 className="text-2xl mobile:me-3 mobile:text-xl font-semibold">
            <Link href={'/'}>MovieForge</Link>
          </h1>
          {/* menu */}
          <div className="flex items-center gap-3 pt-1.5 mobile:fixed mobile:bottom-0 mobile:left-0 mobile:right-0 mobile:justify-center mobile:py-3 mobile:bg-header mobile:gap-6  ">
            <Link className={getMenuClass('/movies')}  href={'/movies'}>
              Movies
            </Link>
            <Link className={getMenuClass('/tv')} href={'/tv'}>
              TV
            </Link>
          </div>
        </div>

        {/* search */}
        <div className="border-b-[1.5px] mobile:w-[200px]  border-white flex items-center p-1 flex-[0.5]  focus-within:border-primary relative">
          <input
            ref={searchRef}
            onClick={(e) => {
              e.stopPropagation()
              setSearchFocus(true)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                goToSearchPage()
              }
            }}
            onInput={(e) => setKeyword(e.currentTarget.value)}
            value={keyword}
            type="text"
            className="bg-transparent outline-0 flex-1"
            placeholder="search..."
          />
          <IoIosSearch className='mobile:size-[15px]' size={18} />
          {/* tmp results */}
          {isSearchFocus && keyword ? (
            <SearchResults
              keyword={keyword}
              goToSearchPage={goToSearchPage}
            ></SearchResults>
          ) : (
            ''
          )}
        </div>
      </Container>
    </div>
  )
}
