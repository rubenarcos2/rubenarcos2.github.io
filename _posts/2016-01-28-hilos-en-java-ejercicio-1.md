---
title: "Hilos en JAVA, ejercicio nivel avanzado 1.2 (consola)"
date: "2016-01-28"
---

A continuaciÃ³n se muestra una serie de 8 ejercicios que voya a ir mostrando tanto en consola como de forma grÃ¡fica mediante el uso de applets. Cabe de estacar que los he subido en orden incremental de dificultad, puesto que considero que asÃ­ facilitarÃ¡ su compresiÃ³n y futura aplicaciÃ³n.

Considero que el cÃ³digo es suficientemente explicativo como para no tener que documentarlo de forma explÃ­cita, no obstante si tienes alguna duda dÃ©jame un comentario y te lo explico lo antes posible.

El ejercicio estÃ¡ representado mediante lo cola de espera de un supermercado. Habiendo una caja por la cual se realizarÃ¡ el cobro de los productos y un nÃºmero aleatorio de clientes por cada ejecuciÃ³n de la aplicaciÃ³n como de productos. La sincronizaciÃ³n de los hilos se realiza en la caja (Pipe), la cual solo podrÃ¡ cobrar un cliente y el resto se encontrarÃ¡n a la espera. Recordar que tanto los clientes como los productos que lleva cada uno en su cesta se generarÃ¡ de forma aleatoria al comienzo de la aplicaciÃ³n. Se ha asignado un tiempo de espera de 1 segundo por el cobro de cada producto unitario.

 

\[caption id="attachment\_943" align="aligncenter" width="200"\]![Jerarquia_clases_ejercicio_hilos_1](images/Jerarquia_clases_ejercicio_hilos_1.jpg) JerarquÃ­a de clases\[/caption\]

**Clase principal** _(Main.java)_ Es la que se ejecutarÃ¡ en primera instancia, y contendrÃ¡ un array de clientes y realizarÃ¡ tanto la creaciÃ³n de la caja (Pipe) como de los clientes (Threads).

\[code language="java"\] import Hilo.Hilo; import Hilo.Pipe; import java.util.ArrayList;

public class Main {

private static int numClientes = 10; private static int numProductos = 5; private static ArrayList&amp;amp;lt;Hilo&amp;amp;gt; listaClientes; private static Pipe caja;

public static void main(String\[\] args) { caja = new Pipe(numClientes); listaClientes = new ArrayList&amp;amp;lt;&amp;amp;gt;(); iniciarCaja(); iniciarCobroCliente(); }

private static void iniciarCaja() { for (int i = 0; i &amp;amp;lt; caja.generarAleatorio(1, numClientes); i++) { System.out.println("El cliente " + (i) + " se ha puesto en cola."); listaClientes.add(new Hilo(i, numProductos, caja)); } }

private static void iniciarCobroCliente() { for (int i = 0; i &amp;amp;lt; listaClientes.size(); i++) { listaClientes.get(i).start(); } System.out.println("\\nPasen por caja por favor..."); System.out.println("---------------------------"); }

} \[/code\]

**Clase Cliente** _(Hilo.java)_ Esta clase es la que se va a ir ejectando por cada hilo, es el hilo propiamente. Por ello el constructor, nos devolverÃ¡s sus propiedades, tales como el nombre o el Pipe en el que se encuentra en el momento.

\[code language="java"\] package Hilo;

import java.util.Arrays;

public class Hilo extends Thread {

private Pipe caja; private int nombre, ultimoCobrado; private int\[\] productos;

public Hilo(int nombre, int numProductos, Pipe caja) { this.nombre = nombre; this.caja = caja; ultimoCobrado = -1; this.setName(String.valueOf(nombre)); productos = new int\[caja.generarAleatorio(1, numProductos)\]; for (int i = 0; i &amp;amp;lt; productos.length; i++) { productos\[i\] = caja.generarAleatorio(1, 10); } System.out.println("El cliente " + (nombre) + " lleva en la cesta " + Arrays.toString(productos)); }

@Override public void run() { try { while (ultimoCobrado &amp;amp;lt; productos.length) { ultimoCobrado = caja.cobrar(nombre, productos); } } catch (InterruptedException ex) { System.out.println("ERROR: hilo bloqueado. " + ex); } }

}

\[/code\]

**Clase caja registradora** _(Pipe.java)_

Es aquÃ­ donde se gestiona realmente la sincronizaciÃ³n de los hilos. Se realiza el control de que solamente se atienda un hilo (el que primero lo solicite) y que se vayan realizando los cobros de los productos, 'durmiendo' la ejecuciÃ³n de este hilo durante 1 seg, el resto de hilos, conforme van solicitando el acceso y se les deniega, se les cambia el estado a 'dormido' para optimizar el rendimiento y evitar ciclos inecesarios de procesos independientes que requiere de un recurso que se encuentra ocupado, en este caso nuestra caja registradora.

Cuando finaliza la ejecuciÃ³n del hilo, se genera una excepciÃ³n de interrupciÃ³n para indicar que se pueden reactivar los hilos que se encontraban a la espera 'dormidos'.

\[code language="java"\] package Hilo;

public class Pipe {

private int numClientes, ultimoCliente, cantProdCob; private int\[\]clientes;

public Pipe(int numClientes) { this.numClientes = numClientes; clientes = new int\[numClientes\]; for (int i = 0; i &amp;amp;lt; clientes.length; i++) { clientes\[i\] = 0; } ultimoCliente = 0; cantProdCob = 0; System.out.println("Se ha abierto la caja"); System.out.println("---------------------"); }

public synchronized int cobrar(int nombreHilo, int\[\] productos) throws InterruptedException { if (nombreHilo == ultimoCliente) { for (int i = 0; i &amp;amp;lt; productos.length; i++) { System.out.println("Cobrando...("+productos\[i\]+" seg.)"); clientes\[nombreHilo\]++; Thread.sleep(productos\[i\] \* 1000); System.out.println("Se ha combrado: cliente " + nombreHilo + ", producto " + i); } System.out.println("\\t\\t\\t\\t\\t\*\*\* El cliente " + nombreHilo + " ha pasado todos sus productos."); ultimoCliente=nombreHilo+1; notifyAll(); }else{ wait(); } return clientes\[nombreHilo\]; }

public int generarAleatorio(int min, int max) { return min + (int) (Math.random() \* max); }

} \[/code\]

### Content License

Creative Commons [![License: CC BY-NC-ND 4.0](images/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [More info](https://creativecommons.org/licenses/by-nc-nd/4.0/)

Esta pÃ¡gina web y todo su contenido, incluido proyectos y cÃ³digo fuente, estÃ¡ licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [MÃ¡s info](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es)
