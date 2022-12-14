import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import axios from 'axios';

function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const ProductsTransfert = ({ ps, setProductList }) => {

    const initialState = { id: 0, name: "", productId: 0 }
    const languageRedux = useSelector(state => state.language)

    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState([]);
    const [outside, setOutside] = useState([]);
    const [inside, setInside] = useState([initialState]);

    // eslint-disable-next-line
    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`/products/summaries?language=${languageRedux.value}`)
            .then(res => {
                isSelected(res.data.sort((a,b)=>(a.name > b.name ? 1 : -1)))
                setIsLoading(false)
            })
            .catch(e => {
                console.error(e);
            });
        // eslint-disable-next-line
    }, [ps.id, languageRedux.value])

    useEffect(() => {
        const copyRigth = inside;
        setProductList(copyRigth.map((item) => { return { id: item.id } }))
        // eslint-disable-next-line
    }, [inside])

    const isSelected = (listproduct) => {

        if (ps.id === null) {
            setOutside(listproduct)
            setInside([])
        }
        else {

            let tempOuside = listproduct;
            let tempInside = [];

            for (let j = 0; j < ps.products.length; j++) {

                for (let i = 0; i < listproduct.length; i++) {
                    if (listproduct[i].id === ps.products[j].id) {

                        tempInside.push(tempOuside[i]);

                        tempOuside.splice(i, 1);

                        break;
                    }
                }
            }

            tempOuside = tempOuside.sort((a,b)=>(a.name > b.name ? 1 : -1))
            tempInside = tempInside.sort((a,b)=>(a.name > b.name ? 1 : -1))
            setInside(tempInside)
            setOutside(tempOuside);


        }

    }


    const outsideChecked = intersection(checked, outside);
    const insideChecked = intersection(checked, inside);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        let temp = inside.concat(outside)
        temp = temp.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setInside(temp);
        setOutside([]);
    };

    const handleAllLeft = () => {
        let temp = outside.concat(inside)
        temp = temp.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setOutside(temp);
        setInside([]);
    };


    const handleCheckedRight = () => {
        let tempInside = inside.concat(outsideChecked)
        tempInside = tempInside.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setInside(tempInside);

        let temOut = not(outside, outsideChecked)
        temOut = temOut.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setOutside(temOut);

        let tempCh = not(checked, outsideChecked)
        tempCh = tempCh.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setChecked(tempCh);
    };

    const handleCheckedLeft = () => {
        let tempInside = not(inside, insideChecked)
        tempInside = tempInside.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setInside(tempInside);


        let temOut = outside.concat(insideChecked)
        temOut = temOut.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setOutside(temOut);

        let tempCh = not(checked, insideChecked)
        tempCh = tempCh.sort((a,b)=>(a.name > b.name ? 1 : -1))
        setChecked(tempCh);
    };



    const customList = (products, title) => (
        <>
            <label className="ingredientTitleColumn">{title}</label>

            <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
                <List dense component="div" role="list">

                    {products.map((product) => {


                        const labelId = `transfer-list-item-${product.id}-label`;

                        return (
                            <ListItem
                                key={product.id}
                                role="listitem"
                                onClick={handleToggle(product)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(product) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>

                                <ListItemText id={labelId} primary={product.name} />

                            </ListItem>
                        );
                    })}
                    <ListItem />
                </List>
            </Paper>
        </>

    );

    return (
        <>
            {(!isLoading) && (

                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{mt:"1px"}} className="ingredientTransfert">
                    <Grid item>{customList(outside, "hors promo")}</Grid>

                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 1 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllRight}
                                disabled={outside.length === 0}
                                aria-label="move all inside"
                            >
                                ???
                            </Button>

                            <Button
                                sx={{ my: 1 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={outsideChecked.length === 0}
                                aria-label="move selected inside"
                            >
                                &gt;
                            </Button>

                            <Button
                                sx={{ my: 1 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={insideChecked.length === 0}
                                aria-label="move selected outside"
                            >
                                &lt;
                            </Button>

                            <Button
                                sx={{ my: 1 }}
                                variant="outlined"
                                size="small"
                                onClick={handleAllLeft}
                                disabled={inside.length === 0}
                                aria-label="move all outside"
                            >
                                ???
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item>{customList(inside, "en promos")}</Grid>

                </Grid>

            )}
        </>

    );
}

export default ProductsTransfert;