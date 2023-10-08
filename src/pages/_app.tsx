import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { SWRConfig } from "swr";
import Head from "next/head";
import MainLayout from "@/components/MainLayout/MainLayout";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}>
      <SWRConfig value={{ provider: () => new Map() }}>
        <Provider store={store}>
          <Head>
            <title>Calendar</title>
            <link
              rel="shortcut icon"
              href="#"></link>
          </Head>

          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </Provider>
      </SWRConfig>
    </SessionProvider>
  );
};
export default App;
