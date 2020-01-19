import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import Detail from '@components/Detail';

export default function CharacterDetail() {
  const router = useRouter();
  const characterSwapiId = router.query.id;
  return (
    <Layout>
      {characterSwapiId && <Detail characterSwapiId={router.query.id} />}
    </Layout>
  );
}
