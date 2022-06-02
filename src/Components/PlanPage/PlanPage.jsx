import axios from "axios";
import styled from "styled-components";
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tokenContext from "../../context/tokenContext";
import userDataContext from "../../context/userDataContext";
import IconDollarBill from '../../assets/dollarbill-icon.svg';
import IconShapeList from '../../assets/shape-list-icon.svg';

export default function PlanPage (){
    const { token } = useContext(tokenContext);
    const { IdPlano } = useParams();
    const [plan, setPlan] = useState({});
    const [perks, setPerks] = useState([]);
    const navigate = useNavigate();
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${IdPlano}`;
    const [openModal, setOpenModal] = useState(false);
    const [signed, setSigned] = useState(false);

    useEffect( () => {
        const promise = axios.get(URL, { headers: { Authorization: `Bearer ${token}`}});
        promise
        .then( resp =>{
            console.log(resp.data)
            setPlan(resp.data);
            setPerks(resp.data.perks);
        })
        .catch( err => console.log(err.response) )
    },[token, URL])




    // * RETURN DA FUNÇÃO
    if (perks.length > 0){
        return(
            <Background>
            <Container>

                <Modal openModal={openModal}>
                    <ion-icon onClick={ () => setOpenModal(!openModal) } name="close-circle"></ion-icon>

                    <ModalBox>
                    <p>Tem certeza que deseja assinar o plano Driven Plus (R$ {plan.price})</p>
                    <div>
                        <button onClick={ () => setOpenModal(!openModal) } className="buttonNo">Não</button>
                        <button onClick={ () =>{
                            setOpenModal(!openModal)
                            setSigned(true) 
                            }} className="buttonYes">Sim</button>
                    </div>
                    </ModalBox>

                </Modal>

                <ion-icon onClick={ () => navigate('/subscriptions')}
                name="arrow-back-outline">
                </ion-icon>
    
                <img src={plan.image} alt="plan representive pic" />
    
                {renderingInformations(perks, plan.price)}
    
                <FormComponent signed={signed} setOpenModal={setOpenModal}  membershipId={plan.id}/>
    
            </Container>
            </Background>
        )
    } else {
        return(
            <h1>Carregando...</h1>
        )
    }

}



function FormComponent({ membershipId, setOpenModal, signed }){
    const { token } = useContext(tokenContext);
    const { setUserData } = useContext(userDataContext);
    const navigate = useNavigate();
    const [cardName, setCardName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [securityNumber, setSecurityNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');

    const body = {
        membershipId,
        cardName,
        cardNumber,
        securityNumber,
        expirationDate
    }

    if(signed === true){
        const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';
        const URLUSER = 'https://mock-api.driven.com.br/api/v4/driven-plus/users/${}'
        const promise = axios.post(URL, body, { headers: { Authorization: `Bearer ${token}`}})
        promise
        .then( resp =>{
            console.log(resp.data, ' resposta ao assinar')
            navigate('/home')
        })
        .catch( err => console.log(err.response))
    }

    function signButtonOpenModal (e){
        e.preventDefault();
        setOpenModal(true)
    }

    return(
        <Form onSubmit={ (e) => signButtonOpenModal(e)}>

                <input type="text" required value={cardName}
                onChange={ (e) => setCardName(e.target.value) }
                placeholder="Nome impresso no cartão"/>

                <input type="number" required value={cardNumber}
                onChange={ (e) => setCardNumber(e.target.value) }
                placeholder="Digitos do cartão" />

                <div>
                    <input required type="number" value={securityNumber}
                    onChange={ (e) => setSecurityNumber(e.target.value) }
                    placeholder="Código de segurança" />

                    <input required type="number" value={expirationDate}
                    onChange={ (e) => setExpirationDate(e.target.value) }
                    placeholder="Validade"/>
                </div>

                <button>ASSINAR</button>
        </Form>
    )
}

function renderingInformations(arrayPerks, price){

    let priceWithComma = 0
    if(price !== undefined){
        priceWithComma = price.replace('.',',');
    }

    return(
        <Informations>

            <h2><img src={IconShapeList} alt="simbolo de uma nota" /> Benefícios:</h2>

            <ol>
                {arrayPerks.map( item => <li key={item.id}> {item.title} </li> )}
            </ol>

            <br />

            <h2><img src={IconDollarBill} alt="simbolo de um checklist" /> Preço:</h2>

            <p>R$ {priceWithComma} valor cobrados mensalmente</p>
            
        </Informations>
    )
}















// & CSS STYLED COMPONENTS

const Background = styled.div`
    display: flex; justify-content: center; align-items: center;
    width: 100vw;
    height: 100vh;
`

const Container = styled.div`
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    gap: 40px;
    margin: 0px 10px;

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

const Informations = styled.div`
    width: 100%;
    font-size: 14px;
    padding: 0px 10px;
    line-height: 1.5em;
    li{
        list-style: decimal;
        list-style-position: inside;
    }
`

const Form = styled.form`
    display: flex; flex-direction: column;
    gap: 10px;
    input,button{
        border: none;
        width: 100%;
        padding: 15px;
        border-radius: 10px;
    }
    button{
        background-color: #FF4791;
        color: white;
        font-weight: bold;
    }
    button:hover{
        cursor: pointer;
        background-color: #ff0a6c;
    }
    div{
        display: flex;
        gap: 5px;
    }
`

const Modal = styled.div`
    visibility: ${props => props.openModal ? 'visible': 'hidden'};
    background-color: #000000b2;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex; justify-content: center; align-items: center;
    ion-icon[name="close-circle"]{
        position: fixed;
        right: 10px;
        top: 10px;
        font-size: 2em;
        
        &:hover{
            cursor: pointer;
        }
    }
`

const ModalBox = styled.div`
    display: flex; flex-direction: column; gap: 40px;
    width: 100%;
    max-width: 300px;
    padding: 20px;
    border-radius: 15px;
    background-color: white;
    p{
        font-size: 1.2em;
        color: black;
        font-weight: bold;
        text-align: center;
    }
    div{
        display: flex; justify-content: center; gap: 15px;
    }
    div button{
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 15px;
        padding: 15px 45px;
    }
    .buttonNo{
        background-color: #717171;
    }
    .buttonNo:hover{
        cursor: pointer;
        background-color: #404040;
    }
    .buttonYes{
        background-color: #FF4791;
    }
    .buttonYes:hover{
        cursor: pointer;
        background-color: #ff1f79;
    }
`