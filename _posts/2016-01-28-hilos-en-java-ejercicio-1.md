---
layout: post
title: Hilos en JAVA, ejercicio nivel avanzado 1.2 (consola)
date: 2016-01-28 17:59
author: ruben
comments: true
categories: [Blog, ejercicios, hilos, Java, java, Proyectos y prÃ¡cticas, threads]
---
<p style="text-align: justify;">A continuaciÃ³n se muestra una serie de 8 ejercicios que voya a ir mostrando tanto en consola como de forma grÃ¡fica mediante el uso de applets. Cabe de estacar que los he subido en orden incremental de dificultad, puesto que considero que asÃ­ facilitarÃ¡ su compresiÃ³n y futura aplicaciÃ³n.</p>
<p style="text-align: justify;"><!--more--></p>
<p style="text-align: justify;">Considero que el cÃ³digo es suficientemente explicativo como para no tener que documentarlo de forma explÃ­cita, no obstante si tienes alguna duda dÃ©jame un comentario y te lo explico lo antes posible.</p>
<p style="text-align: justify;">El ejercicio estÃ¡ representado mediante lo cola de espera de un supermercado. Habiendo una caja por la cual se realizarÃ¡ el cobro de los productos y un nÃºmero aleatorio de clientes por cada ejecuciÃ³n de la aplicaciÃ³n como de productos. La sincronizaciÃ³n de los hilos se realiza en la caja (Pipe), la cual solo podrÃ¡ cobrar un cliente y el resto se encontrarÃ¡n a la espera. Recordar que tanto los clientes como los productos que lleva cada uno en su cesta se generarÃ¡ de forma aleatoria al comienzo de la aplicaciÃ³n. Se ha asignado un tiempo de espera de 1 segundo por el cobro de cada producto unitario.</p>
&nbsp;

[caption id="attachment_943" align="aligncenter" width="200"]<img class="wp-image-943 size-full" src="http://localhost/wp-content/uploads/2017/01/Jerarquia_clases_ejercicio_hilos_1.jpg" alt="Jerarquia_clases_ejercicio_hilos_1" width="200" height="110" /> JerarquÃ­a de clases[/caption]
<p style="text-align: justify;"><strong>Clase principal</strong> <em>(Main.java)</em>
Es la que se ejecutarÃ¡ en primera instancia, y contendrÃ¡ un array de clientes y realizarÃ¡ tanto la creaciÃ³n de la caja (Pipe) como de los clientes (Threads).</p>


[code language="java"]
import Hilo.Hilo;
import Hilo.Pipe;
import java.util.ArrayList;

public class Main {

    private static int numClientes = 10;
    private static int numProductos = 5;
    private static ArrayList&amp;amp;amp;lt;Hilo&amp;amp;amp;gt; listaClientes;
    private static Pipe caja;

    public static void main(String[] args) {
        caja = new Pipe(numClientes);
        listaClientes = new ArrayList&amp;amp;amp;lt;&amp;amp;amp;gt;();
        iniciarCaja();
        iniciarCobroCliente();
    }

    private static void iniciarCaja() {
        for (int i = 0; i &amp;amp;amp;lt; caja.generarAleatorio(1, numClientes); i++) {
            System.out.println(&quot;El cliente &quot; + (i) + &quot; se ha puesto en cola.&quot;);
            listaClientes.add(new Hilo(i, numProductos, caja));
        }
    }

    private static void iniciarCobroCliente() {
        for (int i = 0; i &amp;amp;amp;lt; listaClientes.size(); i++) {
            listaClientes.get(i).start();
        }
        System.out.println(&quot;\nPasen por caja por favor...&quot;);
        System.out.println(&quot;---------------------------&quot;);
    }

}
[/code]

<p style="text-align: justify;"><strong>Clase Cliente</strong><em> (Hilo.java)</em>
Esta clase es la que se va a ir ejectando por cada hilo, es el hilo propiamente. Por ello el constructor, nos devolverÃ¡s sus propiedades, tales como el nombre o el Pipe en el que se encuentra en el momento.</p>


