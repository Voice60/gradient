import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/pages/home.module.scss";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import cn from "classnames";
import { Box, Typography } from "@material-ui/core";
//@ts-ignore
import Fade from "react-reveal/Fade";
import Image from "next/image";
import GradientCard from "../components/GradientCard";
import { generateGradient } from "../utiles/functions";
interface ILoadElements {
  [key: string]: boolean;
}

const Home: NextPage = () => {
  const [hover, setHover] = useState<string>("");

  const onMouseEnter = (name: string): void => {
    setHover(name);
  };

  const onMouseLeave = (): void => {
    setHover("");
  };

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Head>
          <title>Main</title>
        </Head>
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            justifyContent: "center",
          }}
        >
          <Fade left>
            <Image
              width={500}
              height={500}
              alt="Gradient ball"
              src="/static/GradientBall.png"
            />
          </Fade>
          <Fade right>
            <Typography align="center" gutterBottom variant={"h1"}>
              Gradient Generator
            </Typography>
          </Fade>
        </Box>
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            margin: '0 auto'
          }}
          className={styles.gradientSection}
        >
          <Fade left>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                flexWrap: "wrap",
              }}
              className={styles.gradientBlock}
            >
              {[1, 2, 3, 4, 5, 6].map((el) => {
                return (
                  <GradientCard
                    key={el.toString()}
                    style={{ margin: "15px" }}
                    gradient={generateGradient()}
                  />
                );
              })}
            </Box>
          </Fade>

          <Fade right>
            <Box className={styles.description}>
              <Typography gutterBottom variant={"h4"}>
                Hello! It is a gradient generator, that can help you to choose a
                gradient. Here you can make randomly generated gradient to add
                him in your own project. Сompletely free and extremely
                convenient
              </Typography>
            </Box>
          </Fade>
        </Box>
      </div>
    </Layout>
  );
};

export default Home;
