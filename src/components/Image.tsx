import { CustomComponentProps } from '@/interfaces'
import { mergeClassName } from '@/utilts'
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
      <img
        src={props.src}
        alt={props.alt || 'Not Found'}
        className="w-full h-full min-h-[200px] object-cover"
      />
    </div>
  )
}
