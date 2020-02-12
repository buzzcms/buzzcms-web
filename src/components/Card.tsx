/** @jsx jsx */

import { jsx } from 'theme-ui'

export type CardProps = JSX.IntrinsicElements['div']

export default function Card({ children, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      sx={{
        boxShadow: 'md',
        bg: 'white',
        borderRadius: 4,
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translate3d(0, -1px, 0)',
          boxShadow: 'xl',
        },
      }}
    >
      {children}
    </div>
  )
}
