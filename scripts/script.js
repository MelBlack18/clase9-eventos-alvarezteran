// Objeto que tiene todos los datos base necesarios para operar
let datosBase = {
    unidadInicial : "",
    unidadDestino : "",
    cantidadInicial : 0,
    unidades : [
        "mililitros",
        "tazas",
        "gramos",
        "onzas"
    ],
}

// Objeto en donde cada clave es el resultado de una operacion
let resultados = {
    mililitrosATazas : 0,
    tazasAMililitros : 0,
    gramosAOnzas : 0,
    onzasAGramos : 0,
    gramosATazas : 0,
    tazasAGramos : 0
}

//Objeto que contiene todas las operaciones como métodos
let operaciones = {
    MlATazas(cant){
        resultados.mililitrosATazas =  (parseFloat(cant) / 240).toFixed(2)
        return resultados.mililitrosATazas
    },
    TazasAMl (cant){
        resultados.tazasAMililitros = (parseFloat(cant) * 240).toFixed(2)
        return resultados.tazasAMililitros
    },
    GrAOz (cant) {
        resultados.gramosAOnzas = (parseFloat(cant) * 0.035274).toFixed(2)
        return resultados.gramosAOnzas
    },
    OzAGr (cant) {
        resultados.onzasAGramos = (parseFloat(cant) * 28.3495).toFixed(2)
        return resultados.onzasAGramos
    },
    TzaGr (cant) {
        resultados.tazasAGramos = (parseFloat(cant) * 236.588236).toFixed(2)
        return resultados.tazasAGramos
    },
    GraTz (cant) {
        resultados.gramosATazas = (parseFloat(cant) / 236.588236).toFixed(2)
        return resultados.gramosATazas
    }
}

 //Busco los eventos Change de cada campo del formulario y almaceno los valores de cada uno en el objeto datosBase

let obtenerCantidad = document.querySelector("#cantidadInicial")

obtenerCantidad.onchange = (e) => { datosBase.cantidadInicial = obtenerCantidad.value }

let obtenerUnidadInicial = document.getElementById("unidadInicial")

obtenerUnidadInicial.onchange = (e) => { datosBase.unidadInicial = obtenerUnidadInicial.value }

let obtenerUnidadFinal = document.getElementById("unidadFinal")

obtenerUnidadFinal.onchange = (e) => { datosBase.unidadDestino = obtenerUnidadFinal.value }


//Funcion para agregar el resultado final al HTML
function agregarResultado (operacion) {

    let resultadoOperacion = operacion

    //Creo una etiqueta P para imprimir el resultado, y voy a buscar el div en donde lo quiero imprimir
    let result = document.createElement("p")
    let resultadoFinal = document.getElementById("resultados")

    //Le agrego el texto al p
    result.innerText = `${datosBase.cantidadInicial} ${datosBase.unidadInicial} equivalen a ${resultadoOperacion} ${datosBase.unidadDestino}`
    
    //Imprimo el p en el div
    resultadoFinal = resultadoFinal.append(result)
}

//Busco el elemento form y sobre el evento submit del mismo ejecuto la función que calcula la conversión
let formulario = document.getElementById("conversor")

formulario.onsubmit = (e) => {

    e.preventDefault()

    convertir(datosBase.unidadInicial, datosBase.unidadDestino, datosBase.cantidadInicial)

}

//Esta funcion evalúa qué operación utilizar dependiendo de lo ingresado, usando como parámetros las unidades de inicio y fin y la cantidad inicial
function convertir(unidadInicial, unidadDestino, cantidadInicial) {

    //Comparo en el if si las unidades pueden ser convertidas de una a otra o no y ejecuto la operación q corresponda, retornando el resultado
    if (unidadInicial == datosBase.unidades[0] && unidadDestino == datosBase.unidades[1]) {

        operaciones.MlATazas(cantidadInicial)

        agregarResultado(resultados.mililitrosATazas)

    } else if (unidadInicial == datosBase.unidades[1] && unidadDestino == datosBase.unidades[0]) {
            
        operaciones.TazasAMl(cantidadInicial)

        agregarResultado(resultados.tazasAMililitros)
        
    } else if (unidadInicial == datosBase.unidades[2] && unidadDestino == datosBase.unidades[1]) {
        
        operaciones.GraTz(cantidadInicial)

        agregarResultado(resultados.gramosATazas)
        
    } else if (unidadInicial == datosBase.unidades[1] && unidadDestino == datosBase.unidades[2]){
        
        operaciones.TzaGr(cantidadInicial)

        agregarResultado(resultados.tazasAGramos)
        
    } else if (unidadInicial == datosBase.unidades[2] && unidadDestino == datosBase.unidades[3]){

        operaciones.GrAOz(cantidadInicial)

        agregarResultado(resultados.gramosAOnzas)

    } else if (unidadInicial == datosBase.unidades[3] && unidadDestino == datosBase.unidades[2]){

        operaciones.OzAGr(cantidadInicial)

        agregarResultado(resultados.onzasAGramos)

    } else {
        
        //Creo una etiqueta P para imprimir el resultado, y voy a buscar el div en donde lo quiero imprimir
        let result = document.createElement("p")
        let operacionErronea = document.getElementById("resultados")

        //Le agrego el texto al p
        result.innerText = "Intentaste hacer una operación no contemplada. Probá de nuevo"
        
        //Imprimo el p en el div
        operacionErronea = operacionErronea.append(result)
        
    }
}