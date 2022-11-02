import inquirer from 'inquirer';
 
import colors from 'colors';
 
//Se crea un arreglo de la lista a mostrar en el inquirer
//type es el tipo de dato a mostrar, en este caso es una lista
//name es solo un nombre de o un identificado de la lista
//message es el mensaje que se muestra al inicio de la lista 
//choice es la lista que el usuario debe escojer 
  //value es  el valor que retorna al escojer la opción
  //name es la opción mostrada en la consola para que el usuario pueda escojer
const menuOpts = [
  {
    type: 'list',
    name: 'opcion',
    message: 'Seleccione una opción',
    choices: [
      {
        value: 1,
        name: `${ '1.'.magenta } Buscar cuidad`,
      },
      {
        value: 2,
        name: `${ '2.'.magenta } Historial`,
      },
      {
        value: 0,
        name: `${ '3.'.magenta } Salir del programa`,
      }
    ],
  },
];
 
//Se crea función flecha en donde se muestra el menu de opciones, notece que se usa async el cual es esta función se convierte en una promesa 
const inquirerMenu = async () => {
  console.clear();
  console.log('==========================='.green);
  console.log('   Seleccione una opción'.green);
  console.log('===========================\n'.green);
 
  //se almacena el resulado del vaule en la variable opción
  const { opcion } = await inquirer.prompt(menuOpts);
 
  //al ser una función promesa se debe enviar como retorno el resultado obtenido
  return opcion;
};

const pausa = async() => {

    const pausaOpt = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.white } para continuar`,
        }
    ]

    console.log('\n');
    await inquirer.prompt(pausaOpt);
}

const leerInput = async(message) => {

  const quiestion = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if( value.length === 0){
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const { desc } = await inquirer.prompt(quiestion);
  return desc;
}

const listadoBorrarTareas = async( tareas = [] ) => {
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i + 1}.`.white;
    return {
      value: tarea.id, 
      name: `${ idx } ${ tarea.desc }`
    }
  });

  choices.unshift({
    value: '0',
    name: '0.'.white + 'Cancelar'
  })
  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas)
  return id;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
  const choices = tareas.map( (tarea, i) => {
    const idx = `${i + 1}.`.white;
    return {
      value: tarea.id, 
      name: `${ idx } ${ tarea.desc }`,
      checked: (tarea.completadoEn) ? true : false
    }
  });

  const pregunta = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Seleccione',
      choices
    }
  ]
  const { ids } = await inquirer.prompt(pregunta)
  return ids;
}

const confirmar = async(message) => {

  const quiestion = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(quiestion);
  return ok;
}
 
export { inquirerMenu, pausa, leerInput, listadoBorrarTareas, confirmar, mostrarListadoChecklist };