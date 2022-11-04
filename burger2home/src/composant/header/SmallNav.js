import React, {useEffect} from 'react';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import MenuIcon from '@mui/icons-material/Menu';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { IconButton, Badge } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import "./SmallNav.css";

const SmallNav = ({toggleDrawer,isOpen,setIsOpen}) => {
  const { t } = useTranslation();

  useEffect(() => {
    const changeWidth = () => {

      if (window.innerWidth > 767) {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      window.removeEventListener('resize', changeWidth)
    }
  })

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="menu"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="linksSmallHeader">
        <ListItem className="linkSmallHeader" id="navSmallHeader1"> <Link to="/" > {t('navigation.accueil')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader" id="navSmallHeader2"> <Link to="/carte" > {t('navigation.carte')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader" id="navSmallHeader3"> <Link to="/concept" > {t('navigation.concept')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader" id="navSmallHeader4"> <Link to="/marketing" > {t('navigation.marketing')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader" id="navSmallHeader5"> <Link to="/stocks" > {t('navigation.stock')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader" id="navSmallHeader6"> <Link to="/droits"  > {t('navigation.droit')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader" id="navSmallHeader7"> <Link to="/burgers" > {t('navigation.burger')} </Link></ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <span>
      <React.Fragment key="top">
        <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
          <Link to="/compte">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </IconButton>

        <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
          <Link to="/panier" className="monCompte">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon fontSize="large" />
            </Badge>
          </Link>
        </IconButton>

        <Button onClick={toggleDrawer(false)} >
          {(!isOpen) && (
            <MenuIcon className="icons" fontSize="large" />
          )}

          {(isOpen) && (
            <CloseIcon className="icons" fontSize="large" />
          )}

        </Button>
        <Drawer
          anchor="top"
          open={isOpen}
          onClose={toggleDrawer(false)}>

          {list()}

        </Drawer>
      </React.Fragment>

    </span>
  );
}
export default SmallNav