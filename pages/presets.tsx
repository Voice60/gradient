import { Typography } from "@material-ui/core";

import type { NextPage } from "next";
import Head from "next/head";
import React, { useState } from "react";
import GradientCard from "../components/GradientCard";
import GradientInfoDrawer from "../components/GradientInfoDrawer/GradientInfoDrawer";
import Layout from "../components/Layout/Layout";
import SimpleSnackbar from "../components/SnackBar";
import presets from "../data/presets.json";
import gradientsList from "../styles/gradientsList.module.scss";
import utils from "../styles/utils.module.scss";
import { Gradient } from "../types";
import { copyGradient } from "../utiles/functions";
import cn from "classnames";
import utiles from "../styles/utils.module.scss";

const Generate: NextPage = () => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const copyGradientWithAlert = (grd: Gradient): void => {
    copyGradient(grd);
    setIsSnackbarOpen(true);
  };
  const [currentGradient, setCurrentGradient] = useState<null | Gradient>(null);
  const [isOpenGradientDrawer, setIsOpenGradientDrawer] =
    useState<boolean>(false);

  return (
    <Layout>
      <Head>
        <title>Presets</title>
      </Head>
      <div className={utils.wrapper}>
        <Typography
          align="center"
          className={utils.title}
          variant="h3"
          gutterBottom
        >
          Presets
        </Typography>
        {presets.map((preset, index) => (
          <React.Fragment key={index}>
            <Typography variant="h4" gutterBottom>
              {preset.title}
            </Typography>
            <div className={gradientsList.gradients}>
              {preset.gradients.map((gradient, index1) => (
                <GradientCard
                  onClick={() => {
                    setIsOpenGradientDrawer(true);
                    setCurrentGradient(gradient);
                  }}
                  // className={cn(gradientsList.card)}
                  key={index1}
                  className={gradientsList.card}
                  gradient={gradient}
                  onCopyGradient={() => copyGradientWithAlert(gradient)}
                />
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      <SimpleSnackbar
        isOpen={isSnackbarOpen}
        setIsOpen={setIsSnackbarOpen}
        message={"Gradient copied"}
      />
      <GradientInfoDrawer
        handleClose={() => setIsOpenGradientDrawer(false)}
        isOpen={isOpenGradientDrawer}
        gradient={currentGradient}
        onCopyGradient={(grd) => copyGradientWithAlert(grd)}
      />
    </Layout>
  );
};

export default Generate;
