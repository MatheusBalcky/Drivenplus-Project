import styled from 'styled-components';
import Logo from '../../assets/DrivenLogo.svg';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'


function register(name, cpf, email, password, e, navigate){
    e.preventDefault();
    
    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up';
    const promise = axios.post(URL, {name, cpf, email, password} );
    
    promise
    .then( resp =>{
        alert('Conta criada com sucesso, prossiga para o login');
        console.log(resp);
        navigate('/');
    })
    .catch( err =>{
            if(err.response.status === 409){
                alert('Usuário já existe, tente outro ou faça o login')
            } else {
                alert('Preencha seus dados corretamente')
            }
            console.log(err.response)
        }
    )
}

function RegisterPage (){
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return(
        <MainContainer>
        <Container>

            <img width={'100%'} src={Logo} alt="Logo-Driven-Plus" />

            <InputsContainer onSubmit={ (e) => register(name, cpf, email, password, e, navigate) }>
                
                <input type="text"
                placeholder='Nome'
                value={name}
                onChange={ e => setName(e.target.value) }
                required />

                <input
                type="number"
                minLength={'9'}
                placeholder='CPF'
                value={cpf}
                onChange={ e => setCpf(e.target.value) }
                required/>

                <input
                type="email"
                placeholder='E-mail'
                value={email}
                onChange={ e => setEmail(e.target.value) }
                required/>

                <input
                type="password"
                placeholder='Senha'
                value={password}
                onChange={ e => setPassword(e.target.value) }
                required/>

                <button>
                    Cadastrar
                </button>

            </InputsContainer>

            <Link to='/'><span>Já tem uma conta? Entra aqui</span></Link>
            

        </Container>
    </MainContainer>

    )
}

export default RegisterPage;


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