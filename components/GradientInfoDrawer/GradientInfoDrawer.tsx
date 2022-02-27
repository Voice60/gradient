import { Button, Drawer, TextField, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styles from "./GradientInfoDrawer.module.scss";
import { Gradient } from "../../types";
import GradientCard from "../GradientCard";
import { saveGradientInStorage } from "../../utiles/functions";

interface IGradientInfoDrawer {
  isOpen: boolean;
  gradient: Gradient;
  handleClose: () => void;
  onCopyGradient?: (grd: Gradient) => void;
  onSave?: () => void
}

const GradientInfoDrawer: React.FC<IGradientInfoDrawer> = ({
  isOpen,
  gradient,
  handleClose,
  onCopyGradient,
  onSave
}) => {
  const [currentGradient, setCurrentGradient] = useState<Gradient>(gradient);
  const [isSaved, setIsSaved] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setCurrentGradient(gradient);
    }
  }, [gradient]);

  useEffect(() => {
    setIsSaved(false)
  }, [currentGradient])
  
  return (
    <Drawer
      classes={{ paper: styles.paper }}
      open={isOpen}
      anchor="right"
      onClose={handleClose}
    >
      <div style={{ paddingBottom: "30px" }}>
        <GradientCard
          gradient={currentGradient}
          onCopyGradient={onCopyGradient && (() => {onCopyGradient(currentGradient)})}
        />
      </div>
      <Typography gutterBottom align="center" variant="h5">
        Advanced settings
      </Typography>
      <TextField
        label="Color 1"
        variant="filled"
        className={styles.textField}
        onChange={(e) => {
          setCurrentGradient([e.target.value, currentGradient[1]]);
        }}
        value={currentGradient && currentGradient[0]}
      />
      <TextField
        label="Color 2"
        variant="filled"
        className={styles.textField}
        onChange={(e) => {
          setCurrentGradient([currentGradient[0], e.target.value]);
        }}
        value={currentGradient && currentGradient[1]}
      />
      <Button className={styles.button} disabled={isSaved} onClick={() => {
        setIsSaved(true)
        saveGradientInStorage(currentGradient)
        onSave && onSave()}} variant="contained">{isSaved ? 'Already saved' : 'Save'}</Button>
    </Drawer>
  );
};

export default GradientInfoDrawer;
