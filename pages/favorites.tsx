import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/favorites.module.scss'
import {Fragment, useEffect, useState} from 'react'
import {Box, Typography} from '@material-ui/core'
import {GradientsType} from "../types";
import {getGradientProperty} from "../utiles";
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const Generate: NextPage = () => {
  const [gradients, setGradients] = useState<GradientsType>([]);
  const [hover, setHover] = useState<number | null>(null)
  useEffect(() => {
    if (window) {
      setGradients(localStorage.gradients ? JSON.parse(localStorage.gradients) : [])
    }
  }, [])

  const copyGradient = (gradient: string[]): void => {
    navigator.clipboard.writeText('background: ' + getGradientProperty(gradient))
  }

  const deleteGradient = (index: number): void => {
    let newGradients = [...gradients]
    newGradients.splice(index, 1)
    localStorage.setItem('gradients', JSON.stringify(newGradients))
    setGradients(newGradients)
  }
  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>
      <div className={styles.wrapper}>
        <Typography align='center' className={styles.title} variant="h3" gutterBottom>
          Favorites
        </Typography>
        {gradients.length > 0
          ? <div className={styles.gradients}>
            {gradients.map((grd, index) => (
              <Box bgcolor='background.default' className={styles.card}
                   key={index}>
                <div className={styles.cardTop}>
                  <CloseIcon onClick={() => deleteGradient(index)} className={styles.cross}/>
                  <div style={
                    {
                      background: getGradientProperty(grd)
                    }}
                       className={styles.gradient}>
                  </div>
                  {grd.map((grdColor, index) => (
                    <Fragment key={index}>
                      <Typography className={styles.copyText} variant="subtitle1">
                        {`#${grdColor}`}
                      </Typography>
                      <Typography className={styles.copyText} variant="subtitle1">
                        {`${grd.length - 1 !== index ? '>' : ''}`}
                      </Typography>
                    </Fragment>
                  ))}
                </div>
                <div className={styles.cardBottom} onClick={() => copyGradient(grd)}>
                  <Typography className={styles.copyCaption} variant="subtitle1">
                    <FileCopyIcon/>&nbsp;<p style={{margin: 0}}>Copy</p>
                  </Typography>
                </div>
              </Box>
            ))}
          </div>
          : <Typography align='center' className={styles.title} variant="h5" gutterBottom>
            There is no saved gradients yet
          </Typography>}

      </div>
    </Layout>
  )
}

export default Generate

