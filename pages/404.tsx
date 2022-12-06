import React from "react";
import MainLayout from "../components/layout/main"
import getFooterColumns from "../queries/getFooterColumns";
import getPages from "../queries/getPages";
import { InferGetStaticPropsType } from "next";
import styled from "styled-components";
import Link from "next/link";

export async function getStaticProps(context) {
  const navItems = await getPages();
  const footerColumns = await getFooterColumns();
  return {
    props: {
      navItems: navItems
        .filter(page => page.show)
        .sort((a, b) => a.position-b.position),
      footerColumns,
    },
    revalidate: 10
 };
}

const ErrorContainer = styled.div`
  min-height: 80vh;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: space-between;

  & h2 {
    font-size: 4.8rem;
    line-height: 6rem;
  }
`

export default function DetailPage({ 
  navItems, 
  footerColumns, 
}: InferGetStaticPropsType<typeof getStaticProps> ) {

  return (
    <MainLayout navItems={navItems} footerColumns={footerColumns} title="404 | Plan A Nijmegen">
      <ErrorContainer>
        <h2>Oeps... deze pagina is niet gevonden</h2>
        {
          navItems.find(item => item.title === "Eten & Drinken")
            ? (<h3>Nu je hier toch bent, heb je al ons mooie<Link href={navItems.find(item => item.title === "Eten & Drinken").slug}><a style={{ textDecoration: 'underline', marginInline: '4px' }}>Restaurant</a></Link> gezien?</h3>)
            : (<h3>Ga terug naar <Link href="/"><a>Home</a></Link></h3>)
        }
      </ErrorContainer>
    </MainLayout>
  )
}