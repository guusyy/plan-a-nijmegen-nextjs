import Head from 'next/head'
import Image from 'next/image'
import MainLayout from '../components/layout/main'
import getPages from '../queries/getPages';
import getFooterColumns from '../queries/getFooterColumns';

export async function getStaticProps() {
  const navItems = await getPages();
  const footerColumns = await getFooterColumns();
  return {
    props: {
      navItems: navItems
        .filter(page => page.show)
        .sort((a, b) => a.position-b.position),
      footerColumns
    },
 };
}

export default function Home({ navItems, footerColumns }) {
  return (
    <MainLayout navItems={navItems} footerColumns={footerColumns}>
      <div>
        Test
      </div>
    </MainLayout>
  )
}
