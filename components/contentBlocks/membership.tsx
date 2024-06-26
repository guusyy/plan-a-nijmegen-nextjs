import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styled from "styled-components"
import { membershipCB } from "../../queries/getPage"
import anime from 'animejs'
import { Container } from "./text-image"

export const IntroRow = styled.div`
  margin-bottom: calc(1rem / 1.6);
  max-width: calc(120rem / 1.6);
`

export const ContactRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: calc(4rem / 1.6);
  margin-bottom: calc(10rem / 1.6);
  opacity: 0;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: calc(.5rem / 1.6);
    margin: calc(4rem / 1.6) 0;

    .fullname {
      display: flex;
      gap: calc(1rem / 1.6);

      :first-child {
        width: 60%;
      }

      :last-child {
        width: 40%;
      }

      @media (max-width: 48em) {
        flex-direction: column;
        
        :first-child {
          width: 100%;
        }

        :last-child {
          width: 100%;
        }
      }
    }

    .select-arrow-down {
      position: absolute;
      right: calc(1rem / 1.6);
      top: 50%;
      transform: translate(0, -50%);
      width: calc(1.6rem / 1.6);
      pointer-events: none;
    }

    label {
      font-size: 18px;
      padding: calc(0.5rem / 1.6) calc(1rem / 1.6) 0;
      line-height: 1;
      display: block;
    }

    & select, input, textarea {
      font-size: calc(2rem / 1.6);
      width: 100%;
      height: calc(5rem / 1.6);      
      border: none;
      border-bottom: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      color: var(--pa-maroon);
      padding: calc(.5rem / 1.6) calc(1rem / 1.6);

      @media (max-width: 64em) {
        height: calc(6rem / 1.6);
      }

      &:focus {
        outline: 0;
      }

      &::placeholder {
        opacity: 0.4;
        font-weight: 400;
        color: var(--pa-maroon);
      }
    }

    textarea {
      height: calc(10rem / 1.6);
      resize: none;
    }

    select {
      display: flex;
    }

    button {
      border: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      font-size: calc(2rem / 1.6);
      text-transform: uppercase;
      padding: calc(1rem / 1.6);
      color: var(--pa-maroon);
      cursor: pointer;
      transition: all .1s ease;
      margin: calc(2rem / 1.6) 0;
      display: flex;
      gap: calc(2rem / 1.6);
      margin-left: auto;

      &:focus {
        outline: 0;
      }

      &:hover {
        background: var(--pa-maroon);
        color: var(--pa-white);
      }
    }
  }

  .address-inputs {
    display: flex;
    gap: calc(1rem / 1.6);

    @media (max-width: 48em) {
      flex-direction: column;
    }
  }

  .succes-message {

    width: 100%;
    min-height: calc(20rem / 1.6);
    align-items: center;
    text-decoration: underline;
    display: flex;
    text-align: left;

    &.hidden {
      display: none;
      opacity: 0;
    }
  }
`

export default function Membership({contentBlockContext}: {
  contentBlockContext: membershipCB
}) {
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if(initiated) return
    setInitiated(true);
    
    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.membership-item',
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
      
      <div className="grid grid-cols-[repeat(auto-fit,minmax(19rem,1fr))] gap-10 mt-16 mb-6">
        {
          contentBlockContext.subscriptions.data.map((membership, index) => (
            <article className="border-2 border-t-8 p-7 border-pa-maroon" key={index}>
              <h3 className="text-[28px]">{membership.attributes.title}</h3>
              {(membership.attributes.price && membership.attributes.price > 0 ? (
                <div className="mt-6 text-xl">€<span className="mx-1 text-3xl">{membership.attributes.price.toFixed(2).toString().replace(".", ",")}</span> <span className="text-lg tracking-tight">per maand</span></div>
              ) : null)}
                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="mt-3 rte">
                  {membership.attributes.perksMd}
                </ReactMarkdown>
            </article>
          ))
        }
      </div>

      <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte rte--sm">
        {contentBlockContext.disclaimer}
      </ReactMarkdown>
    </Container>
  )
}