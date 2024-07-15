import React from 'react';
import { Outlet } from 'react-router-dom';

import FullWidthTabs from '../Helpers/FullWidthTabs';
import BasicMenu from '../Helpers/BasicMenu';
import Copyright from '../Helpers/Copyright';

import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import './App.css';

const App = () => {

    // Related to BasicMenu Component
    const [anchorEl, setAnchorEl] = React.useState(null);

    const navTabs = ["Home", "Works", "Achievements", "Contact"];
    let pathname = document.location.pathname.slice(1);
    if (pathname.length) {
        pathname = pathname[0].toUpperCase()+pathname.slice(1);
    }
    const [tabIdx,setTabIdx] = React.useState(pathname.length ? navTabs.indexOf(pathname) : 0);
    const [showScrollToTop,setShowScrollToTop] = React.useState(document.documentElement.scrollTop > 250 ? true : false);

    window.onscroll = () => {
        setShowScrollToTop(document.documentElement.scrollTop > 250 ? true : false);
    }

    window.onresize = () => {
        if (window.outerWidth >= 600) {
            setAnchorEl(null);
        }
    }

    const scrollToTop = () => {
        let intervalRef;
        intervalRef = setInterval(() => {
            if (document.documentElement.scrollTop > 0) {
                document.documentElement.scrollTop -= 15;
            }else {
                clearInterval(intervalRef);
            }
            },5);
    }

    return (
        <main>
            <header>
                <FullWidthTabs navTabs = {navTabs} tabIdx = {tabIdx} setTabIdx = {setTabIdx} />
                <BasicMenu anchorEl = {anchorEl} setAnchorEl = {setAnchorEl} navTabs = {navTabs} tabIdx = {tabIdx} setTabIdx = {setTabIdx} />
            </header>
            <Outlet context = {{setAnchorEl}} />
            {
                showScrollToTop
                &&
                <Tooltip TransitionComponent={Zoom} placement="left" title="Scroll to top" arrow>
                    <Fab
                        aria-label="scroll to top"
                        sx={{
                                position:"fixed",
                                right:12,
                                bottom:16,
                                bgcolor:"#334593",
                                color:"white",
                                transition:"background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,scale 250ms",
                                "&:hover":{bgcolor:"#3d53b0"},
                                "&:active": {scale: "0.95"}
                            }}
                        onClick={scrollToTop}
                    >
                        <ArrowUpwardIcon />
                    </Fab>
                </Tooltip>
            }
            <footer>
                <Copyright />
            </footer>
        </main>
    );
}

export default App;
