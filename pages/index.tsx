import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/home.module.scss'
import { useEffect, useState } from 'react'
import Layout from '../components/layout'
import cn from "classnames";
import { Typography } from "@material-ui/core";

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
        <div className={styles.content}>
          <div className={styles.actions}>
            <Link href="/generate">
              <a onMouseEnter={() => onMouseEnter('generate')}
                onMouseLeave={onMouseLeave}
                className={cn(styles.navLink, { [styles.navLink_animation]: hover === 'generate' })}>
                <Typography variant={'h4'}>Generate</Typography>
              </a>
            </Link>
            <Link href="/favorites">
              <a onMouseEnter={() => onMouseEnter('favorites')}
                onMouseLeave={onMouseLeave}
                className={cn(styles.navLink, { [styles.navLink_animation]: hover === 'favorites' })}>
                <Typography variant={'h4'}>Favorites</Typography>
              </a>
            </Link>
            <Link href="/presets">
              <a onMouseEnter={() => onMouseEnter('presets')}
                onMouseLeave={onMouseLeave}
                className={cn(styles.navLink, { [styles.navLink_animation]: hover === 'presets' })}>
                <Typography variant={'h4'}>Presets</Typography>
              </a>
            </Link >
          </div>
          <div className={styles.info}>
            <Typography variant={'h6'}>Hello!
              It is a gradient generator, that can help you to choose a gradient.
              Here you can make randomly generated gradient to add him in your own project.
              Сompletely free and extremely convenient</Typography>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
