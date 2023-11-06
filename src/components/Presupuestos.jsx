import {FaHouse} from 'react-icons/fa6';
import { Link } from "react-router-dom";
import usePresupuestos from "../hooks/usePresupuestos";
import Presupuesto from "./Presupuesto";

const Presupuestos = () => {
    const {presupuestos} = usePresupuestos();
    return (
        <>
            <nav>
                <Link to= {"/"}>
                    <FaHouse/>
                </Link>
            </nav>

            <ul id='listadoPresupuesto'>
                {presupuestos.map((elementos, indice)=> (
                <Presupuesto key = {indice} {...elementos}/>))}         
            </ul>     
        </>
    );
};
export default Presupuestos;
