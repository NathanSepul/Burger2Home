import React from 'react' 

import Banniere from '../composant/home/Banniere.js';
import Area1 from '../composant/home/Area1.js';
import Area2 from '../composant/home/Area2.js';

import formidable from '../picture/formidable.jpeg';
import it from '../picture/it.jpg';
import fondant from '../picture/fondant.jpg';
import main from '../picture/a_la_main.jpg';
import minute from '../picture/preparer_minute.jpg';
import jour from '../picture/frais_du_jour.jpg';

import { useTranslation } from 'react-i18next';

// import './Home.css'

const Home = () => {

  const {t} = useTranslation();

  return (<main>
            <Banniere/>
            <Area2 titre={t('accueil.area2.titre')} img1={formidable} img2={it} img3={fondant} txt1={t('accueil.area2.txt1')} txt2={t('accueil.area2.txt2')} txt3={t('accueil.area2.txt3')} name="lesStars"/>
            <Area1/>
            <Area2 titre={t('accueil.area3.titre')} img1={minute} img2={jour} img3={main} txt1={t('accueil.area3.txt1')}  txt2={t('accueil.area3.txt2')}  txt3={t('accueil.area3.txt3')}   name="enPratique"/>
          </main>
          );
};



export default Home