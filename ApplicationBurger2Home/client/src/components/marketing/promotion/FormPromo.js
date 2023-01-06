import React, { startTransition, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../../../redux/snackBarSlice.js';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'dayjs/locale/fr';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ProductsTransfert from "./ProductsTransfert.js";

const FormPromo = ({ pS, setPS, setReloadList }) => {

    const initialState = { id: null, amount: null, creationDate: "", startDate: "", endDate: "", products: [] };
    const initialStateEn = { id: null, description: "", promotionId: null, language: { id: 1 } };
    const initialStateFr = { id: null, description: "", promotionId: null, language: { id: 2 } };

    const [promoSelected, setPromoSelected] = useState(initialState);
    const [promoFr, setPromoFr] = useState(initialStateFr);
    const [promoEn, setPromoEn] = useState(initialStateEn);
    const [dates, setDates] = useState({ startDate: null, endDate: null })
    const [productList, setProductList] = useState([]);

    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language)
    const openSnack = { msg: "", severity: "" }
    const { t } = useTranslation();

    const dispatch = useDispatch()

    useEffect(() => {

        if (pS.length !== 0) {
            setPromoSelected(pS.general)

            setPromoFr(pS.tradFr)
            setPromoEn(pS.tradEn)

            setDates({ startDate: pS.general.startDate, endDate: pS.general.endDate })
        }

        setIsLoading(true)
    }, [pS])

    const cancel = () => {
        setPS([])
        setPromoFr(initialStateFr)
        setPromoEn(initialStateEn)
        setPromoSelected(initialState)
        setDates({ startDate: null, endDate: null })
    }

    const firstToCapitalLetter = (lg, e) => {

        const firstLetter = e.target.value.charAt(0).toUpperCase();
        const restOfString = e.target.value.slice(1);
        const capitalizedString = firstLetter + restOfString;

        if (lg === "fr") {

            setPromoFr({ ...promoFr, description: capitalizedString })
        }
        else {
            setPromoEn({ ...promoEn, description: capitalizedString })
        }
    }

    const validationForm = (e) => {

        if (dates.endDate === null || dates.startDate === null) {
            openSnack.msg = "il faut completer les deux dates";
            openSnack.severity = "warning";
            dispatch(open(openSnack))
        }

        else if (0>=promoSelected.amount || promoSelected.amount>100) {
            openSnack.msg = "La valeur doit être comprise en 0.01 et 100";
            openSnack.severity = "warning";
            dispatch(open(openSnack))
        }
        else {
            let promo = promoSelected;
            promo.creationDate = moment(new Date(), 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
            promo.startDate = moment(new Date(dates.startDate)).format('YYYY-MM-DD HH:mm:ss');
            promo.endDate = moment(new Date(dates.endDate)).format('YYYY-MM-DD HH:mm:ss');
            promo.products = productList;

            setPromoSelected(promo);
            if (promoSelected.id === null) {
                axios.post(`/promotions`, promoSelected)
                    .then(res => {
                        let temp = promoSelected;
                        temp.id = res.data.id;
                        setPromoSelected(temp);

                        let tempEn = promoEn;
                        tempEn.promotionId = res.data.id;
                        setPromoEn(tempEn);

                        let tempFr = promoFr;
                        tempFr.promotionId = res.data.id;
                        setPromoFr(tempFr);

                        return axios.post(`/promotions/translations`, promoEn)
                    })
                    .then(res => {
                        return axios.post(`/promotions/translations`, promoFr)
                    })
                    .then(res => {
                        setReloadList(true)
                    })
                    .catch(e => console.log(e))
            }
            else {
                axios.put(`/promotions`, promoSelected)
                    .then(res => {
                        return axios.put(`/promotions/translations`, promoEn)
                    })
                    .then(res => {
                        return axios.put(`/promotions/translations`, promoFr)
                    })
                    .then(res => {
                        setReloadList(true)
                    })
                    .catch(e => console.log(e))
            }

        }

        e.preventDefault()
    }

    const checkSecondDate = (newValue) =>{

        const date1 = new Date(dates.startDate);
        const date2 = new Date(newValue)

        if(date2<date1){
            setDates({...dates, endDate:null})
        }
        else{
            setDates({...dates, endDate:newValue})
        }
    }

    return (
        <Box
            component='form'
            onSubmit={e => validationForm(e)}
            sx={{
                '& > :not(style)': { m: "auto", width: "100%" },
            }}
        >
            <div className="Name">
                <TextField label="Name"
                    required
                    className="inputName"
                    variant="outlined"
                    value={promoEn.description}
                    onChange={e => firstToCapitalLetter("en", e)}
                    inputProps={{ maxLength: 255 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${promoEn.description.length}/${255}`}
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField label="Nom"
                    required
                    className="inputName"
                    variant="outlined"
                    value={promoFr.description}
                    onChange={e => firstToCapitalLetter("fr", e)}
                    inputProps={{ maxLength: 60 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" >
                                {`${promoFr.description.length}/${255}`}
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
            <div className="promoInfo">
                <TextField label="Valeur"
                    required
                    placeholder='ex: 30'
                    className="price"
                    value={promoSelected.amount || ''}
                    onChange={e => setPromoSelected({ ...promoSelected, amount: e.target.value })}
                    inputProps={{ inputMode: 'decimal', pattern: '^\\d+(\\.\\d{1,2})?$' }}

                    InputProps={{
                        endAdornment: (<InputAdornment position="end" > % </InputAdornment>),
                    }} />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
                    <DateTimePicker
                        required
                        ampm={false}
                        showToolbar
                        // minDate={dayjs('2018-01-01T00:00')}
                        label="Date de début"
                        value={dates.startDate}
                        onChange={newValue => setDates({ ...dates, startDate: newValue })}
                        renderInput={(params) => <TextField {...params} />}
                        componentsProps={{
                            actionBar: {
                              actions: ['cancel'],
                            },
                          }}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"fr"}>
                    <DateTimePicker
                        required
                        ampm={false}
                        showToolbar
                        onError={false}
                        // minDate={dayjs('2018-01-01T00:00')}
                        label="Date de fin"
                        value={dates.endDate}
                        onChange={newValue => checkSecondDate(newValue )}
                        renderInput={(params) => <TextField {...params} />}
                        componentsProps={{
                            actionBar: {
                              actions: ['cancel'],
                            },
                          }}
                    />
                </LocalizationProvider>

            </div>
            <div className="ingredientTransfertList">
                <ProductsTransfert ps={promoSelected} setProductList={setProductList} />
            </div>

            <div className="bottomForm">
                <Button variant="contained" type="submit">
                    {promoSelected.id === null ? t('admin.ajouter') : t('admin.modifier')}
                </Button>
                <Button variant="contained" onClick={cancel}> {t('admin.nettoyer')} </Button>
            </div>

        </Box>
    )
}

export default FormPromo