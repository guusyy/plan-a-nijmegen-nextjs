import { ApolloError, gql } from "@apollo/client";
import client from "../apollo-client";

type NavItem = {
  show: boolean;
  title: string;
  position: number;
  slug: string;
}

export default async function getPages(): Promise<NavItem[] > {
  const { data } = await client.query({
    query: gql`
      query {
        pages:paginas (pagination: { limit: 200 }) {
          data {
            id
            attributes {
              show:ToonInMenu
              title:Titel
              position:MenuPositie
              slug:slug
            }
          }
        }
      }
    `,
  });

  const navItems = data.pages.data.map(page => {
    return {
      show: page.attributes.show,
      title: page.attributes.title,
      position: page.attributes.position,
      slug: page.attributes.slug
    }
  })

  return navItems;
}
