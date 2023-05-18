import Image from "next/image"
import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import styled from "styled-components"
import { community, membershipCB } from "../../queries/getPage"
import anime from 'animejs'
import { Container } from "./text-image"
import { useRouter } from "next/router"

export const IntroRow = styled.div`
  margin-bottom: calc(1rem / 1.6);
  max-width: calc(120rem / 1.6);
`

const MembershipRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: calc(4rem / 1.6);

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  & .membership-item {

    border-top: 1px solid var(--pa-maroon);
    padding: calc(1rem / 1.6) calc(0rem / 1.6);
    opacity: 0;

    & h3 {
      font-size: calc(3rem / 1.6);
    }

    ul {
      padding-left: 0;
    }
  }

  & .price {
    margin: calc(1rem / 1.6) 0;
    font-size: calc(2.2rem / 1.6);

    & .price-label {
      font-size: calc(1.4rem / 1.6);
    }
  }

  & .features {
    margin: calc(2rem / 1.6) 0;
    list-style-type: none;

    & li {
      padding-left: calc(2rem / 1.6);
      margin: calc(.5rem / 1.6) 0;
      font-size: calc(2.2rem / 1.6);
      
      &:before {
        content: "–";
        position: absolute;
        margin-left: -calc(2rem / 1.6);
      }
    }
  }

  & button {
    border: 1px solid var(--pa-maroon);
    background: var(--pa-white);
    font-size: calc(2rem / 1.6);
    text-transform: uppercase;
    padding: calc(1rem / 1.6);
    color: var(--pa-maroon);
    cursor: pointer;
    transition: all .1s ease;
    margin: calc(2rem / 1.6) 0;

    &:focus {
      outline: 0;
    }

    &:hover {
      background: var(--pa-maroon);
      color: var(--pa-white);
    }
  }
`

export const ContactRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: calc(4rem / 1.6);
  margin-bottom: calc(10rem / 1.6);
  opacity: 0;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: calc(.5rem / 1.6);
    margin: calc(4rem / 1.6) 0;

    .fullname {
      display: flex;
      gap: calc(1rem / 1.6);

      :first-child {
        width: 60%;
      }

      :last-child {
        width: 40%;
      }

      @media (max-width: 48em) {
        flex-direction: column;
        
        :first-child {
          width: 100%;
        }

        :last-child {
          width: 100%;
        }
      }
    }

    .select-arrow-down {
      position: absolute;
      right: calc(1rem / 1.6);
      top: 50%;
      transform: translate(0, -50%);
      width: calc(1.6rem / 1.6);
      pointer-events: none;
    }

    label {
      font-size: 18px;
      padding: calc(0.5rem / 1.6) calc(1rem / 1.6) 0;
      line-height: 1;
      display: block;
    }

    & select, input, textarea {
      font-size: calc(2rem / 1.6);
      width: 100%;
      height: calc(5rem / 1.6);      
      border: none;
      border-bottom: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      color: var(--pa-maroon);
      padding: calc(.5rem / 1.6) calc(1rem / 1.6);

      @media (max-width: 64em) {
        height: calc(6rem / 1.6);
      }

      &:focus {
        outline: 0;
      }

      &::placeholder {
        opacity: 0.4;
        font-weight: 400;
        color: var(--pa-maroon);
      }
    }

    textarea {
      height: calc(10rem / 1.6);
      resize: none;
    }

    select {
      display: flex;
    }

    button {
      border: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      font-size: calc(2rem / 1.6);
      text-transform: uppercase;
      padding: calc(1rem / 1.6);
      color: var(--pa-maroon);
      cursor: pointer;
      transition: all .1s ease;
      margin: calc(2rem / 1.6) 0;
      display: flex;
      gap: calc(2rem / 1.6);
      margin-left: auto;

      &:focus {
        outline: 0;
      }

      &:hover {
        background: var(--pa-maroon);
        color: var(--pa-white);
      }
    }
  }

  .address-inputs {
    display: flex;
    gap: calc(1rem / 1.6);

    @media (max-width: 48em) {
      flex-direction: column;
    }
  }

  .succes-message {

    width: 100%;
    min-height: calc(20rem / 1.6);
    align-items: center;
    text-decoration: underline;
    display: flex;
    text-align: left;

    &.hidden {
      display: none;
      opacity: 0;
    }
  }
`

export default function Membership({contentBlockContext}: {
  contentBlockContext: membershipCB
}) {
  const formRef = React.createRef<HTMLDivElement>();

  const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    if(initiated) return
    setInitiated(true);
    
    var tl = anime.timeline({
      duration: 1500
    });

    tl
      .add({
        targets: '.membership-item',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
        delay: anime.stagger(100) // increase delay by 100ms for each elements.
      }, 100)
      .add({
        targets: '.contact-row',
        translateY: [-5, 0],
        opacity: [0, 1],
        duration: 1700,
      }, 500)
  }, [initiated])

  const [chosenMembership, setChosenMembership] = useState(contentBlockContext.subscriptions.data[0]?.attributes.title);

  const setGekozenMembership = (value: string) => {
    setChosenMembership(value);

    formRef.current.scrollIntoView({
      block: "center",
      behavior: "smooth"
    });
  }
   
  const handleMembershipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenMembership(e.target.value);
  };

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
            {contentBlockContext.introTextMd}
          </ReactMarkdown>
        </div>
      </IntroRow>
      <MembershipRow>
        {
          contentBlockContext.subscriptions.data.map((membership, index) => (
            <article className="membership-item" key={index}>
              <h3>{membership.attributes.title}</h3>
              <div className="price">€{membership.attributes.price.toFixed(2).toString().replace(".", ",")} <span className="price-label">per maand</span></div>
              <ul className="features">
                <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
                  {membership.attributes.perksMd}
                </ReactMarkdown>
              </ul>
              <button onClick={() => setGekozenMembership(membership.attributes.title)}>{membership.attributes.buttonLabel}</button>
            </article>
          ))
        }
      </MembershipRow>
      <ContactRow className="contact-row" ref={formRef}>
        <div>
          {
            !formSubmitted && (
              <ReactMarkdown rehypePlugins={[rehypeRaw]} className="rte">
                {contentBlockContext.formTextMd}
              </ReactMarkdown>
            )
          }
          {
            !formSubmitted && (
              <form 
                name="membership"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="membership" />
                <div>
                  <div style={{position: 'relative'}}>
                    <select 
                      name="gekozenMembership"  
                      onChange={handleMembershipChange} 
                      value={chosenMembership}
                    >
                      {
                        contentBlockContext.subscriptions.data.map((membership, index) => (
                          <option value={membership.attributes.title} key={index}>{membership.attributes.title} (€{membership.attributes.price.toFixed(2).toString().replace(".", ",")})</option>
                        ))
                      }
                    </select>
                    <svg className="select-arrow-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.424 14.144"><path d="M868.108,427.449l-12.944-9.712,12.944-9.712,1.2,1.6L858.5,417.737l10.812,8.112Z" transform="translate(-408.025 869.309) rotate(-90)" fill="#691e0f"/></svg>
                  </div>
                </div>
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
                <p>
                  <label htmlFor="geboortedatum">Geboortedatum:</label>
                  <input type="date" name="geboortedatum" placeholder="Geboortedatum" id="geboortedatum" />
                </p>
                <p className="address-inputs">
                  <input type="text" name="postcode" placeholder="Postcode" />
                  <input type="text" name="huisnummer" placeholder="Huisnr." />
                  <input type="text" name="toevoegingen" placeholder="Toev." />
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