import type { NextPage } from 'next'
import styles from '../styles/layout.module.scss'

const Layout: NextPage = ({ children }) => {
  return (
    <div className={styles.container}>
      {children}
      <footer className={styles.footer}>
        Created by Voice
      </footer>
    </div>
  )
}

export default Layout