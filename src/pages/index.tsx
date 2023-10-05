import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store/store'
import SiteSkeleton from '@/components/site_skeleton'

import styles from '@/styles/Home.module.css'

export default function Home() {
  const dispatch = useDispatch();


  return <SiteSkeleton title='EKönyv - főoldal' description=''>
    <p>Főoldal</p>
  </SiteSkeleton>
}
