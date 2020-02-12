import css from '@styled-system/css'
import { shade, tint } from '@theme-ui/color'

export type Size = 'small' | 'medium' | 'large'
export type Variant = 'default' | 'outline' | 'minimal'

export interface StyledProps {
  className?: string
  color?: string
  size?: Size
  variant?: Variant
  fill?: boolean
  naked?: boolean
}

export const fonts = {
  primary: 'Open Sans',
}

export const fontSizes = {
  small: 'f6',
  medium: 'f5',
  large: 'f4',
}

export const iconSizes = {
  small: '1em',
  medium: '1.25em',
  large: '1.5em',
}

export const iconSpaces = {
  small: '4px',
  medium: '8px',
  large: '12px',
}

export const wrapperSpaces = {
  small: {
    px: 1,
    py: 1,
  },
  medium: {
    px: 2,
    py: 2,
  },
  large: {
    px: 3,
    py: 3,
  },
}

export const makeStyle = (props: StyledProps) => {
  const {
    size = 'medium',
    variant = 'default',
    color = 'primary',
    fill,
    naked,
  } = props
  const space = naked ? { px: 0, py: 0 } : wrapperSpaces[size]
  // if (naked) {
  //   return {}
  // }
  // const space = { px: 0, py: 0 }

  const colors = {
    default: {
      color: 'white',
      backgroundColor: color,
      borderColor: color,
      ':hover,:focus': {
        color: 'white',
        backgroundColor: shade(color, 0.15),
        borderColor: shade(color, 0.15),
      },
      ':active': {
        color: 'white',
        backgroundColor: shade(color, 0.3),
        borderColor: shade(color, 0.3),
      },
      ':disabled': {},
    },
    minimal: {
      color,
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      ':hover,:focus': {
        color: shade(color, 0.15),
        backgroundColor: tint(color, 0.95),
        borderColor: 'transparent',
      },
      ':active': {
        color: shade(color, 0.3),
        backgroundColor: tint(color, 0.9),
        borderColor: 'transparent',
      },
      ':disabled': {},
    },
    outline: {
      color,
      backgroundColor: 'white',
      borderColor: color,
      ':hover,:focus': {
        color: shade(color, 0.15),
        backgroundColor: tint(color, 0.95),
        borderColor: shade(color, 0.15),
      },
      ':active': {
        color: shade(color, 0.3),
        backgroundColor: tint(color, 0.9),
        borderColor: shade(color, 0.3),
      },
      ':disabled': {},
    },
  }[variant]

  const borderRadius = {
    small: '2px',
    medium: '4px',
    large: '6px',
  }[size]

  return css({
    ...space,
    ...colors,
    appearance: 'unset',
    borderStyle: 'solid',
    cursor: 'pointer',
    borderWidth: '1px',
    borderRadius,
    fontWeight: 'semiBold',
    fontSize: fontSizes[size],
    ':disabled': {
      cursor: 'not-allowed',
    },
    ...{ ...(fill ? { width: '100%' } : {}) },
  })
}
