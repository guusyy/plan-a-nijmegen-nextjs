import { gql } from "@apollo/client";
import client from "../apollo-client";
import { button } from "./getHomepage";
import { fragments } from "./fragments";

export type StrapiImage = {
  attributes: {
    url: string
    width: string
    height: string
    provider_metadata: {
      public_id: string
      resource_type: string
    }
  }
}

export type contentBlock = textAndImage | community | membershipCB | ruimteCB | welkomsActieCB | textTwoCols | events;

export type textAndImage = {
  blockType: "ComponentContentblockTekstEnAfbeeldingSlider";
  mdText: string;
  noImageFullWidth: boolean | null;
  images: {
    data: StrapiImage[]
  };
  usps?: {
    usp: string
  }[];
  buttons: button[];
  textBelow?: string;
  gecentreerd: boolean | null;
  mirrored: boolean | null;
}

export type textTwoCols = {
  blockType: "ComponentContentblockTekstTweeKolommen";
  text1?: string;
  text2?: string;
}

export type events = {
  blockType: "ComponentContentblockAgendaOverzicht";
  intro?: string;
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
  subscriptions: {
    data: membership[]
  }
  disclaimer: string
}

export type space = {
  attributes: {
    title: string
    descriptionMd: string
    buttonLabel: string
    button: button
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

export type welkomsActieCB = {
  blockType: "ComponentContentblockWelkomsactie"
  introText: string
  formSubmitTextMd: string
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
              ${fragments.contentblocks}
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
