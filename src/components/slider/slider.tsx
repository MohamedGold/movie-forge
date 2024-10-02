'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import './slider.css'
import Slick, { Settings } from 'react-slick'

interface Props extends Omit<Settings, 'children'> {
  isMoviesCard?: boolean
  isSeasonsCard?: boolean
  season?: any[] // Add season prop
  isTrailerCard?: boolean
  trailers?: any[] // Add trailers prop
  children?: (onSwipe: boolean) => ReactNode
}
export default function Slider(props: Props) {
  let settings: Omit<Settings, 'children'> = {
    ...props,
    speed: 400,
    cssEase: 'ease-in-out',
  }
// ! Movie Card
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

// ! Trailer card
 if (props.isTrailerCard && props.trailers) {
   const slideCount = props.trailers.length > 1 ? 2 : 1 // Use trailers from props
   const showArrows = props.trailers.length > 1 // Check if more than one trailer
   const enableSwipe = props.trailers.length > 1 // Enable swipe if more than one trailer

   settings = {
     ...settings,
     infinite: false,
     slidesToShow: slideCount,
     slidesToScroll: slideCount,
     arrows: showArrows, // Show or hide arrows based on number of trailers
     swipe: enableSwipe, // Enable or disable swipe based on number of trailers
     responsive: [
       {
         breakpoint: 600,
         settings: {
           slidesToShow: slideCount,
           slidesToScroll: slideCount,
           arrows: showArrows, // Responsive behavior
           swipe: enableSwipe, // Responsive swipe behavior
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: slideCount,
           slidesToScroll: slideCount,
           arrows: showArrows, // Responsive behavior
           swipe: enableSwipe, // Responsive swipe behavior
         },
       },
     ],
   }
 }

// ! Season Card
 if (props.isSeasonsCard && props.season) {
   const slideCount = props.season.length > 1 ? 2 : 1 // Use trailers from props
   const showArrows = props.season.length > 1 // Check if more than one trailer
   const enableSwipe = props.season.length > 1 // Enable swipe if more than one trailer

   settings = {
     ...settings,
     infinite: false,
     slidesToShow: slideCount,
     slidesToScroll: slideCount,
     arrows: showArrows, // Show or hide arrows based on number of trailers
     swipe: enableSwipe, // Enable or disable swipe based on number of trailers
     responsive: [
       {
         breakpoint: 600,
         settings: {
           slidesToShow: slideCount,
           slidesToScroll: slideCount,
           arrows: showArrows, // Responsive behavior
           swipe: enableSwipe, // Responsive swipe behavior
         },
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: slideCount,
           slidesToScroll: slideCount,
           arrows: showArrows, // Responsive behavior
           swipe: enableSwipe, // Responsive swipe behavior
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




