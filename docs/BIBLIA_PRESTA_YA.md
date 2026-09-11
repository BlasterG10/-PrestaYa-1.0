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

## 5. Datos financieros
Los números de cliente y préstamo son identificadores importantes. Préstamos, cuotas, pagos, estados y auditoría deben conservar trazabilidad y consistencia.

## 6. Arquitectura futura
Preparar la aplicación para PostgreSQL/Supabase, autenticación, RLS y funciones de backend. La UI no debe depender directamente de detalles internos de la base de datos.

## 7. Seguridad
No colocar secretos en frontend. Validar operaciones sensibles en backend. Usar permisos por rol y RLS cuando exista conexión real a la base de datos. Registrar cambios administrativos importantes.

## 8. Investigación y decisiones
Cuando una decisión técnica pueda cambiar con el tiempo, investigar y distinguir hechos confirmados de suposiciones. No presentar capacidades inexistentes como si fueran reales.

## 9. Cadena de mejora
Inspeccionar → comparar con referencia → detectar fricción → mejorar → probar desktop → probar móvil → probar los cuatro roles → revisar funcionalidad → conservar la mejor versión → documentar.

## 10. Definition of Done
Una tarea está terminada cuando funciona, mantiene los roles y restricciones, conserva las funciones existentes, es responsive, mejora la experiencia visual cuando corresponda y queda documentada si cambia arquitectura o comportamiento.
