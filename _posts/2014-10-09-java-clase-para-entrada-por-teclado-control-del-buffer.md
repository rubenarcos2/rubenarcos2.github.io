---
layout: post
title: I/O en JAVA, ejercicio nivel bÃ¡sico 1
date: 2014-10-09 19:23
author: ruben
comments: true
categories: [Blog, ejercicios, Java, java, poo, Proyectos y prÃ¡cticas]
---
Control de la entrada por el teclado mediante consolaÂ (control del buffer).

Esta es una clase que se ha realizado manteniendo los estÃ¡ndares de reutilizaciÃ³n. Se puede apreciar en los mensajes por pantalla y la universalidad de los parÃ¡metros. Concretamente se realizÃ³ para la creaciÃ³n del ejercicio "<a title="Ir a ejercicio &quot;VehÃ­culos&quot;" href="http://localhost/java-ejercicios-nivel-2/">VehÃ­culos</a>".

<!--more-->

[code language="java"]

package ruben.utils;

import java.io.*;

/**
* CLASE UTILS
* --------------
* Controla la entrada por teclada, espifica si es String, Integer...
*
* @author RubÃ©n
*/

package anfora.utils;

import java.io.*;

/**
 *
 * @author analista
 */
public class Comun {

     public static String leerCadena(String mensaje) {

        String texto=&quot;&quot;;

        try
        {
            //Leer una cadena de texto desde el buffer de entrada (teclado)
            BufferedReader entrada=new BufferedReader(new InputStreamReader(System.in));
            System.out.print(mensaje);
            texto = entrada.readLine();
        }
        catch(IOException e){
            System.out.println(&quot;Error de Entrada/Salida.&quot;);
        }
        catch(Exception e){
            System.out.println(&quot;Error.&quot;);
        }

        return texto;
    }

    public static int leerEntero(String mensaje) {

        Integer num = null;

        do {
            try
            {
                //Leer una cadena de texto desde el buffer de entrada (teclado)
                BufferedReader entrada=new BufferedReader(new InputStreamReader(System.in));
                System.out.print(mensaje);
                num = Integer.parseInt(entrada.readLine());

            }
            catch(IOException e){
                System.out.println(&quot;Error de Entrada/Salida.&quot;);
            }
            catch(java.lang.NumberFormatException e){
                System.out.println(&quot;El valor introducido debe ser un nÃºmero.&quot;);
            }
        } while (num == null);

        return num;
    }

    public static void limpiarConsola()
    {
        try
        {
            for (int i = 0; i &lt; 10; i ++)
            System.out.println();
        }
        catch (Exception e)
        {
            System.out.println(&quot;Error limpiando la consola.\n(Error: &quot; + e + &quot;)&quot;);
        }
    }
}
[/code]

