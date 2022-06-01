import styled from 'styled-components';
import Logo from '../../assets/DrivenLogo.svg';
import axios from 'axios';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tokenContext from '../../context/tokenContext';


function login(email, password, e, setToken, navigate){
    e.preventDefault();

    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/login';
    const promise = axios.post(URL, { email: 'math1@math2.com', password: '14253625'} );
    promise
    .then( resp=>{
        console.log(resp.data)
        setToken(resp.data.token)
        if(resp.data.membership === null){
            navigate('/subscriptions');
        } else {
            navigate('/subscriptions');
        }
    })
    .catch(
        err =>{
            alert(err.response.data.message)
        }
    )
}

export default function HomePage (){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken } = useContext(tokenContext);

    return(

        <MainContainer>
            <Container>

                <img width={'100%'} src={Logo} alt="Logo-Driven-Plus" />

                <InputsContainer onSubmit={(e) => login(email, password, e, setToken, navigate)}>
                    
                    <input type="email"
                    placeholder='Email'
                    value={email}
                    onChange={ e => setEmail(e.target.value) } />

                    <input
                    type="password"
                    placeholder='Senha'
                    value={password}
                    onChange={ e => setPassword(e.target.value) }/>

                    <button>
                        Entrar
                    </button>

                </InputsContainer>

                <Link to='/register'><span>Não possui uma conta? Cadastra-se</span></Link>
                

            </Container>
        </MainContainer>

    )
}





// & CSS STYLED-COMPONENTS

const MainContainer = styled.div`
    display: flex; justify-content: center; align-items: center;
    width: 100%;
    height: 100vh;
`
const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 300px;
    margin: 0px 10px;
    gap: 35px;
    img{
        margin-bottom: 50px;
    }

    span{
        font-size: 0.9em;
        text-decoration: underline;
    }
`

const InputsContainer =  styled.form`
    display: flex; flex-direction: column; align-items: center;
    gap: 10px;
    width: 100%;
    input, button{
        border: none;
        width: 100%;
        padding: 15px;
        border-radius: 5px;
    }
    button{
        cursor: pointer;
        margin-top: 15px;
        background-color: #FF4791;
        color: white;
        font-size: 1.2em;
    }
    button:hover{
        filter: opacity(70%);
    }
`