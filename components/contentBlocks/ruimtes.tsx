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

const WorkspaceRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  & .workspace-item {
    padding: 1rem 0rem;
    opacity: 0;

    & h2 {
      margin: 4rem 0 1rem 0;
      font-size: 3rem;
    }

    & .workspace-description {
      margin: 2rem 0;
    }
  }

  & .price {
    margin: 1rem 0;
    font-size: 2.2rem;

    & .price-label {
      font-size: 1.4rem;
    }
  }

  & .features {
    list-style-type: "-";
    margin: 2rem 0 2rem 1rem;

    & li {
      padding-left: 1rem;
      margin: .5rem 0;
      font-size: 2.2rem;
    }
  }

  & button {
    border: 1px solid var(--pa-maroon);
    background: var(--pa-white);
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem;
    color: var(--pa-maroon);
    cursor: pointer;
    transition: all .1s ease;
    margin: 2rem 0;

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

  const [chosenMembership, setChosenMembership] = useState(contentBlockContext.spaces.data[0].attributes.title);

  const setGekozenMembership = (value: string) => {
    setChosenMembership(value);

    formRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }
   
  const handleMembershipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenMembership(e.target.value);
  };

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    event.preventDefault();

    const myForm = event.target as HTMLFormElement;
    const formData = new FormData(myForm);
    
    fetch("/api/hello", {
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
    <Container widthFull={true}>
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
                      <Image
                        src={space.attributes.image.data[0].attributes.url}
                        width={space.attributes.image.data[0].attributes.width}
                        height={space.attributes.image.data[0].attributes.height}
                        alt={`Afbeelding van ${space.attributes.title}`}
                        placeholder="blur"
                        blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+M/AwAC5gFhWwvU8wAAAABJRU5ErkJggg=='}
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
                      >
                        {
                          space.attributes.image.data.map((image, idx) => (
                            <SwiperSlide key={idx} >
                              <div className="relative">
                                <Image
                                  src={image.attributes.url}
                                  width={image.attributes.width}
                                  height={image.attributes.height}
                                  alt={`Afbeelding ${idx} van ${space.attributes.title}`}
                                  placeholder="blur"
                                  blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNMk+M/AwAC5gFhWwvU8wAAAABJRU5ErkJggg=='}
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
                  <button>{space.attributes.buttonLabel}</button>
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
                      onChange={handleMembershipChange} 
                      value={chosenMembership}
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
                  <input type="date" name="geboortedatum" placeholder="Geboortedatum" />
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