import Head from 'next/head';
import AppBar from 'components/AppBar';
import Card from 'components/Card';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar />

      <main>
        <Card>card in main</Card>
      </main>

      <footer>Footer</footer>
    </div>
  );
}
