---
layout: post
title: Tutorial instalaciÃ³n Raspberry Pi 3 [Borrador]
date: 2018-02-13 19:35
author: ruben
comments: true
categories: [Blog, blog, borrador, IoT, iot, raspberry, tutorial]
---
<h1 style="text-align: center;">Tutorial Raspberry pi 3</h1>
<h2>Primeros pasos</h2>
<h3>InstalaciÃ³n</h3>
<ul>
 	<li>Diferencia entre NOOBS y Raspibian</li>
 	<li>Enlaces de descarga y capturas</li>
 	<li>ExplicaciÃ³n instalaciÃ³n multiboot</li>
</ul>
<h3>Puesta en marcha Raspibian</h3>
<ul>
 	<li>Inicio por primera vez
<ul>
 	<li>ConfiguraciÃ³n wifi</li>
 	<li>ActivaciÃ³n de procesos: SSH y VNC</li>
 	<li>PersonalizaciÃ³n del entorno: fondo, barra transparente y sensor temperatura</li>
</ul>
</li>
 	<li>ModificaciÃ³n de configuraciÃ³n resoluciÃ³n de pantalla
<ul>
 	<li>Cambiar resoluciÃ³n para modo HDMI remoto: http://elinux.org/RPiconfig</li>
 	<li>sudo nano /boot/config.txt</li>
 	<li># NOOBS Auto-generated Settings:</li>
 	<li>hdmi_force_hotplug=1</li>
 	<li>#Modificaciones para conexiÃ³n VNC - CÃ¡mbio de resoluciÃ³n sin HDMI</li>
 	<li>hdmi_group=2</li>
 	<li>hdmi_mode=39 #(1360x768 60 Hz)</li>
</ul>
</li>
</ul>
2Âº opciÃ³n (modo seguro):
<ul>
 	<li>hdmi_force_hotplug=1</li>
 	<li>hdmi_group=2</li>
 	<li>hdmi_mode=9</li>
</ul>
<ul>
 	<li>InstalaciÃ³n de VNC viewer y SSH en PC cliente.
<ul>
 	<li>VNC-Viewer-6.0.1-Windows-64bit</li>
 	<li>Putty SSH</li>
</ul>
</li>
</ul>
<h3>Puesta en marcha Windows 10 IoT</h3>
<ul>
 	<li>Inicio por primera vez
<ul>
 	<li>ConfiguraciÃ³n wifi</li>
 	<li><a href="https://developer.microsoft.com/en-us/windows/iot/docs/deviceportal">https://developer.microsoft.com/en-us/windows/iot/docs/deviceportal</a></li>
</ul>
</li>
 	<li>InstalaciÃ³n de las herramientas del entorno en PC cliente.
<ul>
 	<li>https://developer.microsoft.com/en-us/windows/iot/docs/remotedisplay</li>
 	<li>Windows 10 IoT Core Dashboard</li>
 	<li>Windows IoT Remote Client (Preview)</li>
</ul>
</li>
 	<li>AdministraciÃ³n
<ul>
 	<li>Acceso a la administraciÃ³n: <a href="http://IP_Raspberry_Pi:8080">http://IP_Raspberry_Pi:8080</a></li>
 	<li>Modificar contraseÃ±a y configurar franja horaria</li>
 	<li>Activar el modo debug y remoto</li>
 	<li>Mostrar opciones de la administraciÃ³n del S.O.</li>
</ul>
</li>
</ul>
<h2>CreaciÃ³n del primero programa</h2>
<h3>Raspibian</h3>
<h4>Java</h4>
Para el acceso al GPIO es necesario la librerÃ­a http://pi4j.com y para ver el mapeo de los pines:

<a href="http://pi4j.com/example/control.html">http://pi4j.com/example/control.html</a>

Tutorial: <a href="https://cafelojano.wordpress.com/2014/03/16/java-7-y-raspberry-pi-gpio-with-pi4j/">https://cafelojano.wordpress.com/2014/03/16/java-7-y-raspberry-pi-gpio-with-pi4j/</a>

&nbsp;
<h3>Windows 10 IoT</h3>
<h4>Visual Studio</h4>
<ul>
 	<li>Visual Studio Community 2015</li>
 	<li>Update 3</li>
 	<li>Universal Windows App Development Tools</li>
 	<li>Permisos de debug y conexiÃ³n remotas activas en Raspberry Pi, para poder depurar e instalar desde Visual Studio.</li>
</ul>
Errores: <a href="http://stackoverflow.com/questions/31983150/windows-universal-app-development-template-load-error">http://stackoverflow.com/questions/31983150/windows-universal-app-development-template-load-error</a>
