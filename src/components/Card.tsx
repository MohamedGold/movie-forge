

'use client'
import { CustomComponentProps, Film as FilmInterface } from '@/interfaces'
import Image from './Image'
import { MdPlayCircleFilled, MdStar, MdVisibility } from 'react-icons/md' // أيقونة النجمة
import { useState, useRef } from 'react'
import { useGlobalContext } from '@/app/RootLayout'
import { MediaType } from '@/types'
import { mergeClassName } from '@/utilts'

interface Props extends CustomComponentProps {
  imageSrc: string
  title?: string
  rating?: number // إضافة التقييم
  genreIds?: number[] // IDs للتصنيفات
  views?: number // إضافة عدد المشاهدات
  onClick?: () => void
  withPlay?: boolean
  mediaType: MediaType // نوع الوسائط (فيلم/مسلسل)
  releaseDate: string
  cardType?: 'default' | 'cast' | 'season' | 'trailer' // Add a cardType prop
  onSwipe?: boolean // New prop to receive swipe state from Slider
}

export default function Card(props: Props) {
  const withPlay = props.withPlay ?? true
  const [isLongPress, setIsLongPress] = useState(false)
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null) // Reference to debounce timer
  const startPositionRef = useRef<{ x: number; y: number } | null>(null) // Track start position
  const movementThreshold = 70 // Threshold for detecting a scroll instead of a click
  // loading
  const [loading, setLoading] = useState(true)

  // الحصول على التصنيفات من الـ globalContext
  const { genres } = useGlobalContext()

  const handleMouseDown = (event: React.MouseEvent | React.TouchEvent) => {
    pressTimerRef.current = setTimeout(() => setIsLongPress(true), 96)
    const clientX =
      (event as React.MouseEvent).clientX ||
      (event as React.TouchEvent).touches[0].clientX
    const clientY =
      (event as React.MouseEvent).clientY ||
      (event as React.TouchEvent).touches[0].clientY
    startPositionRef.current = { x: clientX, y: clientY }

    // Start a debounce timer for 1 second
    debounceTimerRef.current = setTimeout(() => {
      if (!isLongPress && props.onClick && !props.onSwipe) {
        props.onClick()
      }
    }, 1000)
  }

  const handleMouseUp = (event: React.MouseEvent | React.TouchEvent) => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }


     if (debounceTimerRef.current) {
       clearTimeout(debounceTimerRef.current) // Clear the debounce timer when releasing
       debounceTimerRef.current = null
     }

    const startPosition = startPositionRef.current
    const clientX =
      (event as React.MouseEvent).clientX ||
      (event as React.TouchEvent).changedTouches[0].clientX
    const clientY =
      (event as React.MouseEvent).clientY ||
      (event as React.TouchEvent).changedTouches[0].clientY

    if (startPosition) {
      const deltaX = Math.abs(clientX - startPosition.x)
      const deltaY = Math.abs(clientY - startPosition.y)
      if (deltaX > movementThreshold || deltaY > movementThreshold) {
        // If moved beyond the threshold, consider it a scroll, not a click
        setIsLongPress(false)
        return
      }
    }

    if (!isLongPress && props.onClick && !props.onSwipe) {
      props.onClick()
    }

    setIsLongPress(false)
  }



   const handleMouseLeave = () => {
     if (pressTimerRef.current) {
       clearTimeout(pressTimerRef.current)
     }
     if (debounceTimerRef.current) {
       clearTimeout(debounceTimerRef.current)
     }
     setIsLongPress(false)
   }

  /// الحصول على أسماء التصنيفات بناءً على genreIds (عرض حد أقصى لتصنيفين)
  const genreNames =
    props.genreIds
      ?.map((id) => genres[props.mediaType]?.find((g) => g.id === id)?.name)
      .slice(0, 2) || []

  // const formatNumber = (number: number) => {
  //   const numberParts = number.toString().split('.')
  //   numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  //   return numberParts.join(',')
  // }

  const getYear = (dateString: string) => {
    const date = new Date(dateString)
    return isNaN(date.getTime()) ? 'N/A' : date.getFullYear()
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={mergeClassName(
        'group mx-3 my-1.5 cursor-pointer transition-all duration-1000',
        props.className
      )}
    >
      <div
        className="
          mobile:min-h-[200px]
          vs:min-h-[200px]
          sm:min-h-[200px]
          lg:min-h-[333.60px] 
          h-[200px]
        
  

          relative
          rounded-lg 
          overflow-hidden
          transition-all 
          duration-[1500]
          ease-in-out
        "
      >
        {withPlay ? (
          <div
            className="
            absolute
            inset-0
            flex items-center justify-center
            transition-all 
            duration-[1500]
            opacity-0
            group-hover:opacity-100
            group-hover:delay-200
            before:absolute
            before:content-['']
            before:bg-black
            before:opacity-0
            group-hover:before:opacity-[0.7]
            before:inset-0
            before:transition-all 
            before:duration-[1500]
            before:ease-in-out
          "
          >
            <button
              className="
              relative z-10
              transition-transform 
              transform
              duration-[1500]
              group-hover:rotate-180  
              group-hover:delay-500
              mobile:mt-[150px]
              vs:mt-[130px]
              sm:mt-[130px]
              lg:mt-[130px]
              ease-in-out
              
              
            "
            >
              <MdPlayCircleFilled
                className="mobile:size-[30px] vs:size-[30px  "
                size={40}
              />
            </button>
          </div>
        ) : null}
        <Image className="test" alt="" src={props.imageSrc} />

        {/* العناصر المضافة: التقييم، التصنيفات، وعدد المشاهدات **/}
        {props.cardType !== 'cast' &&
          props.cardType !== 'trailer' &&
          props.cardType !== 'season' && (
            <div
              className="
            absolute top-2 left-2
            flex flex-col items-start gap-1
            bg-black bg-opacity-70 p-2
            rounded-lg
            transition-all
            duration-[1000]
            delay-100
            group-hover:transition-all
            group-hover:delay-200
            opacity-0 group-hover:opacity-[0.9]
            font-semibold
            
          "
            >
              {/* التصنيفات **/}
              {genreNames.length > 0 && (
                <ul className="flex flex-wrap flex-col gap-1 ">
                  {genreNames.map(
                    (genre, i) =>
                      genre && (
                        <li
                          key={i}
                          className="text-body  rounded-lg px-2 w-fit   bg-yellow-400  text-xs"
                        >
                          {genre}
                        </li>
                      )
                  )}
                </ul>
              )}

              {/* التقييم **/}
              {props.rating && (
                <div className="flex items-center text-white text-xs">
                  <MdStar className="text-yellow-400" size={14} />
                  <span className="ml-1">
                    {props.rating ? props.rating.toFixed(1) : 'N/A'}
                  </span>
                </div>
              )}

              {/* media type */}
              {props.mediaType && (
                <span className="capitalize  text-xs">
                  {props.mediaType ? props.mediaType : ''}
                </span>
              )}

              {/* release Date */}
              {props.releaseDate && (
                <span className="text-sm">
                  {props.releaseDate
                    ? new Date(props.releaseDate).getFullYear()
                    : ''}
                </span>
              )}

              {/* عدد المشاهدات **/}
              {props.views && (
                <div className="flex items-center text-white text-xs">
                  <MdVisibility className="mr-1" size={14} />
                  <span>{props.views.toFixed(3)}</span>
                </div>
              )}
            </div>
          )}
      </div>

      {/* اسم الفيلم تحت الصورة */}
      <div className="py-1.5 text-center">
        <p className="line-clamp-2 font-semibold">{props.title}</p>
      </div>
    </div>
  )
}
