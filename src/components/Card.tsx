// import { CustomComponentProps } from '@/interfaces'
// import Image from './Image'
// import { MdPlayCircleFilled } from 'react-icons/md'

// interface Props extends CustomComponentProps {
//   imageSrc: string
//   title?: string
//   onClick?: () => void
//   withPlay?: boolean
// }
// export default function Card(props: Props) {
//   const withPlay = props.withPlay ?? true

//   return (
//     <div
//       onClick={() => props.onClick && props.onClick()}
//       className="group mx-3 my-1.5 cursor-pointer transition-all duration-1000"
//     >
//       <div
//         className="
//           mobile:h-[200px]
//           lg:h-[300px]
//           h-[200px]
//           relative
//           rounded-lg
//           overflow-hidden
//           transition-all
//           duration-[1500]
//         "
//       >
//         {withPlay ? (
//           <div
//             className="
//             absolute
//             hidden
//             group-hover:flex
//             items-center
//             justify-center
//             left-0
//             right-0
//             top-0
//             bottom-0
//             transition-all
//             duration-[1500]
//             before:absolute
//             before:content-['']
//             before:bg-black
//             before:opacity-0
//             group-hover:before:opacity-[0.7]
//             before:left-0
//             before:right-0
//             before:top-0
//             before:bottom-0
//             before:transition-all
//             before:duration-[1500]
//         "
//           >
//             <button className="relative z-10">
//               <MdPlayCircleFilled size={32}></MdPlayCircleFilled>
//             </button>
//           </div>
//         ) : (
//           ''
//         )}
//         <Image src={props.imageSrc}></Image>
//       </div>
//       <p className="py-1.5 line-clamp-2 font-semibold text-center">{props.title}</p>
//       {props.children}
//     </div>
//   )
// }

//!================================================

// import { CustomComponentProps } from '@/interfaces'
// import Image from './Image'
// import { MdPlayCircleFilled } from 'react-icons/md'

// interface Props extends CustomComponentProps {
//   imageSrc: string
//   title?: string
//   onClick?: () => void
//   withPlay?: boolean
// }

// export default function Card(props: Props) {
//   const withPlay = props.withPlay ?? true

//   return (
//     <div
//       onClick={() => props.onClick && props.onClick()}
//       className="group mx-3 my-1.5 cursor-pointer transition-all duration-1000"
//     >
//       <div
//         className="
//           mobile:h-[200px]
//           lg:h-[300px]
//           h-[200px]
//           relative
//           rounded-lg
//           overflow-hidden
//           transition-all
//           duration-[1500]
//         "
//       >
//         {withPlay ? (
//           <div
//             className="
//             absolute
//             inset-0
//             flex items-center justify-center
//             transition-all
//             duration-[1000]
//             opacity-0
//             group-hover:opacity-100
//             group-hover:delay-200  /* Delay of 0.5 seconds before fade in */
//             before:absolute
//             before:content-['']
//             before:bg-black
//             before:opacity-0
//             group-hover:before:opacity-[0.7]
//             before:inset-0
//             before:transition-all
//             before:duration-[1000]
//           "
//           >
//             <button
//               className="
//               relative z-10
//               transition-transform
//               transform  /* Ensures the rotation effect is applied */
//               duration-[1000]
//               group-hover:rotate-180  /* Rotate 180 degrees during hover */
//               group-hover:delay-500  /* Delay to match the fade-in */
//             "
//             >
//               <MdPlayCircleFilled className="mobile:size-[30px]" size={40} />
//             </button>
//           </div>
//         ) : (
//           ''
//         )}
//         <Image alt="" src={props.imageSrc} />
//       </div>
//       <p className="py-1.5 line-clamp-2 font-semibold text-center">
//         {props.title}
//       </p>
//       {props.children}
//     </div>
//   )
// }

// ! ==============================================

// 'use client'
// import { CustomComponentProps } from '@/interfaces'
// import Image from './Image'
// import { MdPlayCircleFilled } from 'react-icons/md'
// import { useState, useRef } from 'react'

// interface Props extends CustomComponentProps {
//   imageSrc: string
//   title?: string
//   onClick?: () => void
//   withPlay?: boolean
// }

// export default function Card(props: Props) {
//   const withPlay = props.withPlay ?? true
//   const [isLongPress, setIsLongPress] = useState(false)
//   const pressTimerRef = useRef<NodeJS.Timeout | null>(null)

//   const handleMouseDown = () => {
//     // بدء مؤقت الضغط المطوّل (500ms)
//     pressTimerRef.current = setTimeout(() => setIsLongPress(true), 220)
//   }

//   const handleMouseUp = () => {
//     if (pressTimerRef.current) {
//       clearTimeout(pressTimerRef.current)
//       pressTimerRef.current = null
//     }

//     // إذا لم يكن ضغط طويل، نفذ الـ onClick (النقر السريع)
//     if (!isLongPress && props.onClick) {
//       props.onClick()
//     }

//     // إعادة تعيين حالة الضغط المطوّل
//     setIsLongPress(false)
//   }

//   return (
//     <div
//       onMouseDown={handleMouseDown}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={() => {
//         if (pressTimerRef.current) {
//           clearTimeout(pressTimerRef.current)
//         }
//         setIsLongPress(false)
//       }}
//       className="group mx-3 my-1.5 cursor-pointer transition-all duration-1000"
//     >
//       <div
//         className="
//           mobile:h-[200px]
//           lg:h-[300px]
//           h-[200px]
//           relative
//           rounded-lg
//           overflow-hidden
//           transition-all
//           duration-[1500]
//         "
//       >
//         {withPlay ? (
//           <div
//             className="
//             absolute
//             inset-0
//             flex items-center justify-center
//             transition-all
//             duration-[1000]
//             opacity-0
//             group-hover:opacity-100
//             group-hover:delay-200
//             before:absolute
//             before:content-['']
//             before:bg-black
//             before:opacity-0
//             group-hover:before:opacity-[0.7]
//             before:inset-0
//             before:transition-all
//             before:duration-[1000]
//           "
//           >
//             <button
//               className="
//               relative z-10
//               transition-transform
//               transform
//               duration-[1000]
//               group-hover:rotate-180
//               group-hover:delay-500
//             "
//             >
//               <MdPlayCircleFilled className="mobile:size-[30px]" size={40} />
//             </button>
//           </div>
//         ) : null}
//         <Image alt="" src={props.imageSrc} />
//       </div>
//       <p className="py-1.5 line-clamp-2 font-semibold text-center">
//         {props.title}
//       </p>
//       {props.children}
//     </div>
//   )
// }

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
  mediaType: MediaType  // نوع الوسائط (فيلم/مسلسل)
  releaseDate: string
  cardType?: 'default' | 'cast' | 'season' | 'trailer' // Add a cardType prop
}

export default function Card(props: Props) {
  const withPlay = props.withPlay ?? true
  const [isLongPress, setIsLongPress] = useState(false)
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null)
  // loading
    const [loading, setLoading] = useState(true)

  // الحصول على التصنيفات من الـ globalContext
  const { genres } = useGlobalContext()

  const handleMouseDown = () => {
    pressTimerRef.current = setTimeout(() => setIsLongPress(true), 220)
  }

  const handleMouseUp = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current)
      pressTimerRef.current = null
    }

    if (!isLongPress && props.onClick) {
      props.onClick()
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
      onMouseLeave={() => {
        if (pressTimerRef.current) {
          clearTimeout(pressTimerRef.current)
        }
        setIsLongPress(false)
      }}
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
          lg:min-h-[300px] 
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
        <Image  className="test" alt="" src={props.imageSrc} />

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
