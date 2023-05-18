export const fragments = {
  contentblocks: `
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
        textBelow:Tekst_onder_knoppen
        gecentreerd:Gecentreerd
        mirrored:Gespiegeld
      }
      ... on ComponentContentblockTekstTweeKolommen {
        text1:Tekst_links
        text2:Tekst_rechts
      }
      ... on ComponentContentblockAgendaOverzicht {
        intro: Koptekst
      }
    }
  `,

  events: `
    evenementens(sort: "Begintijd:asc", pagination: { limit: 200 }) {
      data {
        id
        attributes {
          Titel
          Type
          Beschrijving
          Begintijd
          Eindtijd
        }
      }
    }
  `,
};
