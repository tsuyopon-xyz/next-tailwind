import Head from 'next/head';
import Card from 'components/Card';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="px-10 pt-10 max-w-screen-desktop mx-auto">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  );
}
