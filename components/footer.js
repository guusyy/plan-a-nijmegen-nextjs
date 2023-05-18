import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import styled from "styled-components"

const PAFooter = styled.footer`
  border-top: 1px solid var(--pa-maroon);
  padding: calc(2rem / 1.6) 0;
  line-height: calc(2rem / 1.6);
  font-size: calc(1.4rem / 1.6);

  display: grid;
  grid-template-columns: repeat(5, minmax(0,1fr));
  justify-content: space-between;
  flex-wrap: wrap;
  gap: calc(2rem / 1.6);

  @media (max-width: 80em) {
    grid-template-columns: minmax(0,1fr) minmax(0,1fr);
    margin-top: calc(8rem / 1.6);
  }

  @media (max-width: 64em) {
    grid-template-columns: minmax(0,1fr);
    margin-top: calc(8rem / 1.6);
  }

  & * {
    line-height: calc(2rem / 1.6);
    font-size: calc(1.4rem / 1.6);
  }

  table {
    width: 100%;
    max-width: calc(25rem / 1.6);
  }

  h2, h3, h4 {
    text-transform: uppercase;
  }
`

export default function Footer({ footerColumns }) {
  return (
    <PAFooter>
      {
        footerColumns?.map((col, i) => {
          switch (col.componentType) {
            case 'ComponentFooterLinks':
              return (
                <div key={i}>
                  <ul>
                    {
                      col.links?.map(link => (
                        <li key={link.label}>
                          <Link href={link.linkedPage?.data?.attributes.slug ?? link.externalUrl}>
                            {link.label}
                          </Link>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              )
            case 'ComponentFooterRijkeTekst':
              return (
                <div key={i}>
                  <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                    {col.mdText}
                  </ReactMarkdown>
                </div>
              )
            default:
              return
          }
        })
      }
    </PAFooter>
  )
}