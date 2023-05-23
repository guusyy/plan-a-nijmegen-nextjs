import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styled from "styled-components"
import { community, membershipCB, ruimteCB } from "../../queries/getPage"
import anime from 'animejs'
import { Container } from "./text-image"
import { useRouter } from "next/router"
import { ContactRow, IntroRow } from "./membership"

import { EffectFade, Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { CldImage } from 'next-cloudinary';

const WorkspaceRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

  & button {
    border: 1px solid var(--pa-maroon);
    background: var(--pa-white);
    font-size: calc(2rem / 1.6);
    text-transform: uppercase;
    padding: calc(1rem / 1.6);
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
    }
  }
`

export default function Membership({contentBlockContext}: {
  contentBlockContext: ruimteCB
}) {
  const spaces = [...contentBlockContext.spaces.data].sort((a, b) => a.attributes.position - b.attributes.position);

  const formRef = React.createRef<HTMLDivElement>();

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
      .add({
        targets: '.contact-row',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
      }, 500)
  }, [initiated])

  const [chosenRuimte, setChosenRuimte] = useState(contentBlockContext.spaces.data[0].attributes.title);

  const setGekozenRuimte = (value: string) => {
    setChosenRuimte(value);

    formRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }
   
  const handleRuimteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenRuimte(e.target.value);
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    event.preventDefault();

    const myForm = event.target as HTMLFormElement;
    const formData = new FormData(myForm);
    
    fetch("/favicon.ico", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setFormSubmitted(true);

        anime({
          targets: '.succes-message',
          translateY: [-10, 0],
          opacity: [0, 100],
          duration: 1000
        });
      })
      .catch((error) => alert(error));
  }

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
                  <button onClick={() => setGekozenRuimte(space.attributes.title)}>{space.attributes.buttonLabel}</button>
                </div>
              ))
            }
          </WorkspaceRow>
        )
      }
      <ContactRow className="contact-row" ref={formRef}>
        <div>
          {
            !formSubmitted && (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
                {contentBlockContext.formIntroTextMd}
              </ReactMarkdown>
            )
          }
          {
            !formSubmitted && (
              <form 
                name="ruimteHuren"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="ruimteHuren" />
                <div>
                  <div style={{position: 'relative'}}>
                    <select 
                      name="gekozenRuimte"  
                      onChange={handleRuimteChange} 
                      value={chosenRuimte}
                    >
                      {
                        spaces.map((space, index) => (
                          <option value={space.attributes.title} key={index}>{space.attributes.title}</option>
                        ))
                      }
                    </select>
                    <svg className="select-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.424 14.144"><path d="M868.108,427.449l-12.944-9.712,12.944-9.712,1.2,1.6L858.5,417.737l10.812,8.112Z" transform="translate(-408.025 869.309) rotate(-90)" fill="#691e0f"/></svg>
                  </div>
                </div>
                <p>
                  <input type="text" name="naam" placeholder="Naam*" required />
                </p>
                <p hidden>
                  <label>
                    Vul dit niet in: <input name="bot-field" />
                  </label>
                </p>
                <p>
                  <input type="email" name="email" placeholder="E-Mail*" required />
                </p>
                <p>
                  <input type="text" name="telefoon" placeholder="Telefoon*" required />
                </p>
                <p>
                <label htmlFor="gewensteDatum">Gewenste datum:</label>
                  <input type="date" name="gewensteDatum" placeholder="Gewenste datum" id="gewensteDatum" />
                </p>
                <p className="address-inputs">
                  <input type="text" name="postcode" placeholder="Postcode" />
                  <input type="text" name="huisnummer" placeholder="Huisnr." />
                  <input type="text" name="toevoegingen" placeholder="Toev." />
                </p>
                <p>
                  <textarea name="opmerking" placeholder="Opmerking" />
                </p>
                <p>
                  <button type="submit"><span>Verstuur</span><span>&gt;</span></button>
                </p>
              </form>
            )
          }
          <div className={`succes-message ${formSubmitted ? '' : 'hidden'}`}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
              {contentBlockContext.formSubmitTextMd}
            </ReactMarkdown>
          </div>
        </div>
      </ContactRow>
    </Container>
  )
}