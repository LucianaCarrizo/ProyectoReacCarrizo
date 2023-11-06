import {useContext} from "react";
import CotizadorContext from "../context/CotizadorContext copy";

const useCotizador = () => useContext(CotizadorContext);

export default useCotizador;