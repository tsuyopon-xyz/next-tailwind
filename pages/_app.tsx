import 'tailwindcss/tailwind.css';
import DeviceIndicatorBySize from 'src/components/development/DeviceIndicatorBySize';
import AppBar from 'src/components/AppBar';

function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-gray-300 h-screen">
      {process.env.NODE_ENV === 'development' ? (
        <DeviceIndicatorBySize />
      ) : null}
      <AppBar />
      <Component {...pageProps} />
      <footer>Footer</footer>
    </div>
  );
}

export default MyApp;
