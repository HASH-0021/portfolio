import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs({ navTabs,tabIdx,setTabIdx }) {

    const handleChange = (event, newValue) => {
        setTabIdx(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: "100%", display:{xs:'none',sm:'block'} }}>
            <AppBar position="static">
                <Tabs
                    value={tabIdx}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs"
                >
                    {
                        navTabs.map((name,idx) => <Tab
                                                        key={idx}
                                                        label={name}
                                                        component={Link}
                                                        to={name==="Home" ? "" : name.toLowerCase()}
                                                        sx={
                                                            idx === tabIdx ?                                          
                                                                {
                                                                    padding:0,
                                                                    textTransform:"capitalize",
                                                                    fontWeight: "bold",
                                                                    bgcolor:"#334593",
                                                                    color:"white",
                                                                    border:"solid black 1px",
                                                                    cursor:"default",
                                                                    pointerEvents:"none",
                                                                    opacity: 1
                                                                } :
                                                                {
                                                                    padding:0,
                                                                    textTransform:"capitalize",
                                                                    bgcolor:"#b3bce5",
                                                                    color:"black",
                                                                    border:"solid black 1px",
                                                                    opacity: 1,
                                                                    "&:hover": {
                                                                                bgcolor:"#808ecc",
                                                                                color:"white"
                                                                                }
                                                                }
                                                            }
                                                        {...a11yProps({idx})}
                                                    />
                        )
                    }
                </Tabs>
            </AppBar>
        </Box>
    );
}
