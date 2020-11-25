import Head from 'next/head';
import AppBar from 'components/AppBar';
import DeviceIndicatorBySize from 'components/development/DeviceIndicatorBySize';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  const title = 'My質問回答サービス';
  const description = '質問と回答を行えるサービスです。';

  return (
    <div className="bg-gray-300 min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="description" key="description" content={description} />
        <meta property="og:title" key="ogTItle" content={title} />
        <meta property="og:site_name" key="ogSiteName" content={title} />
        <meta
          property="og:description"
          key="ogDescription"
          content={description}
        />
      </Head>

      {process.env.NODE_ENV === 'development' ? (
        <DeviceIndicatorBySize />
      ) : null}
      <AppBar />
      <div className="container mx-auto mt-5">{children}</div>
      <footer>Footer</footer>
      <ToastContainer />
    </div>
  );
}
