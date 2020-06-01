---
title: "SysAdmin, servidor de virtualizaciÃ³n Proxmox (Tutorial)"
date: "2014-03-03"
coverImage: "Screen-HA-status-e1398694586887.png"
---

## InstalaciÃ³n y configuracion de un servidor de virtualizaciÃ³n, Proxmox.

 

![Captura Proxmox](images/Screen-HA-status1.png)

He decido montar un servidor virtual, en lugar de simplemente un servidor habitual, por las ventajas que ofrece la virtualizaciÃ³n a dÃ­a de hoy. No solo podemos instalar varios sistemas en la misma mÃ¡quina (con el ahorro de espacio y energÃ­a que supone) si no que ademÃ¡s podremos hacer imÃ¡genes para restaurar rÃ¡pidamente en un momento crÃ­tico o para deshacer instalaciones internas, pruebas o errores de configuraciÃ³n, de una forma cÃ³moda y sin tener que averiguar la soluciÃ³n.

### TecnologÃ­a

- HTML 5
- CSS 3
- jQuery
- Responsive Design
- PHP

### Cliente

PrÃ¡cticas particulares.

### DescripciÃ³n

Tras investigar y aprender bastante del tema, y haber hecho varias pruebas en la mÃ¡quina virtual de mi ordenador y en la mÃ¡quina virtual del servidor, me he decantado por la distribuciÃ³n Proxmox VE 3.1 (basado en Debian Wheezy) por sus simplicidad y optimizaciÃ³n de recursos. En primer lugar decidÃ­ (y monte para probar) Ubuntu Server 12.04 con KVM y OpenVz de forma manual, pero me atrayÃ³ bastante el entorno web de administraciÃ³n de Proxmox y la comodidad de las consola virtuales ya enlazadas a vnc y todas las configuraciones necesarias. No he tenido muchas ganas de volver a tener que redirigir, comprobar y reiniciar muchas veces los servicios para que se medio automatice para cada mÃ¡quina virtual que se vaya creando. Por ello, y siendo muy dificil de evitar la comodidad de algo ya hecho, probado y sobre todo apoyado por una comunidad activa (casi todos los errores se me resolvieron en la primera bÃºsqueda en el buscador) termine instalando en el disco duro principal de mi servidor Proxmox. El material que he utilizado ha sido el siguiente:

- CPU AMD x64 3500+ (un solo core)
- Placa Base ASUS M2V
- 2 discos duros SATA
- Un teclado, monitor y ratÃ³n (que desaparecerÃ¡n luego, por supuesto)

Requisitos necesarios:

- Imagen ISO de Promox VE 3.1
- PenDrive con mÃ¡s de 1Gb de capacidad
- Otro PC para acceder y comprobar la administraciÃ³n y los accesos
- Una imagen de Ubuntu Server y otro sistema operativo diferente
- Plugin del navegador de Java Jre/Jdk 7 o superior
- Unebootin u otro programa para instalar una ISO a USB

Bueno puesto que ya tenemos lo necesario vamos con el procedimiento de instalaciÃ³n, su configuraciÃ³n y puesta en marcha. Para comenzar nos tenemos que descargar previamente la imagen ISO de Proxmox VE 3.1. Una vez descargada, la pasaremos a un pendrive mediante unebootin. Cuando haya terminado de pasar la imagen al completo, salimos de unebootin y abrimos la ubicaciÃ³n del pendrive, para copiar la imagen ISO tal cual en la carpeta boot (aunque pienso que igualmente se podrÃ¡ en cualquier otra, pero en esta nos aseguramos tener permisos luego) puesto que despuÃ©s tenemos que montarla en el punto de montaje /mnt en el arranque. Esto que acabo de relatar como una rutina sin aparene importancia me costo algÃºn tiempo de investigaciÃ³n y pruebas con el arranque de la distribuciÃ³n, porque no esta prevista para iniciarse desde un pendrive y entonces nos da un error con la bÃºsqueda del CDROM. Al iniciar el equipo desde el pendrive, elegimos el modo 'debug' y lo escribimos despuÃ©s de 'boot:' y esperamos a que intente iniciar el sistema, tras los errores de ruta del CDROM:

> _**no cdrom found â€“ unable to continue (type exit or Ctrl-D to reboot)**_

nos aparecerÃ¡ el SHELL, en que introduciremos lo siguiente: `fdisk -l` (para identificar la ruta al pendrive serÃ¡ /dev/sdb o algo similar) `mount /dev/sdb* /mnt` (siendo sdb\* el punto que estÃ© en nuestro ordenador, cambiarlo) una vez tenemos el pendrive montado en /mnt, vamos a aÃ±adirle la ruta a la ISO que es desde donde queremos leer los ficheros necesarios. `mount -o loop -t iso9660 /mnt/proxmox_*.iso /mnt` (siendo proxmox\_\*.iso el nombre de vuestra iso) y por Ãºltimo, damos permisos de grupo y lanzamos el script de arranque del instalador. `chroot /mnt sbin/unconfigured.sh` (este Ãºltimo comando lo tendreis que escribir, no funciona el autocompletar, no os asusteis, lo lanza igualmente)

 

###### Fuentes: [http://upshell.wordpress.com/2011/11/25/install-proxmox-with-usb/](http://upshell.wordpress.com/2011/11/25/install-proxmox-with-usb/) [http://blog.desdelinux.net/proxmox-ve-una-interesante-herramienta-de-virtualizacion/](http://blog.desdelinux.net/proxmox-ve-una-interesante-herramienta-de-virtualizacion/)
