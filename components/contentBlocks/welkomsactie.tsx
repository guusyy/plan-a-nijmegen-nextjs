import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import { welkomsActieCB } from "../../queries/getPage"
import anime from 'animejs'
import { Container } from "./text-image"
import { ContactRow, IntroRow } from "./membership"

export default function Welkomsactie({contentBlockContext}: {
  contentBlockContext: welkomsActieCB
}) {
  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if(initiated) return
    setInitiated(true);
    
    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.contact-row',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
      }, 500)
  }, [initiated])

  const formRef = React.createRef<HTMLDivElement>();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    event.preventDefault();

    const myForm = event.target as HTMLFormElement;
    const formData = new FormData(myForm);
    
    fetch("/favicon.ico", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setFormSubmitted(true);

        anime({
          targets: '.succes-message',
          translateY: [-10, 0],
          opacity: [0, 100],
          duration: 1000
        });
      })
      .catch((error) => alert(error));
  }

  return (
    <Container widthFull={true}>
      <IntroRow>
        <div className="column" >
          <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
            {contentBlockContext.introText}
          </ReactMarkdown>
        </div>
      </IntroRow>
      <ContactRow className="contact-row" ref={formRef}>
        <div>
          {
            !formSubmitted && (
              <form 
                name="welkomsactie"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="welkomsactie" />
                <p className="fullname">
                  <input type="text" name="naam" placeholder="Naam*" required />
                  <input type="text" name="tussenvoegsel" placeholder="Tussenvoegsel" />
                </p>
                <p hidden>
                  <label>
                    Vul dit niet in: <input name="bot-field" />
                  </label>
                </p>
                <p>
                  <input type="text" name="achternaam" placeholder="Achternaam*" required />
                </p>
                <p>
                  <input type="email" name="email" placeholder="E-Mail*" required />
                </p>
                <p>
                  <input type="text" name="telefoon" placeholder="Telefoon*" required />
                </p>
                <p className="address-inputs">
                  <input type="text" name="postcode" placeholder="Postcode" />
                  <input type="text" name="huisnummer" placeholder="Huisnr." />
                  <input type="text" name="toevoegingen" placeholder="Toev." />
                </p>
                <p>
                  <input type="text" name="straat" placeholder="Straat" />
                </p>
                <p>
                  <input type="text" name="woonplaats" placeholder="Woonplaats" />
                </p>
                <p>
                  <label htmlFor="proefdag">Proefdag:</label>
                  <input type="date" name="proefdag" placeholder="Proefdag" id="proefdag" />
                </p>
                <p>
                  <button type="submit"><span>Verstuur</span><span>&gt;</span></button>
                </p>
              </form>
            )
          }
          <div className={`succes-message ${formSubmitted ? '' : 'hidden'}`}>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
              {contentBlockContext.formSubmitTextMd}
            </ReactMarkdown>
          </div>
        </div>
      </ContactRow>
    </Container>
  )
}