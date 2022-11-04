import colors from 'colors';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

import { leerInput, inquirerMenu, pausa, listarLgares } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt = '';
    do {

        opt = await inquirerMenu();
        
        switch ( opt ) {
            case 1: //Buscar ciudad
                const termino = await leerInput('Cuidad:');
                const lugares = await busquedas.ciudad( termino );

                //Seleccionar el lugar
                const id = await listarLgares(lugares);
                if ( id === '0') continue;

                const lugarSeleccionado = lugares.find( l => l.id === id);
                busquedas.agregarHistorial( lugarSeleccionado.nombre );

                const clima = await busquedas.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );

                console.clear();
                console.log(`\nInformación de la ciudad\n`.white);
                console.log(`Cuidad:`, lugarSeleccionado.nombre);
                console.log(`Latitud:`, lugarSeleccionado.lat);
                console.log(`Longitud:`, lugarSeleccionado.lng);
                console.log(`Temperatura:`, clima.temp);
                console.log(`Temperatura Máxima:`, clima.max);
                console.log(`Temperatura Mínima:`, clima.min);
                console.log(`Como esta el clima:`, clima.desc.green);


                break;

            case 2: //Historial
                busquedas.historialCapitalizado.forEach( (lugar, i) =>  {
                    const idx = `${ i + 1 }.`.green;
                    console.log( `${ idx } ${ lugar } ` );
                });
            break;
        
            case 0: //Salida del programa
                console.log('Se saldra de la aplicación');
            break;

        }

        if( opt !== 0 ) await pausa();

    } while ( opt !== 0 );
}

main();