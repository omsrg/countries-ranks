import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo templateTitle='Not Found' />

      <main>
        <section className='bg-white'>
          <div className='layout flex min-h-screen flex-col items-center justify-center text-center'>
            <h1 className='mt-8'>Page Not Found</h1>
            <UnstyledLink className='mt-4' href='/'>
              Back to Home
            </UnstyledLink>
          </div>
        </section>
      </main>
    </>
  );
}
