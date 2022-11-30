import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Banner.css";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <Carousel className='Banniere'
              autoPlay
              interval={4000}
              transitionTime={600}
              infiniteLoop
              showStatus={false}
              showThumbs={false}>

      <div className='first_slide'>
        <div>
          <p> {t('accueil.carousel.txtSlide1')}</p>
        </div>

        <div className="banToConcept">
            <Link to="/concept" className="linkConcept"> 
              <button type="button" className="buttonConcept">
                {t('accueil.carousel.buttonSlide1')}
              </button>
            </Link>
        </div>
      </div>

      <div className='second_slide'>
        <div id='slide2_line1'><p>Burger2Home</p></div>

        <div id='slide2_line2'>
          <div className='line1'></div>
          <div className='line2'>
            <div className="lineRight"></div> <span className='lineCenter'><p>♦︎</p></span> <div className="lineLeft"></div>
          </div>
        </div>

        <div id='slide2_line3'><p>{t('accueil.carousel.headerSlide3')}</p></div>

        <div id='slide2_line4'>
          <div className='line3'>
            <div className="lineRight"></div> <span className='lineCenter'><p>♦︎</p></span> <div className="lineLeft"></div>
          </div>
          <div className='line4'></div>
        </div>

        <div id='slide2_line5'><p>{t('accueil.carousel.heure')}</p></div>
      </div>

      <div className='third_slide'>
        <div className="slide3Left">
          <div id="left1">
            <img src={"/picture/logoBurger.jpg"} id="logoCarousel" alt="logoCarousel" />
            <p id="txtCarousel1" >BURGER2HOME</p>
          </div>

          <div id="left2">
            <div><p>Big Promo</p></div>
          </div>

          <div id="left3">
            <img src={"/picture/banner/arrow.png"} id="arrow" alt="arrow" />
            <div>
              <Link to="/carte" > {t('accueil.carousel.txtPromo1')}</Link>
            </div>
          </div>
        </div>

        <div className="slide3Right">
          <img src={"/picture/banner/ban3.jpg"} id="img3" alt="img burger poulet" />
        </div>
      </div>

    </Carousel>
  );
}

export default Banner;