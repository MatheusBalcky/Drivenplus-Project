import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from 'react'
import styled from "styled-components";
import userDataContext from '../../context/userDataContext';
import tokenContext from "../../context/tokenContext";
import axios from "axios";


export default function UpdatePage (){
    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);
    const { IdUser } = useParams();
    const { token } = useContext(tokenContext)
    const [name, setName ] = useState('');
    const [email, setEmail ] = useState('');
    const [currentPassword, setCurrentPassword ] = useState('');
    const [newPassword, setNewPassword ] = useState('');
    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/users/';

    let body = {
        name,
        cpf: userData.cpf,
        email,
        currentPassword,
    }

    function attUser (e){
        e.preventDefault()

        if (newPassword.length > 0){
            body = {
                name,
                cpf: userData.cpf,
                email,
                currentPassword,
                newPassword  }
        }

        const promise = axios.put( URL, body, {headers: { Authorization: `Bearer ${token}` }} )

        promise

        .then( resp =>{ 
            alert('Usuário atualizado com sucesso, relogue para atualizar suas informações');
            navigate('/')
            window.location.reload();
        })
        .catch( err => console.log( err, ' err' ))
        console.log(userData, ' dataold')
    }

    return (


        <MainContainer>
            <ion-icon onClick={ () => navigate(`/users/${IdUser}`)}
                    name="arrow-back-outline">
            </ion-icon>

            <FormInformations onSubmit={ (e) => attUser(e)}>
                <input type="text" value={name} placeholder={userData.name}
                onChange={ (e) => setName(e.target.value)} />

                <input type="number" disabled placeholder={userData.cpf} />
                
                <input type="email" value={email} placeholder={userData.email}
                onChange={ (e) => setEmail(e.target.value)}  />

                <input type="password" value={currentPassword} placeholder='Senha atual'
                onChange={ (e) => setCurrentPassword(e.target.value)}  />

                <input type="password" value={newPassword} placeholder='Nova Senha'
                onChange={ (e) => setNewPassword(e.target.value)} />

                <button>ATUALIZAR</button>
            </FormInformations>

        </MainContainer>

    )
}





// & CSS STYLED-COMPONENTS

const MainContainer = styled.div`
    display: flex; justify-content: center; align-items: center;
    width: 100vw;
    height: 100vh;
    max-width: 400px;

    ion-icon[name="arrow-back-outline"]{
        position: fixed;
        top: 20px;
        left: 20px;
        font-size: 2em;
        color: white;
        &:hover{
            cursor: pointer;
        }
    }
`

const FormInformations = styled.form`
    width: 80%;
    display: flex; flex-direction: column;
    gap: 10px;

    input, button{
        border: none;
        width: 100%;
        padding: 15px;
        border-radius: 10px;
        font-size: 1.1em;
    }
    input:disabled{
        background-color: #e6e6e6;
    }

    button{
        cursor: pointer;
        margin-top: 15px;
        background-color: #FF4791;
        color: white;
        font-weight: bold;
    }
    button:hover{
        filter: opacity(70%);
    }
`