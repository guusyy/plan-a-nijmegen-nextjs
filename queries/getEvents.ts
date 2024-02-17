import { gql } from "@apollo/client";
import client from "../apollo-client";
import { fragments } from "./fragments";
import { eventItem } from "../components/contentBlocks/events";

export default async function getEvents(): Promise<eventItem[]> {
  const { data } = await client.query({
    query: gql`
      query {
        ${fragments.events}
      }
    `,
  });
  
  const page = data.evenementens.data;

  return page;
}
