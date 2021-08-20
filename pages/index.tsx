import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/home.module.scss'
import {useState} from 'react'
import Layout from '../components/layout'
import cn from "classnames";
import {Typography} from "@material-ui/core";

const Home: NextPage = () => {
  const [hover, setHover] = useState<string>('')

  const onMouseEnter = (name: string): void => {
    setHover(name)
  }

  const onMouseLeave = (): void => {
    setHover('')
  }

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Head>
          <title>Gradient</title>
        </Head>
        <nav className={styles.nav}>
          <Link href="/favorites">
            <a onMouseEnter={() => onMouseEnter('favorites')}
               onMouseLeave={onMouseLeave}
               className={cn(styles.navLink, {[styles.navLink_animation]: hover === 'favorites'})}>
              <Typography variant={'h4'}>Favorites</Typography>
            </a>
          </Link>
          <Link href="/generate">
            <a onMouseEnter={() => onMouseEnter('generate')}
               onMouseLeave={onMouseLeave}
               className={cn(styles.navLink, {[styles.navLink_animation]: hover === 'generate'})}>
              <Typography variant={'h4'}>Generate gradient</Typography>
            </a>
          </Link>
          <Link href="/presets">
            <a onMouseEnter={() => onMouseEnter('presets')}
               onMouseLeave={onMouseLeave}
               className={cn(styles.navLink, {[styles.navLink_animation]: hover === 'presets'})}>
              <Typography variant={'h4'}>Presets</Typography>
            </a>
          </Link>
        </nav>
      </div>
    </Layout>
  )
}

export default Home
