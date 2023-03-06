import "../styles/globals.css";

import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Head from "next/head";
import {SessionProvider} from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content= "width=device-width, initial-scale=1.0"/>
            </Head>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
            
        </>
        
    )
    
        
}

export default MyApp;
