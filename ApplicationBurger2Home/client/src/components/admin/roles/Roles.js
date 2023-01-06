import React, {useState, useEffect}from "react"
import { useSelector } from "react-redux";
import axios from "axios";
import TabRoles from "./tabRoles/TabRoles.js";
import FormRoles from "./FormRoles.js";
import { useTranslation } from 'react-i18next';

import "./Roles.css"

const Roles = () =>{
    const { t } = useTranslation();
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState({ id: null });
    const [reloadList,setReloadList] = useState(false)
    const [roles, setRoles] = useState([]);
    
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);

    const languageRedux = useSelector(state => state.language);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`/roles`)
            .then((res) => {
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setRoles(temp);
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    useEffect(() => {
        axios.get(`/users`)
            .then((res) => {
                setIsLoading(false);
                let temp = res.data.sort((a, b) => (a.name > b.name ? 1 : -1));
                setUsers(temp);
                setReloadList(false)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [reloadList])

    

    return (
        <main className='RoleAdmon'>
            <title>Burger2Home | Roles</title>
            <div className="title"><h1>Gestion des Roles</h1></div>

            <div className="RolesContent">
                <div className="RolesList">
                    <TabRoles users={users} setUserSelected={setUserSelected}/>
                </div>
                <div className="RolesForm">
                    <FormRoles uS={userSelected} setUS={setUserSelected} roles={roles} setReloadList={setReloadList}/>
                </div>
            </div>



        </main>
    );
}

export default Roles