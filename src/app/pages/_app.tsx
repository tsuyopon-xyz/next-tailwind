import { RecoilRoot } from 'recoil';
import 'libs/firebase';
import 'tailwindcss/tailwind.css';
import DeviceIndicatorBySize from 'components/development/DeviceIndicatorBySize';
import AppBar from 'components/AppBar';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <div className="bg-gray-300 h-screen">
        {process.env.NODE_ENV === 'development' ? (
          <DeviceIndicatorBySize />
        ) : null}
        <AppBar />
        <Component {...pageProps} />
        <footer>Footer</footer>
      </div>
    </RecoilRoot>
  );
}

export default MyApp;
