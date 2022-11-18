import React from 'react';


import './Area2.css';

const Area2 = ({ titre, img1, img2, img3, txt1, txt2, txt3, name }) => {
    return (
        <section className="Area" id={name}>
            <h2>{titre}</h2>
            <article>

                <div className="img1" >
                    <img src={img1} alt={txt1} />
                    <p>{txt1}</p>
                </div>

                <div className="img1" >
                    <img src={img2} alt={txt2} />
                    <p>{txt2}</p>
                </div>

                <div className="img1">
                    <img src={img3} alt={txt3} />
                    <p>{txt3}</p>
                </div>
            </article>
        </section>
    );
};

export default Area2