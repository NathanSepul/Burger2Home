import React, {useState} from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import Drink from './Drink.js';
import Burger from "./Burger.js";
import SideBurger from './SideBurger.js';
import "./Card.css";

function TabPanel(props) {
    const {children, value, index} = props;
   

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`menu-${index}`}
            aria-labelledby={`menu-${index}`}
        >
            {value === index && (
                <Box sx={{ p: "10px" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const Card = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <main className="carte">
            <title>Burger2Home | La Carte</title>
            {/* <h1>La Carte</h1> */}
           
           
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 2, borderColor: 'divider', pt:"10px"}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label={t('carte.burgers')}/>
                        <Tab label={t('carte.accompagnements')}/>
                        <Tab label={t('carte.boissons')}/>
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                   <Burger/>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <SideBurger/>
                </TabPanel>

                <TabPanel value={value} index={2}>
                   <Drink/>
                </TabPanel>
            </Box>
        </main>

    );
}

export default Card;
