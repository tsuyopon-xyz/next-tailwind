import Head from 'next/head';
import Card from 'components/Card';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-4 desktop:p-0 max-w-screen-desktop mx-auto">
        <div className="flex flex-wrap">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  );
}
