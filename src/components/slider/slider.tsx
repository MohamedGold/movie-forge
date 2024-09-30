'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import './slider.css'
import Slick, { Settings } from 'react-slick'

interface Props extends Omit<Settings, 'children'> {
  isMoviesCard?: boolean
  isSeasonsCard?: boolean
  isTrailerCard?: boolean
  trailers?: any[] // Add trailers prop
  children?: (onSwipe: boolean) => ReactNode
}
export default function Slider(props: Props) {
  let settings: Omit<Settings, 'children'> = {
    ...props,
    speed: 600,
    cssEase: 'ease-in-out',
  }

  if (props.isMoviesCard) {
    settings = {
      ...settings,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,

      // swipe: false,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    }
  }


    if (props.isTrailerCard && props.trailers) {
      const slideCount = props.trailers.length > 1 ? 2 : 1 // Use trailers from props
      settings = {
        ...settings,
        infinite: false, 
        slidesToShow: slideCount,
        slidesToScroll: slideCount,
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: slideCount,
              slidesToScroll: slideCount,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: slideCount,
              slidesToScroll: slideCount,
            },
          },
        ],
      }
    }

  const [onSwipe, setOnSwipe] = useState(false)

  return (
    <Slick
      autoplay={false}
      {...settings}
      autoplaySpeed={5000}
      onSwipe={() => setOnSwipe(true)}
      afterChange={() => setOnSwipe(false)}
    >
      {props.children ? props.children(onSwipe) : ''}
    </Slick>
  )
}




