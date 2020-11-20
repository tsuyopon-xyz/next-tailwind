import 'tailwindcss/tailwind.css';
import DeviceIndicatorBySize from 'components/development/DeviceIndicatorBySize';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {process.env.NODE_ENV === 'development' ? (
        <DeviceIndicatorBySize />
      ) : null}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
