---
layout: post
title: WebAPI RESTful Arduino - Raspberry con Spring [Borrador]
date: 2018-10-19 16:46
author: ruben
comments: true
category: Blog
tags: [arduino, Bases de Datos, Blog, C#, IoT, Java, java, restful, spring, tomcat, webapi]
---
He realizado el siguiente proyecto de pruebas RESTful para la comunicación mediante una interfaz cliente en Arduino y Raspberry pi y con un servidor basado en Spring para la gestión de la API. En ambos clientes se dispone de acceso a los elementos físicos de hardware mediante comunicación I/O a las GPIOs correspondientes.


La idea de realización consiste en la gestión de un contador basado e instalado en una placa Arduino Uno que consta de un botón y un display LED para la visualización del mismo, a su vez el programa de este gestiona la posibilidad de incremento físico del contador (mediante el botón), como mediante la recepción exterior por el puerto COM (USB) y la asignación de un valor específico recibido en remoto.

Por otra parte la placa Raspberry Pi, alberga el servidor de gestión de la API, la comunicación con Arduino Uno (mediante USB, aunque podrá haberse instalado online: bluetooth, wifi local/nube) y a la GPIO.


El consumo de la API se podrá realizar a través de cualquier cliente HTTP, bien sea web o App Android, por ejemplo (estando en construcción esta ultima, que mostrar aquí en breve, cuando esté libre de errores).


![/assets/images/diagrama_sistema-150x150.jpg](Esquema con el diseño proyectado del sistema)


<h4><strong>Composición y diseño:</strong></h4>
<ul>
 	<li>Hardware: Arduino</li>
</ul>
<p style="padding-left: 120px;">- Display LED numérico y Botón con comunicación I/O sobre COM port</p>
<p style="padding-left: 120px;">- C-Arduino comunnication I/O COM port, Display LED output, Botón input, Contador</p>

<ul>
 	<li>Middleware & Server: Raspberry Pi</li>
</ul>
<p style="padding-left: 120px;">- Tomcat con Spring WebAPI services</p>
<p style="padding-left: 120px;">- Raspberry Py I/O GPIO controller, LED pin out</p>

<ul>
 	<li>Client: Cualquier conexión HTTP</li>
</ul>
<p style="padding-left: 120px;">HTTP API consume: Web & App Android</p>


<h4><strong>Elementos de Hardware</strong> que componen el sistema:</h4>


[gallery columns="4" ids="1410,1415,1412,1413"]


<h3>La creación del servidor</h3>

El servidor se ha creado mediante el framework de Spring incluyendo:
<ul>
 	<li>Comunicación DB mediante JPA e Hibernate</li>
 	<li>SSH para depuración y deploy remoto en Raspberry Pi</li>
 	<li>Gestión HTTP para los controller de la API</li>
 	<li>Comunicación y gestión de puertos GPIO (elementos físicos de hardware)
<ul>
 	<li>Arduino con conexión COM (USB) a Raspberry Pi</li>
 	<li>GPIO I/O Raspberry Pi</li>
</ul>
</li>
 	<li>Generador aleatorio de nombres (crea los datos de la DB con formatos 'previsibles'</li>
</ul>


<blockquote><em>Destacar que está pendiente de implementar lo incorporación de seguridad (Spring Security) y encriptación de las comunicaciones mediante HTTPS y DB de datos sensibles</em></blockquote>

<img src="/assets/images/proyecto_server.jpg" alt="" width="185" height="464" />

En el servidor se encuentra toda gestión de la comunicación con la DB, también están los DTO (modelos de datos que se publican en la api para su futuro consumo desde un app Android), los controladores: datos de la DB (DTOs), Contador Android, LED en Raspberry pi y sus correspondientes driver para acceso a GPIO y comunicación puerto COM.


La compilación, depuración y deploy se está realizando en remoto desde un PC que se encuentra en la misma (o no) red que la Raspberry Pi, a la que se ataca mediante SSH para su control y subida de ficheros. La configuración de esta conexión se encuentra declarada el pom.xml, pero está prevista la externalización a un fichero externo encriptado (esta retrasado por la dependencia de una librería de terceros).


A continuación se muestra el transcurso de un funcionamiento esperado para sistema:
<ol>
 	<li>Deploy remoto en raspberry</li>
 	<li>Encendido y comunicación Raspberry & Arduino</li>
 	<li>Puesta en marcha e incremento contador</li>
 	<li>Consumo API y modificación contador desde esta</li>
</ol>


*Incremento del contador de forma manual (mediante botón físico) y comunición Arduino & Raspberry Pi 
mediante puerto COM y consumo API obtención contador*
[video src="/assets/video/arduino_on_manual.mp4" autoplay="false" preload="auto"][/video]

*Comunicación Raspberry Pi GPIO desde servidor mediante consumo API, control y obtención estado LED*
[video src="/assets/video/raspberry_led.mp4" autoplay="false" preload="auto"][/video]

*Comunicación Raspberry Pi & Arduino desde servidor mediante consumo API, control contador*
[video src="/assets/video/arduino_ctrl_api.mp4" autoplay="false" preload="auto"][/video]



<h5 class="entry-title">Content License <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" alt="Creative Commons License: CC BY-NC-ND 4.0" /></a></h5>

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">More info</a>

Esta página web y todo su contenido, incluido proyectos y código fuente, está licenciada bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es">Más info</a>