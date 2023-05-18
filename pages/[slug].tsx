import React, { useEffect, useState } from "react";
import Community from '../components/contentBlocks/community';
import TextAndImage from "../components/contentBlocks/text-image";
import Membership from '../components/contentBlocks/membership';
import Ruimtes from '../components/contentBlocks/ruimtes';

import MainLayout from "../components/layout/main"
import getFooterColumns from "../queries/getFooterColumns";
import getPage, { contentBlock } from "../queries/getPage";
import getPages from "../queries/getPages";

import { InferGetStaticPropsType } from "next";
import Welkomsactie from "../components/contentBlocks/welkomsactie";
import TextTwoCols from "../components/contentBlocks/textTwoCols";
import Events, { eventItem } from "../components/contentBlocks/events";
import getEvents from "../queries/getEvents";

export async function getStaticPaths() {
  const pages = await getPages();

  return {
    paths: pages.map(page => ({
      params: {
        slug: page.slug
      }
    })),
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  const navItems = await getPages();
  const footerColumns = await getFooterColumns();
  const page = await getPage(context.params.slug);
  let events: eventItem[] = [];

  if(page.contentBlocks.some(contentBlock => contentBlock.blockType === "ComponentContentblockAgendaOverzicht")) {
    events = await getEvents();
  }

  if (!navItems || !footerColumns || !page) {
    throw new Error(`Failed to fetch navItems, footerColumns or page`)
  }

  return {
    props: {
      navItems: navItems
        .filter(page => page.show)
        .sort((a, b) => a.position-b.position),
      footerColumns,
      page,
      events
    }
 };
}

export const getContentBlockComponent = (contentBlock: contentBlock, idx: number, title: string, events?: eventItem[]) => {
  switch(contentBlock.blockType) {
      case "ComponentContentblockWelkomsactie": return <Welkomsactie contentBlockContext={contentBlock} key={`${idx}-${title}`} />;
      case "ComponentContentblockRuimteSelectie": return <Ruimtes contentBlockContext={contentBlock} key={`${idx}-${title}`} />;
      case "ComponentContentblockMembershipSelectie": return <Membership contentBlockContext={contentBlock} key={`${idx}-${title}`} />;
      case "ComponentContentblockCommunity":  return <Community contentBlockContext={contentBlock} key={`${idx}-${title}`}  />;
      case "ComponentContentblockTekstEnAfbeeldingSlider":  return <TextAndImage contentBlockContext={contentBlock} key={`${idx}-${title}`}  />;
      case "ComponentContentblockTekstTweeKolommen": return <TextTwoCols contentBlockContext={contentBlock} key={`${idx}-${title}`}  />;
      case "ComponentContentblockAgendaOverzicht": return <Events contentBlockContext={contentBlock} key={`${idx}-${title}`} events={events}  />;
      default:                                              return <h1 key={`${idx}-${title}`} >Geen contentblock template</h1>
    }
}

export default function DetailPage({ 
  navItems, 
  footerColumns, 
  page,
  events
}: InferGetStaticPropsType<typeof getStaticProps> ) {

  const getOgImage = (contentBlock: contentBlock, idx?: number) => {
    switch(contentBlock.blockType) {
        case "ComponentContentblockWelkomsactie": return undefined;
        case "ComponentContentblockRuimteSelectie": return contentBlock.spaces.data[0]?.attributes.image.data[0];
        case "ComponentContentblockMembershipSelectie": return undefined;
        case "ComponentContentblockCommunity":  return undefined;
        case "ComponentContentblockTekstEnAfbeeldingSlider":  return undefined;
        default:                                              return undefined;
      }
  }

  return (
    <MainLayout navItems={navItems} footerColumns={footerColumns} title={page.title}>
      <div className="space-y-20">
        {
          page.contentBlocks.map((contentBlock, idx) => (
            getContentBlockComponent(contentBlock, idx, page.title, events)
          ))
        }
      </div>
    </MainLayout>
  )
}