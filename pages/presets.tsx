import type {NextPage} from 'next'
import Head from 'next/head'
import Layout from '../components/layout'
import presets from '../data/presets.json'
import card from "../styles/card.module.scss";
import gradientsList from "../styles/gradientsList.module.scss";
import {Box, Typography} from "@material-ui/core";
import React, {Fragment, useState} from "react";
import {copyGradient, getGradientProperty} from "../utiles/functions";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SimpleSnackbar from "../components/snackbar";
import {Gradient} from "../types";
import cn from "classnames";
import utils from "../styles/utils.module.scss";

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
      <div className={utils.wrapper}>
        <Typography align='center' className={utils.title} variant="h3" gutterBottom>
          Presets
        </Typography>
        {presets.map((preset, index) => (
          <React.Fragment key={index}>
            <Typography variant="h4" gutterBottom>
              {preset.title}
            </Typography>
            <div className={gradientsList.gradients}>
              {preset.gradients.map((gradient, index1) => (
                <Box bgcolor='background.default' className={cn(gradientsList.card, card.card)}
                     key={index1}>
                  <div className={card.cardTop}>
                    <div style={
                      {
                        background: getGradientProperty(gradient)
                      }}
                         className={card.gradient}>
                    </div>
                    {gradient.map((grdColor, index2) => (
                      <Fragment key={index2}>
                        <Typography className={card.copyText} variant="subtitle1">
                          {`#${grdColor}`}
                        </Typography>
                        <Typography className={card.copyText} variant="subtitle1">
                          {`${gradient.length - 1 !== index2 ? '>' : ''}`}
                        </Typography>
                      </Fragment>
                    ))}
                  </div>
                  <div className={card.cardBottom} onClick={() => copyGradientWithAlert(gradient)}>
                    <Typography className={card.copyCaption} variant="subtitle1">
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