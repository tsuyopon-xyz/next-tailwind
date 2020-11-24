import { RecoilRoot } from 'recoil';
import 'libs/firebase';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from 'components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
