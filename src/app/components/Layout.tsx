import AppBar from 'components/AppBar';

export default function Layout({ children }) {
  return (
    <div className="bg-gray-300 h-screen">
      <AppBar />
      <div className="container mx-auto bg-red-100 mt-5">{children}</div>
      <footer>Footer</footer>
    </div>
  );
}
