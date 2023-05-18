import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { textTwoCols } from "../../queries/getPage";
import rehypeRaw from "rehype-raw";

export default function TextTwoCols({ contentBlockContext }: {
  contentBlockContext: textTwoCols
}) {
  return (
    <section className={`grid lg:grid-cols-[1fr_1px_1fr] gap-20 relative py-20 last:!-mb-[100px] min-h-[65vh]`}>
      <div className={`absolute w-[calc(100vw+200px)] h-full top-0 bg-[#F4E9E2] -z-10 left-1/2 -translate-x-1/2`}></div>

      <div className={`rte`}>
        <ReactMarkdown className={`max-w-xl`} rehypePlugins={[rehypeRaw]}>
          {contentBlockContext.text1}
        </ReactMarkdown>
      </div>

      <hr className="w-full min-h-[1px] border-none h-full bg-pa-maroon" />

      <div className={`rte`}>
        <ReactMarkdown className={`max-w-xl`} rehypePlugins={[rehypeRaw]}>
          {contentBlockContext.text2}
        </ReactMarkdown>
      </div>
    </section>
  )
}