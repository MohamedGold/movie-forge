'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import './slider.css'
import Slick, { Settings } from 'react-slick'

interface Props extends Omit<Settings, 'children'> {
  isMoviesCard?: boolean
  isSeasonsCard?: boolean
  children?: (onSwipe: boolean) => ReactNode
}
export default function Slider(props: Props) {
  let settings: Omit<Settings, 'children'> = {
    ...props,
    speed: 300,
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




