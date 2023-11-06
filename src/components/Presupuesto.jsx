import { useEffect, useState } from "react";

const Presupuesto = (propiedades) => {
    const [datos, setDatos] = useState([]); 
    useEffect(()=>{
         const leer = async () => setDatos (await (await fetch("/data.json")).json());
         leer();
     },[]);
    var lista = datos.filter(({categoria})=> categoria === "propiedad");
    var tipoProp = new Map();
    for (const propiedad of lista) {
        tipoProp.set(propiedad.factor, propiedad.tipo)
    }
    lista = datos.filter(({categoria})=> categoria === "ubicacion");
    var tipoUbi = new Map();
    for (const propiedad of lista) {
        tipoUbi.set(propiedad.factor, propiedad.tipo)
    }
    return (
        <>
        <li>        
            <span>Fecha: {propiedades.fecha} </span>   
            <span>M2: {propiedades.metrosCuadrados}</span>
            <span>Propiedad: {tipoProp.get(propiedades.propiedad)}</span>
            <span>Ubicacion: {tipoUbi.get(propiedades.ubicacion)}</span>        
            <span>Valor: {propiedades.cuenta}</span>        
        </li>
        </>
    );
};
export default Presupuesto;
