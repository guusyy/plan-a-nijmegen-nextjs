import { gql } from "@apollo/client";
import client from "../apollo-client";
import { button } from "./getHomepage";

export type StrapiImage = {
  attributes: {
    url: string
    width: string
    height: string
  }
}

export type contentBlock = textAndImage;

export type textAndImage = {
  blockType: "ComponentContentblockTekstEnAfbeeldingSlider";
  mdText: string;
  images: {
    data: StrapiImage[]
  };
  buttons: button[];
}

export type StrapiPage = {
  title: string;
  contentBlocks: contentBlock[]
}

export default async function getPage(slug: string): Promise<StrapiPage> {
  const { data } = await client.query({
    query: gql`
      query ($slug: String){
        page:paginas(filters: {slug: {eq: $slug}}) {
          data {
            attributes {
              title:Titel
              contentBlocks:Contentblokken {
                blockType:__typename
                ... on  ComponentContentblockTekstEnAfbeeldingSlider{
                  mdText:Tekst
                  images:AfbeeldingInSlider {
                    data {
                      attributes {
                        url
                        width
                        height
                      }
                    }
                  }
                  buttons:Knoppen {
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
    variables: {
      slug: slug
    }
  });
  
  const page = data.page.data[0].attributes;

  return page;
}
