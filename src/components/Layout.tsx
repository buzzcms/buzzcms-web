/** @jsx jsx */

import { Global } from '@emotion/core'
import { jsx, ThemeProvider } from 'theme-ui'

import theme from '~/theme'
import { fonts } from '~/theme/styles'

import Head from './Head'
import TopNav from './TopNav'

interface LayoutProps {
  readonly children?: React.ReactNode | readonly React.ReactNode[]
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={theme => ({
          body: {
            backgroundColor: '#efefef',
            fontFamily: fonts.primary,
          },
          h3: {
            margin: 0,
          },
          a: {
            color: theme.colors.primary,
            textDecoration: 'none',
          },
        })}
      />
      <main>
        <Head />
        <TopNav />
        <div sx={{ mx: 'auto', maxWidth: 'w8', p: [1, 3] }}>{children}</div>
      </main>
    </ThemeProvider>
  )
}
