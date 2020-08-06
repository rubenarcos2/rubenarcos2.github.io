---
layout: post
title: API Rest con Spring
date: 2018-06-11 20:12
author: ruben
comments: true
categories: [api, Blog, Java, java, Proyectos y prÃ¡cticas, rest, spring, Web, webservice]
---
<blockquote>
<h6>Nota: esta entrada estÃ¡ en proceso de realizaciÃ³n.</h6>
</blockquote>
<ul>
 	<li><a href="http://www.arquitecturajava.com/que-es-rest/">API Rest</a></li>
 	<li><a href="https://projects.spring.io/spring-boot/">Spring Boot</a></li>
 	<li><a href="https://spring.io/guides/gs/rest-service/">Tutorial Spring Rest Service</a></li>
 	<li><a href="https://picodotdev.github.io/blog-bitix/2016/09/ejemplo-de-api-rest-en-java-con-jax-rs-y-spring-boot/">Tutorial JAX-RS Spring Boot</a></li>
</ul>
&nbsp;
<pre style="text-align: center;"><strong> Pruebas, cÃ³digo y proyecto</strong></pre>
Estructura del proyecto
<a href="http://localhost/wp-content/uploads/2017/07/EstructuraMVC.png"><img class="alignnone size-medium wp-image-1208" src="http://localhost/wp-content/uploads/2017/07/EstructuraMVC-216x300.png" alt="" width="216" height="300" /></a>

Main.java

[code language="java"]
package net.net78.rubenarcos;

import com.github.javafaker.Faker;
import net.net78.rubenarcos.models.Cita;
import net.net78.rubenarcos.repositories.CitaRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;



@SpringBootApplication
public class Main {

    private final Faker faker = new Faker();//Generador de contenido

	public static void main(String[] args) {
		SpringApplication.run(Main.class, args);
	}

    @Bean
    public CommandLineRunner initializeDb(CitaRepository repository){
        return (args) -&amp;amp;gt; {
            repository.deleteAll();
            //Introduzco algunas frases para completar de forma aleatoria
            for(int i = 0; i &amp;amp;lt; 20; i++) {
                repository.save(new Cita(faker.lorem().word(), faker.lorem().sentence()));
            }
        };
    }

}
[/code]

Controlador

[code language="java"]
package com.citaClientes.controllers;

import com.citaClientes.models.Pie;
import com.citaClientes.repositories.PieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping(&amp;amp;quot;/pies&amp;amp;quot;)
public class PieRestController {

    @Autowired
    private PieRepository repository;

    //Devuelve todos los elementos

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity&amp;amp;lt;Collection&amp;amp;lt;Pie&amp;amp;gt;&amp;amp;gt; getAllPies() {
        return new ResponseEntity&amp;amp;lt;&amp;amp;gt;((Collection&amp;amp;lt;Pie&amp;amp;gt;) repository.findAll(), HttpStatus.OK);
    }

    //Devuelve un element por ID

    @RequestMapping(method = RequestMethod.GET, value = &amp;amp;quot;/{id}&amp;amp;quot;)
    public ResponseEntity&amp;amp;lt;Pie&amp;amp;gt; getPieWithId(@PathVariable Long id) {
        return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(repository.findOne(id), HttpStatus.OK);
    }

    //Busca un elemento por el nombre, y lo devuelve

    @RequestMapping(method = RequestMethod.GET, params = {&amp;amp;quot;name&amp;amp;quot;})
    public ResponseEntity&amp;amp;lt;Collection&amp;amp;lt;Pie&amp;amp;gt;&amp;amp;gt; findPieWithName(@RequestParam(value = &amp;amp;quot;name&amp;amp;quot;) String name) {
        return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(repository.findByName(name), HttpStatus.OK);
    }

    //Crea un elemento con los datos dados

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity&amp;amp;lt;?&amp;amp;gt; addPie(@RequestBody Pie input) {
        return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(repository.save(input), HttpStatus.CREATED);
    }

    //Actualiza los datos de un elmento

    @RequestMapping(method = RequestMethod.PUT, value = &amp;amp;quot;/{id}&amp;amp;quot;)
    public ResponseEntity&amp;amp;lt;?&amp;amp;gt; updatePie(@PathVariable Long id, @RequestBody Pie pie) {
        if (repository.findOne(id) != null) {
            //TO-DO
            return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(HttpStatus.OK);
        } else {
            return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(HttpStatus.NOT_FOUND);
        }
    }

    //Elimina un elmento

    @RequestMapping(method = RequestMethod.DELETE, value = &amp;amp;quot;/{id}&amp;amp;quot;)
    public ResponseEntity&amp;amp;lt;?&amp;amp;gt; deletePie(@PathVariable Long id) {
        if (repository.findOne(id) != null) {
            repository.delete(id);
            return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(HttpStatus.OK);
        } else {
            return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(HttpStatus.NOT_FOUND);
        }
    }

    //Elimina todos los elementos

    @RequestMapping(method = RequestMethod.DELETE)
    public ResponseEntity&amp;amp;lt;?&amp;amp;gt; deleteAllPie() {
        repository.deleteAll();
        return new ResponseEntity&amp;amp;lt;&amp;amp;gt;(HttpStatus.NO_CONTENT);
    }

}
[/code]

Modelo - Objeto de ejemplo serializable

[code language="java"]
package com.citaClientes.models;


import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String description;

    public Pie(String name, String description) {
        this.name = name;
        this.description = description;
    }

    //for JPA
    public Pie() {}

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

[/code]

Interfaz para extender el ordenamiento de la lista por orden alfabÃ©tico

[code language="java"]
package com.citaClientes.repositories;

import com.citaClientes.models.Pie;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PieRepository extends CrudRepository&amp;amp;lt;Pie, Long&amp;amp;gt; {
    List&amp;amp;lt;Pie&amp;amp;gt; findByName(String name);

    public void findByName(Pie pie);
}
[/code]

&nbsp;
<pre style="text-align: center;"><strong> Repositorio de pruebas</strong></pre>
<table>
<tbody>
<tr>
<td>
<p style="text-align: center;"><a href="https://bitbucket.org/rubenarcos/prueba-api-rest-spring-java/src" target="_blank" rel="noopener"><img class="aligncenter wp-image-853 size-full" src="http://localhost/wp-content/uploads/2016/05/Code-Optimization-3-256x2561.png" alt="" width="256" height="256" /></a><a href="https://bitbucket.org/rubenarcos/prueba-api-rest-spring-java/src" target="_blank" rel="noopener">Descargar proyecto</a></p>
</td>
<td style="text-align: center;"></td>
</tr>
</tbody>
</table>
&nbsp;
<h3 class="entry-title">Content License</h3>
Creative Commons <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/"><img src="https://licensebuttons.net/l/by-nc-nd/4.0/88x31.png" alt="License: CC BY-NC-ND 4.0" /></a>
<div class="entry-content description clearfix">

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">More info</a>

Esta pÃ¡gina web y todo su contenido, incluido proyectos y cÃ³digo fuente, estÃ¡ licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)
<a href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es">MÃ¡s info</a>

</div>
