import { Box, Drawer, FormControlLabel, Switch, Typography } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import styles from '../styles/layout.module.scss'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/dist/client/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';
import cn from 'classnames';
import Theme from './theme';

const Layout: React.FC = ({ children }) => {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const [theme, setTheme] = useState(() => {
    if (process.browser) {
      return JSON.parse(localStorage.getItem('darkTheme'))
    }
    return null
  })

  const setDarkTheme = (theme: boolean): void => {
    setTheme(theme)
    localStorage.setItem('darkTheme', String(theme))
  }

  const checkPC = () => {
    if (process.browser) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return false
      }
    }
    return true
  }

  const hideDrawer = (): void => setIsDrawerOpen(false)
  const showDrawer = (): void => setIsDrawerOpen(true)

  return (
    <Theme>
      <div className={cn(styles.container,
        { [styles.container_pc]: checkPC() })}>
        {router.pathname !== '/' &&
          <IconButton onClick={showDrawer} size='medium'
            edge="start" className={styles.drawerBtn}
            color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>}
        <Drawer variant='temporary'
          classes={{
            paper: styles.drawer
          }}
          anchor='left' open={isDrawerOpen} onClose={hideDrawer}>
          <List>
            <ListItem button
              onClick={() => router.push('/')}
              className={styles.icon}>
              <ListItemIcon className={styles.icon}>
                <Image width={32}
                  height={32}
                  src='/favicon.ico'
                  alt='icon' />
              </ListItemIcon>
            </ListItem>
            <Divider />

            <ListItem onClick={() => router.push('/generate')}
              button>
              <Typography className={cn({ [styles.listItem_selected]: router.pathname === '/generate' })}
                variant='h6'>
                Generate gradient
              </Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/favorites')}
              button>
              <Typography className={cn({ [styles.listItem_selected]: router.pathname === '/favorites' })}
                variant='h6'>
                Favorites
              </Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/presets')}
              button>
              <Typography className={cn({ [styles.listItem_selected]: router.pathname === '/presets' })}
                variant='h6'>
                Presets
              </Typography>
            </ListItem>
          </List>
          <ListItem className={styles.switch}>
            <FormControlLabel control={<Switch checked={theme} onChange={(e) => { setDarkTheme(e.target.checked) }} />} label="Change theme" />
          </ListItem>
        </Drawer>
        <Box bgcolor='background.paper' className={styles.content}>
          {children}
        </Box>
        <Box bgcolor='background.default'>
          <footer className={styles.footer}>
            <Typography className={styles.author} variant='h5'>
              Created by Voice
            </Typography>
          </footer>
        </Box>
      </div>
    </Theme>
  )
}

export default Layout