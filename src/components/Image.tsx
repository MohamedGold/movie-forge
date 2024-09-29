import { CustomComponentProps } from '@/interfaces'
import { mergeClassName } from '@/utilts'
import Notfound from '../imgs/image-not-found-icon.png'
import ImageSrc from 'next/image'
interface Props extends CustomComponentProps {
  src: string
  alt?: string
}

export default function Image(props: Props) {
  return (
    <div
      className={mergeClassName(
        'bg-primary h-full  w-full rounded-lg overflow-hidden',
        props.className
      )}
    >
      {/* img */}

      {props.src ? (
        <img
          src={props.src}
          alt={props.alt || ''}
          className="w-full  h-full   object-cover"
          loading="lazy"
        />
      ) : (
        <div className=" flex flex-1 w-[100px] mx-auto items-center justify-center h-full ">
          <ImageSrc className=" " src={Notfound} alt="" />
        </div>
      )}
    </div>
  )
}
