import { CustomComponentProps } from '@/interfaces'
import Container from './Container'
import { mergeClassName } from '@/utilts'

interface Props extends CustomComponentProps {
  title?: string
  onTitleClick?: () => void
  hidden?: boolean
  viewMoreButton?: boolean
  onViewMoreClick?: () => void
}

export default function Section(props: Props) {
  if (props.hidden) return <></>
  return (
    <Container className={props.className}>
      <div className="flex justify-start mb-2  items-center">
        {props.title ? (
          <h1
            onClick={props.onTitleClick}
            className={mergeClassName(
              'text-xl lg:text-2xl font-semibold px-3 py-2',
              props.onTitleClick
                ? 'cursor-pointer hover:text-[#423F71] transition-all duration-700'
                : ''
            )}
            dangerouslySetInnerHTML={{
              __html: props.title,
            }}
          ></h1>
        ) : (
          ''
        )}

        {props.viewMoreButton && (
          <button
            onClick={props.onViewMoreClick}
            className="text-white z-10 bg-primary rounded-lg font-semibold hover:bg-primary/50    px-3 "
          >
            View More
          </button>
        )}
      </div>

      {props.children}
    </Container>
  )
}
