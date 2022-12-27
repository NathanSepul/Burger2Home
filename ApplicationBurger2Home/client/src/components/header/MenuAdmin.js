import React from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import "./MenuAdmin.css";

const MenuAdmin = ({closeMenu}) => {
    const { t } = useTranslation();

    return (
        <li>
            <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                        <a role="button" {...bindTrigger(popupState)} className="linkMenu"> Administration</a>
                        <Menu {...bindMenu(popupState)}>
                            <MenuItem onClick={popupState.close} className="linkAdmin"><Link to="/admin/stocks" onClick={closeMenu} > {t('navigation.stock')} </Link></MenuItem>
                            <MenuItem onClick={popupState.close} className="linkAdmin"><Link to="/admin/droits" onClick={closeMenu} > {t('navigation.droit')} </Link> </MenuItem>
                            <MenuItem onClick={popupState.close} className="linkAdmin"><Link to="/admin/products" onClick={closeMenu} > {t('navigation.produits')} </Link></MenuItem>
                            <MenuItem onClick={popupState.close} className="linkAdmin"><Link to="/admin/ingredients" onClick={closeMenu} > {t('navigation.ingredients')} </Link></MenuItem>
                            <MenuItem onClick={popupState.close} className="linkAdmin"><Link to="/admin/allergens" onClick={closeMenu} > {t('navigation.allergenes')} </Link></MenuItem>

                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        </li>

    )
}

export default MenuAdmin