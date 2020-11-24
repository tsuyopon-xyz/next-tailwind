import AppBar from 'components/AppBar';
import DeviceIndicatorBySize from 'components/development/DeviceIndicatorBySize';
import { ToastContainer } from 'react-toastify';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-300 h-screen">
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
