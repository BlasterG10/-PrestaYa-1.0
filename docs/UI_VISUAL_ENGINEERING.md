# PrestaYa 1.0 — Biblia visual y cadena de mejora

## Objetivo
Mantener una interfaz extremadamente visual, intuitiva, consistente y fácil de operar para Administrador, Supervisor, Cobrador y Cliente.

## Regla obligatoria
Antes de modificar la UI: revisar `docs/BIBLIA_PRESTA_YA.md` y la versión visual vigente. No reemplazar funcionalidad existente por una maqueta.

## Sistema visual
- Jerarquía clara: acción principal > métricas > estado > detalle.
- Información financiera crítica siempre visible y legible.
- Tarjetas y bloques visuales para resumir; tablas para detalle y auditoría.
- Estados con etiquetas claras, no solo color.
- Acciones destructivas separadas y confirmadas.
- Diseño responsive desde móvil hasta escritorio.
- Consistencia en botones, campos, iconos, bordes, espaciado y tipografía.
- El usuario debe saber qué puede hacer sin leer un manual.

## Roles
- Administrador: acceso completo.
- Supervisor: operación y supervisión, sin configuración global de administrador.
- Cobrador: clientes, préstamos y cobranza; sin aprobaciones administrativas.
- Cliente: solo su cuenta, préstamos, cuotas, pagos, documentos y notificaciones.

## Cadena de mejora
1. Inspeccionar la UI actual.
2. Identificar fricción de navegación y jerarquía.
3. Comparar contra la referencia visual disponible.
4. Proponer cambios de alto impacto.
5. Aplicar cambios sobre la implementación existente.
6. Verificar desktop y móvil.
7. Verificar cada rol.
8. Revisar que no se hayan roto funciones.
9. Conservar la mejor versión y documentar decisiones.
10. Repetir en cada cambio relevante.

## QA visual
Cuando existan referencias en `qa/reference/`, las capturas deben compararse contra ellas. El QA no debe inventar una referencia inexistente. Si no hay referencia, se ejecutan comprobaciones estructurales y de consistencia.

## Criterio de terminado
Una mejora visual no está terminada si mejora una pantalla pero degrada otra, rompe un rol, oculta información financiera importante, pierde accesibilidad móvil o reemplaza funcionalidad existente.
