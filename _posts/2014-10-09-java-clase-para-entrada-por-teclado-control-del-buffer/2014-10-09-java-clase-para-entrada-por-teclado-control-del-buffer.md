---
title: "I/O en JAVA, ejercicio nivel básico 1"
date: "2014-10-09"
---

Control de la entrada por el teclado mediante consola (control del buffer).

Esta es una clase que se ha realizado manteniendo los estándares de reutilización. Se puede apreciar en los mensajes por pantalla y la universalidad de los parámetros. Concretamente se realizó para la creación del ejercicio "[Vehículos](http://localhost/java-ejercicios-nivel-2/ "Ir a ejercicio "Vehículos"")".

```java

package ruben.utils;

import java.io.\*;

\*
\* 
\* CLASE UTILS 
\* -------------- 
\* Controla la entrada por teclada, espifica si es String, Integer... 
\* 
\* @author RubÃ©n 
*/

package anfora.utils;

import java.io.\*;

\*
\* 
\* 
\* @author analista 
*/ 

public class Comun
{

public static String leerCadena(String mensaje)
  {

    String texto = "";

    try { // Leer una cadena de texto desde el buffer de entrada (teclado)
          // BufferedReader entrada=new BufferedReader(new
          // InputStreamReader(System.in)); System.out.print(mensaje); texto =
          // entrada.readLine(); } catch(IOException e){
          // System.out.println("Error de Entrada/Salida."); } catch(Exception
          // e){ System.out.println("Error."); }

      return texto;
    }

public static int leerEntero(String mensaje)
    {

      Integer num = null;

      do {
        try { // Leer una cadena de texto desde el buffer de entrada (teclado)
              // BufferedReader entrada=new BufferedReader(new
              // InputStreamReader(System.in)); System.out.print(mensaje); num =
              // Integer.parseInt(entrada.readLine());

        } catch (IOException e) {
          System.out.println("Error de Entrada/Salida.");
        } catch (java.lang.NumberFormatException e) {
          System.out.println("El valor introducido debe ser un nÃºmero.");
        }
      } while (num == null);

      return num;
    }

public static void limpiarConsola()
    {
      try {
        for (int i = 0; i < 10; i++)
          System.out.println();
      } catch (Exception e) {
        System.out.println("Error limpiando la consola.\\n(Error: " + e + ")");
      }
    }
  }
```