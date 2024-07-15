import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

import '../font awesome/css/fontawesome.css';
import '../font awesome/css/solid.css';

export default function BasicMenu({ anchorEl,setAnchorEl,navTabs,tabIdx,setTabIdx }) {
    
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        const navBarMenu = event.currentTarget.querySelector("i");
        navBarMenu.classList.add("fa-shake");
        const t = setTimeout(() => {
            navBarMenu.classList.remove("fa-shake");
            clearTimeout(t);
        },500);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display:{ xs: 'block',sm: 'none'},margin:"20px" }}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ 
                    minWidth:"40px",
                    height:"35px",
                    bgcolor:"#ddd",
                    color:"black",
                    border:"solid black 2.5px",
                    boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    '&:hover': {
                                    bgcolor:"lightgrey"
                                }
                    }}
            >
                <i className = "fa-solid fa-bars fa-xl"></i>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                                    'aria-labelledby': 'basic-button'
                                }}
                sx={{ ul:{padding:0} }}
            >
                {
                    navTabs.map((name,idx) => <Box key={idx} sx={{ "& .MuiMenuItem-root+.MuiDivider-root" : {m:0} }}>
                                                    <MenuItem
                                                        component={Link}
                                                        to={name==="Home" ? "" : name.toLowerCase()}
                                                        onClick={() => {
                                                                        handleClose();
                                                                        setTabIdx(idx);
                                                                }}
                                                        sx={
                                                            idx === tabIdx ?
                                                                {
                                                                bgcolor:"#334593",
                                                                color:"white",
                                                                fontWeight: "bold",
                                                                cursor:"default",
                                                                pointerEvents:"none"
                                                                } :
                                                                {
                                                                bgcolor:"#b3bce5",
                                                                "&:hover": {
                                                                            bgcolor:"#808ecc",
                                                                            color:"white"
                                                                            }
                                                                }
                                                            }
                                                    >
                                                        {name}
                                                    </MenuItem>
                                                    {idx !== navTabs.length-1 && <Divider />}
                                                </Box>
                    )
                }
            </Menu>
        </Box>
    );
}
