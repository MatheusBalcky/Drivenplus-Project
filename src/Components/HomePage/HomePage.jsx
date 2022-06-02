import userDataContext from "../../context/userDataContext";
import { useContext } from "react";
import styled from 'styled-components';

export default function HomePage (){
    const { userData } = useContext(userDataContext);
    const name = userData.name;
    const drivenPlanIco = userData.membership.image;
    const perks = userData.membership.perks;

    return(
        <MainContainer>
            <header>
                <img src={drivenPlanIco} alt="" />
                <ion-icon name="person-circle"></ion-icon>
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
                    <div className="button">Mudar Plano</div>
                    <div className="button cancel">Cancelar plano</div>
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