[code language="java"]
package Hilo;

import java.util.Arrays;

public class Hilo extends Thread {

    private Pipe caja;
    private int nombre, ultimoCobrado;
    private int[] productos;

    public Hilo(int nombre, int numProductos, Pipe caja) {
        this.nombre = nombre;
        this.caja = caja;
        ultimoCobrado = -1;
        this.setName(String.valueOf(nombre));
        productos = new int[caja.generarAleatorio(1, numProductos)];
        for (int i = 0; i &amp;amp;amp;lt; productos.length; i++) {
            productos[i] = caja.generarAleatorio(1, 10);
        }
        System.out.println(&quot;El cliente &quot; + (nombre) + &quot; lleva en la cesta &quot; + Arrays.toString(productos));
    }

    @Override
    public void run() {
        try {
            while (ultimoCobrado &amp;amp;amp;lt; productos.length) {
                ultimoCobrado = caja.cobrar(nombre, productos);
            }
        } catch (InterruptedException ex) {
            System.out.println(&quot;ERROR: hilo bloqueado. &quot; + ex);
        }
    }

}

[/code]

<strong>Clase caja registradora</strong> <em>(Pipe.java)</em>
<p style="text-align: justify;">Es aquÃ­ donde se gestiona realmente la sincronizaciÃ³n de los hilos. Se realiza el control de que solamente se atienda un hilo (el que primero lo solicite) y que se vayan realizando los cobros de los productos, 'durmiendo' la ejecuciÃ³n de este hilo durante 1 seg, el resto de hilos, conforme van solicitando el acceso y se les deniega, se les cambia el estado a 'dormido' para optimizar el rendimiento y evitar ciclos inecesarios de procesos independientes que requiere de un recurso que se encuentra ocupado, en este caso nuestra caja registradora.</p>
<p style="text-align: justify;">Cuando finaliza la ejecuciÃ³n del hilo, se genera una excepciÃ³n de interrupciÃ³n para indicar que se pueden reactivar los hilos que se encontraban a la espera 'dormidos'.</p>


[code language="java"]
package Hilo;

public class Pipe {

    private int numClientes, ultimoCliente, cantProdCob;
    private int[]clientes;

    public Pipe(int numClientes) {
        this.numClientes = numClientes;
        clientes = new int[numClientes];
        for (int i = 0; i &amp;amp;amp;lt; clientes.length; i++) {
            clientes[i] = 0;
        }
        ultimoCliente = 0;
        cantProdCob = 0;
        System.out.println(&quot;Se ha abierto la caja&quot;);
        System.out.println(&quot;---------------------&quot;);
    }

    public synchronized int cobrar(int nombreHilo, int[] productos) throws InterruptedException {
        if (nombreHilo == ultimoCliente) {
            for (int i = 0; i &amp;amp;amp;lt; productos.length; i++) {
                System.out.println(&quot;Cobrando...(&quot;+productos[i]+&quot; seg.)&quot;);
                clientes[nombreHilo]++;
                Thread.sleep(productos[i] * 1000);
                System.out.println(&quot;Se ha combrado: cliente &quot; + nombreHilo + &quot;, producto &quot; + i);
            }
            System.out.println(&quot;\t\t\t\t\t*** El cliente &quot; + nombreHilo + &quot; ha pasado todos sus productos.&quot;);
            ultimoCliente=nombreHilo+1;
            notifyAll();
        }else{
            wait();
        }
        
        return clientes[nombreHilo];
    }

    public int generarAleatorio(int min, int max) {
        return min + (int) (Math.random() * max);
    }

}
[/code]

<h3></h3>
<h3 class="entry-title">Content License</h3>
Creative Commons <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" alt="License: CC BY-NC-ND 4.0" /></a>
<div class="entry-content description clearfix">

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">More info</a>

Esta pÃ¡gina web y todo su contenido, incluido proyectos y cÃ³digo fuente, estÃ¡ licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es">MÃ¡s info</a>

</div>
