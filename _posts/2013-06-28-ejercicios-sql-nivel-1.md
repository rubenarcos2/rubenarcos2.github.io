---
title: "SQL, ejercicio nivel bÃ¡sico 1"
date: "2013-06-28"
---

Ejercicios de Consultas SQL de Nivel 1 para BD MySQL.
\[code lang="sql"\]-- Ejercicio 1 - Consultas Simples

-- 1)

SELECT cod\_prod, descripcion, cod\_fabric, precio, precio \* 1.21 AS precio\_iva FROM productos;

-- 2)

SELECT num\_pedido, cod\_prod, cantidad, importe, importe/cantidad as precio\_unitario FROM pedidos\_productos;

-- 3)

SELECT nombre, YEAR(curdate()) - YEAR(contrato) AS contrato FROM empleados;

\[/code\]
