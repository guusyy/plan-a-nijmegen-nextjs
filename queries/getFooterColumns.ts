import { gql } from "@apollo/client";
import client from "../apollo-client";
import { button } from "./getHomepage";

type FooterColumnRichText = {
  mdText: string;
}

type FooterColumnLinks = button[]

export type FooterColumn = FooterColumnRichText | FooterColumnLinks

export default async function getFooterColumns(): Promise<FooterColumn[]> {
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
