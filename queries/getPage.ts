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

export type contentBlock = textAndImage | community | membershipCB | ruimteCB;

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

export type membership = {
  attributes: {
    title: string
    price: number
    buttonLabel: string
    perksMd: string;
  }
}

export type membershipCB = {
  blockType: "ComponentContentblockMembershipSelectie";
  introTextMd: string
  formTextMd: string
  formSubmitTextMd: string
  subscriptions: {
    data: membership[]
  }
}

export type space = {
  attributes: {
    title: string
    descriptionMd: string
    buttonLabel: string
    image: {
      data: StrapiImage[]
    }
    position: number
  }
}

export type ruimteCB = {
  blockType: "ComponentContentblockRuimteSelectie"
  introTextMd: string
  formIntroTextMd: string
  formSubmitTextMd: string
  spaces: {
    data: space[]
  }
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
                ... on ComponentContentblockRuimteSelectie {
                  introTextMd:IntroTekst
                  formIntroTextMd:FormulierIntroTekst
                  formSubmitTextMd:FormulierVerzondenBericht
                  spaces:ruimtes {
                    data {
                      attributes {
                        title:Titel
                        descriptionMd:Omschrjiving
                        buttonLabel:SelecteerKnopTekst
                        image:Afbeelding {
                          data {
                            attributes {
                              url
                              width
                              height
                            }
                          }
                        }
                        position:Positie
                      }
                    }
                  }
                }
                ... on ComponentContentblockMembershipSelectie {
                  introTextMd:IntroTekst
                  formTextMd:FormulierIntroTekst
                  formSubmitTextMd:FormulierVerzondenBericht
                  subscriptions:abonnementen {
                    data {
                      attributes {
                        title:Titel
                        price:PrijsPm
                        buttonLabel:KnopTekst
                        perksMd:Perks
                      }
                    }
                  }
                }
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
