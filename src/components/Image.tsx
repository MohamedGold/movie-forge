import { CustomComponentProps } from '@/interfaces'
import { mergeClassName } from '@/utilts'
import Notfound from '../imgs/image-not-found-icon.png'
import ImageSrc from 'next/image'
import { useState } from 'react'

interface Props extends CustomComponentProps {
  src: string
  alt?: string
}

export default function Image(props: Props) {
  const [imageError, setImageError] = useState(false)

  return (
    <div
      className={mergeClassName(
        'bg-primary h-full w-full rounded-lg overflow-hidden',
        props.className
      )}
    >
      {/* img */}
      {props.src && !imageError ? (
        <img
          src={props.src}
          alt={props.alt || ''}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImageError(true)} // في حالة فشل تحميل الصورة
        />
      ) : (
        <div className="flex flex-1 w-[100px] mx-auto items-center justify-center h-full">
          <ImageSrc className=" " src={Notfound} alt="Image not found" />
        </div>
      )}
    </div>
  )
}
