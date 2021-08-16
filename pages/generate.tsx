import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/generate.module.scss'
import {useState} from 'react'
import Button from '@material-ui/core/Button';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import CachedIcon from '@material-ui/icons/Cached';
import {Box, ButtonGroup, Typography} from '@material-ui/core'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import {Gradient, GradientsType} from "../types";
import {getGradientProperty} from "../utiles";
import cn from 'classnames';
import FileCopyIcon from "@material-ui/icons/FileCopy";

const Generate: NextPage = () => {
  const [gradient, setGradient] = useState<Gradient>([])
  const [isSaved, setIsSaved] = useState<boolean>(false)
  type hexLetter = string | number
  const hexArray: hexLetter[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

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
  }

  const generateGradient = (): void => {
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
             style={{background: gradient.length ? getGradientProperty(gradient) : 'transparent;'}}></div>
        <Typography align='center' className={styles.title} variant="h3" gutterBottom>
          Generator
        </Typography>
        <Typography style={{visibility: gradient.length ? 'visible' : 'hidden'}}
                    className={styles.gradientProperty}
                    align='center'
                    variant='h5'
                    gutterBottom>
          {`background: ${getGradientProperty(gradient)}`}
        </Typography>
          <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Button size="large" onClick={generateGradient} variant="contained" color="primary">
              <CachedIcon/>
              &nbsp;generate
            </Button>
            {isSaved
              ? <Button disabled={gradient.length === 0} size="large" onClick={deleteGradient} variant="contained" color="primary">
                <BookmarkIcon/>
                <Typography className={styles.btnText} variant='button'>&nbsp;delete</Typography>
              </Button>
              : <Button disabled={gradient.length === 0} size="large" onClick={saveGradient} variant="contained" color="primary">
                <BookmarkBorderIcon/>
                <Typography className={styles.btnText} variant='button'>&nbsp;save</Typography>
              </Button>}
            <Button disabled={gradient.length === 0} size="large" onClick={copyGradient} variant="contained" color="primary">
              <FileCopyIcon/>
              <Typography className={styles.btnText} variant='button'>&nbsp;copy</Typography>
            </Button>
          </ButtonGroup>
      </div>
    </Layout>
  )
}

export default Generate