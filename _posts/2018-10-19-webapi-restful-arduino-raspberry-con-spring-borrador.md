---
layout: post
title: WebAPI RESTful Arduino - Raspberry con Spring [Borrador]
date: 2018-10-19 16:46
author: ruben
comments: true
category: Blog
tags: [arduino, Bases de Datos, Blog, C#, IoT, Java, java, restful, spring, tomcat, webapi]
---
He realizado el siguiente proyecto de pruebas RESTful para la comunicaciÃ³n mediante una interfaz cliente en Arduino y Raspberry pi y con un servidor basado en Spring para la gestiÃ³n de la API. En ambos clientes se dispone de acceso a los elementos fÃ­sicos de hardware mediante comunicaciÃ³n I/O a las GPIOs correspondientes.

&nbsp;

La idea de realizaciÃ³n consiste en la gestiÃ³n de un contador basado e instalado en una placa Arduino Uno que consta de un botÃ³n y un display LED para la visualizaciÃ³n del mismo, a su vez el programa de este gestiona la posibilidad de incremento fÃ­sico del contador (mediante el botÃ³n), como mediante la recepciÃ³n exterior por el puerto COM (USB) y la asignaciÃ³n de un valor expecÃ­fico recibido en remoto.

Por otra parte la placa Raspberry Pi, alberga el servidor de gestiÃ³ de la API, la comunicaciÃ³n con Arduino Uno (mediante USB, aunque podrÃ­a haberse instalado online: bluetooth, wifi local/nube) y a la GPIO.

&nbsp;

El consumo de la API se podrÃ¡ realizar a travÃ©s de cualquier cliente HTTP, bien sea web o App Android, por ejemplo (estando en construcciÃ³n esta Ãºltima, que mostrarÃ© aquÃ­ en breve, cuando estÃ© libre de errores).

<!--more-->

&nbsp;

[caption id="attachment_1428" align="alignright" width="150"]<a href="http://localhost/webapi-restful-arduino-raspberry-con-spring-borrador/diagrama_sistema/"><img class="wp-image-1428 size-thumbnail" src="http://localhost/wp-content/uploads/2018/10/diagrama_sistema-150x150.jpg" alt="" width="150" height="150" /></a> Esquema con el diseÃ±o proyectado del sistema[/caption]
<h4><strong>ComposiciÃ³n y diseÃ±o:</strong></h4>
<ul>
 	<li>HardwareÂ Â  : Arduino</li>
</ul>
<p style="padding-left: 120px;">Â Display LED numÃ©rico y BotÃ³n con comunicaciÃ³n I/O sobre COM port</p>
<p style="padding-left: 120px;">Â C-Arduino comunnication I/O COM port, Display LED output, BotÃ³n input, Contador</p>

<ul>
 	<li>Middleware &amp; Server : Raspberry Pi</li>
</ul>
<p style="padding-left: 120px;">Â Tomcat con Spring WebAPI services</p>
<p style="padding-left: 90px;">Â Â Â Â Â Â Â  Raspberry Py I/O GPIO controller, LED pin out</p>

<ul>
 	<li>Client : Cualquier conexiÃ³n HTTP</li>
</ul>
<p style="padding-left: 120px;">HTTP API consume: Web &amp; App Android</p>
&nbsp;
<h4><strong>Elementos de Hardware</strong> que componen el sistema:</h4>
&nbsp;

[gallery columns="4" ids="1410,1415,1412,1413"]

&nbsp;
<h3>La creaciÃ³n del servidor</h3>
El servidor se ha creado mediante el framework de Spring incluyendo:
<ul>
 	<li>ComunicaciÃ³n DB mediante JPA e Hibernate</li>
 	<li>SSH para depuraciÃ³n y deploy remoto en Raspberry Pi</li>
 	<li>GestiÃ³n HTTP para los controller de la API</li>
 	<li>ComunicaciÃ³n y gestiÃ³n de puertos GPIO (elementos fÃ­sicos de hardware)
<ul>
 	<li>Arduino con conexiÃ³n COM (USB) a Raspberry Pi</li>
 	<li>GPIO I/O Raspberry Pi</li>
</ul>
</li>
 	<li>Generador aleatorio de nombres (crea los datos de la DB con formatos 'previsibles'</li>
</ul>
&nbsp;
<blockquote><em>Destacar que estÃ¡ pendiente de implementar lo incorporaciÃ³n de seguridad (Spring Security) y encriptaciÃ³n de las comunicaciones mediante HTTPS y DB de datos sensibles</em></blockquote>
<a href="http://localhost/webapi-restful-arduino-raspberry-con-spring-borrador/proyecto_server/" rel="attachment wp-att-1442"><img class="alignright wp-image-1442 size-full" src="http://localhost/wp-content/uploads/2018/11/proyecto_server.jpg" alt="" width="185" height="464" /></a><a href="http://localhost/webapi-restful-arduino-raspberry-con-spring-borrador/proyecto_server/" rel="attachment wp-att-1488"><img class="alignright size-medium wp-image-1488" style="display: none !important;" hidden="" src="http://localhost/wp-content/uploads/2018/11/proyecto_server.jpg" alt="" width="120" height="300" /></a>En el servidor se encuentra toda gestiÃ³n de la comunicaciÃ³n con la DB, tambiÃ©n estÃ¡n los DTO (modelos de datos que se publican en la api para su futuro consumo desde un app Android), los controladores: datos de la DB (DTOs), Contador Android, LED en Raspberry pi y sus correspodientes driver para acceso a GPIO y comunicaciÃ³n puerto COM.

&nbsp;

La compilaciÃ³n, depuraciÃ³n y deploy se estÃ¡ realizando en remoto desde un PC que se encuentra en la misma (o no) red que la Raspberry Pi, a la que se ataca mediante SSH para su control y subida de ficheros. La configuraciÃ³n de esta conexiÃ³n se encuentra declarada el pom.xml, pero estÃ¡ prevista la externalizaciÃ³n a un fichero externo encriptado (estÃ¡ retrasado por la dependencia de una librerÃ­a de terceros).

&nbsp;

A continuaciÃ³n se muestra el transcurso de un funcionamiento esperado para sistema:
<ol>
 	<li>Deploy remoto en raspberry</li>
 	<li>Encendido y comunicaciÃ³n Raspberry&lt;-&gt;Arduino</li>
 	<li>Puesta en marcha e incremento contador</li>
 	<li>Consumo API y modificaciÃ³n contador desde esta</li>
</ol>
&nbsp;
<pre>Incremento del contador de forma manual (mediante botÃ³n fÃ­sico) y comuniciÃ³n Arduino &gt; Raspberry Pi 
mediante puerto COM y consumo API obtenciÃ³n contador</pre>
[video src="http://localhost/wp-content/uploads/2018/10/arduino_on_manual.mp4" autoplay="false" preload="auto"][/video]
<pre>ComunicaciÃ³n Raspberry Pi GPIO desde servidor mediante consumo API, control y obtenciÃ³n estado LED</pre>
[video src="http://localhost/wp-content/uploads/2018/10/raspberry_led.mp4" autoplay="false" preload="auto"][/video]
<pre>ComunicaciÃ³n Raspberry Pi &gt; Arduino desde servidor mediante consumo API, control contador</pre>
[video src="http://localhost/wp-content/uploads/2018/10/arduino_ctrl_api.mp4" autoplay="false" preload="auto"][/video]

&nbsp;
<h3 class="entry-title">Content License</h3>
Creative Commons <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" alt="License: CC BY-NC-ND 4.0" /></a>
<div class="entry-content description clearfix">

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">More info</a>

Esta pÃ¡gina web y todo su contenido, incluido proyectos y cÃ³digo fuente, estÃ¡ licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es">MÃ¡s info</a>

</div>
