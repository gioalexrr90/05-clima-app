import axios from "axios";

class Busquedas {

    historial = [];

    constructor () {
        // TODO: Leer DB si existe
    }

    get paramsMapbox(){
        return {
            'access_token': 'pk.eyJ1IjoiZ2lvYWxleHJyOTAiLCJhIjoiY2w5empuOTN5MGE4aTN2b2RsNmV4Yjk2ayJ9.tQUR1sstdWcip0qDoBq6_g',
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad( lugar = '' ) {
        
        const instance = await axios.create({
            baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
            params: this.paramsMapbox
        });

        const respuesta = await instance.get();
        console.log(respuesta.data);

        return []; //Retornar los lugares a buscar
    }
}

export { Busquedas }