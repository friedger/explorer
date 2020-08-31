// import React from 'react';
// import Document, { Head, Main, NextScript, DocumentContext } from 'next/document';
// import { ServerStyleSheet } from 'styled-components';
//
// export default class MyDocument extends Document<any> {
//   static async getInitialProps(ctx: DocumentContext) {
//     const sheet = new ServerStyleSheet();
//     const originalRenderPage = ctx.renderPage;
//
//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
//         });
//
//       const initialProps = await Document.getInitialProps(ctx);
//
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       };
//     } finally {
//       sheet.seal();
//     }
//   }
//
//   render() {
//     return (
//       <html lang="en">
//         <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </html>
//     );
//   }
// }

import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { extractCritical } from '@emotion/server';
import {
  GlobalStyles,
  ProgressBarStyles,
  TextAreaOverrides,
  ColorModes,
} from '@components/global-styles';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }: DocumentContext): Promise<DocumentInitialProps> {
    const page = await renderPage();
    const styles = extractCritical(page.html);
    return {
      ...page,
      styles: (
        <>
          {GlobalStyles}
          {ProgressBarStyles}
          {TextAreaOverrides}
          {ColorModes}
          <style
            data-emotion-css={styles.ids.join(' ')}
            dangerouslySetInnerHTML={{ __html: styles.css }}
          />
        </>
      ),
    };
  }
}
