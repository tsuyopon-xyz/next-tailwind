import { RecoilRoot } from 'recoil';
import 'libs/firebase';
import 'tailwindcss/tailwind.css';
import DeviceIndicatorBySize from 'components/development/DeviceIndicatorBySize';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        {process.env.NODE_ENV === 'development' ? (
          <DeviceIndicatorBySize />
        ) : null}
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
