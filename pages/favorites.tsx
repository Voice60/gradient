import { Typography } from "@material-ui/core";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import GradientCard from "../components/GradientCard";
import Layout from "../components/Layout";
import SimpleSnackbar from "../components/SnackBar";
import styles from "../styles/favorites.module.scss";
import gradientsList from "../styles/gradientsList.module.scss";
import utils from "../styles/utils.module.scss";
import { Gradient, GradientsType } from "../types";
import { copyGradient } from "../utiles/functions";

const Favorites: NextPage = () => {
    const [gradients, setGradients] = useState<GradientsType>([]);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);
    useEffect(() => {
        setGradients(
            localStorage.gradients ? JSON.parse(localStorage.gradients) : []
        );
    }, []);

    const deleteGradient = (index: number): void => {
        let newGradients = [...gradients];
        newGradients.splice(index, 1);
        localStorage.setItem("gradients", JSON.stringify(newGradients));
        setGradients(newGradients);
    };

    const copyGradientWithAlert = (grd: Gradient): void => {
        copyGradient(grd);
        setIsSnackbarOpen(true);
    };

    return (
        <Layout>
            <Head>
                <title>Favorites</title>
            </Head>
            <div className={utils.wrapper}>
                <Typography
                    align="center"
                    className={utils.title}
                    variant="h3"
                    gutterBottom
                >
                    Favorites
                </Typography>
                {gradients.length > 0 ? (
                    <div className={gradientsList.gradients}>
                        {gradients.map((gradient, index) => (
                            <GradientCard
                                key={index}
                                className={gradientsList.card}
                                onDeleteGradient={() => deleteGradient(index)}
                                gradient={gradient}
                                onCopyGradient={() =>
                                    copyGradientWithAlert(gradient)
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <Typography
                        align="center"
                        className={styles.title}
                        variant="h5"
                        gutterBottom
                    >
                        There is no saved gradients yet
                    </Typography>
                )}
            </div>
            <SimpleSnackbar
                isOpen={isSnackbarOpen}
                setIsOpen={setIsSnackbarOpen}
                message={"Gradient copied"}
            />
        </Layout>
    );
};

export default Favorites;
