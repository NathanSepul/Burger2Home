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

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const FormPromo = ({ pS, setPS, setReloadList }) => {

    const initialState = { id: null, amount: null, creationDate: "", startDate: "", endDate: "", products: [] };
    const initialStateEn = { id: null, description: "", promotionId: null, language: { id: 1 } };
    const initialStateFr = { id: null, description: "", promotionId: null, language: { id: 2 } };

    const [promoSelected, setPromoSelected] = useState(initialState);
    const [promoFr, setPromoFr] = useState(initialStateFr);
    const [promoEn, setPromoEn] = useState(initialStateEn);
    const [dates, setDates] = useState({ startDate: null, endDate: null })
    const [products, setProducts] = useState([]);

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
        axios.get(`/products/summaries?language=${languageRedux.value}`)
            .then(res => {
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setProducts(temp)
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e)
            })

    }, [pS, languageRedux.value])

    useState(() => {
        console.log(dates)
    }, [dates])

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

    const handleChangeDate = (newValue, whichMoment) => {

        if (whichMoment === "start") {
            setDates({ ...dates, start: newValue })
        }
        else {
            setDates({ ...dates, end: newValue })
        }

        console.log(dates)

    }
    return (
        <Box
            component='form'
            onSubmit={e => e.preventDefault()}
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        ampm={false}
                        // disablePast
                        inputFormat="DD/MM/YYYY hh:mm"
                        label="Date de début"
                        value={dates.startDate}
                        onChange={newValue => setDates({ ...dates, startDate: "" })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                        ampm={false}
                        onError={console.log}
                        // disablePast
                        inputFormat="DD/MM/YYYY hh:mm"
                        // minDate={dayjs('2018-01-01T00:00')}
                        label="Date de fin"
                        value={dates.endDate}
                        onChange={newValue => setDates({ ...dates, endDate: newValue })}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>

            </div>
            <div>

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