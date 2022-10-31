import React, {useEffect, useState} from 'react';
import Informations from '../composant/compte/Informations.js';
import Commandes from '../composant/compte/Commandes.js';

import InfoIcon from '@mui/icons-material/Info';
import HistoryIcon from '@mui/icons-material/History';

import "./Compte.css";


function Compte() {

    const [selectedInformations,setSelectedInformations] = useState("Active");
    const [selectedCommandes,setSelectedCommandes] = useState("InActive");

    const SwitchToInformation= () => {
        setSelectedInformations("Active");
        setSelectedCommandes("InActive");
    }

    const SwitchToCommande= () => {
        setSelectedInformations("InActive");
        setSelectedCommandes("Active");
    }



    return (
       <main className='Compte'>
            <div id="title"><h1>Mon Compte</h1></div>
        
            <section className='buttonComtpte'>
                <div className='mesInformations' id={selectedInformations} onClick={SwitchToInformation}>
                   <span> <InfoIcon/> </span>  <p className='txt'>Mes Informations</p>
                </div>

                <div className='mesCommandes' id={selectedCommandes} onClick={SwitchToCommande}>
                    <span> <HistoryIcon/> </span>  <p className='txt'>Mes Commandes</p>
                </div>
            </section>

            <section id="zoneModulable">

                {(selectedInformations === "Active") && (
                    <Informations/>
                )}

                {(selectedCommandes === "Active") && (
                     <Commandes />
                )}  

            </section>

       </main>
    );
}

export default Compte;