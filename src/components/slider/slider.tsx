// 'use client'
// import { ReactNode, useEffect, useRef, useState } from 'react'
// import './slider.css'
// import Slick, { Settings } from 'react-slick'

// interface Props extends Omit<Settings, 'children'> {
//   isMoviesCard?: boolean
//   isSeasonsCard?: boolean
//   season?: any[] // Add season prop
//   isTrailerCard?: boolean
//   trailers?: any[] // Add trailers prop
//   children?: (onSwipe: boolean) => ReactNode
// }
// export default function Slider(props: Props) {
//   let settings: Omit<Settings, 'children'> = {
//     ...props,
//     speed: 400,
//     cssEase: 'ease-in-out',
//   }
// // ! Movie Card
//   if (props.isMoviesCard) {
//     settings = {
//       ...settings,
//       infinite: true,
//       slidesToShow: 5,
//       slidesToScroll: 5,

//       // swipe: false,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: 3,
//             slidesToScroll: 3,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 2,
//           },
//         },
//       ],
//     }
//   }

// // ! Trailer card
//  if (props.isTrailerCard && props.trailers) {
//    const slideCount = props.trailers.length > 1 ? 2 : 1 // Use trailers from props
//    const showArrows = props.trailers.length > 1 // Check if more than one trailer
//    const enableSwipe = props.trailers.length > 1 // Enable swipe if more than one trailer

//    settings = {
//      ...settings,
//      infinite: false,
//      slidesToShow: slideCount,
//      slidesToScroll: slideCount,
//      arrows: showArrows, // Show or hide arrows based on number of trailers
//      swipe: enableSwipe, // Enable or disable swipe based on number of trailers
//      responsive: [
//        {
//          breakpoint: 600,
//          settings: {
//            slidesToShow: slideCount,
//            slidesToScroll: slideCount,
//            arrows: showArrows, // Responsive behavior
//            swipe: enableSwipe, // Responsive swipe behavior
//          },
//        },
//        {
//          breakpoint: 480,
//          settings: {
//            slidesToShow: slideCount,
//            slidesToScroll: slideCount,
//            arrows: showArrows, // Responsive behavior
//            swipe: enableSwipe, // Responsive swipe behavior
//          },
//        },
//      ],
//    }
//  }

// // ! Season Card
//  if (props.isSeasonsCard && props.season) {
//    const slideCount = props.season.length > 1 ? 2 : 1 // Use trailers from props
//    const showArrows = props.season.length > 1 // Check if more than one trailer
//    const enableSwipe = props.season.length > 1 // Enable swipe if more than one trailer

//    settings = {
//      ...settings,
//      infinite: false,
//      slidesToShow: slideCount,
//      slidesToScroll: slideCount,
//      arrows: showArrows, // Show or hide arrows based on number of trailers
//      swipe: enableSwipe, // Enable or disable swipe based on number of trailers
//      responsive: [
//        {
//          breakpoint: 600,
//          settings: {
//            slidesToShow: slideCount,
//            slidesToScroll: slideCount,
//            arrows: showArrows, // Responsive behavior
//            swipe: enableSwipe, // Responsive swipe behavior
//          },
//        },
//        {
//          breakpoint: 480,
//          settings: {
//            slidesToShow: slideCount,
//            slidesToScroll: slideCount,
//            arrows: showArrows, // Responsive behavior
//            swipe: enableSwipe, // Responsive swipe behavior
//          },
//        },
//      ],
//    }
//  }
//   const [onSwipe, setOnSwipe] = useState(false)

//   return (
//     <Slick
//       autoplay={false}
//       {...settings}
//       autoplaySpeed={5000}
//       onSwipe={() => setOnSwipe(true)}
//       afterChange={() => setOnSwipe(false)}
//     >
//       {props.children ? props.children(onSwipe) : ''}
//     </Slick>
//   )
// }







// !=============================


















// !best one yet
//! slider.tsx
// 'use client'
// import { ReactNode, useEffect, useState } from 'react'
// import './slider.css'
// import Slick, { Settings } from 'react-slick'

// interface Props extends Omit<Settings, 'children'> {
//   sliderKey: string // Unique key for each slider
//   isMoviesCard?: boolean
//   isSeasonsCard?: boolean
//   season?: any[]
//   isTrailerCard?: boolean
//   trailers?: any[]
//   children?: (onSwipe: boolean) => ReactNode
// }

// export default function Slider(props: Props) {
//   let settings: Omit<Settings, 'children'> = {
//     ...props,
//     speed: 400,
//     cssEase: 'ease-in-out',
//   }

//   // ! Movie Card
//   if (props.isMoviesCard) {
//     settings = {
//       ...settings,
//       infinite: true,
//       slidesToShow: 5,
//       slidesToScroll: 5,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: 3,
//             slidesToScroll: 3,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 2,
//           },
//         },
//       ],
//     }
//   }

