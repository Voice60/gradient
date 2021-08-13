import type {NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/favorites.module.scss'
import {Fragment, useEffect, useState} from 'react'
import {Typography} from '@material-ui/core'
import {gradientsType} from "../types";
import {getGradientProperty} from "../utiles";
import CloseIcon from '@material-ui/icons/Close';

const Generate: NextPage = () => {
  const [gradients, setGradients] = useState<gradientsType>([]);
  useEffect(() => {
    if (window) {
      setGradients(localStorage.gradients ? JSON.parse(localStorage.gradients) : [])

    }
  }, []);

  const copyGradient = (gradient: string[]): void => {
    navigator.clipboard.writeText('background: ' + getGradientProperty(gradient))
    // setIsCopied(true)
  }

  const deleteGradient = (index: number): void => {
    let newGradients = [...gradients]
    newGradients.splice(index, 1)
    localStorage.setItem('gradients', JSON.stringify(newGradients))
    setGradients(newGradients)
    // setIsCopied(true)
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
              <div className={styles.card}
                   key={index}>
                <div style={{background: getGradientProperty(grd)}}
                     className={styles.gradient}>
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

                  <CloseIcon onClick={() => deleteGradient(index)} className={styles.cross}/>
                </div>
                <div className={styles.cardBottom} onClick={() => copyGradient(grd)}>
                  <div className={styles.copyCaption}>
                    <Typography className={styles.copyText} variant="subtitle1">
                      <Image width={16} height={16} src="/copyIcon.svg" alt="copyIcon"/>&nbsp;Copy
                    </Typography>
                  </div>
                </div>
              </div>
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

