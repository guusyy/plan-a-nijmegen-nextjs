import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styled from "styled-components"
import { community } from "../../queries/getPage"
import anime from 'animejs'
import { Container } from "./text-image"
import { CldImage } from 'next-cloudinary';

const CommunityGrid = styled.div`
  margin: calc(5rem / 1.6) 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(25rem / 1.6), 1fr));
  gap: calc(3rem / 1.6);

  & .community-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    min-height: calc(20rem / 1.6);

    > div {
      min-height: 100%;

      > span {
        min-height: 100%;
      }
    }

    &:hover {
      & .info-overlay {
        @media (min-width: 64em) {
          opacity: 1;
          pointer-events: all;
        }
      }
    }

    &.show-info {
      & .info-overlay {
        @media (max-width: 64em) {
          opacity: 1;
          pointer-events: all;
        }
      }
    }
  }

  & .community-image {
    max-width: 100%;
    height: 100%;
    max-height: calc(30rem / 1.6);
    min-height: calc(20rem / 1.6);
    object-fit: cover;
  }

  & .info-overlay {
    height: 100%;
    width: 100%;
    min-height: 100%;
    min-width: 100%;
    background: var(--pa-maroon);
    padding: calc(2rem / 1.6);
    color: var(--pa-white);
    pointer-events: none;

    transition: all .4s ease;

    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & h2 {
      font-size: calc(1.8rem / 1.6);

      @media (max-width: 64em) {
        font-size: calc(2.2rem / 1.6);
      }
    }

    & h3 {
      font-size: calc(2.2rem / 1.6);

      @media (max-width: 64em) {
        font-size: calc(2.6rem / 1.6);
      }
    }

    & .info-links {
      display: flex;
      gap: calc(1rem / 1.6);

      & a {
        padding: calc(.5rem / 1.6);
        cursor: pointer;
        fill: white;
      }
    }
  }
`

