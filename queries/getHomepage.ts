import { gql } from "@apollo/client";
import client from "../apollo-client";
import { contentBlock } from "./getPage";

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
              contentBlocks:Contentblokken {
                blockType:__typename
                ... on ComponentContentblockWelkomsactie {
                  introText:introTekst
                  formSubmitTextMd:succesBerichtFormulier
                }
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
                              provider_metadata
                              ext
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
                  subscriptions:abonnementen (pagination: {limit: 100}) {
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
                  members:community_members (pagination: {limit: 500}) {
                    data {
                      attributes {
                        image:Afbeelding {
                          data {
                            attributes {
                              url
                              width
                              height
                              provider_metadata
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
                        provider_metadata
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
  });

  const homepage = data.homepage.data.attributes;

  return homepage;
}
