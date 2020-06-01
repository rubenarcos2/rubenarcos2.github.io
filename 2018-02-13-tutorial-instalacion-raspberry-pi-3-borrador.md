---
title: "Tutorial instalaciÃ³n Raspberry Pi 3 [Borrador]"
date: "2018-02-13"
coverImage: "602px-RPi-Logo-Stacked-Reg-SCREEN.png"
---

# Tutorial Raspberry pi 3

## Primeros pasos

### InstalaciÃ³n

- Diferencia entre NOOBS y Raspibian
- Enlaces de descarga y capturas
- ExplicaciÃ³n instalaciÃ³n multiboot

### Puesta en marcha Raspibian

- Inicio por primera vez
    - ConfiguraciÃ³n wifi
    - ActivaciÃ³n de procesos: SSH y VNC
    - PersonalizaciÃ³n del entorno: fondo, barra transparente y sensor temperatura
- ModificaciÃ³n de configuraciÃ³n resoluciÃ³n de pantalla
    - Cambiar resoluciÃ³n para modo HDMI remoto: http://elinux.org/RPiconfig
    - sudo nano /boot/config.txt
    - \# NOOBS Auto-generated Settings:
    - hdmi\_force\_hotplug=1
    - #Modificaciones para conexiÃ³n VNC - CÃ¡mbio de resoluciÃ³n sin HDMI
    - hdmi\_group=2
    - hdmi\_mode=39 #(1360x768 60 Hz)

2Âº opciÃ³n (modo seguro):

- hdmi\_force\_hotplug=1
- hdmi\_group=2
- hdmi\_mode=9

- InstalaciÃ³n de VNC viewer y SSH en PC cliente.
    - VNC-Viewer-6.0.1-Windows-64bit
    - Putty SSH

### Puesta en marcha Windows 10 IoT

- Inicio por primera vez
    - ConfiguraciÃ³n wifi
    - [https://developer.microsoft.com/en-us/windows/iot/docs/deviceportal](https://developer.microsoft.com/en-us/windows/iot/docs/deviceportal)
- InstalaciÃ³n de las herramientas del entorno en PC cliente.
    - https://developer.microsoft.com/en-us/windows/iot/docs/remotedisplay
    - Windows 10 IoT Core Dashboard
    - Windows IoT Remote Client (Preview)
- AdministraciÃ³n
    - Acceso a la administraciÃ³n: [http://IP\_Raspberry\_Pi:8080](http://IP_Raspberry_Pi:8080)
    - Modificar contraseÃ±a y configurar franja horaria
    - Activar el modo debug y remoto
    - Mostrar opciones de la administraciÃ³n del S.O.

## CreaciÃ³n del primero programa

### Raspibian

#### Java

Para el acceso al GPIO es necesario la librerÃ­a http://pi4j.com y para ver el mapeo de los pines:

[http://pi4j.com/example/control.html](http://pi4j.com/example/control.html)

Tutorial: [https://cafelojano.wordpress.com/2014/03/16/java-7-y-raspberry-pi-gpio-with-pi4j/](https://cafelojano.wordpress.com/2014/03/16/java-7-y-raspberry-pi-gpio-with-pi4j/)

 

### Windows 10 IoT

#### Visual Studio

- Visual Studio Community 2015
- Update 3
- Universal Windows App Development Tools
- Permisos de debug y conexiÃ³n remotas activas en Raspberry Pi, para poder depurar e instalar desde Visual Studio.

Errores: [http://stackoverflow.com/questions/31983150/windows-universal-app-development-template-load-error](http://stackoverflow.com/questions/31983150/windows-universal-app-development-template-load-error)
