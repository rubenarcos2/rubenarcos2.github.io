---
title: "API Rest con Spring"
date: "2018-06-11"
coverImage: "photo1.png"
---
> ###### Nota: esta entrada está en proceso de realización.

- [API Rest](http://www.arquitecturajava.com/que-es-rest/)
- [Spring Boot](https://projects.spring.io/spring-boot/)
- [Tutorial Spring Rest Service](https://spring.io/guides/gs/rest-service/)
- [Tutorial JAX-RS Spring Boot](https://picodotdev.github.io/blog-bitix/2016/09/ejemplo-de-api-rest-en-java-con-jax-rs-y-spring-boot/)

 

**Pruebas, código y proyecto**

Estructura del proyecto [![](images/EstructuraMVC-216x300.png)](http://localhost/wp-content/uploads/2017/07/EstructuraMVC.png)

Main.java

```java
package net.net78.rubenarcos;

import com.github.javafaker.Faker; 
import net.net78.rubenarcos.models.Cita; 
import net.net78.rubenarcos.repositories.CitaRepository; 
import org.springframework.boot.CommandLineRunner; 
import org.springframework.boot.SpringApplication; 
import org.springframework.boot.autoconfigure.SpringBootApplication; 
import org.springframework.context.annotation.Bean;

@SpringBootApplication public class Main {

private final Faker faker = new Faker();//Generador de contenido

public static void main(String args) { 
    SpringApplication.run(Main.class, args); 
}

@Bean public CommandLineRunner initializeDb(CitaRepository repository){ return (args) -> { repository.deleteAll(); //Introduzco algunas frases para completar de forma aleatoria for(int i = 0; i < 20; i++) { repository.save(new Cita(faker.lorem().word(), faker.lorem().sentence())); } }; }

} 
```

Controlador

```java
import com.citaClientes.models.Pie; 
import com.citaClientes.repositories.PieRepository; 
import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.http.HttpStatus; 
import org.springframework.http.ResponseEntity; 
import org.springframework.web.bind.annotation;

import java.util.Collection;

@RestController @RequestMapping('/pies') public class PieRestController {

@Autowired private PieRepository repository;

//Devuelve todos los elementos

@RequestMapping(method = RequestMethod.GET) public ResponseEntity<Collection<Pie>> getAllPies() { return new ResponseEntity<>((Collection<Pie>) repository.findAll(), HttpStatus.OK); }

//Devuelve un element por ID

@RequestMapping(method = RequestMethod.GET, value = '/{id}') public ResponseEntity<Pie> getPieWithId(@PathVariable Long id) { return new ResponseEntity<>(repository.findOne(id), HttpStatus.OK); }

//Busca un elemento por el nombre, y lo devuelve

@RequestMapping(method = RequestMethod.GET, params = {'name'}) public ResponseEntity<Collection<Pie>> findPieWithName(@RequestParam(value = 'name') String name) { return new ResponseEntity<>(repository.findByName(name), HttpStatus.OK); }

//Crea un elemento con los datos dados

@RequestMapping(method = RequestMethod.POST) public ResponseEntity<?> addPie(@RequestBody Pie input) { return new ResponseEntity<>(repository.save(input), HttpStatus.CREATED); }

//Actualiza los datos de un elmento

@RequestMapping(method = RequestMethod.PUT, value = '/{id}') public ResponseEntity<?> updatePie(@PathVariable Long id, @RequestBody Pie pie) { if (repository.findOne(id) != null) { //TO-DO return new ResponseEntity<>(HttpStatus.OK); } else { return new ResponseEntity<>(HttpStatus.NOT\_FOUND); } }

//Elimina un elmento

@RequestMapping(method = RequestMethod.DELETE, value = '/{id}') public ResponseEntity<?> deletePie(@PathVariable Long id) { if (repository.findOne(id) != null) { repository.delete(id); return new ResponseEntity<>(HttpStatus.OK); } else { return new ResponseEntity<>(HttpStatus.NOT\_FOUND); } }

//Elimina todos los elementos

@RequestMapping(method = RequestMethod.DELETE) public ResponseEntity<?> deleteAllPie() { repository.deleteAll(); return new ResponseEntity<>(HttpStatus.NO\_CONTENT); }

}
```

Modelo - Objeto de ejemplo serializable

```java

import java.io.Serializable; 
import javax.persistence.Entity; 
import javax.persistence.GeneratedValue; 
import javax.persistence.GenerationType; 
import javax.persistence.Id;

@Entity public class Pie implements Serializable {

@Id @GeneratedValue(strategy = GenerationType.AUTO) private Long id;

private String name; private String description;

public Pie(String name, String description) { this.name = name; this.description = description; }

//for JPA public Pie() {}

public String getName() { return name; }

public String getDescription() { return description; }

public void setName(String name) { this.name = name; }

public void setDescription(String description) { this.description = description; } }

```

Interfaz para extender el ordenamiento de la lista por orden alfabÃ©tico

```java
import com.citaClientes.models.Pie;
import org.springframework.data.repository.CrudRepository;
import java.util.List;

public interface PieRepository extends CrudRepository<Pie, Long> { 
    <Pie> findByName(String name);

    public void findByName(Pie pie); 
}
```

**Repositorio de pruebas**

[![](Code-Optimization-3-256x2561.png)](https://github.com/rubenarcos2/prueba-api-rest-spring-java/src)
[Descargar proyecto](https://github.com/rubenarcos2/prueba-api-rest-spring-java/src)

### Content License

Creative Commons [![License: CC BY-NC-ND 4.0](88x311.png)](https://creativecommons.org/licenses/by-nc-nd/4.0/)

This web page, all content with proyects and source code, is licensed under Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [More info](https://creativecommons.org/licenses/by-nc-nd/4.0/)

Esta página web y todo su contenido, incluido proyectos y código fuente, está licenciado bajo una licencia de Creative Commons: Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) [Más info](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.es)
