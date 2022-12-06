import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';

import Informations from './informationsAccount/Informations.js';
import Commandes from './historyOrders/Orders.js';
import "./Account.css";


function Account() {
    const { t } = useTranslation();

    const [selectedInformations, setSelectedInformations] = useState("Active");
    const [selectedCommandes, setSelectedCommandes] = useState("InActive");

    const SwitchToInformation = () => {
        setSelectedInformations("Active");
        setSelectedCommandes("InActive");
    }

    const SwitchToCommande = () => {
        setSelectedInformations("InActive");
        setSelectedCommandes("Active");
    }



    return (
        <main className='Compte'>
            <title>Burger2Home | {t("compte.titre")}</title>
            <div id="title"><h1>{t("compte.titre")}</h1></div>
         
            <section className='buttonComtpte'>
                <div className='mesInformations' id={selectedInformations} onClick={SwitchToInformation}>
                    <span> <InfoIcon /> </span>  <p className='txt'>{t("compte.informations")}</p>
                </div>

                <div className='mesCommandes' id={selectedCommandes} onClick={SwitchToCommande}>
                    <span> <HistoryIcon /> </span>  <p className='txt'>{t("compte.commandes")}</p>
                </div>
            </section>

            <section id="zoneModulable">

                {(selectedInformations === "Active") && (
                    <Informations />
                )}

                {(selectedCommandes === "Active") && (
                    <Commandes />
                )}

            </section>

        </main>
    );
}

export default Account;
