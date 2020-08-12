---
layout: post
title: WebAPI RESTful Arduino - Raspberry con Spring
date: 2018-10-19 16:46
author: ruben
comments: true
excerpt_separator: <!--more-->
category: Blog
tags: [arduino, Bases de Datos, Blog, C#, IoT, Java, java, restful, spring, tomcat, webapi]
---
<p align="justify">
	He realizado el siguiente proyecto de pruebas RESTful para la comunicación mediante una interfaz cliente en Arduino y Raspberry pi y con un servidor basado en Spring para la gestión de la API. En ambos clientes se dispone de acceso a los elementos físicos de hardware mediante comunicación I/O a las GPIOs correspondientes.

	<!--more-->

	La idea de realización consiste en la gestión de un contador basado e instalado en una placa Arduino Uno que consta de un botón y un display LED para la visualización del mismo, a su vez el programa de este gestiona la posibilidad de incremento físico del contador (mediante el botón), como mediante la recepción exterior por el puerto COM (USB) y la asignación de un valor específico recibido en remoto.

	Por otra parte la placa Raspberry Pi, alberga el servidor de gestión de la API, la comunicación con Arduino Uno (mediante USB, aunque podrá haberse instalado online: bluetooth, wifi local/nube) y a la GPIO.


	El consumo de la API se podrá realizar a través de cualquier cliente HTTP, bien sea web o App Android, por ejemplo (estando en construcción esta ultima, que mostrar aquí en breve, cuando esté libre de errores).
</p>

![Esquema con el diseño proyectado del sistema](/assets/images/diagrama_sistema.jpg)

&nbsp;

<h3>Composición y diseño:</h3>
<ul>
 	<li>Hardware: Arduino</li>
</ul>
<p style="padding-left: 60px;">- Display LED numérico y Botón con comunicación I/O sobre COM port</p>
<p style="padding-left: 60px;">- C-Arduino comunnication I/O COM port, Display LED output, Botón input, Contador</p>

<ul>
 	<li>Middleware & Server: Raspberry Pi</li>
</ul>
<p style="padding-left: 60px;">- Tomcat con Spring WebAPI services</p>
<p style="padding-left: 60px;">- Raspberry Py I/O GPIO controller, LED pin out</p>

<ul>
 	<li>Client: Cualquier conexión HTTP</li>
</ul>
<p style="padding-left: 60px;">HTTP API consume: Web & App Android</p>

&nbsp;

<h3>Elementos de Hardware:</h3>


[gallery columns="4" ids="1410,1415,1412,1413"]

&nbsp;

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

&nbsp;

> Destacar que está pendiente de implementar lo incorporación de seguridad (Spring Security) y encriptación de las comunicaciones mediante HTTPS y DB de datos sensibles

&nbsp;

<img src="/assets/images/proyecto_server.jpg" alt="" width="185" height="464" style="float: right; margin-left: 10px;" />

<p align="justify">
	En el servidor se encuentra toda gestión de la comunicación con la DB, también están los DTO (modelos de datos que se publican en la api para su futuro consumo desde un app Android), los controladores: datos de la DB (DTOs), Contador Android, LED en Raspberry pi y sus correspondientes driver para acceso a GPIO y comunicación puerto COM.

	La compilación, depuración y deploy se está realizando en remoto desde un PC que se encuentra en la misma (o no) red que la Raspberry Pi, a la que se ataca mediante SSH para su control y subida de ficheros. La configuración de esta conexión se encuentra declarada el pom.xml, pero está prevista la externalización a un fichero externo encriptado (esta retrasado por la dependencia de una librería de terceros).
</p>

&nbsp;

A continuación se muestra el transcurso de un funcionamiento esperado para sistema:

* Deploy remoto en raspberry
* Encendido y comunicación Raspberry & Arduino
* Puesta en marcha e incremento contador
* Consumo API y modificación contador desde esta

&nbsp;

<p align="center">
	<video width="100%" controls controlsList="nodownload"> 
		<source src="/assets/video/arduino_on_manual.mp4" autoplay="false" type="video/mp4">
	</video>
	<h5><i>Incremento del contador de forma manual (mediante botón físico) y comunición Arduino & Raspberry Pi 
	mediante puerto COM y consumo API obtención contador</i><h5>

	<video width="100%" controls controlsList="nodownload"> 
		<source src="/assets/video/raspberry_led.mp4" autoplay="false" type="video/mp4">
	</video>
	<h5><i>Comunicación Raspberry Pi GPIO desde servidor mediante consumo API, control y obtención estado LED</i><h5>

	<video width="100%" controls controlsList="nodownload"> 
		<source src="/assets/video/arduino_ctrl_api.mp4" autoplay="false" type="video/mp4">
	</video>
	<h5><i>Comunicación Raspberry Pi & Arduino desde servidor mediante consumo API, control contador</i><h5>
</p>
&nbsp;
&nbsp;
&nbsp;
&nbsp;
<hr>
<h6>

	<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" alt="Creative Commons License: CC BY-NC-ND 4.0" /></a>
</p>
<p>
	This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
	<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">More info</a>
</p>
<p>
	Esta página web y todo su contenido, incluido proyectos y código fuente, está licenciada bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
	<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es">Más info</a></p>
</h6>