function enviarPresupuesto(){

    let presupuestoIngresado = document.getElementById('presupuestoIngresado').value;
    let guardaPresupuesto = document.getElementById('totalPresupuesto')

    guardaPresupuesto.innerText = presupuestoIngresado;
}

//Arreglo para guardar datos de los gastos ingresados
var arregloNombre = [];
var arregloCantidad = [];

function acumularGastos(){
    //Recorremos el arreglo cantidad gastos y sumamos el contenido de arreglo cantidad

    let acumuladorGastos=0;

    for(let i=0; i < arregloCantidad.length; i++){ 
        acumuladorGastos +=  arregloCantidad[i];
    }
    return acumuladorGastos;
};

eliminarGasto = (items) =>{

    //console.log(items.id);
    //Identificar el id del item a borrar de la lista
    let idItem = items.id;

    //Identificar todos los contenedores de las listas
    let laListaNombresContenedor = document.getElementById('listaNombre');
    let laListaPreciosContenedor = document.getElementById('listaValor');
    let laListaBorrarContenedor = document.getElementById('listaBorrar');

    let laListaNombreItem = document.getElementById('listaNombre').childNodes;
    let laListaPrecioItem = document.getElementById('listaValor').childNodes;
    let laListaBorrarItem = document.getElementById('listaBorrar').childNodes;



    //Recorremos las listas con un ciclo for
    for(let i=1; i < laListaNombreItem.length; i++){

        if(laListaNombreItem[i].id > idItem){

            laListaNombreItem[i].id -= 1;
            laListaPrecioItem[i].id -= 1;
            laListaBorrarItem[i].id -= 1;
        }

        //Si el id de la fila corresponde al id del item, eliminamos este item de cada lista
        else if(laListaNombreItem[i].id === idItem){

            laListaNombresContenedor.removeChild(laListaNombreItem[i]);
            laListaPreciosContenedor.removeChild(laListaPrecioItem[i]);
            laListaBorrarContenedor.removeChild(laListaBorrarItem[i]);

            arregloNombre.splice(idItem -1, 1);
            arregloCantidad.splice(idItem -1, 1);

            //Eliminar el gasto del total de gastos
            let mostrarDatosAcumulados = acumularGastos();

            document.getElementById('totalGasto').innerText = mostrarDatosAcumulados;

            let saldoFinal = document.getElementById('totalSaldo');
            let presupuestoIngresado = document.getElementById('totalPresupuesto').innerText;
            let elsaldo = parseInt(presupuestoIngresado) - parseInt(mostrarDatosAcumulados);
            saldoFinal.innerText = elsaldo;

            i--

        }
        
        //console.log(arregloNombre);
        //console.log(arregloCantidad);
    }
};



function enviarGasto(){

    let nombreIngresado = document.getElementById('nombreGasto').value;
    let valorGastoIngresado = document.getElementById('valorGasto').value;
    
    arregloNombre.push(nombreIngresado);
    arregloCantidad.push(parseFloat(valorGastoIngresado));

    /*
    console.log('arreglo nombre:'+ arregloNombre);
    console.log('arreglo precio:'+ arregloCantidad);
    */

    let mostrarDatosAcumulados = acumularGastos();
    console.log("funcion: acumularGastos "+mostrarDatosAcumulados);

    let guardaTotal = document.getElementById('totalGasto');
    let saldoFinal = document.getElementById('totalSaldo');

    //capturar listas de nombre y valor
    let laListaNombres = document.getElementById('listaNombre');
    let laListaPrecios = document.getElementById('listaValor');
    let laListaBorrar = document.getElementById('listaBorrar');

    //contar en que posiciomn de la lista queda cada gasto
    let nombreIdentificado = laListaBorrar.childElementCount

    console.log(laListaNombres.childElementCount);

    //Identificamos el contenedor de las listas
    let itemsGastosNombres = document.createElement('li');
    let itemsGastosValores = document.createElement('li');
    let itemsBorrarGastos = document.createElement('li');

    //Se le agrega un id al nombre, valor y borrar para poder identificarlos al momento de borrar
    itemsGastosNombres.id = nombreIdentificado;
    itemsGastosValores.id = nombreIdentificado;
    itemsBorrarGastos.id = nombreIdentificado;

    //Se le agrega una clase para que tenga la estetica de bootstrap
    itemsGastosNombres.className = 'list-group-item bg-transparent text-light';
    itemsGastosValores.className = 'list-group-item bg-transparent text-light';
    itemsBorrarGastos.className = 'list-group-item bg-transparent text-light';

    //Se le agrega un evento onclick a la X de cada fila
    itemsBorrarGastos.addEventListener('click', ()=> eliminarGasto(itemsBorrarGastos));

    //Se le agrega el texto que tendra cada fila de la lista 
    itemsGastosNombres.innerText = nombreIngresado;
    itemsGastosValores.innerText = valorGastoIngresado;
    itemsBorrarGastos.innerText = 'X';

    //Agregamos el li a al ul en html con appendChild
    laListaNombres.appendChild(itemsGastosNombres);
    laListaPrecios.appendChild(itemsGastosValores);
    laListaBorrar.appendChild(itemsBorrarGastos);

    guardaTotal.innerText = mostrarDatosAcumulados;

    let presupuestoIngresado = document.getElementById('totalPresupuesto').innerText;
    let elsaldo = parseInt(presupuestoIngresado) - parseInt(guardaTotal.innerText);
    saldoFinal.innerText = elsaldo;

}


function asignarEventos(){

    let elBotonCalcular = document.getElementById('presupuestoIngresado')
    elBotonCalcular.addEventListener('blur', enviarPresupuesto);

    let elBotonAgregar = document.getElementById('agregarGasto')
    elBotonAgregar.addEventListener('click', enviarGasto);
}