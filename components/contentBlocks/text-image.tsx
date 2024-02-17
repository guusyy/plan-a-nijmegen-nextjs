import React, { useEffect, useState } from "react"

import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import styled from "styled-components"

import { EffectFade, Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import anime from 'animejs'

import { textAndImage } from "../../queries/getPage"
import { CldImage } from 'next-cloudinary';

export const Container = styled.div`
  .swiper-holder {
    display: flex;
    justify-content: flex-end;

    .swiper-slide {
      transition-property: opacity;
    }

    .image-holder {
      width: 100%;

      & img {
        min-width: 100%;
      }
    }
  }

  .pa-contact-businesshours {
    margin-top: calc(5rem / 1.6);
    display: flex;
    gap: calc(15rem / 1.6);
    
    & .pa-contact-workroom p {
      line-height: calc(3rem / 1.6);
    }

    @media (max-width: 64em) {
      flex-direction: column;
      gap: calc(2rem / 1.6);
    }
  }
`

const NavButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(1rem / 1.6);
  margin: calc(4rem / 1.6) 0 calc(2rem / 1.6) 0;
`

export default function TextAndImage({ contentBlockContext }: {
  contentBlockContext: textAndImage
}) {
  const [initiated, setInitiated] = useState(false);
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    setInitialSlide(0);

    if (initiated) return
    setInitiated(true);
  }, [initiated])

  return (
    <Container className={`flex flex-col xl:grid ${contentBlockContext.gecentreerd ? 'items-start gap-10 xl:gap-40 grid-cols-2' : 'gap-10 grid-cols-12'}`}>
      <div className={`column flex-1 xl:max-w-2xl ${contentBlockContext.mirrored ? 'xl:order-last col-span-7 xl:ml-20' : 'col-span-5'} ${contentBlockContext.gecentreerd ? '!col-span-1 !ml-0' : ''}`}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
          {contentBlockContext.mdText}
        </ReactMarkdown>
        {
          contentBlockContext.usps.length > 0 && (
            <ul className="my-5">
              {
                contentBlockContext.usps.map((usp, idx) => (
                  <li key={idx} className={`flex items-center gap-5 mt-3`}>
                    <svg className="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22.319" height="20.424" viewBox="0 0 22.319 20.424"><path d="M-9409.106,1612.738a1.5,1.5,0,0,1-1.076-.455l-7.786-8.018,2.152-2.09,6.5,6.694,11.181-16.554,2.486,1.679-12.214,18.084a1.5,1.5,0,0,1-1.11.655C-9409.019,1612.736-9409.062,1612.738-9409.106,1612.738Z" transform="translate(9417.969 -1592.315)" fill="#691e0f"/></svg>
                    <p className="max-w-xl">{usp.usp}</p>
                  </li>
                ))
              }
            </ul>  
          )
        }

        {
          contentBlockContext.buttons.length > 0 && (
            <NavButtons>
              {
                contentBlockContext.buttons.map(button => (
                  (button.linkedPage?.data?.attributes.slug ?? button.externalUrl) && (
                    <Link 
                      href={button.linkedPage?.data?.attributes.slug ?? button.externalUrl} key={button.label} 
                      >
                      <a className="btn" target={button.externalUrl && !button.linkedPage?.data?.attributes.slug ? '_blank' : '_self'}>
                        <span>
                          {button.label}
                        </span>
                        <svg className="pa-icon" viewBox="0 0 20.868 29.5">
                          <path d="M1.6,29.7.4,28.1,17.933,15,.4,1.8,1.6.2,21.267,15Z" transform="translate(-0.398 -0.201)" />
                        </svg>
                      </a>
                    </Link>
                  )
                ))
              }
            </NavButtons>
          )
        }
        <ReactMarkdown className={`mt-14 rte`} rehypePlugins={[rehypeRaw]}>
          {contentBlockContext.textBelow}
        </ReactMarkdown>
      </div>

      {
        contentBlockContext.images.data.length > 0 && initiated && (
          <div className={`max-xl:w-full swiper-holder ${contentBlockContext.mirrored ? 'col-span-5' : 'col-span-7 xl:ml-20'} ${contentBlockContext.gecentreerd ? '!col-span-1 !ml-0' : ''}`}>
            <div className="image-holder">
              {
                contentBlockContext.images.data.length < 2 ? (
                  <CldImage
                    src={contentBlockContext.images.data[0].attributes.url}
                    width={contentBlockContext.images.data[0].attributes.width}
                    height={contentBlockContext.images.data[0].attributes.height}
                    alt="Sfeerbeeld van Plan A Nijmegen"
                    placeholder="blur"
                    blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+P/DwADGQGUKyfeGAAAAABJRU5ErkJggg=='}
                    priority
                    sizes="
                      (max-width: 768px) 100vw,
                      50vw
                    "
                  />
                ) :
                  (
                    <Swiper
                      modules={[Navigation, EffectFade, Lazy]}
                      slidesPerView={1}
                      speed={400}
                      effect={"fade"}
                      navigation={true}
                      lazy={true}
                      initialSlide={initialSlide}
                    >
                      {
                        contentBlockContext.images.data.map((image, idx) => (
                          <SwiperSlide key={idx} >
                            <div className="relative">
                              <CldImage
                                src={image.attributes.url}
                                width={image.attributes.width}
                                height={image.attributes.height}
                                alt="Sfeerbeeld van Plan A Nijmegen"
                                placeholder="blur"
                                blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+P/DwADGQGUKyfeGAAAAABJRU5ErkJggg=='}
                                priority={idx === 0}
                                sizes="
                                (max-width: 768px) 100vw,
                                50vw
                              "
                              />
                            </div>
                          </SwiperSlide>
                        ))
                      }
                    </Swiper>
                  )
              }
            </div>
          </div>
        )
      }
    </Container>
  )
}