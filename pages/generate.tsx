import { ButtonGroup, Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import BookmarkIcon from '@material-ui/icons/Bookmark'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import CachedIcon from '@material-ui/icons/Cached'
import FileCopyIcon from "@material-ui/icons/FileCopy"

import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '../components/Layout/Layout'
import SimpleSnackbar from "../components/SnackBar"
import styles from '../styles/pages/generate.module.scss'
import { Gradient, GradientsType } from "../types"
import { copyGradient, getGradientProperty, generateGradient } from "../utiles/functions"

const Generate: NextPage = () => {
  const [gradient, setGradient] = useState<Gradient>([])
  const [isSaved, setIsSaved] = useState<boolean>(false)
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

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

  const copyGradientWithAlert = (): void => {
    copyGradient(gradient)
    setIsSnackbarOpen(true)
  }

  const generateNewGradient = (): void => {
    setIsSaved(false)
    let newGradient: Gradient = generateGradient()
    setGradient(newGradient)
  }

  return (
    <Layout>
      <Head>
        <title>Generator</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.gradient}
          style={{ background: gradient.length ? getGradientProperty(gradient) : 'transparent;' }}></div>
        <Typography align='center' className={styles.title} variant="h3" gutterBottom>
          Generator
        </Typography>
        <Typography style={{ visibility: gradient.length ? 'visible' : 'hidden' }}
          className={styles.gradientProperty}
          align='center'
          variant='h5'
          gutterBottom>
          {`background: ${getGradientProperty(gradient)}`}
        </Typography>
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
          <Button size="large" onClick={generateNewGradient} variant="contained" color="primary">
            <CachedIcon />
            &nbsp;generate
          </Button>
          {isSaved
            ? <Button disabled={gradient.length === 0} size="large" onClick={deleteGradient} variant="contained"
              color="primary">
              <BookmarkIcon />
              <Typography className={styles.btnText} variant='button'>&nbsp;delete</Typography>
            </Button>
            : <Button disabled={gradient.length === 0} size="large" onClick={saveGradient} variant="contained"
              color="primary">
              <BookmarkBorderIcon />
              <Typography className={styles.btnText} variant='button'>&nbsp;save</Typography>
            </Button>}
          <Button disabled={gradient.length === 0} size="large" onClick={copyGradientWithAlert} variant="contained"
            color="primary">
            <FileCopyIcon />
            <Typography className={styles.btnText} variant='button'>&nbsp;copy</Typography>
          </Button>
        </ButtonGroup>
      </div>
      <SimpleSnackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} message={'Gradient copied'} />
    </Layout>
  )
}

export default Generate