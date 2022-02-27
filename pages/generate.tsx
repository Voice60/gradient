import { ButtonGroup, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import CachedIcon from "@material-ui/icons/Cached";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import SettingsIcon from "@material-ui/icons/Settings";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { GradientInfoDrawer, Layout, SnackBar } from "../components";
import { useWindowSize } from "../hooks/useWindowSize";
import styles from "../styles/pages/generate.module.scss";
import { Gradient, GradientsType } from "../types";
import {
  copyGradient,
  getGradientProperty,
  generateGradient,
  saveGradientInStorage,
} from "../utiles/functions";

const Generate: NextPage = () => {
  const [gradient, setGradient] = useState<Gradient>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
  const [currentGradient, setCurrentGradient] = useState<null | Gradient>(null);
  const [isOpenGradientDrawer, setIsOpenGradientDrawer] =
    useState<boolean>(false);

  const size = useWindowSize();

  const saveGradient = (): void => {
    if (gradient.length) {
      saveGradientInStorage(gradient);
      setIsSaved(true);
    }
  };

  const deleteGradient = (): void => {
    const gradients: GradientsType = JSON.parse(
      localStorage.gradients ? localStorage.gradients : "[]"
    );
    gradients.shift();
    localStorage.setItem("gradients", JSON.stringify(gradients));
    setIsSaved(false);
  };

  const copyGradientWithAlert = (grd: Gradient): void => {
    copyGradient(grd);
    setIsSnackbarOpen(true);
  };

  const generateNewGradient = (): void => {
    setIsSaved(false);
    let newGradient: Gradient = generateGradient();
    setGradient(newGradient);
  };

  return (
    <Layout>
      <Head>
        <title>Generator</title>
      </Head>
      <div className={styles.wrapper}>
        <div
          className={styles.gradient}
          style={{
            background: gradient.length
              ? getGradientProperty(gradient)
              : "transparent;",
          }}
        ></div>
        <Typography
          align="center"
          className={styles.title}
          variant="h3"
          gutterBottom
        >
          Generator
        </Typography>
        <Typography
          style={{ visibility: gradient.length ? "visible" : "hidden" }}
          className={styles.gradientProperty}
          align="center"
          variant="h5"
          gutterBottom
        >
          {`background: ${getGradientProperty(gradient)}`}
        </Typography>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          orientation={size.width <= 550 ? "vertical" : "horizontal"}
        >
          <Button
            className={styles.button}
            size="large"
            onClick={generateNewGradient}
            variant="contained"
            color="primary"
            startIcon={<CachedIcon />}
          >
            <Typography className={styles.btnText} variant="button">
              generate
            </Typography>
          </Button>
          {isSaved ? (
            <Button
              className={styles.button}
              disabled={gradient.length === 0}
              size="large"
              onClick={deleteGradient}
              variant="contained"
              color="primary"
              startIcon={<BookmarkIcon />}
            >
              <Typography className={styles.btnText} variant="button">
                delete
              </Typography>
            </Button>
          ) : (
            <Button
              className={styles.button}
              disabled={gradient.length === 0}
              size="large"
              onClick={saveGradient}
              variant="contained"
              color="primary"
              startIcon={<BookmarkBorderIcon />}
            >
              <Typography className={styles.btnText} variant="button">
                save
              </Typography>
            </Button>
          )}
          <Button
            className={styles.button}
            disabled={gradient.length === 0}
            size="large"
            onClick={() => copyGradientWithAlert(gradient)}
            variant="contained"
            color="primary"
            startIcon={<FileCopyIcon />}
          >
            <Typography className={styles.btnText} variant="button">
              copy
            </Typography>
          </Button>
          <Button
            className={styles.button}
            disabled={gradient.length === 0}
            size="large"
            onClick={() => {
              setIsOpenGradientDrawer(true);
              setCurrentGradient(gradient);
            }}
            variant="contained"
            color="primary"
            startIcon={<SettingsIcon />}
          >
            <Typography className={styles.btnText} variant="button">
              settings
            </Typography>
          </Button>
        </ButtonGroup>
      </div>
      <SnackBar
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
