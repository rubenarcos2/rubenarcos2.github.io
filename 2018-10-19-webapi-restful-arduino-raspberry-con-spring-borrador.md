---
title: "WebAPI RESTful Arduino - Raspberry con Spring [Borrador]"
date: "2018-10-19"
coverImage: "api_ardu_rasp.jpg"
---

He realizado el siguiente proyecto de pruebas RESTful para la comunicaciÃ³n mediante una interfaz cliente en Arduino y Raspberry pi y con un servidor basado en Spring para la gestiÃ³n de la API. En ambos clientes se dispone de acceso a los elementos fÃ­sicos de hardware mediante comunicaciÃ³n I/O a las GPIOs correspondientes.

 

La idea de realizaciÃ³n consiste en la gestiÃ³n de un contador basado e instalado en una placa Arduino Uno que consta de un botÃ³n y un display LED para la visualizaciÃ³n del mismo, a su vez el programa de este gestiona la posibilidad de incremento fÃ­sico del contador (mediante el botÃ³n), como mediante la recepciÃ³n exterior por el puerto COM (USB) y la asignaciÃ³n de un valor expecÃ­fico recibido en remoto.

Por otra parte la placa Raspberry Pi, alberga el servidor de gestiÃ³ de la API, la comunicaciÃ³n con Arduino Uno (mediante USB, aunque podrÃ­a haberse instalado online: bluetooth, wifi local/nube) y a la GPIO.

 

El consumo de la API se podrÃ¡ realizar a travÃ©s de cualquier cliente HTTP, bien sea web o App Android, por ejemplo (estando en construcciÃ³n esta Ãºltima, que mostrarÃ© aquÃ­ en breve, cuando estÃ© libre de errores).

 

\[caption id="attachment\_1428" align="alignright" width="150"\][![](images/diagrama_sistema-150x150.jpg)](http://localhost/webapi-restful-arduino-raspberry-con-spring-borrador/diagrama_sistema/) Esquema con el diseÃ±o proyectado del sistema\[/caption\]

#### **ComposiciÃ³n y diseÃ±o:**

- HardwareÂ Â  : Arduino

Â Display LED numÃ©rico y BotÃ³n con comunicaciÃ³n I/O sobre COM port

Â C-Arduino comunnication I/O COM port, Display LED output, BotÃ³n input, Contador

- Middleware & Server : Raspberry Pi

Â Tomcat con Spring WebAPI services

Â Â Â Â Â Â Â  Raspberry Py I/O GPIO controller, LED pin out

- Client : Cualquier conexiÃ³n HTTP

HTTP API consume: Web & App Android

 

#### **Elementos de Hardware** que componen el sistema:

 

\[gallery columns="4" ids="1410,1415,1412,1413"\]

 

### La creaciÃ³n del servidor

El servidor se ha creado mediante el framework de Spring incluyendo:

- ComunicaciÃ³n DB mediante JPA e Hibernate
- SSH para depuraciÃ³n y deploy remoto en Raspberry Pi
- GestiÃ³n HTTP para los controller de la API
- ComunicaciÃ³n y gestiÃ³n de puertos GPIO (elementos fÃ­sicos de hardware)
    - Arduino con conexiÃ³n COM (USB) a Raspberry Pi
    - GPIO I/O Raspberry Pi
- Generador aleatorio de nombres (crea los datos de la DB con formatos 'previsibles'

 

> _Destacar que estÃ¡ pendiente de implementar lo incorporaciÃ³n de seguridad (Spring Security) y encriptaciÃ³n de las comunicaciones mediante HTTPS y DB de datos sensibles_

[![](images/proyecto_server.jpg)](http://localhost/webapi-restful-arduino-raspberry-con-spring-borrador/proyecto_server/)[![](images/proyecto_server.jpg)](http://localhost/webapi-restful-arduino-raspberry-con-spring-borrador/proyecto_server/)En el servidor se encuentra toda gestiÃ³n de la comunicaciÃ³n con la DB, tambiÃ©n estÃ¡n los DTO (modelos de datos que se publican en la api para su futuro consumo desde un app Android), los controladores: datos de la DB (DTOs), Contador Android, LED en Raspberry pi y sus correspodientes driver para acceso a GPIO y comunicaciÃ³n puerto COM.

 

La compilaciÃ³n, depuraciÃ³n y deploy se estÃ¡ realizando en remoto desde un PC que se encuentra en la misma (o no) red que la Raspberry Pi, a la que se ataca mediante SSH para su control y subida de ficheros. La configuraciÃ³n de esta conexiÃ³n se encuentra declarada el pom.xml, pero estÃ¡ prevista la externalizaciÃ³n a un fichero externo encriptado (estÃ¡ retrasado por la dependencia de una librerÃ­a de terceros).

 

A continuaciÃ³n se muestra el transcurso de un funcionamiento esperado para sistema:

1. Deploy remoto en raspberry
2. Encendido y comunicaciÃ³n Raspberry<->Arduino
3. Puesta en marcha e incremento contador
4. Consumo API y modificaciÃ³n contador desde esta

 

Incremento del contador de forma manual (mediante botÃ³n fÃ­sico) y comuniciÃ³n Arduino > Raspberry Pi 
mediante puerto COM y consumo API obtenciÃ³n contador

\[video src="http://localhost/wp-content/uploads/2018/10/arduino\_on\_manual.mp4" autoplay="false" preload="auto"\]\[/video\]

ComunicaciÃ³n Raspberry Pi GPIO desde servidor mediante consumo API, control y obtenciÃ³n estado LED

\[video src="http://localhost/wp-content/uploads/2018/10/raspberry\_led.mp4" autoplay="false" preload="auto"\]\[/video\]

ComunicaciÃ³n Raspberry Pi > Arduino desde servidor mediante consumo API, control contador

\[video src="http://localhost/wp-content/uploads/2018/10/arduino\_ctrl\_api.mp4" autoplay="false" preload="auto"\]\[/video\]

 

### Content License

Creative Commons [![License: CC BY-NC-ND 4.0](images/88x31.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [More info](https://creativecommons.org/licenses/by-nc-nd/4.0/)

Esta pÃ¡gina web y todo su contenido, incluido proyectos y cÃ³digo fuente, estÃ¡ licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [MÃ¡s info](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es)
