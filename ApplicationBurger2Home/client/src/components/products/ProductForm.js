import React from "react"
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

const ProductForm = () =>{

    return (
        <Box
        // onSubmit={validationFormulaire}
        component="form"
        sx={{
            '& > :not(style)': { m: "auto", width: "75%" },
        }}
    >
        <br />
        <TextField required id="email" label={t('connexion.email')} variant="outlined" value={email} onChange={handleChangeEmail} />
        <br /><br />
        <Button id="buttonValidation" variant="contained" type="submit">{t('connexion.continuer')}</Button>
    </Box>
    )
}

export default ProductForm