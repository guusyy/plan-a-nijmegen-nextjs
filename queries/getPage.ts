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
  noImageFullWidth: boolean | null;
  images: {
    data: StrapiImage[]
  };
  buttons: button[];
}

export type community = {
  blockType: "ComponentContentblockCommunity";
  mdText: string;
  members: {
    data: {
      attributes: {
        image: {
          data: StrapiImage
        }
        fullName: string
        companyName: string
        websiteUrl: string
        instaUrl: string
        linkedInUrl: string
        fbUrl: string
      }
    }[]
  };
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
                ... on ComponentContentblockCommunity {
                  mdText:Tekst
                  members:community_members {
                    data {
                      attributes {
                        image:Afbeelding {
                          data {
                            attributes {
                              url
                              width
                              height
                            }
                          }
                        }
                        fullName:VolledigeNaam
                        companyName:Bedrijfsnaam
                        websiteUrl:WebsiteLink
                        instaUrl:InstagramLink
                        linkedInUrl:LinkedinLink
                        fbUrl:FacebookLink
                      }
                    }
                  }
                }
                ... on  ComponentContentblockTekstEnAfbeeldingSlider{
                  mdText:Tekst
                  noImageFullWidth:AlleenTekstMetVolleBreedte
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
