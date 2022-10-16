import { gql } from "@apollo/client";
import client from "../apollo-client";

export default async function getHomePage() {
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
