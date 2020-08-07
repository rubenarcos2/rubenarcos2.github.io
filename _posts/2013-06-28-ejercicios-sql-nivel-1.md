---
layout: post
title: SQL, ejercicio nivel bÃ¡sico 1
date: 2013-06-28 18:51
author: ruben
comments: true
categories: [Bases de Datos, bases_datos, bbdd, Blog, db, ejercicios, Proyectos y prÃ¡cticas, sql]
---
<pre>Ejercicios de Consultas SQL de Nivel 1 para BD MySQL.
[code lang="sql"]-- Ejercicio 1 - Consultas Simples

-- 1)

SELECT cod_prod, descripcion, cod_fabric, precio, precio * 1.21 AS precio_iva FROM productos;

-- 2)

SELECT num_pedido, cod_prod, cantidad, importe, importe/cantidad as precio_unitario FROM pedidos_productos;

-- 3)

SELECT nombre, YEAR(curdate()) - YEAR(contrato) AS contrato FROM empleados;

[/code]
