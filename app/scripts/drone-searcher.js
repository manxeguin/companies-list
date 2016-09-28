;(function(global) {
    

    var DroneSearcher = function() {
        return new DroneSearcher.init();   
    }

    var obtenerIdentificadorUrbanizacion = function (lat,long){
        //Metodo proporcionado
    }

    var obtenerAdyacente = function (id,movimiento){
        //Metodo proporcionado
    }

    //Constantes para los posibles movimientos
    var MOVES = ['LEFT','RIGHT','UP','DOWN'];


    /**
     * Funcion que comprueba que dado una posición,dirección y rango, comprueba si puede
     * obtener ese adyacente.
     *
     * @param {string} currentMove - Dirección del movimiento.
     * @param {Number} x - posición x.
     * @param {Number} y - posición y.
     * @param {Number} r - rango de desplazamiento.
     */
    var canGet = function (currentMove,x,y,r){
        switch (currentMove){
            case 'LEFT':
                return (r - Math.abs(x - 1)) >= 0
            break;
            case 'RIGHT':
                return (r - Math.abs(x + 1)) >= 0
            break;
            case 'UP':
                return (r - Math.abs(y + 1)) >= 0
            break;
            case 'DOWN':
                return (r - Math.abs(y - 1)) >= 0
            break;
        }
    }

    /**
     * Funcion que añade el id actual a la solución y lo marca como visitado, y se llama recursivamente
     * para las posiciones adyacentes si puede
     *
     * @param {Number} id  id a comprobar.
     * @param {Number} x - posición x.
     * @param {Number} y - posición y.
     * @param {Number} r - rango de desplazamiento.
     * @param {Array} visited - array de ids comprobados.
     */
    var checkNeightbours = function (x,y,id,r,visited){
        var solution = [];
        visited[id] = true;
        solution.push(id);
        for (var mov in MOVES){
            var currentMove = MOVES[mov];
            if (canGet(currentMove,x,y,r)){
                var idObtained = obtenerAdyacente(id,currentMove);
                if (!visited[idObtained]){
                    switch (currentMove){
                        case 'LEFT':
                            solution.concat(checkNeightbours(x-1,y,idObtained,r,visited));
                        break;
                        case 'RIGHT':
                            solution.concat(checkNeightbours(x+1,y,idObtained,r,visited));
                        break;
                        case 'UP':
                            solution.concat(checkNeightbours(x,y+1,idObtained,r,visited));
                        break;
                        case 'DOWN':
                            solution.concat(checkNeightbours(x,y-1,idObtained,r,visited));
                        break;
                    }
                }
            }
        }
        return solution;
    }
    

    DroneSearcher.prototype = {
        
        obtenerUrbanizaciones = function (lat,long,range){
            var visited = {};
            var solution = [];
            var initialId = obtenerIdentificadorUrbanizacion(lat,long);
            if (range <= 0){
                solution.push(initialId);
                return solution;
            }else{
                solution.concat(checkNeightbours(0,0,initialId,range,visited));
                return solution;
            }
        }                 
          
    };
    

    DroneSearcher.init = function() {
        
        //PUT INIT CLASS CODE
        
    }
    
    DroneSearcher.init.prototype = DroneSearcher.prototype;
    
    if ( typeof module === "object" && module && typeof module.exports === "object" ) {
        module.exports = DroneSearcher;
    } else {

        global.DroneSearcher =  DroneSearcher;

        if ( typeof define === "function" && define.amd ) {
            define( "DroneSearcher", [], function () { return DroneSearcher; } );
        }
    }
    
}(window));