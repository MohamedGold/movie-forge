// import { Film } from '@/interfaces'
// import Image from './Image'
// import { MdPlayCircleOutline } from 'react-icons/md'
// import { tmdbImageSrc } from '@/utilts';
// interface Props {
//   film: Film
//   onClick: () => void
//   onPlayTrailer: () => void
// }
// export default function TrendingsHero(props: Props) {
//   return (
//     <div
//       className="h-[300px] relative flex items-center cursor-pointer"
//       onClick={() => props.onClick()}
//     >
//       {/* bg img */}
//       <div className="absolute left-0 top-0 right-0 bottom-0 ">
//         <div className="absolute inset-0 bg-gradient-to-r from-body via-transparent to-body overlay-slick-hero"></div>
//         <Image src={tmdbImageSrc(props.film.coverPath)} className='rounded-0 rounded-none' alt=""></Image>
//         <div className='overlay-film-cover'></div>
//       </div>
//       {/* text */}
//       <div className="flex flex-col gap-3 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-[100%]">
//         <p className="text-xl  line-clamp-1">{props.film.title}</p>
//         <p className="text-sm line-clamp-3 ">{props.film.description}</p>
//         <button
//          className="px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md"
//          onClick={(e)=> {
//             e.stopPropagation()
//             props.onPlayTrailer()
//          }}
//          >
//           <MdPlayCircleOutline size={18}></MdPlayCircleOutline>
//           <span>Play trailers</span>
//         </button>
//       </div>
//     </div>
//   )
// }

// ! ===================================================

// 'use client'
// import { Film } from '@/interfaces'
// import Image from './Image'
// import { MdPlayCircleOutline } from 'react-icons/md'
// import { tmdbImageSrc } from '@/utilts'
// import { useState, useRef } from 'react'

// interface Props {
//   film: Film
//   onClick: () => void
//   onPlayTrailer: () => void
// }

// export default function TrendingsHero(props: Props) {
//   const [isLongPress, setIsLongPress] = useState(false)
//   const pressTimerRef = useRef<NodeJS.Timeout | null>(null)

//   const handleMouseDown = () => {
//     // بدء مؤقت الضغط المطوّل (500ms)
//     pressTimerRef.current = setTimeout(() => setIsLongPress(true), 220)
//   }

//   const handleMouseUp = () => {
//     // إذا تم الضغط لفترة قصيرة، نفذ onClick
//     if (pressTimerRef.current) {
//       clearTimeout(pressTimerRef.current)
//       pressTimerRef.current = null
//     }

//     if (!isLongPress) {
//       props.onClick()
//     }

//     // إعادة تعيين حالة الضغط المطوّل
//     setIsLongPress(false)
//   }

//   return (
//     <div
//       className="h-[300px] relative flex items-center cursor-pointer"
//       onMouseDown={handleMouseDown}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={() => {
//         // إذا خرج المستخدم من العنصر قبل رفع الضغط، قم بإلغاء المؤقت
//         if (pressTimerRef.current) {
//           clearTimeout(pressTimerRef.current)
//         }
//         setIsLongPress(false)
//       }}
//     >
//       {/* bg img */}
//       <div className="absolute left-0 top-0 right-0 bottom-0">
//         <div className="absolute inset-0 bg-gradient-to-r from-body via-transparent to-body overlay-slick-hero"></div>
//         <Image
//           src={tmdbImageSrc(props.film.coverPath)}
//           className="rounded-0 rounded-none"
//           alt=""
//         />
//         <div className="overlay-film-cover"></div>
//       </div>
//       {/* text */}
//       <div className="flex flex-col gap-3 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-[100%]">
//         <p className="text-xl  line-clamp-1">{props.film.title}</p>
//         <p className="text-sm line-clamp-3 ">{props.film.description}</p>
//         <button
//           className="px-3 py-1.5 flex items-center gap-3 bg-primary rounded-md"
//           onClick={(e) => {
//             e.stopPropagation()
//             props.onPlayTrailer()
//           }}
//         >
//           <MdPlayCircleOutline size={18}></MdPlayCircleOutline>
//           <span>Play trailers</span>
//         </button>
//       </div>
//     </div>
//   )
// }

