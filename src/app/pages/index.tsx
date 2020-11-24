import Link from 'next/link';
import Head from 'next/head';
import Card from 'components/Card';
import { useAuthentication } from 'hooks/authentication';

export default function Home() {
  const { user } = useAuthentication();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{user?.uid || '未ログイン'}</p>
      <Link href="/page2">
        <a>Go to page2</a>
      </Link>

      <main className="px-10 pt-10 max-w-screen-desktop mx-auto">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-0">
          <Card backgroundColor="red" />
          <Card />
          <Card />
          <Card />
        </div>
      </main>
    </>
  );
}
