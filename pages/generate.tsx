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
import {Gradient, GradientsType} from "../types";
import {getGradientProperty} from "../utiles";
import cn from 'classnames';

const Generate: NextPage = () => {
  const [gradient, setGradient] = useState<Gradient>([])
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
      const gradients: GradientsType = JSON.parse(localStorage.gradients ? localStorage.gradients : '[]')
      gradients.unshift(gradient)
      localStorage.setItem('gradients', JSON.stringify(gradients))
      setIsSaved(true)
    }
  }

  const deleteGradient = (): void => {
    const gradients: GradientsType = JSON.parse(localStorage.gradients ? localStorage.gradients : '[]')
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
    let newGradient: Gradient = []
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
             style={{background: gradient.length ? getGradientProperty(gradient) : '#323232;'}}></div>
        <Typography align='center' className={styles.title} variant="h3" gutterBottom>
          Generate Your Gradient
        </Typography>
        <Typography variant='h6' className={cn(styles.message, {[styles.message_active]: isCopied})}>
          Gradient copied!
        </Typography>
        <Typography style={{visibility: gradient.length ? 'visible' : 'hidden'}}
                    className={styles.gradientProperty}
                    align='center'
                    variant='h5'
                    gutterBottom>
          {`background: ${getGradientProperty(gradient)}`}
        </Typography>
        <ThemeProvider theme={theme}>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button size="large" onClick={generateGradient} variant="contained" color="primary">
              <CachedIcon/>
              &nbsp;generate
            </Button>
            {isSaved
              ? <Button onClick={deleteGradient}>
                <BookmarkIcon/>
                <Typography className={styles.btnText} variant='button'>&nbsp;delete</Typography>
              </Button>
              : <Button onClick={saveGradient}>
                <BookmarkBorderIcon/>
                <Typography className={styles.btnText} variant='button'>&nbsp;save</Typography>
              </Button>}
            <Button size="large" onClick={copyGradient} variant="contained" color="primary">
              <Image width={20} height={20} src="/copyIcon.svg" alt="copyIcon"/>
              <Typography className={styles.btnText} variant='button'>&nbsp;copy</Typography>
            </Button>
          </ButtonGroup>
        </ThemeProvider>
      </div>
    </Layout>
  )
}

export default Generate