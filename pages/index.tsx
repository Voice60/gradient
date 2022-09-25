import { Box, Typography } from '@material-ui/core'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
//@ts-ignore
import Fade from 'react-reveal/Fade'
import { GradientCard, Layout } from '../components'
import presets from '../data/presets.json'
import styles from '../styles/pages/home.module.scss'
import { generateGradient } from '../utiles/functions'
interface ILoadElements {
  [key: string]: boolean
}

const Home: NextPage = () => {
  const [hover, setHover] = useState<string>('')

  const onMouseEnter = (name: string): void => {
    setHover(name)
  }

  const onMouseLeave = (): void => {
    setHover('')
  }

  return (
    <Layout>
      <div className={styles.wrapper}>
        <Head>
          <title>Main</title>
        </Head>
        <Box
          component='section'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center'
          }}
        >
          <Fade left>
            <Image
              width={500}
              height={500}
              alt='Gradient ball'
              src='/static/GradientBall.png'
            />
          </Fade>
          <Fade right>
            <Typography align='center' gutterBottom variant={'h1'}>
              Gradient Generator
            </Typography>
          </Fade>
        </Box>
        <Box
          component='section'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.default'
          }}
          className={styles.gradientSection}
        >
          <Fade style={{ width: '100%' }} left>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
              className={styles.gradientBlock}
            >
              {[1, 2, 3, 4, 5, 6].map((el) => {
                return (
                  <GradientCard
                    className={styles.gradient}
                    key={el.toString()}
                    gradient={generateGradient()}
                  />
                )
              })}
            </Box>
          </Fade>

          <Fade right>
            <Box className={styles.description}>
              <Typography gutterBottom variant={'h4'}>
                Generate gradients
              </Typography>
            </Box>
          </Fade>
        </Box>
        <Box
          component='section'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'background.paper'
          }}
          className={styles.gradientSection}
        >
          <Fade style={{ width: '100%' }} left>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap'
              }}
              className={styles.gradientBlock}
            >
              {presets.map((el) => {
                return (
                  <GradientCard
                    className={styles.gradient}
                    key={el.title}
                    gradient={el.gradients[0]}
                  />
                )
              })}
            </Box>
          </Fade>

          <Fade right>
            <Box className={styles.description}>
              <Typography gutterBottom variant={'h4'}>
                Check presets
              </Typography>
            </Box>
          </Fade>
        </Box>
      </div>
    </Layout>
  )
}

export default Home
