import userDataContext from "../../context/userDataContext";
import tokenContext from '../../context/tokenContext';
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import axios from "axios";

export default function HomePage (){
    const { userData } = useContext(userDataContext);
    const { token } = useContext(tokenContext)
    const [modalCancelIsOpen, setModalCancelIsOpen] = useState(false);
    const navigate = useNavigate();
    const name = userData.name;
    const drivenPlanIco = userData.membership.image;
    const perks = userData.membership.perks;

    function openUserInfo (){
        navigate(`/users/${userData.id}`)
    }
    function goToSubcriptions(){
        navigate('/subscriptions')
    }

    function cancelPlan(){
        const URL = 'https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions';
        const promise = axios.delete(URL, {headers: { Authorization: `Bearer ${token}`}});
        promise
        .then( resp => {
            alert('Seu plano foi excluído com sucesso, sendo redirecionado para a página de login...');
            navigate('/');
            window.location.reload();
        })
        .catch ( err => console.log(err, ' foi o erro'))
    }

    return(
        <MainContainer>

            <Modal modalCancelIsOpen={modalCancelIsOpen}>
                    <ion-icon onClick={ () => setModalCancelIsOpen(!modalCancelIsOpen) } name="close-circle"></ion-icon>

                    <ModalBox>
                    <p>Tem certeza que deseja cancelar o seu plano?</p>
                    <div>
                        <button onClick={ () => setModalCancelIsOpen(!modalCancelIsOpen) }
                        className="buttonNo">Não</button>

                        <button onClick={ () => {
                            setModalCancelIsOpen(!modalCancelIsOpen);
                            cancelPlan();
                        } }
                        className="buttonYes">Sim</button>
                    </div>
                    </ModalBox>

            </Modal>

            <header>
                <img src={drivenPlanIco} alt="" />
                <ion-icon onClick={openUserInfo} name="person-circle"></ion-icon>
            </header>
            <br />
            <h1>Olá, {name}</h1>

            <div className="buttons">

                <div className="buttonsTop">
                    {perks.map((item) => { return (
                        <a key={item.id} className="button" href={item.link} target='_blank' rel="noreferrer" >
                            <div>{item.title}</div>
                        </a>)
                    })}
                </div>

                <div className="buttonsBottom">
                    <div onClick={goToSubcriptions} className="button">Mudar Plano</div>
                    <div  onClick={ () => setModalCancelIsOpen(!modalCancelIsOpen)} className="button cancel">Cancelar plano</div>
                </div>
            </div>

        </MainContainer>

    )
}

















const MainContainer = styled.div`
    //background-color: lightgray;
    display: flex; flex-direction: column;
    width: 90vw;
    max-width: 400px;
    margin-top: 40px;
    header{
        display: flex;
        justify-content: space-between;
        img{
            max-width: 100px;
        }

        ion-icon[name="person-circle"]{
        font-size: 2.5em;
        &:hover{
            cursor: pointer;
        }
        }
    }
    h1{
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
    }

    .buttons{
        display: flex; flex-direction: column; align-items: center;
        gap: 200px;
        justify-content: space-between;
        margin-top: 30px;
        
        margin-bottom: 20px;
    }
    .buttonsTop, .buttonsBottom{
        gap: 10px;
        display: flex; flex-direction: column; align-items: center;
        width: 100%;
    }
    .button{
        width: 80%;
        padding: 20px 15px;
        border-radius: 5px;
        text-align: center;
        font-size: 1.1em;
        background-color: #FF4791;
        color: white;
        &:hover{
            cursor: pointer;
            filter: opacity(70%);
        }
    }
    .button.cancel{
        background-color: #FF4747;
    }
`




const Modal = styled.div`
    visibility: ${props => props.modalCancelIsOpen ? 'visible': 'hidden'};
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
