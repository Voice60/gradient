import type {NextPage} from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/home.module.scss'
import {useState} from 'react'
import Layout from '../components/layout'

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
          <Link href="/generate">
            <a onMouseEnter={() => {
              onMouseEnter('generate')
            }}
               onMouseLeave={onMouseLeave}
               className={`${styles.navLink}${hover === 'generate' ? ' ' + styles.navLink_animation : ''}`}>
              Generate gradient
            </a>
          </Link>
          <Link href="/favorites">
            <a onMouseEnter={() => {
              onMouseEnter('favorites')
            }}
               onMouseLeave={onMouseLeave}
               className={`${styles.navLink}${hover === 'favorites' ? ' ' + styles.navLink_animation : ''}`}>
              Favorites
            </a>
          </Link>
        </nav>
      </div>
    </Layout>
  )
}

export default Home
