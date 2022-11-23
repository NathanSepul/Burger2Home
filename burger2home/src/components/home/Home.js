import React from 'react'
import Banniere from './Banner.js';
import Area1 from './Area1.js';
import Area2 from './Area2.js';
import { useTranslation } from 'react-i18next';

const Home = () => {

  const { t } = useTranslation();

  return (
    <main>
      <title>Burger2Home</title>
      <Banniere />
      <Area2 titre={t('accueil.area2.titre')} img1={"/picture/formidable.jpeg"} img2={"/picture/it.jpg"} img3={"/picture/fondant.jpg"} txt1={t('accueil.area2.txt1')} txt2={t('accueil.area2.txt2')} txt3={t('accueil.area2.txt3')} name="lesStars" />
      <Area1 />
      <Area2 titre={t('accueil.area3.titre')} img1={"/picture/preparer_minute.jpg"} img2={"/picture/frais_du_jour.jpg"} img3={"/picture/a_la_main.jpg"} txt1={t('accueil.area3.txt1')} txt2={t('accueil.area3.txt2')} txt3={t('accueil.area3.txt3')} name="enPratique" />
    </main>
  );
};



export default Home