import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import '@/util/superjson-setup';
import { Map } from '@/components/map';
import { MainContainer } from '@/components/main-container';
import { NavBar } from '@/components/nav-bar';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div className="flex justify-center items-center h-screen">
      <Map />

      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>

      <NavBar />
    </div>
  );
}

export default MyApp;
