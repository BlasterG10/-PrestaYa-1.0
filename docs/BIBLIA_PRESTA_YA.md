# PRESTA YA — BIBLIA DE TRABAJO

## 1. Regla principal
PrestaYa es un proyecto continuo. Antes de modificarlo se debe revisar esta Biblia y la versión vigente del código. No inventar requisitos, no borrar trabajo existente sin revisión y no sustituir funcionalidad por una maqueta.

## 2. Producto
La aplicación debe ofrecer experiencias diferentes dentro del mismo programa según el rol: Administrador, Supervisor, Cobrador y Cliente.

## 3. Roles y restricciones
- Administrador: acceso completo y configuración administrativa.
- Supervisor: supervisión, clientes, préstamos, pagos, aprobaciones y análisis; sin configuración global de administrador.
- Cobrador: operación de clientes, préstamos y cobranza; sin aprobaciones administrativas ni gestión de empleados.
- Cliente: solo su propia cuenta, préstamos, cuotas, pagos, documentos y notificaciones.

La UI debe reflejar permisos, pero la seguridad definitiva debe reforzarse en backend/base de datos.

## 4. Principios de UI
La interfaz debe ser muy visual e intuitiva. Priorizar jerarquía, acciones claras, tarjetas de resumen, estados visibles, búsqueda rápida, formularios simples y diseño responsive. Mantener un lenguaje visual consistente entre todas las pantallas.

### 4.1 Sistema visual V2 aprobado
La versión V2 es la referencia visual de trabajo para Presta Ya 1.0 y debe conservarse al mejorar la aplicación.

- Login con composición dividida, fondo claro, panel visual oscuro/azul y tarjeta de acceso limpia.
- Identidad visual Presta Ya basada en azul, azul oscuro/navy, blanco y grises suaves.
- Panel administrativo con navegación lateral oscura, encabezado, tarjetas KPI, gráficos/resúmenes, clientes recientes y solicitudes.
- Panel de cliente claramente diferenciado dentro del mismo programa, mostrando únicamente información de su propia cuenta.
- Tarjetas con bordes suaves, radios consistentes, sombras ligeras y jerarquía visual clara.
- Estados financieros y operativos mediante badges/indicadores visibles.
- Tablas con encabezados claros, espaciado cómodo y comportamiento responsive.
- Acciones primarias en azul y acciones secundarias neutrales.
- En móvil debe existir una navegación utilizable y el contenido no debe depender de una pantalla de escritorio.

La apariencia V2 debe aplicarse sin eliminar las funciones existentes de PrestaYa 1.0.

## 5. Datos financieros
Los números de cliente y préstamo son identificadores importantes. Préstamos, cuotas, pagos, estados y auditoría deben conservar trazabilidad y consistencia.

### 5.1 Identificadores
Los Administradores y Supervisores deben poder consultar el número de cliente y el número de préstamo desde una vista específica y mediante búsqueda. Esta información debe mantenerse consistente con los registros reales cuando se conecte la base de datos.

## 6. Arquitectura futura
Preparar la aplicación para PostgreSQL/Supabase, autenticación, RLS y funciones de backend. La UI no debe depender directamente de detalles internos de la base de datos.

La capa visual V2 debe funcionar como presentación sobre la lógica existente, no como sustituto de la lógica de negocio. Cuando se conecte backend, los datos de clientes, préstamos, pagos, solicitudes y estados deben reemplazar los datos de demostración sin rediseñar innecesariamente las pantallas.

## 7. Seguridad
No colocar secretos en frontend. Validar operaciones sensibles en backend. Usar permisos por rol y RLS cuando exista conexión real a la base de datos. Registrar cambios administrativos importantes.

La selección visual de un rol en una demo nunca debe considerarse autenticación real. En producción, el rol debe provenir de una sesión autenticada y sus permisos deben verificarse en backend/base de datos.

## 8. Investigación y decisiones
Cuando una decisión técnica pueda cambiar con el tiempo, investigar y distinguir hechos confirmados de suposiciones. No presentar capacidades inexistentes como si fueran reales.

## 9. Cadena de mejora
Inspeccionar → comparar con referencia → detectar fricción → mejorar → probar desktop → probar móvil → probar los cuatro roles → revisar funcionalidad → conservar la mejor versión → documentar.

### 9.1 Revisión visual V2
Cada cambio importante de UI debe compararse contra la referencia V2. Revisar como mínimo:

1. Composición y distribución.
2. Jerarquía visual.
3. Espaciado y tamaños.
4. Colores y contraste.
5. Navegación.
6. Estados y acciones.
7. Responsive en móvil y escritorio.
8. Diferenciación entre Cliente, Administrador, Supervisor y Cobrador.

No declarar una mejora visual terminada solo porque el código compila o la pantalla carga: debe conservarse la experiencia V2 y las funciones existentes.

## 10. Definition of Done
Una tarea está terminada cuando funciona, mantiene los roles y restricciones, conserva las funciones existentes, es responsive, mejora la experiencia visual cuando corresponda y queda documentada si cambia arquitectura o comportamiento.

Para UI V2, además, la entrada principal de `PrestaYa 1.0` debe utilizar la capa visual V2 integrada sobre la aplicación funcional existente, evitando mantener una maqueta paralela como producto principal.

## 11. Estructura de referencia actual
- `index.html`: entrada principal de PrestaYa 1.0.
- `beta/prestaya_v2_integrated.html`: capa visual V2 integrada y punto de entrada visual actual.
- `beta/prestaya_beta_1_2.html`: aplicación funcional sobre la que se aplica la capa visual.
- `beta/prestaya_visual_1_0.html`: versión visual anterior; conservar como referencia histórica hasta que una revisión determine que puede retirarse.
- `docs/BIBLIA_PRESTA_YA.md`: documento rector obligatorio.

No borrar o reemplazar archivos históricos sin revisar primero sus dependencias y registrar la decisión.
