import { gql } from "@apollo/client";
import client from "../apollo-client";
import { contentBlock } from "./getPage";
import { fragments } from "./fragments";

export type button = {
  label: string;
  linkedPage: {
    data: {
      attributes: {
        title?: string;
        slug: string;
      }
    }
  }
  externalUrl: string | null;
}

export type image = {
  attributes: {
    url: string;
    width: string;
    height: string;
    provider_metadata: string;
  }
}

export type homePageData = {
  introText: string;
  heroImages: {
    data: image[]
  }
  buttons: button[];
  contentBlocks: contentBlock[]
}

export default async function getHomePage(): Promise<homePageData> {
  const { data } = await client.query({
    query: gql`
      query {
        homepage:homepagina {
          data {
            attributes {
              introText:IntroTekst
              heroImages:UitgelichteAfbeeldingen {
                data {
                  attributes {
                    url
                    width
                    height
                    provider_metadata
                  }
                }
              }
              buttons:Knoppen {
                label:Label
                linkedPage:GelinktePagina {
                  data {
                    attributes {
                      slug
                    }
                  }
                }
                externalUrl:ExterneLink
              }
              ${fragments.contentblocks}
            }
          }
        }
      }
    `,
  });

  const homepage = data.homepage.data.attributes;

  return homepage;
}
