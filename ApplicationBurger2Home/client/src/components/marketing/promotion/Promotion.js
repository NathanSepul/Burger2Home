import React, {useState, useEffect}from "react"
import axios from "axios";
import TabPromo from "./tabPromo/TabPromo.js";
import FormPromo from "./FormPromo";
import { useTranslation } from 'react-i18next';

import "./Promotion.css"

const Promotion = () =>{
    const { t } = useTranslation();
    const [promos, setPromos] = useState([]);
    const [promoSelected, setPromoSelected] = useState([]);
    const [reloadList,setReloadList] = useState(false)
    
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsLoading(true);
        const request1 = axios.get(`/promotions`)
        const request2 = axios.get(`/promotions/translations?language=EN`)
        const request3 = axios.get(`/promotions/translations?language=FR`)

        axios.all([request1, request2, request3])
        .then(
            axios.spread((...responses) => {
                let promoGenTemp = responses[0].data.sort((a, b) => (a.id > b.id ? 1 : -1));
                let promoTemEn = responses[1].data.sort((a, b) => (a.promotionId > b.promotionId ? 1 : -1));
                let promoTemFr = responses[2].data.sort((a, b) => (a.promotionId > b.promotionId ? 1 : -1));

                let promoFusion = [];
                for(let i = 0; i< promoGenTemp.length ; i++){
                    promoFusion.push({ general: promoGenTemp[i], tradEn: promoTemEn[i], tradFr: promoTemFr[i] })
                }

                setReloadList(false);
                setPromos(promoFusion);
            })
        )
        .catch(e => {
            console.error(e);
        });
        
    }, [reloadList])

    return (
        <main className='PromoAdmin'>
            <title>Burger2Home | Promotions</title>
            <div className="title"><h1>Gestion des promotions</h1></div>

            <div className="promoContent">
                <div className="promoList">
                    <TabPromo promos={promos} setPromoSelected={setPromoSelected}/>
                </div>
                <div className="promoForm">
                    <FormPromo pS={promoSelected} setPS={setPromoSelected} setReloadList={setReloadList}/>
                </div>
            </div>



        </main>
    );
}

export default Promotion