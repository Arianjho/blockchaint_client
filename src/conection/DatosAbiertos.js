export const DatosAbiertosABI = {
    "abi": [
        {
            "inputs": [],
            "name": "nextId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "registros",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "categoria",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "urlArchivo",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "created",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "updated",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "nombre",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "categoria",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "urlArchivo",
                    "type": "string"
                }
            ],
            "name": "crearRegistro",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "obtenerRegistro",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "nombre",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "categoria",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "urlArchivo",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "created",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "updated",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct DatosAbiertos.Registro",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        },
        {
            "inputs": [],
            "name": "totalRegistros",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true
        }
    ],
}