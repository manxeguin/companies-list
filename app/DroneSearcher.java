package es.idealista.example;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DroneSearcher {
	
	
	
	private final static String MOVE_LEFT = "LEFT";
	private final static String MOVE_RIGHT = "RIGHT";
	private final static String MOVE_UP = "UP";
	private final static String MOVE_DOWN = "DOWN";
	
	private final static String[] MOVES={MOVE_LEFT,MOVE_RIGHT,MOVE_UP,MOVE_DOWN};
	
	/**
     * Funcion que comprueba que dado una posición,dirección y rango, comprueba si puede
     * obtener ese adyacente.
     *
     * @param {string} currentMove - Dirección del movimiento.
     * @param {Integer} x - posición x.
     * @param {Integer} y - posición y.
     * @param {Integer} r - rango de desplazamiento.
     */
	private static boolean canGet(String movimiento,Integer x, Integer y,Integer range){
		switch (movimiento) {
			case MOVE_LEFT:
	
				return ((range - Math.abs(x - 1)) >= 0);
				
			case MOVE_RIGHT:
				return ((range - Math.abs(x + 1)) >= 0);		
	
			case MOVE_UP:
				return ((range - Math.abs(y + 1)) >= 0);
	
			case MOVE_DOWN:
				return ((range - Math.abs(y - 1)) >= 0);
	
			default :
				return false;
			
		}
		
	};
	
	/**
     * Funcion que añade el id actual a la solución y lo marca como visitado, y se llama recursivamente
     * para las posiciones adyacentes si puede hasta recorrer todo el arbol (Backtracking)
     *
     * @param {Integer} id  id a comprobar.
     * @param {Integer} x - posición x.
     * @param {Integer} y - posición y.
     * @param {Integer} r - rango de desplazamiento.
     * @param {Map<Integer,Boolean>} visited - mapa de ids visitados.
     */
	private static List<Integer> checkNeightbours(Integer x, Integer y,Integer range,Integer id,Map<Integer,Boolean> visited){
		List<Integer> solucion = new ArrayList<Integer>();
		
		solucion.add(id);
		visited.put(id, true);
		
		for (int i = 0; i < MOVES.length ;i++){
			String currentMove = MOVES[i];
			if (canGet(currentMove, x, y, range)){
				Integer idObtained = obtenerAdyacente(id,currentMove);
				if (visited.get(idObtained) == null || visited.get(idObtained) == false){
					switch (currentMove) {
						case MOVE_LEFT:
							solucion.addAll(checkNeightbours(x - 1 , y, range, idObtained, visited));
							break;
							
						case MOVE_RIGHT:
							solucion.addAll(checkNeightbours(x + 1, y, range, idObtained, visited));
							break;		
				
						case MOVE_UP:
							solucion.addAll(checkNeightbours(x, y + 1, range, idObtained, visited));
							break;
				
						case MOVE_DOWN:
							solucion.addAll(checkNeightbours(x, y - 1, range, idObtained, visited));
							break;
				
						default :
							
						
					}
				}
			}
		}
		return solucion;
	}

	private static Integer obtenerAdyacente(Integer id, String direccion) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private static Integer obtenerIdentificadorUrbanizacion(Double latitud, Double longitud) {
		// TODO Auto-generated method stub
		return null;
	} 
	
	public static List<Integer> obtenerUrbanizaciones(Double latitud,Double longitud,Integer range){
        Map<Integer,Boolean> visited = new HashMap<Integer,Boolean>();
        List<Integer> solution = new ArrayList<Integer>();
        Integer initialId = obtenerIdentificadorUrbanizacion(latitud,longitud);
        if (range <= 0){
            solution.add(initialId);
            return solution;
        }else{
            solution.addAll(checkNeightbours(0,0,range,initialId,visited));
            return solution;
        }
    }

	
}
