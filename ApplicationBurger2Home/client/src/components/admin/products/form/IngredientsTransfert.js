import React, { useState, useEffect } from "react"
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const IngredientsTransfert = ({ ps, setIngredientList }) => {

    const initialState = { id: 0, name: "", ingredientId: 0 }
    const languageRedux = useSelector(state => state.language)

    const [isLoading, setIsLoading] = useState(true);
    const [checked, setChecked] = useState([]);
    const [outside, setOutside] = useState([]);
    const [inside, setInside] = useState([initialState]);

    const { t } = useTranslation();

    useEffect(() => {
        axios.get(`/ingredients/translations?language=${languageRedux.value}`)
            .then(res => {
                isSelected(res.data)
                setIsLoading(false)
            })
            .catch(e => {
                console.error(e);
            });
        // eslint-disable-next-line
    }, [ps.id, languageRedux.value])

    useEffect(() => {
        const copyRigth = inside;
        setIngredientList(copyRigth.map((item) => { return { id: item.ingredientId } }))
        // eslint-disable-next-line
    }, [inside])

    const isSelected = (listIngredient) => {

        if (ps.id === null) {
            setOutside(listIngredient)
            setInside([])
        }
        else {

            let tempL = listIngredient;
            let tempR = [];

            for (let j = 0; j < ps.ingredients.length; j++) {


                for (let i = 0; i < listIngredient.length; i++) {
                    setOutside(tempL.filter((val) => val.ingredientId !== ps.ingredients[j].id));

                    if (listIngredient[i].ingredientId === ps.ingredients[j].id) {

                        tempR.push(tempL[i]);
                        setInside(tempR)

                        tempL.splice(i, 1);
                        setOutside(tempL);

                        break;
                    }

                }
            }
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
        setInside(inside.concat(outside));
        setOutside([]);
    };

    const handleAllLeft = () => {
        setOutside(outside.concat(inside));
        setInside([]);
    };


    const handleCheckedRight = () => {
        setInside(inside.concat(outsideChecked));
        setOutside(not(outside, outsideChecked));
        setChecked(not(checked, outsideChecked));
    };

    const handleCheckedLeft = () => {
        setOutside(outside.concat(insideChecked));
        setInside(not(inside, insideChecked));
        setChecked(not(checked, insideChecked));
    };



    const customList = (ingredients, title) => (
        <>
            <label className="ingredientTitleColumn">{title}</label>

            <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
                <List dense component="div" role="list">

                    {ingredients.map((ingredient) => {


                        const labelId = `transfer-list-item-${ingredient.id}-label`;

                        return (
                            <ListItem
                                key={ingredient.id}
                                role="listitem"
                                onClick={handleToggle(ingredient)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(ingredient) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>

                                <ListItemText id={labelId} primary={ingredient.name} />

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

                <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{mt:"1px"}}>
                    <Grid item>{customList(outside, t('gestionProduit.form.exclus'))}</Grid>

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
                                ≫
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
                                ≪
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item>{customList(inside, t('gestionProduit.form.inclus'))}</Grid>

                </Grid>

            )}
        </>

    );
}

export default IngredientsTransfert;