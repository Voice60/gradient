import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import presets from '../data/presets.json'
import styles from "../styles/presets.module.scss";
import {Box, Typography} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import CloseIcon from "@material-ui/icons/Close";
import {copyGradient, getGradientProperty} from "../utiles/functions";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SimpleSnackbar from "../components/snackbar";
import {Gradient} from "../types";

const Generate: NextPage = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)
  const copyGradientWithAlert = (grd: Gradient): void => {
    copyGradient(grd)
    setIsSnackbarOpen(true)
  }

  return (
    <Layout>
      <Head>
        <title>Presets</title>
      </Head>
      <div className={styles.wrapper}>
        <Typography align='center' className={styles.title} variant="h3" gutterBottom>
          Presets
        </Typography>
        {presets.map((preset, index) => (
          <React.Fragment key={index}>
            <Typography className={styles.gradientsTitle} variant="h4" gutterBottom>
              {preset.title}
            </Typography>
            <div className={styles.gradients}>
              {preset.gradients.map((gradient, index1) => (
                <Box bgcolor='background.default' className={styles.card}
                     key={index1}>
                  <div className={styles.cardTop}>
                    <div style={
                      {
                        background: getGradientProperty(gradient)
                      }}
                         className={styles.gradient}>
                    </div>
                    {gradient.map((grdColor, index2) => (
                      <Fragment key={index2}>
                        <Typography className={styles.copyText} variant="subtitle1">
                          {`#${grdColor}`}
                        </Typography>
                        <Typography className={styles.copyText} variant="subtitle1">
                          {`${gradient.length - 1 !== index2 ? '>' : ''}`}
                        </Typography>
                      </Fragment>
                    ))}
                  </div>
                  <div className={styles.cardBottom} onClick={() => copyGradientWithAlert(gradient)}>
                    <Typography className={styles.copyCaption} variant="subtitle1">
                      <FileCopyIcon/>&nbsp;<p style={{margin: 0}}>Copy</p>
                    </Typography>
                  </div>
                </Box>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      <SimpleSnackbar isOpen={isSnackbarOpen} setIsOpen={setIsSnackbarOpen} message={'Gradient copied'}/>
    </Layout>
  )
}

export default Generate