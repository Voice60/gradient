import { Drawer } from '@material-ui/core'
import type { NextPage } from 'next'
import { useState } from 'react'
import styles from '../styles/layout.module.scss'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useRouter } from 'next/dist/client/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Image from 'next/image';

const Layout: NextPage = ({ children }) => {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  const hideDrawer = (): void => setIsDrawerOpen(false)
  const showDrawer = (): void => setIsDrawerOpen(true)

  return (
    <div className={styles.container}>
      {router.pathname !== '/' && <IconButton onClick={showDrawer} size='medium' edge="start" className={styles.drawerBtn} color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>}
      <Drawer anchor='left' open={isDrawerOpen} onClose={hideDrawer}>
        <List>
          <ListItem  button onClick={() => router.push('/')} className={styles.icon}>
            <ListItemIcon className={styles.icon}><Image width={32} height={32} src='/favicon.ico' alt='icon'></Image></ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem className={router.pathname === '/generate' ? styles.listItem_selected : ''} button onClick={() => router.push('/generate')} >
            <ListItemText  primary='Генерация градиента' />
          </ListItem>
        </List>
      </Drawer>
      {children}
      <footer className={styles.footer}>
        Created by Voice
      </footer>
    </div>
  )
}

export default Layout