//   // ! Trailer card
//   if (props.isTrailerCard && props.trailers) {
//     const slideCount = props.trailers.length > 1 ? 2 : 1
//     const showArrows = props.trailers.length > 1
//     const enableSwipe = props.trailers.length > 1

//     settings = {
//       ...settings,
//       infinite: false,
//       slidesToShow: slideCount,
//       slidesToScroll: slideCount,
//       arrows: showArrows,
//       swipe: enableSwipe,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//       ],
//     }
//   }

//   // ! Season Card
//   if (props.isSeasonsCard && props.season) {
//     const slideCount = props.season.length > 1 ? 2 : 1
//     const showArrows = props.season.length > 1
//     const enableSwipe = props.season.length > 1

//     settings = {
//       ...settings,
//       infinite: false,
//       slidesToShow: slideCount,
//       slidesToScroll: slideCount,
//       arrows: showArrows,
//       swipe: enableSwipe,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//       ],
//     }
//   }

//   const [onSwipe, setOnSwipe] = useState(false)
//   const [initialSlide, setInitialSlide] = useState<number | null>(null) // Initialize as null to ensure it's set after the effect runs
//   const [isReady, setIsReady] = useState(false) // Flag to ensure slider initializes correctly

//   // Save swipe index to sessionStorage
//   const saveSwipeIndex = (index: number) => {
//     sessionStorage.setItem(props.sliderKey, `${index}`)
//   }

//   // Load swipe index from sessionStorage
//   useEffect(() => {
//     const savedIndex = sessionStorage.getItem(props.sliderKey)
//     if (savedIndex !== null) {
//       setInitialSlide(parseInt(savedIndex, 10)) // Parse the saved index and set it as the initial slide
//     } else {
//       setInitialSlide(0) // Default to 0 if there's nothing in sessionStorage
//     }

//     setIsReady(true) // Once the initialSlide is set, mark the component as ready
//   }, [props.sliderKey])

  

//   if (!isReady || initialSlide === null) {
//     return <div className='h-[100vh]'></div> // Prevent rendering until the initialSlide is ready
//   }

//   return (
//     <Slick
//       {...settings}
//       autoplaySpeed={5000}
//       initialSlide={initialSlide} // Set the initial slide from sessionStorage
//       onSwipe={() => setOnSwipe(true)}
//       afterChange={(index) => {
//         setOnSwipe(false)
//         saveSwipeIndex(index) // Save the current slide index after swipe
//       }}
//     >
//       {props.children ? props.children(onSwipe) : ''}
//     </Slick>
//   )
// }









// slider.tsx
'use client'
import { ReactNode, useEffect, useState } from 'react'
import './slider.css'
import Slick, { Settings } from 'react-slick'

interface Props extends Omit<Settings, 'children'> {
  sliderKey: string // Unique key for each slider
  isMoviesCard?: boolean
  isSeasonsCard?: boolean
  season?: any[]
  isTrailerCard?: boolean
  trailers?: any[]
  children?: (onSwipe: boolean) => ReactNode
}

export default function Slider(props: Props) {
  let settings: Omit<Settings, 'children'> = {
    ...props,
    speed: 400,
    cssEase: 'ease-in-out',
  }

  // Settings for Movie Card
  if (props.isMoviesCard) {
    settings = {
      ...settings,
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5,
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

  // Settings for Trailer card
  if (props.isTrailerCard && props.trailers) {
    const slideCount = props.trailers.length > 1 ? 2 : 1
    const showArrows = props.trailers.length > 1
    const enableSwipe = props.trailers.length > 1

    settings = {
      ...settings,
      infinite: false,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      arrows: showArrows,
      swipe: enableSwipe,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: slideCount,
            slidesToScroll: slideCount,
            arrows: showArrows,
            swipe: enableSwipe,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: slideCount,
            slidesToScroll: slideCount,
            arrows: showArrows,
            swipe: enableSwipe,
          },
        },
      ],
    }
  }

  // Settings for Season Card
  if (props.isSeasonsCard && props.season) {
    const slideCount = props.season.length > 1 ? 2 : 1
    const showArrows = props.season.length > 1
    const enableSwipe = props.season.length > 1

    settings = {
      ...settings,
      infinite: false,
      slidesToShow: slideCount,
      slidesToScroll: slideCount,
      arrows: showArrows,
      swipe: enableSwipe,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: slideCount,
            slidesToScroll: slideCount,
            arrows: showArrows,
            swipe: enableSwipe,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: slideCount,
            slidesToScroll: slideCount,
            arrows: showArrows,
            swipe: enableSwipe,
          },
        },
      ],
    }
  }

  const [onSwipe, setOnSwipe] = useState(false)
  const [initialSlide, setInitialSlide] = useState<number | null>(null)
  const [isReady, setIsReady] = useState(false)

  const saveSwipeIndex = (index: number) => {
    sessionStorage.setItem(props.sliderKey, `${index}`)
  }

  useEffect(() => {
    const savedIndex = sessionStorage.getItem(props.sliderKey)
    if (savedIndex !== null) {
      setInitialSlide(parseInt(savedIndex, 10))
    } else {
      setInitialSlide(0)
    }

    setIsReady(true)
  }, [props.sliderKey])

  if (!isReady || initialSlide === null) {
    return <div className='h-[100vh]'></div>
  }

  

  return (
    <Slick
      {...settings}
      autoplaySpeed={5000}
      initialSlide={initialSlide}
      onSwipe={() => setOnSwipe(true)}
      afterChange={(index) => {
        setOnSwipe(false)
        saveSwipeIndex(index)
      }}
    >
      {props.children ? props.children(onSwipe) : ''}
    </Slick>
  )
}








































