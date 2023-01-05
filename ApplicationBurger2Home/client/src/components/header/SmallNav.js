import React, { useEffect } from 'react';
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
import { IconButton } from "@mui/material";

import { useSelector, useDispatch } from 'react-redux';
import { setClose } from '../../redux/smallMenuSlice.js';

import Login from "../login/Login.js";
import ToBasket from "./ToBasket.js";
import "./SmallNav.css";

const SmallNav = ({ toggleDrawer }) => {
  const user = useSelector(state => state.user);
  const isOpen = useSelector(state => state.isOpen.value)
  const dispatch = useDispatch()
  const { t } = useTranslation();

  useEffect(() => {
    const changeWidth = () => {
      if (window.innerWidth > 767) {
        dispatch(setClose())
      }
    }

    window.addEventListener('resize', changeWidth)

    return () => {
      // window.removeEventListener('resize', changeWidth)
    }
  }, [dispatch])

  const list = () => (
    <Box
      sx={{ width: "auto" }}
      role="menu"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List className="linksSmallHeader">
        <ListItem className="linkSmallHeader" > <Link to="/" > {t('navigation.accueil')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader"> <Link to="/carte" > {t('navigation.carte')} </Link> </ListItem>
        <Divider />
        <ListItem className="linkSmallHeader"> <Link to="/concept" > {t('navigation.concept')} </Link> </ListItem>
        <Divider />

        {(user.role === "marketing") &&
          (<>
            <ListItem className="linkSmallHeader"> <Link to="/admin/marketing" > {t('navigation.marketing')} </Link> </ListItem>
            <Divider />
          </>
          )}

        {(user.role === "admin") && (<>
          <ListItem className="linkSmallHeader"> <Link to="/admin/droits"  > {t('navigation.droit')} </Link> </ListItem>
          <Divider />
          <ListItem className="linkSmallHeader"> <Link to="/admin/products" > {t('navigation.produits')} </Link></ListItem>
          <Divider />
          <ListItem className="linkSmallHeader"> <Link to="/admin/ingredients" > {t('navigation.allergenes')} </Link></ListItem>
          <Divider />
          <ListItem className="linkSmallHeader"> <Link to="/admin/allergens" > {t('navigation.ingredients')} </Link></ListItem>
          <Divider />
        </>)}

        {(user.role === "employee")} && (<>
          <ListItem className="linkSmallHeader"> <Link to="/admin/stocks" > {t('navigation.stock')} </Link> </ListItem>
          <Divider />
        </>)

      </List>
    </Box>
  );

  return (
    <span>
      <React.Fragment key="top">

        <Login toggleDrawer={toggleDrawer} isSmall={true} />

        <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
          <ToBasket />
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