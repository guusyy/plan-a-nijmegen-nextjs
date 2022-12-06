import Navbar from '../navbar'
import Footer from '../footer'
import Head from 'next/head'

export default function MainLayout({ children, navItems, footerColumns, title }) {
  return (
    <>
      <Head>
        <title>{`${title ? title + ' - ' : ''}Plan A Nijmegen`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f0250a" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <div>
        <Navbar navItems={navItems} />
        <div className="content-container">
          <main>{children}</main>
          <Footer footerColumns={footerColumns} />
        </div>
      </div>
      <script data-goatcounter="https://plananijmegen.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
    </>
  )
}