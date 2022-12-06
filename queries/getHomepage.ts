import { gql } from "@apollo/client";
import client from "../apollo-client";

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
  data: {
    attributes: {
      url: string;
      width: string;
      height: string;
      provider_metadata: string;
    }
  }
}

type homePageData = {
  introText: string;
  heroImages: image[];
  buttons: button[];
  contactDetails: string;
}

export default async function getHomePage(): Promise<homePageData> {
  const { data } = await client.query({
    query: gql`
      query {
        homepage:homepagina {
          data {
            attributes {
              introText:IntroTekst
              heroImages:UitgelichteAfbeeldingRandomGekozen {
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
              contactDetails:Contactgegevens
            }
          }
        }
      }
    `,
  });

  const homepage = data.homepage.data.attributes;

  return homepage;
}
