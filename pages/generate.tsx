import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/generate.module.scss'
import { useRef, useState } from 'react'
import Button from '@material-ui/core/Button';
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors'

const Generate: NextPage = () => {
  const [gradient, setGradient] = useState<string>('')
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const text = useRef<HTMLHeadingElement>(null)
  const hexArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'f']

  const theme = createTheme({
    palette: {
      primary: {
        main: blue[400]
      },
    },
  })

  const genereteLetter = (): string => {
    const n = Math.floor(Math.random() * 15)
    return hexArray[n].toString()
  }

  const copyGradient = (): void => {
    navigator.clipboard.writeText(gradient)
    setIsCopied(true)
  }

  const generateGradient = (): void => {
    setIsCopied(false)
    let newGradient = ''
    for (let i = 0; i < 12; i++) {
      newGradient += genereteLetter()
    }
    setGradient(`linear-gradient(90deg, #${newGradient.slice(0, 6)}, #${newGradient.slice(-6)})`)
  }

  return (
    <Layout>
      <Head>
        <title>Generator</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.gradient} style={{ background: gradient ? gradient : 'black' }}></div>
        <h1 className={styles.title}>Generate Your Gradient</h1>
        <h2 className={`${styles.message} ${isCopied ? styles.message_active : ''}`} >Gradient copied!</h2>
        <h2 style={{ visibility: gradient ? 'visible' : 'hidden' }} onClick={copyGradient} className={styles.gradientProperty}>
          {'background: ' + gradient + ' '} <Image width={16} height={16} src="/copyIcon.svg" alt="copyIcon" />
        </h2>
        <ThemeProvider theme={theme}>
          <Button onClick={generateGradient} className={styles.generateBtn} variant="contained" color="primary">
            generate
          </Button>
        </ThemeProvider>
      </div>
    </Layout>
  )
}

export default Generate