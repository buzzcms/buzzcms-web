/** @jsx jsx */

import { Link } from 'gatsby'
import { jsx } from 'theme-ui'

import Logo from './Logo'

export interface NavItem {
  label: string
  to?: string
  href?: string
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    to: '/',
  },
  {
    label: 'Templates',
    to: '/templates',
  },
  {
    label: 'Show cases',
    to: '/show-cases',
  },
  {
    label: 'Blog',
    to: '/blog',
  },
  {
    label: 'Dashboard',
    href: 'https://my.buzzcms.co',
  },
]

const theme = {
  link: { px: 3, py: 2, mx: 2 },
}

export default function TopNav() {
  return (
    <header
      sx={{
        maxWidth: 'w8',
        p: [1, 3],
        mx: 'auto',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
      }}
    >
      <Logo />
      <nav sx={{ display: 'flex' }}>
        {navItems.map(({ to, href, label }, idx) => {
          if (to) {
            return (
              <Link sx={theme.link} key={idx} to={to} title={label}>
                {label}
              </Link>
            )
          }
          return (
            <a sx={theme.link} key={idx} href={href} title={label}>
              {label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
