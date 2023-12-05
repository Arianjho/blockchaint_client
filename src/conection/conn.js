import Web3 from "web3";
import { DatosAbiertosABI } from './DatosAbiertos';

let web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
const contratoABI = DatosAbiertosABI.abi;
const contratoAddress = '0x1A28e5307691e6886066eA58fFe25E0b45052408';

const contrato = new web3.eth.Contract(contratoABI, contratoAddress);

export const conection = {
    web3,
    contrato
};
