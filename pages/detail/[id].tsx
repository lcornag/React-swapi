import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import Detail from '@components/Detail';

export default function Post() {
  const router = useRouter();

  return (
    <Layout>
      <h1>{router.query.id}</h1>
      <Detail />
    </Layout>
  );
}
