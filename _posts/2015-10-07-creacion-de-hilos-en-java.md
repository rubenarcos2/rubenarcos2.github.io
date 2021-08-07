---
title: "Hilos en Java, creaciÃ³n (teorÃ­a)"
date: "2015-10-07"
coverImage: "100715_1758_CreacindeHi11.jpg"
---

![](images/100715_1758_CreacindeHi11.jpg)

La tÃ©cnica de programaciÃ³n Multitarea/Multihilo, consite bÃ¡sicamente, en la realizaciÃ³n de la aplicaciÃ³n de los elmentos necesarios, para que se realicen operaciones, accesos o escrituras simultÃ¡neamente. Otras veces se utiliza porque se tiene que realizar una tarea muy pesada, por ejemplo, consultar en el listÃ­n telefÃ³nico todos los nombres de chica que tengan la letra n, que tarda mucho y no deseamos que todo se quede parado mientras se realiza dicha tarea. Para conseguir que **el programa** haga varias cosas a la vez o que el programa no se quede parado mientras realiza una tarea compleja, tenemos los **hilos** (**Threads**).

![](images/100715_1758_CreacindeHi21.gif)

En este enlace te puedes descargar este PDF que tiene una explicaciÃ³n mÃ¡s detallada: [Apuntes extendidos hilos](http://www.jtech.ua.es/dadm/restringido/java/sesion05-apuntes.pdf)

Sobre este tema han corrido tambiÃ©n (y seguirÃ¡n corriendo, probablemente) rÃ­os de tinta, debido a la existencia de los dos tipos de creaciÃ³n en la que cada cual tiene sus ventajas e inconvenientes. Yo tengo tambiÃ©n mi postura al respecto tras mi experience, por la que me posiciono sobre la clases _"Runnable"_, puesto que considero que al final, mÃ¡s tarde o mÃ¡s temprano el cÃ³digo hay que optimizarlo, escalarlo o modificarlo (generalmente con rapidez) y requiere de la herencia de otras clases, por lo que de esta forma es mÃ¡s cÃ³modo implementar esta herencia donde se requiera y crear un objeto de tipo _hilo_ para que encapsule esta clase _runnable_.

Si deseÃ¡is profundizar en el tema, os dejo algunos enlaces que me parecen interesantes:

- [http://javarevisited.blogspot.com.es/2012/01/difference-thread-vs-runnable-interface.html](http://javarevisited.blogspot.com.es/2012/01/difference-thread-vs-runnable-interface.html)
- [http://javahungry.blogspot.com/2015/05/implements-runnable-vs-extends-thread-in-java-example.html](http://javahungry.blogspot.com/2015/05/implements-runnable-vs-extends-thread-in-java-example.html)
- [http://www.coderanch.com/how-to/java/ExtendingThreadVsImplementingRunnable](http://www.coderanch.com/how-to/java/ExtendingThreadVsImplementingRunnable)
