import React from "react"

import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import styled from "styled-components"

import { EffectFade, Lazy, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { textAndImage } from "../../queries/getPage"
import Image from "next/image"

const Container = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: calc(40% - 1rem) calc(60% - 1rem);
  gap: 2rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  .swiper-holder {
    display: flex;
    justify-content: flex-end;

    .image-holder {
      width: 90%;

      & img {
        min-width: 100%;
      }

      @media (max-width: 64em) {
        width: 100%;
      }
    }
  }
`

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 4rem 0 2rem 0;

  @media (max-width: 64em) {
    flex-direction: column;
  }
`

export default function TextAndImage({contentBlockContext}: {
  contentBlockContext: textAndImage
}) {
  return (
    <Container>
      <div className="column rte">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {contentBlockContext.mdText}
        </ReactMarkdown>
        {
          contentBlockContext.buttons.length > 0 && (
            <NavButtons>
              {
                contentBlockContext.buttons.map(button => (
                  <Link href={button.linkedPage?.data?.attributes.slug ?? button.externalUrl} key={button.label}>
                    <a className="btn">
                      <span>
                        {button.label}
                      </span>
                      <svg className="pa-icon" viewBox="0 0 20.868 29.5">
                        <path d="M1.6,29.7.4,28.1,17.933,15,.4,1.8,1.6.2,21.267,15Z" transform="translate(-0.398 -0.201)"/>
                      </svg>
                    </a>
                  </Link>
                ))
              }
            </NavButtons>
          )
        }
      </div>

      {
        contentBlockContext.images.data.length > 0 && (
          <div className="column swiper-holder">
            <div className="image-holder">
              {
                contentBlockContext.images.data.length < 2 ? (
                  <Image
                    src={contentBlockContext.images.data[0].attributes.url}
                    width={contentBlockContext.images.data[0].attributes.width}
                    height={contentBlockContext.images.data[0].attributes.height}
                    alt="Sfeerbeeld van Plan A Nijmegen"
                    priority
                    sizes="
                      (max-width: 768px) 100vw,
                      50vw
                    "
                  />
                ) :
                (
                  <Swiper
                    modules={[EffectFade, Lazy, Navigation]}
                    slidesPerView={1}
                    effect="fade"
                    loop
                    navigation
                  >
                    {
                      contentBlockContext.images.data.map((image, idx) => (
                        <SwiperSlide key={idx} >
                          <Image
                            src={image.attributes.url}
                            width={image.attributes.width}
                            height={image.attributes.height}
                            alt="Sfeerbeeld van Plan A Nijmegen"
                            priority
                            sizes="
                              (max-width: 768px) 100vw,
                              50vw
                            "
                          />
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