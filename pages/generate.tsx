import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/generate.module.scss'
import {useState} from 'react'
import Button from '@material-ui/core/Button';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import {ButtonGroup, Typography} from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {gradient, gradientsType} from "../types";
import {getGradientProperty} from "../utiles";

const Generate: NextPage = () => {
  const [gradient, setGradient] = useState<gradient>([])
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const [isSaved, setIsSaved] = useState<boolean>(false)
  type hexLetter = string | number
  const hexArray: hexLetter[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3'
      },
    },
  })

  const generateLetter = (): string => {
    const n = Math.floor(Math.random() * 16)
    return hexArray[n].toString()
  }

  const saveGradient = (): void => {
    if (gradient.length) {
      const gradients: gradientsType = JSON.parse(localStorage.gradients ? localStorage.gradients : '[]')
      gradients.unshift(gradient)
      localStorage.setItem('gradients', JSON.stringify(gradients))
      setIsSaved(true)
    }
  }

  const deleteGradient = (): void => {
    const gradients: gradientsType = JSON.parse(localStorage.gradients ? localStorage.gradients : '[]')
    gradients.shift()
    localStorage.setItem('gradients', JSON.stringify(gradients))
    setIsSaved(false)
  }

  const copyGradient = (): void => {
    navigator.clipboard.writeText('background: ' + getGradientProperty(gradient))
    setIsCopied(true)
  }

  const generateGradient = (): void => {
    setIsCopied(false)
    setIsSaved(false)
    let newGradient: string[] = []
    for (let i = 0; i < 2; i++) {
      let grd: string = ''
      for (let k = 0; k < 6; k++) {
        grd += generateLetter()
      }
      newGradient.push(grd)
    }
    setGradient(newGradient)
  }

  return (
    <Layout>
      <Head>
        <title>Generator</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.gradient}
             style={{background: gradient[0] ? getGradientProperty(gradient) : 'black'}}></div>
        <Typography className='title' variant="h3" gutterBottom>
          Generate Your Gradient
        </Typography>
        <h2 className={`${styles.message} ${isCopied ? styles.message_active : ''}`}>Gradient copied!</h2>
        <h2 style={{visibility: gradient[0] ? 'visible' : 'hidden'}} onClick={copyGradient}
            className={styles.gradientProperty}>
          {'background: ' + getGradientProperty(gradient) + ' '}
          <Image width={16} height={16} src="/copyIcon.svg" alt="copyIcon"/>
        </h2>
        <ThemeProvider theme={theme}>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button size="large" onClick={generateGradient} variant="contained" color="primary">
              <CachedIcon/>
              &nbsp;generate
            </Button>
            {isSaved
              ? <Button onClick={deleteGradient}>
                <BookmarkIcon/>
                &nbsp;delete
              </Button>
              : <Button onClick={saveGradient}>
                <BookmarkBorderIcon/>
                &nbsp;save
              </Button>
            }
          </ButtonGroup>
        </ThemeProvider>
      </div>
    </Layout>
  )
}

export default Generate