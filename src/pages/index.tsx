import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../redux/store'
import SiteSkeleton from '@/components/site_skeleton'

import styles from './index.module.scss'

export default function Home() {
  const dispatch = useDispatch();

  const VisibleLink: React.FC<{ href: string }> = ({ href }) =>
    <a href={href}>{href}</a>;

  return <SiteSkeleton title='EKönyv - főoldal' description=''>
    <div className={styles.center}>
      <span className={styles.title}>EKönyv</span>
      <span className={styles.description}>Ez az oldal egy Arduino-n futó könyvtárszerver felhasználói felülete.</span>
      <div className={styles.licenses}>
        <span>Felhasznált nyílt források:</span>
        <ul>
          <li>
            <span className={styles.sourceName}>Material Design Icons (Austin Andrews)</span>
            <span className={styles.sourceSite}>
              <VisibleLink href="https://materialdesignicons.com/" />
            </span>
            <span className={styles.sourceLicense}>Apache 2.0</span>
            <span className={styles.sourceLicenseDescription}>
              <VisibleLink href="https://www.apache.org/licenses/LICENSE-2.0" />
            </span>
          </li>
          <li>
            <span className={styles.sourceName}>Boxicons (Atisa)</span>
            <span className={styles.sourceSite}>
              <VisibleLink href="https://boxicons.com/" />
            </span>
            <span className={styles.sourceLicense}>MIT</span>
            <span className={styles.sourceLicenseDescription}>
              {`Copyright (c) 2015-2021 Aniket Suvarna`}
            </span>
          </li>
          <li>
            <span className={styles.sourceName}>Radix Icons (WorkOS)</span>
            <span className={styles.sourceSite}>
              <VisibleLink href="https://icons.radix-ui.com/" />
            </span>
            <span className={styles.sourceLicense}>MIT</span>
            <span className={styles.sourceLicenseDescription}>
              {`Copyright (c) 2022 WorkOS`}
            </span>
          </li>
          <li>
            <span className={styles.sourceName}>Bootstrap</span>
            <span className={styles.sourceSite}>
              <VisibleLink href="https://icons.getbootstrap.com/" />
            </span>
            <span className={styles.sourceLicense}>MIT</span>
            <span className={styles.sourceLicenseDescription}>
              {`Copyright (c) 2011-2024 The Bootstrap Authors`}
            </span>
          </li>
          <li>
            <span className={styles.sourceName}>Ant Design Icons</span>
            <span className={styles.sourceSite}>
              <VisibleLink href="https://ant.design/components/icon/" />
            </span>
            <span className={styles.sourceLicense}>MIT</span>
            <span className={styles.sourceLicenseDescription}>
              {`Copyright (c) 2015-present Ant UED, https://xtech.antfin.com/`}
            </span>
          </li>
          <li>
            <span className={styles.sourceName}>Teeny Icons (Anja van Staden)</span>
            <span className={styles.sourceSite}>
              <VisibleLink href="https://teenyicons.com/" />
            </span>
            <span className={styles.sourceLicense}>MIT</span>
            <span className={styles.sourceLicenseDescription}>
              {`Copyright (c) 2020, Anja van Staden`}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </SiteSkeleton>
}
