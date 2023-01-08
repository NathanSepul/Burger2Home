import React from "react";


const TrisProduct = ({tris, setFiltre}) => {

    const changeOrder = (e) => {
        console.log("on chnaga")
        setFiltre(e.target.value)
    }
    return (
        // <>{!isLoading && (

            <select name="trisProduct" onChange={changeOrder} defaultValue="Alphabétique" className="trisProducts">
                {tris.map((e) => {
                    return <option key={e.id} value={e.id}>{e.name}</option>
                })}
            </select>
        // )}</>
    );
}

export default TrisProduct