import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="images/icons/cpday.png" />

                <link
                    href="https://fonts.googleapis.com/css2?family=Eczar:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
