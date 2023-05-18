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

const PAContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 64em ) {
    min-height: 80vh;
  }

  .intro-text, .pa-quickbutton, .pa-contact-info {
    opacity: 0;
  }

  .intro-rte h1 {
    font-size: clamp(3rem, 3vw + 1rem, 4.6rem);
    font-size: clamp(3rem, 3vw + 1rem, 5rem);
    letter-spacing: -.2rem;
    color: var(--pa-maroon);
    font-weight: 400;
    max-width: 80%;
    margin: 4rem 0 0;
    line-height: 1.15;
    word-break: break-word;

    & a {
      color: var(--pa-maroon);
      text-decoration: underline;
    }

    @media (max-width: 64em) {
      max-width: 90%;
      margin: 2rem 0;
    }
  }

  .pa-quickbuttons-container {
    display: flex;
    gap: 2rem;
    margin: 6rem 0;

    @media (max-width: 64em) {
      display: grid;
      grid-template-columns: repeat(2, minmax(0,1fr));
    }

    @media (max-width: 48em) {
      display: flex;
      flex-wrap: wrap;
    }

    
    & .pa-quickbutton {
      width: 100%;
      background: var(--pa-white);
      border: 1px solid var(--pa-maroon);
      color: var(--pa-maroon);
      min-height: 10rem;
      text-decoration: none;
      font-weight: 400;
      text-transform: uppercase;
      display: flex;
      justify-content: space-between;
      padding: 1.5rem 2rem;
      flex-direction: column;

      transition: all .1s ease;

      @media (max-width: 48em) {
        min-height: 6.4rem;
        flex-direction: row;
        align-items: center;
      }
      

      &:hover {
        background: var(--pa-maroon);
        color: var(--pa-white);

        & .pa-arrow svg {
          fill: var(--pa-white);
        }
      }

      & .pa-label {
        word-break: break-word;
        font-size: clamp(1.6rem, 1.2vw + 1rem, 2.2rem);
        letter-spacing: -.1rem;
        margin-top: .4rem;

        @media (max-width: 64em) {
          font-size: 2.4rem;
        }

        font-weight: 400;
      }

      & .pa-arrow {
        align-self: flex-end;
        font-size: 4rem;
        
        @media (max-width: 64em) {
          flex-wrap: wrap;  
        }

        & svg {
          width: 1.5rem;
          height: 2.3rem;
          fill: var(--pa-maroon);
        }
      }
    }
  }

  .intro-contact {
    text-decoration: none;
    color: var(--pa-maroon);
    font-weight: 400;
    font-size: clamp(2.8rem, 3vw + 1rem, 3.2rem);

    @media (max-width: 64em) {
      font-size: 2.4rem;
    }
  }

  .hero-grid  {
    opacity: 0;
  }
`

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
      <PAContainer>
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
                <a className="pa-quickbutton" target={button.externalUrl ? '_blank' : '_self'}>
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
            <div className="grid grid-cols-12 gap-10 hero-grid">
              {
                homepageData.heroImages.data.map((image, idx) => (
                  <div key={idx} className={`relative ${idx === 0 && 'col-span-full'} ${idx === 2 && 'col-span-6'} ${idx !== 2 && idx !== 0 && 'col-span-3'} h-[min(50vh,500px)]`}>
                    <CldImage
                      src={image.attributes.url}
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

        <div className="my-80 space-y-80">
          {
            homepageData.contentBlocks.map((contentBlock, idx) => (
              getContentBlockComponent(contentBlock, idx)
            ))
          }
        </div>

        {/* <div className="pa-contact-info">
          <div className="intro-contact">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {homepageData.contactDetails}
            </ReactMarkdown>
          </div>
        </div> */}
      </PAContainer>
    </MainLayout >
  )
}