// // slider.tsx
// 'use client'
// import { ReactNode, useEffect, useRef, useState } from 'react'
// import './slider.css'
// import Slick, { Settings } from 'react-slick'

// interface Props extends Omit<Settings, 'children'> {
//   sliderKey: string // Unique key for each slider
//   isMoviesCard?: boolean
//   isSeasonsCard?: boolean
//   season?: any[]
//   isTrailerCard?: boolean
//   trailers?: any[]
//   children?: (onSwipe: boolean) => ReactNode
// }

// export default function Slider(props: Props) {
//   let settings: Omit<Settings, 'children'> = {
//     ...props,
//     speed: 400,
//     cssEase: 'ease-in-out',
//   }

//   // ! Movie Card
//   if (props.isMoviesCard) {
//     settings = {
//       ...settings,
//       infinite: true,
//       slidesToShow: 5,
//       slidesToScroll: 5,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: 3,
//             slidesToScroll: 3,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: 2,
//             slidesToScroll: 2,
//           },
//         },
//       ],
//     }
//   }

//   // ! Trailer card
//   if (props.isTrailerCard && props.trailers) {
//     const slideCount = props.trailers.length > 1 ? 2 : 1
//     const showArrows = props.trailers.length > 1
//     const enableSwipe = props.trailers.length > 1

//     settings = {
//       ...settings,
//       infinite: false,
//       slidesToShow: slideCount,
//       slidesToScroll: slideCount,
//       arrows: showArrows,
//       swipe: enableSwipe,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//       ],
//     }
//   }

//   // ! Season Card
//   if (props.isSeasonsCard && props.season) {
//     const slideCount = props.season.length > 1 ? 2 : 1
//     const showArrows = props.season.length > 1
//     const enableSwipe = props.season.length > 1

//     settings = {
//       ...settings,
//       infinite: false,
//       slidesToShow: slideCount,
//       slidesToScroll: slideCount,
//       arrows: showArrows,
//       swipe: enableSwipe,
//       responsive: [
//         {
//           breakpoint: 600,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//         {
//           breakpoint: 480,
//           settings: {
//             slidesToShow: slideCount,
//             slidesToScroll: slideCount,
//             arrows: showArrows,
//             swipe: enableSwipe,
//           },
//         },
//       ],
//     }
//   }

//   const [onSwipe, setOnSwipe] = useState(false)
//   const [initialSlide, setInitialSlide] = useState<number>(0) // Start with a default value
//   const slickRef = useRef<any>(null) // Create a ref for Slick slider

//   // Save swipe index to sessionStorage
//   const saveSwipeIndex = (index: number) => {
//     sessionStorage.setItem(props.sliderKey, `${index}`)
//   }

//   // Load swipe index from sessionStorage
//   useEffect(() => {
//     const savedIndex = sessionStorage.getItem(props.sliderKey)
//     if (savedIndex !== null && slickRef.current) {
//       const parsedIndex = parseInt(savedIndex, 0)
//       slickRef.current.slickGoTo(parsedIndex) // Use slickGoTo to change slide after initial render
//     }
//   }, [props.sliderKey])

//   return (
//     <Slick
//       {...settings}
//       ref={slickRef} // Assign the Slick ref
//       autoplaySpeed={5000}
//       initialSlide={initialSlide} // Set initialSlide to 0 (default)
//       onSwipe={() => setOnSwipe(true)}
//       afterChange={(index) => {
//         setOnSwipe(false)
//         saveSwipeIndex(index) // Save the current slide index after swipe
//       }}
//     >
//       {props.children ? props.children(onSwipe) : ''}
//     </Slick>
//   )
// }

