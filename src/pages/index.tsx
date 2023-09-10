import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store/store'
import connectionSlice from '../slices/connection.slice'
import SiteSkeleton from '@/components/site_skeleton'

import styles from '@/styles/Home.module.css'

export default function Home() {
  const connState = useSelector(({ connection }: StoreState) => `${connection.address.ip}:${connection.address.port} - ${connection.connection}`)
  const dispatch = useDispatch();


  return <SiteSkeleton title='EKönyv - főoldal' description=''>
    <>
      <p>{connState}</p>
      <button onClick={_ => dispatch(connectionSlice.actions.setAddress({ ip: "192.168.0.1", port: 80 }))}>Cim beallitasa</button>
    </>
  </SiteSkeleton>
}
