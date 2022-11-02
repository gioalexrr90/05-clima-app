import colors from 'colors';

import { leerInput, inquirerMenu, pausa } from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';

const main = async() => {
    
    const busquedas = new Busquedas();
    let opt = '';
    do {

        opt = await inquirerMenu();
        
        switch ( opt ) {
            case 1: //Buscar ciudad
                const lugar = await leerInput('Cuidad:');
                await busquedas.ciudad( lugar );
            break;

            case 2: //Buscar ciudad
                console.log('Se mostrarán el historial');
            break;
        
            case 0: //Buscar ciudad
                console.log('Se saldra de la aplicación');
            break;

        }

        if( opt !== 0 ) await pausa();

    } while ( opt !== 0 );
}

main();