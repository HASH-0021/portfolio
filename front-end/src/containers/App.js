import React from 'react';
import { Outlet,NavLink } from 'react-router-dom';
import myPortfolio from '../assets/my Portfolio logo.png';
import './App.css';

const App = () => {
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

  const [navMenu,setNavMenu] = React.useState(null);
  const [projectView,setProjectView] = React.useState(null);
  const [infoBox,setInfoBox] = React.useState(null);

  const navBarClick = () => {
    if (navMenu) {
      setNavMenu(null);
    } else {
      setNavMenu(navSection);
    }
  }

  React.useEffect(() => {
    let appBody = document.getElementById("main-section");
    if (infoBox || projectView) {
      appBody.classList.add("content-blocked");
    }else {
      appBody.classList.remove("content-blocked");
    }
  },[infoBox, projectView])

  return (
    <div id = "app-body">
      {infoBox}
      {projectView}
      <div id = "main-section">    
        <header>
          <nav id = "header-nav">
            {
              window.innerWidth > 768 ?
                navSection :
                <span id = "header-nav-menu">
                  <div id = "header-nav-icon" onClick = {navBarClick}></div>
                  {navMenu}
                </span>
            }
          </nav>
          <div id = "logo-container">
            <img id = "logo" src = {myPortfolio} alt = "my Portfolio logo" />
          </div>
        </header>
        <div id = "contents">
          <Outlet context = {{projectView, setProjectView, setInfoBox}} />
        </div>
        <footer>
          <p>Created by Sri Harsha. :)</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
