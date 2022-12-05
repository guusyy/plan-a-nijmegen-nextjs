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
  margin-bottom: 1rem;
  max-width: 120rem;
`

const MembershipRow = styled.div`
  display: grid;
  max-width: 100%;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4rem;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  & .membership-item {

    border-top: 1px solid var(--pa-maroon);
    padding: 1rem 0rem;
    opacity: 0;

    & h3 {
      font-size: 3rem;
    }

    ul {
      padding-left: 0;
    }
  }

  & .price {
    margin: 1rem 0;
    font-size: 2.2rem;

    & .price-label {
      font-size: 1.4rem;
    }
  }

  & .features {
    margin: 2rem 0;
    list-style-type: none;

    & li {
      padding-left: 2rem;
      margin: .5rem 0;
      font-size: 2.2rem;
      
      &:before {
        content: "–";
        position: absolute;
        margin-left: -2rem;
      }
    }
  }

  & button {
    border: 1px solid var(--pa-maroon);
    background: var(--pa-white);
    font-size: 2rem;
    text-transform: uppercase;
    padding: 1rem;
    color: var(--pa-maroon);
    cursor: pointer;
    transition: all .1s ease;
    margin: 2rem 0;

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
  gap: 4rem;
  margin-bottom: 10rem;
  opacity: 0;

  @media (max-width: 64em) {
    grid-template-columns: minmax(10px, 1fr);
    grid-template-row: repeat(2, 1fr);
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: .5rem;
    margin: 4rem 0;

    .fullname {
      display: flex;
      gap: 1rem;

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
      right: 1rem;
      top: 50%;
      transform: translate(0, -50%);
      width: 1.6rem;
      pointer-events: none;
    }

    & select, input, textarea {
      font-size: 2rem;
      width: 100%;
      height: 5rem;      
      border: none;
      border-bottom: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      color: var(--pa-maroon);
      padding: .5rem 1rem;

      @media (max-width: 64em) {
        height: 6rem;
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
      height: 10rem;
      resize: none;
    }

    select {
      display: flex;
    }

    button {
      border: 1px solid var(--pa-maroon);
      background: var(--pa-white);
      font-size: 2rem;
      text-transform: uppercase;
      padding: 1rem;
      color: var(--pa-maroon);
      cursor: pointer;
      transition: all .1s ease;
      margin: 2rem 0;
      display: flex;
      gap: 2rem;
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
    gap: 1rem;

    @media (max-width: 48em) {
      flex-direction: column;
    }
  }

  .succes-message {

    width: 100%;
    min-height: 20rem;
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

  const [chosenMembership, setChosenMembership] = useState(contentBlockContext.subscriptions.data[0].attributes.title);

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
    
    fetch("/api/hello", {
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
                  <input type="date" name="geboortedatum" placeholder="Geboortedatum" />
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