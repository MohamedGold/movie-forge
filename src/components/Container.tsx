import { CustomComponentProps } from '@/interfaces'
import { mergeClassName } from '../utilts'

export default function Container(props: CustomComponentProps) {
  return (
    <div
      className={mergeClassName(
        'px-6 py-3 max-w-screen-xl mx-auto mobile:px-3  mobile:max-w-full',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
