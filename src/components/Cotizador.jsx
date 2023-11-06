import {FaClipboardList} from "react-icons/fa6";
import {Link} from "react-router-dom";
import Opciones from "./Opciones";
import { useEffect, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import Swal from "sweetalert2";
import usePresupuestos from "../hooks/usePresupuestos";

const Cotizador = () => {

    const [precio, setPrecio] = useState(0);
    const [datos, setDatos] = useState([]);
    const {elementos, setElementos} = useCotizador();

    const realizarCotizacion = () => {
        const {metrosCuadrados, propiedad, ubicacion} = elementos;
            if (metrosCuadrados<20  && propiedad == 0 || ubicacion == 0){
                Swal.fire("Error","Debes completar los datos","error");
            }
        const cuenta = 35.86 * metrosCuadrados * propiedad * ubicacion;
        setPrecio(cuenta);
    };

    useEffect(()=>{
         const leer = async () => setDatos (await (await fetch("/data.json")).json());
         leer();
     },[]);

    const {presupuestos, setPresupuestos} = usePresupuestos();
    const guardar = () => {
        setPresupuestos([...presupuestos, {
            fecha:new Date().toDateString(),
            ...elementos,
            cuenta: (35.86 * elementos.metrosCuadrados * elementos.propiedad * elementos.ubicacion).toFixed(2)
        }]);
        setPrecio(0);
    };
    return (
    <>
        <nav>
            <Link to={"/presupuestos"}>
                <FaClipboardList/>
            </Link>
        </nav>

        <form action="" onSubmit={(e) => e.preventDefault()}>
            <Opciones datos= {datos.filter(({categoria})=> categoria =="propiedad")} 
                label= {"Seleccione el tipo de Propiedad"} tipo={"propiedad"}>
            </Opciones>
            <Opciones datos= {datos.filter(({categoria})=> categoria =="ubicacion")} 
                label= {"Seleccione su ubicacion"} tipo={"ubicacion"}>
            </Opciones>
            <label htmlFor="metrosCuadrados">Cantidad de metros cuadrados</label>
            <input type="number" id="metrosCuadrados" min={20} defaultValue={20} onInput={(e) => setElementos(
                {...elementos, metrosCuadrados:isNaN(parseInt(e.target.value)) ? 20 : parseInt(e.target.value) 
                < 20 ? 20 : parseInt(e.target.value)})}>
            </input>
            <button type="button" onClick={realizarCotizacion}>Cotizar</button>
        </form>

        {precio != 0 && (
        <> 
            <p>El precio estimado es de ${precio.toFixed(2)}</p>
            <form onSubmit={e => e.preventDefault()}>
                <button type="button" onClick={guardar}>Guardar</button>
            </form>
        </>)}
    </>
    );
};
export default Cotizador;