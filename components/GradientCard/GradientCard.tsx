import { Box, IconButton, Typography } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import cn from 'classnames'
import React, { Fragment, MouseEventHandler } from 'react'

import { getGradientProperty } from '../../utiles/functions'
import styles from './gradientCard.module.scss'

interface IGradientCard {
  gradient: string[]
  onCopyGradient?: Function
  onDeleteGradient?: Function
  onClick?: MouseEventHandler<HTMLElement>
  className?: string
  style?: Object
  [restProps: string]: any
}

const GradientCard: React.FC<IGradientCard> = ({
  gradient,
  onCopyGradient,
  onDeleteGradient,
  className,
  onClick,
  style,
  ...restProps
}) => {
  return (
    <Box
      {...restProps}
      data-testid='gradientCard'
      bgcolor='background.default'
      onClick={onClick}
      className={cn(className, styles.card)}
      style={{ cursor: onClick ? 'pointer' : 'default', ...style }}
    >
      <div
        style={{
          background: getGradientProperty(gradient)
        }}
        className={cn(styles.cardTop, { [styles.cardTopHover]: onClick })}
      >
        {onDeleteGradient && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              onDeleteGradient()
            }}
            size='small'
            edge='start'
            className={styles.cross}
            color='inherit'
            aria-label='delete gradient'
          >
            <CloseIcon />
          </IconButton>
        )}
        {gradient.map((grdColor, i) => (
          <Fragment key={i}>
            <Typography className={styles.copyText} variant='subtitle1'>
              {`#${grdColor}`}
            </Typography>
            {gradient.length - 1 !== i && (
              <Typography className={styles.copyText} variant='subtitle1'>
                {'>'}
              </Typography>
            )}
          </Fragment>
        ))}
      </div>
      {onCopyGradient && (
        <Box
          className={styles.cardBottom}
          onClick={(e) => {
            e.stopPropagation()
            onCopyGradient()
          }}
          sx={{
            bgcolor: 'background.paper'
          }}
        >
          <Typography className={styles.copyCaption} variant='subtitle1'>
            <FileCopyIcon />
            &nbsp;<p style={{ margin: 0 }}>Copy</p>
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default GradientCard
