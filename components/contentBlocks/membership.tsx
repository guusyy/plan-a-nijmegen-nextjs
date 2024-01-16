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