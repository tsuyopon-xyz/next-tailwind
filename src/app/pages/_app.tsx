import { RecoilRoot } from 'recoil';
import 'libs/firebase';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import Layout from 'components/Layout';

dayjs.locale('ja');

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
