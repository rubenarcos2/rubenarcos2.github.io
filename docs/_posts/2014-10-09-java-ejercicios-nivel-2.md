---
layout: post
title: POO en JAVA, ejercicio nivel intermedio 1
date: 2014-10-09 20:16
author: ruben
comments: true
categories: [Blog, ejercicios, Java, java, poo, Proyectos y prÃ¡cticas]
---
Ejercicio que muestra las habilidades adquiridas en la POO y aplica sus directrices.

&nbsp;

[caption id="attachment_464" align="aligncenter" width="201"]<img class="wp-image-464 size-full" src="http://localhost/wp-content/uploads/2014/10/vehiculos.jpeg" alt="vehiculos" width="201" height="171" /> JerarquÃ­a de clases utilizada[/caption]
<h5 style="text-align: left;"><em>Dependencias</em>: clase "<a style="background-color: #ffffff;" title="Ir a la clase &quot;Utils&quot;" href="http://localhost/java-clase-para-entrada-por-teclado-control-del-buffer/">utils</a>" propia.</h5>
<!--more-->

&nbsp;

[code language="java"]

/*
 * EJERCICIO JAVA (MÃ³dulo 5)
 * ------------------------------
 * VEHICULOS - (Main)
 */
package ruben;

import ruben.utils.*;

public class Main {

    public static void main(String[] args) {

        int opcion;
        String marca;
        String modelo;
        int potencia;

        //Se introduce la marca, el modelo y la potencia al iniciar el programa para pasarselo al constructor de vehiculo
        marca = &quot;Seat&quot;;
        modelo = &quot;Ibiza&quot;;
        potencia = 120;
        Coche coche = new Coche(marca, modelo, potencia);

        do
        {
            opcion = mostrarMenu();
            ejecutarAccion(coche, opcion);

        }while (opcion != 4);

    }

   public static int mostrarMenu()
        {
            int opcion;

                System.out.println(&quot;\n### Menu ###\n&quot;);
                System.out.println(&quot;1) Ver ficha&quot;);
                System.out.println(&quot;2) Comprar&quot;);
                System.out.println(&quot;3) Proxima revision&quot;);
                System.out.println(&quot;4) Salir\n&quot;);

                opcion = Comun.leerEntero(&quot;Seleccione una opcion: &quot;);

            return opcion;
    }

    private static void ejecutarAccion(Coche coche, int opc)
    {
        String nombre;
        int revision;

        try
        {
            switch (opc)
            {
                case 1: //Mostrar ficha del empleado
                    coche.verFicha();
                    break;

                case 2: //Modificar los datos del empleado
                    nombre = Comun.leerCadena(&quot;Introduzca el nombre del nuevo propietario: &quot;);
                    coche.comprar(nombre);
                    break;

                case 3:
                    revision = Comun.leerEntero(&quot;Introduzca el anio de la proxima revision: &quot;);
                    coche.revisar(revision);
                break;

                default:
                    System.out.println(&quot;OpciÃ³n no vÃ¡lida.&quot;);
                    break;
           }
        }
        catch (Exception e)
        {
            System.out.println(e.toString());
        }
    }

}
[/code]


[code language="java"]
/*
 * Clase VEHICULO
 */
package anfora;

/**
 *
 * @author ruben
 */
public class Vehiculo {

    private String marca;
    private String modelo;
    public int anioRevision;

    // Constructor
    Vehiculo(String marca, String modelo)
    {
        this.marca = marca;
        this.modelo = modelo;
        anioRevision = -1;

    }

    // Muestra la ficha del vehÃ­culo, marca, modelo y aÃ±o
    public void verFicha()
    {
        System.out.println(&quot;\n\n------ Ficha del Vehiculo ------\n&quot;);
        System.out.println(&quot;    Marca: &quot; + marca);
        System.out.println(&quot;    Modelo: &quot; + modelo);

        if (anioRevision == -1) // Comprobamos que el aÃ±o no sea -1
        {
            System.out.println(&quot;    Anio revision: &quot; + &quot;pendiente de informar&quot;);
        }
        else
        {
            System.out.println(&quot;    Anio revision: &quot; + anioRevision);
        }

    }

    // Recibe como parÃ¡metro el aÃ±o de la prÃ³xima revisiÃ³n de ITV
    public void revisar(int anioRevision)
    {
        this.anioRevision = anioRevision;

        System.out.println(&quot;\nAnio que le corresponde la revision: &quot; + anioRevision);
    }

}
[/code]


[code language="java"]

/*
 * Clase COCHE que hereda de la clase VEHICULO
 */
package ruben;

/**
 *
 * @author ruben
 */
public class Coche extends Vehiculo {

    private String propietario;
    private int potencia;

    // Constructor
    Coche(String marca, String modelo, int potencia)
    {
        //Llama al constructo de la clase base.
        super(marca, modelo);
        propietario = &quot;&quot;;
        this.potencia = potencia;

    }

    // Muestra la ficha de la clase base, propietario y potencia
    @Override
    public void verFicha()
    {
        super.verFicha();

        if (propietario == &quot;&quot;)
        {
            System.out.println(&quot;    Propietario: &quot; + &quot;No indicado&quot;);
        }
        else
        {
            System.out.println(&quot;    Propietario: &quot; + propietario);
        }

        System.out.println(&quot;    Potencia: &quot; + potencia + &quot; CV&quot;);
        System.out.println(&quot;\n----------------------------------\n&quot;);

    }

    // Recibe el nombre del propietario
    public void comprar(String nombre)
    {
        this.propietario = nombre;
    }

    // Sobreescribe el mÃ©todo de la clase base.
    // Los coches que ya han tenido alguna revisiÃ³n, deben tener la prÃ³xima antes de dos aÃ±os.
    @Override
    public void revisar(int anioRevision)
    {
        super.revisar(anioRevision);

        if (anioRevision &gt; -1)
        {
            anioRevision += 2;
        }

    }

}
[/code]

