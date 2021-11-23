import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import styles from '../styles/favorites.module.scss'
import card from "../styles/card.module.scss";
import gradientsList from "../styles/gradientsList.module.scss";
import utils from "../styles/utils.module.scss";
import {Fragment, useEffect, useState} from 'react'
import {Box, Typography} from '@material-ui/core'
import {Gradient, GradientsType} from "../types";
import {copyGradient, getGradientProperty} from "../utiles/functions";
import CloseIcon from '@material-ui/icons/Close';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SimpleSnackbar from "../components/snackbar";
import cn from "classnames";

const Generate: NextPage = () => {
  const [gradients, setGradients] = useState<GradientsType>([]);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  useEffect(() => {
    debugger
    if (window) {
      setGradients(localStorage.gradients ? JSON.parse(localStorage.gradients) : [])
    }
  }, [])

  const deleteGradient = (index: number): void => {
    let newGradients = [...gradients]
    newGradients.splice(index, 1)
    localStorage.setItem('gradients', JSON.stringify(newGradients))
    setGradients(newGradients)
  }

  const copyGradientWithAlert = (grd: Gradient): void => {
    copyGradient(grd)
    setIsSnackbarOpen(true)
  }

  return (
    <Layout>
      <Head>
        <title>Favorites</title>
      </Head>
      <div className={utils.wrapper}>
        <Typography align='center' className={utils.title} variant="h3" gutterBottom>
          Favorites
        </Typography>
        {gradients.length > 0
          ? <div className={gradientsList.gradients}>
            {gradients.map((grd, index) => (
              <Box bgcolor='background.default' className={cn(gradientsList.card, card.card)}
                   key={index}>
                <div className={card.cardTop}>
                  <CloseIcon onClick={() => deleteGradient(index)} className={styles.cross}/>
                  <div style={
                    {
                      background: getGradientProperty(grd)
                    }}
                       className={card.gradient}>
                  </div>
                  {grd.map((grdColor, index) => (
                    <Fragment key={index}>
                      <Typography className={card.copyText} variant="subtitle1">
                        {`#${grdColor}`}
                      </Typography>
                      <Typography className={card.copyText} variant="subtitle1">
                        {`${grd.length - 1 !== index ? '>' : ''}`}
                      </Typography>
                    </Fragment>
                  ))}
                </div>
                <div className={card.cardBottom} onClick={() => copyGradientWithAlert(grd)}>
                  <Typography className={card.copyCaption} variant="subtitle1">
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
      <SimpleSnackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} message={'Gradient copied'}/>
    </Layout>
  )
}

export default Generate

