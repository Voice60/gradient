import { Box, IconButton, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import styles from "./gradientCard.module.scss";
import CloseIcon from "@material-ui/icons/Close";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { getGradientProperty } from "../../utiles/functions";
import cn from "classnames";

interface IGradientCard {
    gradient: string[];
    onCopyGradient?: Function;
    onDeleteGradient?: Function;
    className?: string
    [restProps: string]: any
}

const GradientCard: React.FC<IGradientCard> = ({
    gradient,
    onCopyGradient,
    onDeleteGradient,
    className,
    ...restProps
}) => {
    return (
        <Box
            {...restProps}
            data-testid="gradientCard"
            bgcolor="background.default"
            className={cn(className, styles.card)}
        >
            <div className={styles.cardTop}>
                {onDeleteGradient && <IconButton
                    onClick={() => onDeleteGradient()}
                    size="small"
                    edge="start"
                    className={styles.cross}
                    color="inherit"
                    aria-label="delete gradient"
                >
                    <CloseIcon />
                </IconButton>}
                <div
                    style={{
                        background: getGradientProperty(gradient),
                    }}
                    className={styles.gradient}
                ></div>
                {gradient.map((grdColor, i) => (
                    <Fragment key={i}>
                        <Typography
                            className={styles.copyText}
                            variant="subtitle1"
                        >
                            {`#${grdColor}`}
                        </Typography>
                        <Typography
                            className={styles.copyText}
                            variant="subtitle1"
                        >
                            {`${gradient.length - 1 !== i ? ">" : ""}`}
                        </Typography>
                    </Fragment>
                ))}
            </div>
            {onCopyGradient && (
                <div
                    className={styles.cardBottom}
                    onClick={() => onCopyGradient()}
                >
                    <Typography
                        className={styles.copyCaption}
                        variant="subtitle1"
                    >
                        <FileCopyIcon />
                        &nbsp;<p style={{ margin: 0 }}>Copy</p>
                    </Typography>
                </div>
            )}
        </Box>
    );
};

export default GradientCard;
