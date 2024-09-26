import { CustomComponentProps } from '@/interfaces'
import Container from './Container'
import { mergeClassName } from '@/utilts'

interface Props extends CustomComponentProps {
  title?: string
  onTitleClick?: () => void
  hidden?: boolean
}

export default function Section(props: Props) {

  
  if (props.hidden) return <></>
  return (
    <Container className={props.className}>
      {props.title ? (
        <h1
          onClick={props.onTitleClick}
          className={mergeClassName(
            'text-xl px-3 py-2',
            props.onTitleClick ? 'cursor-pointer hover:text-[#423F71] transition-all duration-700' : ''
          )}
          dangerouslySetInnerHTML={{
            __html: props.title,
          }}
        ></h1>
      ) : (
        ''
      )}

      {props.children}
    </Container>
  )
}
