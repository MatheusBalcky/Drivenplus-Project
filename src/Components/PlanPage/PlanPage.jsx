import { useParams } from "react-router-dom"

export default function PlanPage (){
    const { IdPlano } = useParams();

    return(
        <h1>Plano página do ID {IdPlano} </h1>
    )
}