'use client'
import { Film } from '@/interfaces'
import Image from './Image'
// import { MdPlayCircleOutline } from 'react-icons/md'
import { tmdbImageSrc } from '@/utilts'
import { useState, useRef } from 'react'
import { useGlobalContext } from '@/app/RootLayout';
import {MdStar} from 'react-icons/md'

interface Props {
  film: Film
  onClick: () => void
  onPlayTrailer?: () => void
  genresIds?: number[]
}

export default function TrendingsHero(props: Props) {
  const [isLongPress, setIsLongPress] = useState(false) // للتحكم في حالة الضغط الطويل
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseDown = () => {
    // بدء مؤقت الضغط المطول
    pressTimerRef.current = setTimeout(() => setIsLongPress(true), 220)
  }

  const { genres } = useGlobalContext()

  // Map genreIds to genre names
  const genreNames =
    props.genresIds
      ?.map(
        (id) => genres[props.film.mediaType]?.find((g) => g.id === id)?.name
      )
      .slice(0, 2) || [] // Adjust the slice as per your requirement

  const handleMouseUp = () => {
    // إلغاء المؤقت عند رفع اليد
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }

    // إذا لم يكن ضغط طويل، نفذ onClick
    if (!isLongPress) {
      props.onClick()
    }

    // إعادة ضبط حالة الضغط الطويل
    setIsLongPress(false)
  }

  return (
    <div
      className="h-[300px] min-h-[300px] relative flex items-center cursor-pointer"
      onMouseDown={handleMouseDown} // استدعاء عند الضغط للأسفل
      onMouseUp={handleMouseUp} // استدعاء عند رفع الضغط
      onMouseLeave={() => {
        // إلغاء المؤقت عند مغادرة العنصر قبل رفع الضغط
        if (pressTimerRef.current) {
          clearTimeout(pressTimerRef.current)
        }
        setIsLongPress(false)
      }}
    >
      {/*  bg img */}
      <div className="absolute left-0  top-0 right-0 bottom-0">
        <div className="absolute inset-0 bg-gradient-to-r from-body via-transparent  to-body overlay-slick-hero"></div>
        <Image
          src={tmdbImageSrc(props.film.coverPath)}
          className="rounded-0  rounded-none"
          alt=""
        />
        <div className="overlay-film-cover"></div>
      </div>
      {/* text */}
      <div className="flex flex-col gap-3 pl-3 items-start relative z-10 mx-[55px] max-w-[50%] mobile:max-w-[100%]">
        <div className=" flex  justify-center items-center">
          <div className="inline-flex  items-center justify-center">
            {/* media type */}
            <span className="capitalize font-normal  text-pretty   rounded-lg px-2 text-lg">
              {props.film.mediaType}:
            </span>
            {/* release data */}
            <span className="mr-2 font-semibold">
              {props.film.releaseDate
                ? new Date(props.film.releaseDate).getFullYear()
                : 'N/A'}
            </span>
            {/* rating */}
            <div className='flex items-center bg-body/60 px-1 rounded-lg justify-center '>
              <MdStar size={20} className="text-yellow-500  " />
              <span className=" ml- font-semibold fon  ">
                {props.film.rating?.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* genres */}
        {genreNames.length > 0 && (
          <ul className="flex flex-wrap flex-row gap-1 ">
            {genreNames.map(
              (genre, i) =>
                genre && (
                  <li
                    key={i}
                    className="text-black  rounded-lg px-2  font-bold   bg-yellow-500   text-xs"
                  >
                    {genre}
                  </li>
                )
            )}
          </ul>
        )}
        {/* title */}
        <p className="text-xl font-semibold  line-clamp-1">
          {props.film.title}
        </p>
        <p className="text-sm line-clamp-3 mb-14 text-white/70 ">
          {props.film.description}
        </p>
      </div>
    </div>
  )
}
