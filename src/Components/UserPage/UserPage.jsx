import { useParams, useNavigate } from "react-router-dom";
import { useState, useContext } from 'react'
import styled from "styled-components";
import userDataContext from '../../context/userDataContext';

export default function UserPage (){
    const { IdUser } = useParams();
    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);
    console.log(userData)

    return(
        <MainContainer>
            <ion-icon onClick={ () => navigate('/home')}
                    name="arrow-back-outline">
            </ion-icon>

            <FormInformations>
                <input type="text" disabled placeholder={userData.name}/>
                <input type="number" disabled placeholder={userData.cpf}/>
                <input type="email" disabled placeholder={userData.email}/>
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
    gap: 20px;

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