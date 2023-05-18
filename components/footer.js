import Link from "next/link"
import ReactMarkdown from "react-markdown"
import rehypeRaw from 'rehype-raw'
import styled from "styled-components"

const PageFooter = styled.footer`{
  h2 {
    letter-spacing: -1px !important;
  }

  table {
    font-size: 16px;
    line-height: 1.5;
    
    td:not(:first-child) {
      padding: 0 1rem;
    }
  }

  h3 {
    margin-top: 20px;
  }
}`

export default function Footer({ footerColumns }) {
  return (
    <PageFooter className={`relative text-white py-20 grid lg:grid-cols-2 gap-10`}>
      <div className={`absolute w-[calc(100vw+200px)] h-full top-0 bg-pa-maroon -z-10 left-1/2 -translate-x-1/2`}></div>

      {
        footerColumns?.map((col, i) => {
          switch (col.componentType) {
            case 'ComponentFooterLinks':
              return (
                <div key={i}>
                  <ul className={`flex gap-x-10 gap-y-5 flex-wrap text-lg`}>
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
                <div key={i} className="rte [&>ul]:pl-0 [&_li]:before:sr-only">
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
    </PageFooter>
  )
}