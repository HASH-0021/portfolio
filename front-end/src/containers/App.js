import React from 'react';
import { Outlet,NavLink } from 'react-router-dom';
import myPortfolio from '../assets/my Portfolio logo.png';
import './App.css';
import '../font awesome/css/fontawesome.css';
import '../font awesome/css/regular.css';
import '../font awesome/css/solid.css';

const App = () => {
  const [navMenu,setNavMenu] = React.useState(null);
  const [projectView,setProjectView] = React.useState(null);
  const [infoBox,setInfoBox] = React.useState(null);

  const navBarClick = async (event) => {
    const navBarMenu = event.currentTarget.querySelector("#header-nav-icon");
    navBarMenu.classList.add("fa-shake");
    await new Promise((resolve) => {
                                      if (navMenu) {
                                        setNavMenu(null);
                                      } else {
                                        setNavMenu(navSection);
                                      }
                                      setTimeout(resolve, 500);
                                    });
    navBarMenu.classList.remove("fa-shake");
  }

  const navSection =  <div id = "header-nav-list">
                        <NavLink to = "" className = {({isActive}) => isActive ? "nav-list selected" : "nav-list"}>
                          <div>Home</div>
                        </NavLink>
                        <NavLink to = "works" className = {({isActive}) => isActive ? "nav-list selected" : "nav-list"}>
                          <div>Works</div>
                        </NavLink>
                        <NavLink to = "achievements" className = {({isActive}) => isActive ? "nav-list selected" : "nav-list"}>
                          <div>Achievements</div>
                        </NavLink>
                        <NavLink to = "contact" className = {({isActive}) => isActive ? "nav-list selected" : "nav-list"}>
                          <div>Contact</div>
                        </NavLink>
                      </div>;

  const smileyToEyeHearts = (event) => {
    const emoji = event.currentTarget;
    emoji.classList.replace("fa-face-smile","fa-face-grin-hearts");
  }

  const eyeHeartsToSquint = (event) => {
    const emoji = event.currentTarget;
    emoji.classList.replace("fa-face-grin-hearts","fa-face-laugh-squint");
  }

  const squintToEyeHearts = (event) => {
    const emoji = event.currentTarget;
    emoji.classList.replace("fa-face-laugh-squint","fa-face-grin-hearts");
    showHearts(event);
  }

  const showHearts = async (event) => {
    const footerNote = event.currentTarget.parentElement;
    const [heart1,heart2] = footerNote.querySelectorAll(".heart");
    await new Promise(resolve => 
                                  {
                                    heart2.classList.add("heart-2-start");
                                    setTimeout(resolve, 750);
                                  });
    await new Promise(resolve => 
                                  {
                                    heart2.classList.replace("heart-2-start","heart-2-end");
                                    setTimeout(resolve, 750);
                                  });
    await new Promise(resolve => 
                                  {
                                    heart1.classList.add("heart-1-start");
                                    setTimeout(resolve, 750);
                                  });
    await new Promise(resolve => 
                                  {
                                    heart1.classList.replace("heart-1-start","heart-1-end");
                                    setTimeout(resolve, 750);
                                  });
    heart1.classList.remove("heart-1-end");
    heart2.classList.remove("heart-2-end");
  }

  const eyeHeartsToSmiley = (event) => {
    const emoji = event.currentTarget;
    emoji.classList.replace("fa-face-grin-hearts","fa-face-smile");
  }

  React.useEffect(() => {
    let appBody = document.body;
    if (infoBox || projectView) {
      appBody.classList.add("overflow-blocked");
    }else {
      appBody.classList.remove("overflow-blocked");
    }
  },[infoBox, projectView]);

  return (
    <div id = "app-body">
      {infoBox}
      {projectView}
      <div id = "main-section">    
        <header>
          <nav id = "header-nav">
            <div id = "header-nav-menu-desktop">
              {navSection}
            </div>
            <span id = "header-nav-menu-mobile" onClick = {navBarClick}>
              <div id = "header-nav-icon"><i className = "fa-solid fa-bars fa-xl"></i></div>
              {navMenu}
            </span>
          </nav>
        </header>
        <div id = "contents">
          <div id = "logo-container">
            <img id = "logo" src = {myPortfolio} alt = "my Portfolio logo" />
          </div>
          <Outlet context = {{projectView, setProjectView, setInfoBox}} />
        </div>
        <footer>
          <p>
            Created by Sri Harsha.
            <i className = "fa-solid fa-heart fa-2xs heart"></i>
            <i 
              className = "fa-regular fa-face-smile emoji" 
              onMouseOver = {smileyToEyeHearts} 
              onMouseDown = {eyeHeartsToSquint} 
              onMouseUp = {squintToEyeHearts} 
              onMouseOut = {eyeHeartsToSmiley}
            ></i>
            <i className = "fa-solid fa-heart fa-xs heart"></i>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
