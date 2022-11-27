import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

import styled from 'styled-components';

const LogoHolder = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  width: 100vw;
  background: var(--pa-white);
  z-index: 100000;

  .logo-left-holder,
  .logo-right-holder {
    position: relative;
  }

  .logo-left-holder {
    min-width: 8.5rem;
    height: calc(5rem + .4rem);
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    z-index:100000;
    margin-top: .1rem;

    @media (max-width: 64em) {
      min-width: 6.5rem;
      height: 4rem;
    }

    & img {
      height: 3rem;
      width: 6.4rem;

      @media (max-width: 64em) {
        height: 2.5rem !important;
        width: 5.2rem !important;
      }
    }

    a,
    span {
      display: flex;
      margin-bottom: 4px;

      @media (max-width: 64em) {
        margin-bottom: 3px;
      }
    }
  }

  .logo-right-holder {
    min-width: 5rem;
    height: calc(5rem + .4rem);
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    z-index:100000;
    margin-top: .1rem;

    @media (max-width: 64em) {
      min-width: 3.5rem;
      height: 4rem;
    }

    & img {
      height: 3rem;
      width: 2.4rem;
      
      @media (max-width: 64em) {
        height: 2.5rem !important;
        width: 1.9rem !important;
      }
    }

    & a {
      display: flex;
      margin-bottom: 4px;

      @media (max-width: 64em) {
        margin-bottom: 3px;
      }
    }
  }
`

const NavbarContainer = styled.div`
  font-family: "Helvetica condensed bold", "Helvetica Neue",Arial,"Noto Sans",sans-serif;

  .pa-logo-border {
    width: 100%;
    border-bottom: 4px solid var(--pa-red);
    transform: translateX(0px);
    background-color: var(--pa-white);

    @media (max-width: 64em) {
      border-bottom-width: 3px;
    }
  }

  .pa-navigation {
    margin: 6rem 5rem 0 9.5rem;
    padding: 1rem 0;

    display: flex;
    justify-content: flex-end;

    @media (max-width: 64em) {
      margin: 5rem 3.5rem 0 6.5rem;
    }

    .pa-mobile-nav-button {
      border: none;
      background: transparent;
      cursor: pointer;
      padding: 0;
      display: none;
      height: 3rem;

      svg {
        fill: var(--pa-maroon);
        width: 3rem;
      }

      @media (max-width: 64em) {
        display: block;
      }
    }

    .pa-navigation-list {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 2rem;

      @media (max-width: 64em) {
        display: none;
      }
      
      a {
        color: var(--pa-maroon);
        text-decoration: none;
        text-transform: uppercase;
        font-size: clamp(1.6rem, 1vw + 1rem, 2.4rem);
        letter-spacing: -.1rem;

        &:hover {
          text-decoration: underline;
        }

        &.active--exact  {
          text-decoration: underline;
        }
      }
    }
  }
`;

const MobileNavContainer = styled.div`
  position: relative;
  top: 0;
  right: 0;
  width: 100%;
  margin-right: 2rem;
  background-color: var(--pa-white);
  padding: 2rem 0;

  z-index: 1000;

  & .pa-navigation-list-mobile {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    li {
      line-height: 1;
    }

    & li a {
      font-size: 3rem;
      letter-spacing: -.1rem;
      text-decoration: none;
      color: var(--pa-maroon);
      
      &.active--exact  {
        text-decoration: underline;
      }
    }
  }

  & .pa-navigation-mobile-background {
    position: absolute;
    background: white;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
  }

  @media (min-width: 64em) {
    display: none;
  }
`

export default function Navbar({ navItems }) {
  const [navigationPanelVisible, setNavigationPanelVisible] = useState(false);

  return (
    <NavbarContainer>
      <LogoHolder>
        <div className="logo-left-holder">
          <Link href="/" aria-label="Home">
            <a>
              <Image 
                layout="intrinsic" 
                width={64}
                height={30}
                src='/images/PLAN_A_Logo_1_onderdeel_1.svg' 
                alt="" 
              />
            </a>
          </Link>
        </div>
        <div className="pa-logo-border"></div>
        <div className="logo-right-holder">
          <Link href="/" aria-label="Home">
            <a>
              <Image 
                layout="intrinsic" 
                width={24}
                height={30}
                src='/images/PLAN_A_Logo_1_onderdeel_3.svg' 
                alt="" 
              />
            </a>
          </Link>
        </div>
      </LogoHolder>

      <nav className="pa-navigation">
        {
          navigationPanelVisible && (
            <MobileNavContainer>
              <ul className="pa-navigation-list-mobile">
                {
                  navItems.map((item, idx) => (
                    <li key={idx}><Link href={item.slug}>{item.title}</Link></li>
                  ))
                }
              </ul>
            </MobileNavContainer>
          )
        }
        <ul className="pa-navigation-list">
          {
            navItems.map((item, idx) => (
              <li key={idx}><Link href={item.slug}>{item.title}</Link></li>
            ))
          }
        </ul>
        <button className="pa-mobile-nav-button" onClick={() => setNavigationPanelVisible(!navigationPanelVisible)} aria-label="Open menu">
          <svg viewBox="0 0 341.333 341.333">
            <rect y="277.333" width="341.333" height="42.667" />
            <rect y="149.333" width="341.333" height="42.667" />
            <rect y="21.333" width="341.333" height="42.667" />
          </svg>
        </button>
      </nav>
    </NavbarContainer >
  )
}