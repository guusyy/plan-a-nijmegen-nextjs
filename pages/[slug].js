import MainLayout from "../components/layout/main"
import getPages from "../queries/getPages";

export async function getStaticPaths() {
  const pages = await getPages();

  return {
    paths: pages.map(page => ({
      params: {
        slug: page.slug
      }
    })),
    fallback: false, // can also be true or 'blocking'
  }
}

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