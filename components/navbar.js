import Image from "next/image"
import Link from "next/link"
import { useState } from "react";

import styled from 'styled-components';

const LogoHolder = styled.div`
`

const NavbarContainer = styled.div`
`;

const MobileNavContainer = styled.div`
`

export default function Navbar({ navItems }) {
  const [navigationPanelVisible, setNavigationPanelVisible] = useState(false);

  return (
    <NavbarContainer className="navbar-container">
      <LogoHolder className="logo-holder">
        <div className="logo-left-holder">
          <Link href="/">
            <a aria-label="Home">
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
          <Link href="/">
            <a aria-label="Home">
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
            <MobileNavContainer className="mobile-nav-container">
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