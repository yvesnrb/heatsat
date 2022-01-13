import type { AppProps } from 'next/app';

import '@/styles/globals.css';
import 'simplebar/dist/simplebar.min.css';
import { Map } from '@/components/map';
import { MainContainer } from '@/components/main-container';
import { MainNav } from '@/components/main-nav';
import { RegionNav } from '@/components/region-nav';

function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <div className="flex justify-center items-center h-screen">
      <Map />

      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>

      <MainNav />

      <RegionNav />
    </div>
  );
}

export default MyApp;
