import axios from "axios";
import styled from 'styled-components'
import tokenContext from "../../context/tokenContext";
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

export default function SubscriptPage (){
    const [plans, setPlans] = useState([]);
    const { token } = useContext(tokenContext);

    const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships';

    useEffect( () =>{
        const promise = axios.get( URL, { headers: { Authorization: `Bearer ${token}` } } );
        promise
        .then( resp => setPlans(resp.data))
        .catch( err => console.log(err.response))
    }, [token])
    
    return (
        <MainContainer>

            <h1>Escolha seu plano</h1>

            {plans.map( (item ) =>{
               return <PlanComponent
               key={item.id}
               id={item.id}
               image={item.image}
               price={item.price}/>
            })}

        </MainContainer>
    )
}

function PlanComponent ({id ,price, image}){
    return(
        <Link to={`/subscriptions/${id}`}>
            <Container>
                <img src={image} alt="plan-representive" />
                <p>R${price}</p>
            </Container>
        </Link>
    )
}














// & CSS STYLED COMPONENTS

const MainContainer = styled.div`
    display: flex; justify-content: center; flex-direction: column; align-items: center;
    gap: 30px;
    margin: 40px 10px 0px 10px;
    h1{
        font-size: 2em;
        text-align: center;
        font-weight: bold;
    }

    border: 1px solid #7E7E7E; border-radius: 5px;
    padding: 20px;
    
`

const Container = styled.div`
    border: 3px solid #7E7E7E;
    width: 100%;
    display: flex;    align-items: center;     justify-content: center;
    max-width: 300px;
    border-radius: 5px;
    padding: 10px;
    p{
        font-size: 24px;
        font-weight: bold;
    }
    &:hover{
        cursor: pointer;
        background-color: #2a2a2a;
    }
`