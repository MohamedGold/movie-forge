'use client'
import { useEffect, useState } from 'react'
import Container from './Container'
import { IoIosClose } from 'react-icons/io'

interface Props {
  src: string | null
  onHide: () => void
}



export default function TrailerModal(props: Props) {
  const [show, setShow] = useState(false)


  const hide = () => {
    setShow(false)
    props.onHide()
  }

  useEffect(() => {
    if (props.src) setShow(true)
  }, [props.src])

    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          hide()
        }
      }

      window.addEventListener('keydown', handleKeyDown)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
      }
    }, [
    ])

  return (
    <div
      onClick={() => hide()}
      className={`
      ${show ? `opacity-[1] ` : 'opacity-0 pointer-events-none'}
        ease-in-out
      duration-300
      fixed
      top-0
      bottom-0
      left-0 
      right-0
      after:fixed
      after:content-['']
      after:top-0
      after:left-0
      after:right-0
      after:bottom-0
      after:bg-black
      after:opacity-[0.9]
      z-[1100]

      `}
    >
      <Container
        className={`
      relative 
      z-10 
      transition-[margin,opacity]
      ease-in-out
      duration-300
      ${
        show
          ? `
        opacity-
        mt-0
        
        `
          : `-mt-[200px] opacity-0`
      }

      `}
      >
        <div
          className="bg-header rounded-lg "
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="p-3 text-right">
            <button onClick={() => hide()}>
              <IoIosClose
                className="bg-primary text-white rounded-sm"
                size={28}
              ></IoIosClose>
            </button>
          </div>
          {show ? (
            <iframe
              src={props.src as string}
              className="w-full h-[500px]"
              allowFullScreen
            ></iframe>
          ) : (
            ''
          )}
        </div>
      </Container>
    </div>
  )
}








