import { gql } from "@apollo/client";
import client from "../apollo-client";

export default async function getFooterColumns() {
  const { data } = await client.query({
    query: gql`
      query {
        footer{
          data {
            attributes {
              footerColumns:FooterKolommen {
                componentType:__typename
                ... on ComponentFooterRijkeTekst {
                  mdText:Tekst
                }
                ... on ComponentFooterLinks {
                  links:Links {
                    label:Label
                    linkedPage:GelinktePagina {
                      data {
                        attributes {
                          title:Titel
                          slug
                        }
                      }
                    }
                    externalUrl:ExterneLink
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const footerColumns = data.footer.data.attributes.footerColumns;

  return footerColumns;
}