export default function Community({contentBlockContext}: {
  contentBlockContext: community
}) {
  let [activeElement, setActiveElement] = useState(null);
  let [initiated, setInitiated] = useState(false);

  const showDetails = (index: number) => {
    
    if(activeElement == index) {
      setActiveElement(null);
      return
    }

    setActiveElement(index);
  }

  useEffect(() => {
    if(initiated) return
    setInitiated(true);
    
    anime({
      targets: '.community-grid .community-item',
      translateY: [-5, 0],
      opacity: [0, 1],
      duration: 1400,
      delay: anime.stagger(150)
    });
  }, [initiated])

  const test = (e) => {
    console.log(e);
  }

  return (
    <Container widthFull={true}>
      <div className="column">
        <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
          {contentBlockContext.mdText}
        </ReactMarkdown>
        {
          contentBlockContext.members.data.length > 0 && (
            <CommunityGrid className="community-grid">
              {
                contentBlockContext.members.data.map((member, index) => (
                  <article 
                    className={`community-item ${activeElement === index ? 'show-info' : ''}`}
                    key={member.attributes.fullName}
                    onClick={() => showDetails(index)}
                    tabIndex={0}
                  >
                    <div>
                      <CldImage
                        src={member.attributes.image.data.attributes.url}
                        width={member.attributes.image.data.attributes.width}
                        height={member.attributes.image.data.attributes.height}
                        alt={'Afbeelding van: ' + member.attributes.fullName}
                        placeholder="blur"
                        blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+P/DwADGQGUKyfeGAAAAABJRU5ErkJggg=='}
                        objectFit={'cover'}
                        priority
                        sizes="
                          (max-width: 500px) 100vw,
                          (max-width: 900px) 50vw,
                          (max-width: 1220px) 33vw,
                          (max-width: 1500px) 25vw,
                          20vw
                        "
                      />
                    </div>
                    <div className="info-overlay" >
                      <div>
                        <h2>{member.attributes.companyName}</h2>
                        <h3>{member.attributes.fullName}</h3>
                      </div>
                      <div>
                        <ul className="info-links">
                          {
                            member.attributes.fbUrl && (
                              <li>
                                <a href={member.attributes.fbUrl} target="_blank" rel="noreferrer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8.301" height="15.6"><path d="M12.972 2.59h1.515V.11A20.809 20.809 0 0 0 12.28 0 3.4 3.4 0 0 0 8.6 3.665V5.85H6.187v2.773H8.6V15.6h2.956V8.624h2.314l.367-2.773h-2.683V3.94c0-.8.23-1.35 1.419-1.35Z" transform="translate(-6.187)"/></svg>
                                </a>
                              </li>
                            )
                          }
                          {
                            member.attributes.instaUrl && (
                              <li>
                                <a href={member.attributes.instaUrl} target="_blank" rel="noreferrer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15.351" height="15.352"><g transform="translate(0 -.001)"><path className="a" d="M7.678 3.734a3.939 3.939 0 1 0 3.939 3.939 3.938 3.938 0 0 0-3.939-3.939Zm0 6.5a2.557 2.557 0 1 1 2.557-2.557 2.556 2.556 0 0 1-2.557 2.553Z"/><path className="a" d="M10.84.049c-1.412-.066-4.91-.063-6.324 0A4.587 4.587 0 0 0 1.3 1.29C-.181 2.767.008 4.756.008 7.673c0 2.986-.166 4.929 1.288 6.383 1.482 1.481 3.5 1.288 6.383 1.288 2.958 0 3.979 0 5.024-.4a4.2 4.2 0 0 0 2.6-4.106c.067-1.413.063-4.91 0-6.324C15.176 1.816 13.73.182 10.84.049Zm2.236 13.031c-.968.968-2.31.881-5.416.881-3.2 0-4.481.047-5.416-.891C1.165 12 1.36 10.275 1.36 7.663 1.36 4.129 1 1.584 4.545 1.4c.815-.029 1.055-.038 3.106-.038l.029.019c3.409 0 6.083-.357 6.244 3.189.036.809.045 1.052.045 3.1 0 3.161.059 4.451-.892 5.407Z"/><circle className="a" cx=".92" cy=".92" r=".92" transform="translate(10.853 2.659)"/></g></svg>
                                </a>
                              </li>
                            )
                          }
                          {
                            member.attributes.linkedInUrl && (
                              <li>
                                <a href={member.attributes.linkedInUrl} target="_blank" rel="noreferrer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="15.352" height="15.352"><path d="M7.676 0a7.676 7.676 0 1 0 7.676 7.676A7.677 7.677 0 0 0 7.676 0ZM5.445 11.6H3.576V5.979h1.869Zm-.934-6.388H4.5a.974.974 0 1 1 .025-1.943.975.975 0 1 1-.012 1.943Zm7.675 6.388h-1.869V8.595c0-.756-.271-1.272-.947-1.272a1.023 1.023 0 0 0-.959.684 1.28 1.28 0 0 0-.061.456V11.6H6.48s.024-5.1 0-5.624h1.869v.8a1.856 1.856 0 0 1 1.685-.928c1.23 0 2.152.8 2.152 2.531Zm0 0"/></svg>
                                </a>
                              </li>
                            )
                          }
                          {
                            member.attributes.websiteUrl && (
                              <li>
                                <a href={member.attributes.websiteUrl} target="_blank" rel="noreferrer">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14.428" height="14.427" ><path className="a" d="M0 10.643c.046-.212.078-.423.145-.631a3.454 3.454 0 0 1 .871-1.41q1.454-1.46 2.916-2.916c.032-.032.06-.092.109-.074s.028.085.021.127a4.567 4.567 0 0 0 .2 1.9.2.2 0 0 1-.071.222q-.984.978-1.96 1.96a1.687 1.687 0 0 0-.377 1.893 1.663 1.663 0 0 0 2.694.518 181.942 181.942 0 0 0 3.075-3.075 1.673 1.673 0 0 0 .1-2.214.681.681 0 0 0-.155-.162.457.457 0 0 1-.2-.416 1.01 1.01 0 0 1 .37-.9c.113-.1.215-.208.321-.317a.12.12 0 0 1 .173-.021 3.256 3.256 0 0 1 1.523 2.264 3.336 3.336 0 0 1-.434 2.366 3.487 3.487 0 0 1-.55.691q-1.465 1.47-2.934 2.937a3.394 3.394 0 0 1-5.8-1.851l-.021-.109C0 11.168 0 10.907 0 10.643Z"/><path className="a" d="M11.431 0a3.666 3.666 0 0 1 1.135.353 3.312 3.312 0 0 1 1.826 2.581 3.291 3.291 0 0 1-.973 2.863c-.9.917-1.816 1.819-2.726 2.729a.219.219 0 0 1-.109.078.419.419 0 0 1 0-.219 4.175 4.175 0 0 0-.176-1.707.36.36 0 0 1 .113-.416q.852-.83 1.685-1.678A1.673 1.673 0 1 0 9.868 2.19Q8.429 3.597 7.022 5.036a1.661 1.661 0 0 0 .127 2.451.289.289 0 0 1 .109.2 1.039 1.039 0 0 1-.328 1.019 3.406 3.406 0 0 0-.339.338c-.063.071-.116.067-.194.018a3.23 3.23 0 0 1-1.527-2.4 3.314 3.314 0 0 1 .994-2.909c.885-.892 1.781-1.777 2.666-2.669A3.488 3.488 0 0 1 10.603.012c.014 0 .025-.011.039-.014Z"/></svg>
                                </a>
                              </li>
                            )
                          }
                        </ul>
                      </div>
                    </div>
                  </article>
                ))
              }
            </CommunityGrid>
          )
        }
      </div>
    </Container>
  )
}