import React from "react";
import TextAndImage from "../components/contentBlocks/text-image";

import MainLayout from "../components/layout/main"
import getFooterColumns from "../queries/getFooterColumns";
import getPage, { contentBlock } from "../queries/getPage";
import getPages from "../queries/getPages";

import { StrapiPage } from "../queries/getPage";
import { InferGetStaticPropsType } from "next";

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
  return {
    props: {
      navItems: navItems
        .filter(page => page.show)
        .sort((a, b) => a.position-b.position),
      footerColumns,
      page
    },
    revalidate: 60
 };
}

export default function DetailPage({ 
  navItems, 
  footerColumns, 
  page 
}: InferGetStaticPropsType<typeof getStaticProps> ) {

  const getContentBlockComponent = (contentBlock: contentBlock, idx: number) => {
    switch(contentBlock.blockType) {
        case "ComponentContentblockTekstEnAfbeeldingSlider":  return <TextAndImage contentBlockContext={contentBlock} key={idx}  />;
        default:                                              return <h1 key={idx} >Geen contentblock template</h1>
      }
  }

  return (
    <MainLayout navItems={navItems} footerColumns={footerColumns}>
      {
        page.contentBlocks.map((contentBlock, idx) => (
          getContentBlockComponent(contentBlock, idx)
        ))
      }
    </MainLayout>
  )
}