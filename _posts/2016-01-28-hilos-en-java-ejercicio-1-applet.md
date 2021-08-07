---
title: "Hilos en JAVA, ejercicio nivel avanzado 1.1 (applet)"
date: "2016-01-28"
---

A continuaciÃ³n se muestra una serie de 8 ejercicios que voya a ir mostrando tanto en consola como de forma grÃ¡fica mediante el uso de applets. Cabe de estacar que los he subido en orden incremental de dificultad, puesto que considero que asÃ­ facilitarÃ¡ su compresiÃ³n y futura aplicaciÃ³n.

Considero que el cÃ³digo es suficientemente explicativo como para no tener que documentarlo de forma explÃ­cita, no obstante si tienes alguna duda dÃ©jame un comentario y te lo explico lo antes posible.

El ejercicio estÃ¡ realizado mediante applets para que se realice la representaciÃ³n grÃ¡fica del proceso, siendo una implantaciÃ³n del [anterior](http://localhost/hilos-en-java-ejercicio-1/), la cola de espera de un supermercado.

Recuerdo los requisitos, una caja por la cual se realizarÃ¡ el cobro de los productos y un nÃºmero aleatorio de clientes por cada ejecuciÃ³n de la aplicaciÃ³n como de productos. La sincronizaciÃ³n de los hilos se realiza en la caja (Pipe), la cual solo podrÃ¡ cobrar un cliente y el resto se encontrarÃ¡n a la espera. Recordar que tanto los clientes como los productos que lleva cada uno en su cesta se generarÃ¡ de forma aleatoria al comienzo de la aplicaciÃ³n. Se ha asignado un tiempo de espera de 1 segundo por el cobro de cada producto unitario.

\[caption id="attachment\_943" align="aligncenter" width="200"\]![Jerarquia_clases_ejercicio_hilos_1](images/Jerarquia_clases_ejercicio_hilos_1.jpg) JerarquÃ­a de clases\[/caption\]

**Clase principal** _(Main.java)_ Es la que se ejecutarÃ¡ en primera instancia, y contendrÃ¡ un array de clientes y realizarÃ¡ tanto la creaciÃ³n de la caja (Pipe) como de los clientes (Threads).

\[code language="java"\]

import Hilo.Hilo; import Hilo.Pipe; import java.applet.Applet; import java.awt.Color; import java.awt.Graphics; import java.awt.Image; import java.awt.image.BufferedImage; import java.io.IOException; import java.net.URL; import java.util.ArrayList; import javax.imageio.ImageIO;

/\*\* \* \* @author RubÃ©n \*/ public class Main extends Applet implements Runnable {

private static int anchoPantalla = 600; private static int numClientes = 5; private static int numProductos = 5; private static ArrayList&amp;amp;lt;Hilo&amp;amp;gt; listaClientes; private static Pipe caja; private BufferedImage fondoPantalla; private Image imagenCliente, imagenCajaCerrada; private URL urlFondoPantalla, urlImagenCliente, urlImagenCajaCerrada; private Graphics pantalla; private Image offscreen;

@Override public void init() { setSize(anchoPantalla, 250); offscreen = createImage(getWidth(), getHeight()); pantalla = offscreen.getGraphics(); try { urlFondoPantalla = new URL(getCodeBase(), &amp;amp;quot;imagenes/caja\_vacia.jpg&amp;amp;quot;); urlImagenCliente = new URL(getCodeBase(), &amp;amp;quot;imagenes/cliente.jpg&amp;amp;quot;); urlImagenCajaCerrada = new URL(getCodeBase(), &amp;amp;quot;imagenes/caja\_cerrada.png&amp;amp;quot;); fondoPantalla = ImageIO.read(urlFondoPantalla); imagenCliente = getImage(urlImagenCliente); imagenCajaCerrada = getImage(urlImagenCajaCerrada); } catch (IOException e) { System.out.println(&amp;amp;quot;Error en la ruta de la imagen: &amp;amp;quot; + e); } listaClientes = new ArrayList&amp;amp;lt;&amp;amp;gt;(); caja = new Pipe(numClientes, this); iniciarCaja(); }

@Override public void start() { iniciarCobroCliente(); }

@Override public void stop() { caja = null; listaClientes.removeAll(listaClientes); }

@Override public void run() { for (int i = 0; i &amp;amp;lt; listaClientes.size(); i++) { while (listaClientes.get(i) != null &amp;amp;amp;&amp;amp;amp; listaClientes.get(i).isAlive()) { repaint(); } }

}

@Override public void update(Graphics g) { paint(g); }

@Override public void paint(Graphics g) { pantalla.drawImage(fondoPantalla, 0, 0, getWidth(), getHeight(), this); moverClientes(); g.drawImage(offscreen, 0, 0, this); }

private void iniciarCaja() { for (int i = 0; i &amp;amp;lt; caja.generarAleatorio(1, numClientes); i++) { System.out.println(&amp;amp;quot;El cliente &amp;amp;quot; + (i) + &amp;amp;quot; se ha puesto en cola.&amp;amp;quot;); listaClientes.add(new Hilo(i, numProductos, caja)); } }

private static void iniciarCobroCliente() { for (int i = 0; i &amp;amp;lt; listaClientes.size(); i++) { listaClientes.get(i).start(); } System.out.println(&amp;amp;quot;\\nPasen por caja por favor...&amp;amp;quot;); System.out.println(&amp;amp;quot;---------------------------&amp;amp;quot;); }

private void moverClientes() { int\[\] clientes = caja.getClientes(); int terminado = 0; for (int i = 0; i &amp;amp;lt; listaClientes.size(); i++) { if (listaClientes.get(i).getNumProductos() &amp;amp;gt; clientes\[i\]) { pantalla.drawImage(imagenCliente, ((getWidth() - 220) - (listaClientes.size() \* 50)) + (i \* 50), 0, 50, 250, this); //(getWidth()-265) posiciÃ³n caja pantalla.drawString(listaClientes.get(i).getNumProductos() + &amp;amp;quot; prod.&amp;amp;quot;, ((getWidth() - 220) - (listaClientes.size() \* 50)) + (i \* 50), 240); } else if (listaClientes.get(i).getNumProductos() == clientes\[i\]) { terminado++; } } if (terminado == listaClientes.size()) { pantalla.setColor(Color.red); pantalla.drawImage(imagenCajaCerrada, (getWidth() - 260), 50, 75, 75, this); //(getWidth()-265) posiciÃ³n caja pantalla.drawString(&amp;amp;quot;La caja se ha cerrado.&amp;amp;quot;, (getWidth() - 200), 240); } else { pantalla.setColor(Color.blue); pantalla.drawString(&amp;amp;quot;Cobrando al cliente &amp;amp;quot; + (terminado + 1) + &amp;amp;quot; el producto &amp;amp;quot; + (clientes\[terminado\] + 1), (getWidth() - 200), 240); } }

}

\[/code\]

**Clase Cliente** _(Hilo.java)_ Esta clase es la que se va a ir ejectando por cada hilo, es el hilo propiamente. Por ello el constructor, nos devolverÃ¡s sus propiedades, tales como el nombre o el Pipe en el que se encuentra en el momento.

\[code language="java"\] package Hilo;

import java.applet.Applet; import java.util.Arrays;

public class Hilo extends Thread {

private Pipe caja; private int nombre, ultimoCobrado; private int\[\] productos;

public Hilo(int nombre, int numProductos, Pipe caja) { this.nombre = nombre; this.caja = caja; ultimoCobrado = -1; this.setName(String.valueOf(nombre)); productos = new int\[caja.generarAleatorio(1, numProductos)\]; for (int i = 0; i &amp;amp;lt; productos.length; i++) { productos\[i\] = caja.generarAleatorio(1, 10); } System.out.println(&amp;amp;quot;El cliente &amp;amp;quot; + (nombre) + &amp;amp;quot; lleva en la cesta &amp;amp;quot; + Arrays.toString(productos)); }

@Override public void run() { try { while (ultimoCobrado &amp;amp;lt; productos.length) { ultimoCobrado = caja.cobrar(nombre, productos); } } catch (InterruptedException ex) { System.out.println(&amp;amp;quot;ERROR: hilo bloqueado. &amp;amp;quot; + ex); } }

public int getNumProductos() { return productos.length; } public int getUltimoCobrado() { return ultimoCobrado; } }

\[/code\]

**Clase caja registradora** _(Pipe.java)_

Es aquÃ­ donde se gestiona realmente la sincronizaciÃ³n de los hilos. Se realiza el control de que solamente se atienda un hilo (el que primero lo solicite) y que se vayan realizando los cobros de los productos, 'durmiendo' la ejecuciÃ³n de este hilo durante 1 seg, el resto de hilos, conforme van solicitando el acceso y se les deniega, se les cambia el estado a 'dormido' para optimizar el rendimiento y evitar ciclos inecesarios de procesos independientes que requiere de un recurso que se encuentra ocupado, en este caso nuestra caja registradora.

Cuando finaliza la ejecuciÃ³n del hilo, se genera una excepciÃ³n de interrupciÃ³n para indicar que se pueden reactivar los hilos que se encontraban a la espera 'dormidos'.

\[code language="java"\] package Hilo;

import java.applet.Applet;

public class Pipe {

Applet escenario; private int ultimoCliente; private int\[\] clientes;

public Pipe(int numClientes, Applet escenario) { this.escenario = escenario; clientes = new int\[numClientes\]; for (int i = 0; i &amp;amp;lt; clientes.length; i++) { clientes\[i\] = 0; } ultimoCliente = 0; System.out.println(&amp;amp;quot;Se ha abierto la caja&amp;amp;quot;); System.out.println(&amp;amp;quot;---------------------&amp;amp;quot;); }

public synchronized int cobrar(int nombreHilo, int\[\] productos) throws InterruptedException { if (nombreHilo == ultimoCliente) { for (int i = 0; i &amp;amp;lt; productos.length; i++) { System.out.println(&amp;amp;quot;Cobrando...(&amp;amp;quot; + productos\[i\] + &amp;amp;quot; seg.)&amp;amp;quot;); clientes\[nombreHilo\]++; escenario.repaint(); Thread.sleep(productos\[i\] \* 1000); System.out.println(&amp;amp;quot;Se ha combrado: cliente &amp;amp;quot; + nombreHilo + &amp;amp;quot;, producto &amp;amp;quot; + i); } System.out.println(&amp;amp;quot;\\t\\t\\t\\t\\t\*\*\* El cliente &amp;amp;quot; + nombreHilo + &amp;amp;quot; ha pasado todos sus productos.&amp;amp;quot;); ultimoCliente = nombreHilo + 1; notifyAll(); } else { wait(); }

return clientes\[nombreHilo\]; }

public int\[\] getClientes() { return clientes; }

public int generarAleatorio(int min, int max) { return min + (int) (Math.random() \* max); }

}

\[/code\]

### Content License

Creative Commons [![License: CC BY-NC-ND 4.0](images/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [More info](https://creativecommons.org/licenses/by-nc-nd/4.0/)

Esta pÃ¡gina web y todo su contenido, incluido proyectos y cÃ³digo fuente, estÃ¡ licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [MÃ¡s info](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es)
