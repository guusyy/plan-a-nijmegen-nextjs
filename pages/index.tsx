import MainLayout from '../components/layout/main'
import getPages, { NavItem } from '../queries/getPages';
import getFooterColumns, { FooterColumn } from '../queries/getFooterColumns';
import getHomePage, { homePageData } from '../queries/getHomepage';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import anime from 'animejs'
import { useEffect } from 'react';
import { CldImage } from 'next-cloudinary';
import { getContentBlockComponent } from './[slug]';

export async function getStaticProps() {
  const navItems = await getPages();
  const footerColumns = await getFooterColumns();
  const homepageData = await getHomePage();

  if (!navItems || !footerColumns || !homepageData) {
    throw new Error(`Failed to fetch navItems, footerColumns or homepageData`)
  }

  return {
    props: {
      navItems: navItems
        .filter(page => page.show)
        .sort((a, b) => a.position - b.position),
      footerColumns,
      homepageData
    }
  };
}

export default function Home({ navItems, footerColumns, homepageData }: { navItems: NavItem[], footerColumns: FooterColumn[], homepageData: homePageData}) {

  useEffect(() => {
    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.intro-text',
        translateY: [-20, 0],
        delay: 100,
        opacity: [0, 1],
        duration: 1700,
      })
      .add({
        targets: '.pa-quickbutton',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
        delay: anime.stagger(200) // increase delay by 100ms for each elements.
      }, 300)
      .add({
        targets: '.hero-grid',
        translateY: [-5, 0],
        delay: 100,
        opacity: [0, 1],
        duration: 1700,
      }, 700)
      .add({
        targets: '.pa-contact-info',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1400,
      }, 1500)
  });


  return (
    <MainLayout title="" navItems={navItems} footerColumns={footerColumns}>
      <div className="pa-homepage">
        <div className="intro-text">
          <div className="intro-rte">
            <h1>
              {homepageData.introText}
            </h1>
          </div>
        </div>

        <div className="pa-quickbuttons-container">
          {
            homepageData.buttons?.map(button => (
              <Link href={button.linkedPage.data?.attributes.slug ?? button.externalUrl} key={button.label}>
                <a 
                  className="pa-quickbutton" 
                  target={button.externalUrl ? '_blank' : '_self'}
                  data-goatcounter-click="homepage-buttons-click"
                  data-goatcounter-title="Homepagina knop geklikt"
                  data-goatcounter-referrer={button.label}
                >
                  <h2 className="pa-label">{ button.label }</h2>
                  <span className="pa-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.868 29.5">
                      <path d="M1.6,29.7.4,28.1,17.933,15,.4,1.8,1.6.2,21.267,15Z" transform="translate(-0.398 -0.201)" />
                    </svg>
                  </span>
                </a>
              </Link>
            ))
          }
        </div>

        {
          homepageData.heroImages.data[0] && (
            <div className="grid grid-cols-12 gap-7 hero-grid">
              {
                homepageData.heroImages.data.map((image, idx) => (
                  <div key={idx} className={`relative last:max-md:hidden ${idx === 0 && 'col-span-full h-60 md:h-[min(50vh,500px)]'} ${idx === 2 && 'col-span-6 md:col-span-6 h-64'} ${idx !== 2 && idx !== 0 && 'col-span-6 md:col-span-3 h-64'} lg:h-[min(50vh,500px)]`}>
                    <CldImage
                      src={image.attributes.url}
                      className="object-[center_35%]"
                      layout="fill"
                      objectFit='cover'
                      alt="Sfeerbeeld van Plan A Nijmegen"
                      placeholder="blur"
                      blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+P/DwADGQGUKyfeGAAAAABJRU5ErkJggg=='}
                      priority
                      sizes="
                        100vw
                      "
                    />
                  </div>
                ))
              }
            </div>
          )
        }

        <div className="mt-20 space-y-20 xl:mt-40 xl:space-y-40">
          {
            homepageData.contentBlocks.map((contentBlock, idx) => (
              getContentBlockComponent(contentBlock, idx, homepageData.introText)
            ))
          }
        </div>
      </div>
    </MainLayout >
  )
}
