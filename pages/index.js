import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../components/layout/main'
import getPages from '../queries/getPages';

export async function getStaticProps() {
  const navItems = await getPages();
  return {
    props: {
      navItems: navItems
        .filter(page => page.show)
        .sort((a, b) => a.position-b.position)
    },
 };
}

export default function Home({ navItems }) {
  return (
    <MainLayout navItems={navItems}>
      <div>
        Test
      </div>
    </MainLayout>
  )
}
