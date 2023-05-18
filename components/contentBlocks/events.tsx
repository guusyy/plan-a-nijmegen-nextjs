import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { events } from "../../queries/getPage";
import rehypeRaw from "rehype-raw";

export type eventItem = {
  id: string
  attributes: {
    Titel?: string
    Type?: "Informeel" | "Zakelijk" | "Gesloten"
    Beschrijving?: string
    Begintijd?: string
    Eindtijd?: string
  }
}

export default function Events({ contentBlockContext, events }: {
  contentBlockContext: events
  events: eventItem[]
}) {
  return (
    <section>
      <div className={``}>
        <ReactMarkdown className={`max-w-xl rte`} rehypePlugins={[rehypeRaw]}>
          {contentBlockContext.intro}
        </ReactMarkdown>

        {
          events.length > 0 ? (
            <div>
              {
                events.map((e, index) => {
                  const startDate = new Date(e.attributes.Begintijd);
                  const endDate = new Date(e.attributes.Eindtijd);
                  const event = e.attributes;

                  return (
                  <article key={e.id} className={`flex flex-col md:grid grid-cols-[min(10vw,200px)_1fr] border-t py-3 border-pa-maroon last:border-b`}>
                    <div className="gap-2 mb-2 max-md:flex">
                      <p className="uppercase max-lg:text-base">{startDate.toLocaleDateString('nl-NL', {weekday: 'short', day: '2-digit', month: 'short'})}</p>
                      <p className="max-lg:text-base">
                        {startDate.getHours().toString().padStart(2, '0')}:{startDate.getMinutes().toString().padStart(2, '0')} 
                        <span className="mx-1">—</span>  
                        {endDate.getHours().toString().padStart(2, '0')}:{endDate.getMinutes().toString().padStart(2, '0')}
                      </p>
                    </div>
                    <div className={`max-w-2xl md:pl-10 relative`}>
                      <div className={`w-3.5 h-3.5 rounded-full top-[7px] -left-6 md:left-3 absolute ${
                        event.Type === 'Zakelijk' ? 'bg-pa-maroon' : 
                        event.Type === 'Informeel' ? 'bg-[#FAB90F]' : ''}`} title={event.Type}></div>
                      <h3 className={`w-fit relative mb-1 text-2xl font-bold uppercase font-heading ${event.Type === 'Gesloten' ? 'before:-left-1 before:w-[calc(100%+10px)] before:h-full before:absolute before:bg-pa-red before:-z-10 text-white' : ''}`}>{event.Titel}</h3>
                      <p>{event.Beschrijving}</p>
                    </div>
                  </article>
                )})
              }
            </div>
          )
          :
          (
            <div>Geen geplande evenementen...</div>
          )
        }
      </div>
    </section>
  )
}