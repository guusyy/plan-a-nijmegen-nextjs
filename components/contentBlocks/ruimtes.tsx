import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styled from "styled-components"
import { community, membershipCB, ruimteCB } from "../../queries/getPage"
import anime from 'animejs'
import { Container } from "./text-image"
import { IntroRow } from "./membership"

import { EffectFade, Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { CldImage } from 'next-cloudinary';

const WorkspaceRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: calc(4rem / 1.6);

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  & .workspace-item {
    padding: calc(1rem / 1.6) calc(0rem / 1.6);
    opacity: 0;

    & h2 {
      margin: calc(4rem / 1.6) 0 calc(1rem / 1.6) 0;
      font-size: calc(3rem / 1.6);
    }

    & .workspace-description {
      margin: calc(2rem / 1.6) 0;
    }
  }

  & .price {
    margin: calc(1rem / 1.6) 0;
    font-size: calc(2.2rem / 1.6);

    & .price-label {
      font-size: calc(1.4rem / 1.6);
    }
  }

  & .features {
    list-style-type: "-";
    margin: calc(2rem / 1.6) 0 calc(2rem / 1.6) calc(1rem / 1.6);

    & li {
      padding-left: calc(1rem / 1.6);
      margin: calc(.5rem / 1.6) 0;
      font-size: calc(2.2rem / 1.6);
    }
  }

  & a {
    border: 1px solid var(--pa-maroon);
    background: var(--pa-white);
    font-size: calc(2rem / 1.6);
    text-transform: uppercase;
    padding: calc(1rem / 1.6);
    display: inline-flex;
    color: var(--pa-maroon);
    cursor: pointer;
    transition: all .1s ease;
    margin: calc(2rem / 1.6) 0;

    &:focus {
      outline: 0;
    }

    &:hover {
      background: var(--pa-maroon);
      color: var(--pa-white);
      text-decoration: none;
    }
  }
`

export default function Membership({contentBlockContext}: {
  contentBlockContext: ruimteCB
}) {
  const spaces = [...contentBlockContext.spaces.data].sort((a, b) => a.attributes.position - b.attributes.position);

  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if(initiated) return
    setInitiated(true);
    
    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.workspace-item',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
        delay: anime.stagger(100) // increase delay by 100ms for each elements.
      }, 100)
  }, [initiated])

  return (
    <Container>
      <IntroRow>
        <div className="column" >
          <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
            {contentBlockContext.introTextMd}
          </ReactMarkdown>
        </div>
      </IntroRow>
      {
        contentBlockContext.spaces && (
          <WorkspaceRow>
            {
              spaces.map((space, idx) => (
                <div className="workspace-item" key={idx}>
                  {
                    spaces.length < 2 ? (
                      <CldImage
                        src={space.attributes.image.data[0].attributes.provider_metadata.public_id}
                        width={space.attributes.image.data[0].attributes.width}
                        height={space.attributes.image.data[0].attributes.height}
                        alt={`Afbeelding van ${space.attributes.title}`}
                        placeholder="blur"
                        blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+P/DwADGQGUKyfeGAAAAABJRU5ErkJggg=='}
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
                      >
                        {
                          space.attributes.image.data.map((image, idx) => (
                            <SwiperSlide key={idx} >
                              <div className="relative">
                                <CldImage
                                  src={image.attributes.provider_metadata.public_id}
                                  width={image.attributes.width}
                                  height={image.attributes.height}
                                  alt={`Afbeelding ${idx} van ${space.attributes.title}`}
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
                  <h2>{space.attributes.title}</h2>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte workspace-description">
                    {space.attributes.descriptionMd}
                  </ReactMarkdown>
                  <a href={space.attributes.button.externalUrl} target="_blank" rel="noreferrer">{space.attributes.button.label}</a>
                  {/* <button onClick={() => setGekozenRuimte(space.attributes.title)}>{space.attributes.buttonLabel}</button> */}
                </div>
              ))
            }
          </WorkspaceRow>
        )
      }
    </Container>
  )
}