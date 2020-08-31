import * as React from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import { css, Global } from '@emotion/react';

const styles = css`
  /* Make clicks pass-through */
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: var(--colors-invert);

    position: fixed;
    z-index: 999999999;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  /* Fancy blur effect */
  #nprogress .peg {
    display: none;
  }

  /* Remove these to get rid of the spinner */
  #nprogress .spinner {
    display: none;
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .spinner,
  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }

  @-webkit-keyframes nprogress-spinner {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes nprogress-spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ProgressBarStyles = <Global styles={styles} />;

export const useProgressBar = () => {
  const start = NProgress.start;
  const done = NProgress.done;

  return {
    start,
    done,
  };
};

export const ProgressBar = () => {
  React.useEffect(() => {
    Router.events.on('routeChangeStart', url => {
      NProgress.start();
    });
    Router.events.on('routeChangeComplete', () => NProgress.done());
    Router.events.on('routeChangeError', () => NProgress.done());
  }, []);
  return <></>;
};
