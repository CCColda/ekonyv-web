"use client";

import '@/styles/globals.css'
import '@/styles/colors.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import initStore from '@/redux/store'
import InitGate from '@/components/init_gate';
import Loading from '@/components/loading';

const { store, persistor } = initStore();

function App({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <PersistGate loading={<Loading description={"Cache betöltése..."} />} persistor={persistor}>
      <InitGate loading={<Loading description={"Csatlakozás a szerverhez..."} />}>
        <Component {...pageProps} />
      </InitGate>
    </PersistGate>
  </Provider>
}

export default App;
