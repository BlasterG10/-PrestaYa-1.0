const fs = require('fs');
const html = fs.readFileSync('beta/prestaya_beta_0_9.html', 'utf8');
const index = fs.readFileSync('index.html', 'utf8');
const checks = [
  ['Pages apunta a Beta 0.9', index.includes('./beta/prestaya_beta_0_9.html')],
  ['Sección Empleados creada', html.includes('pya09Employees')],
  ['Sección Análisis creada', html.includes('pya09Analysis')],
  ['Restricción de Empleados para admin', html.includes("r==='admin'" )],
  ['Restricción de Análisis para admin/supervisor', html.includes("r==='admin'||r==='supervisor'")],
  ['Número de empleado de 6 dígitos', html.includes('maxlength="6"') && html.includes('/^[0-9]{6}$/')],
  ['Aprobaciones restringidas', html.includes('Aprobaciones es exclusivo del Administrador y Supervisor')],
];
let failed = 0;
for (const [name, ok] of checks) { console.log((ok ? 'PASS' : 'FAIL') + ' - ' + name); if (!ok) failed++; }
// Guard: these injected sections must use the same .section class as the app router.
const employeeSection = html.match(/id=\\"pya09Employees\\"[^>]*class=\\"([^\\"]+)/);
const analysisSection = html.match(/id=\\"pya09Analysis\\"[^>]*class=\\"([^\\"]+)/);
if (employeeSection && employeeSection[1] === 'sec') { console.error('FAIL - Empleados usa class="sec" y no es compatible con el router .section'); failed++; }
if (analysisSection && analysisSection[1] === 'sec') { console.error('FAIL - Análisis usa class="sec" y no es compatible con el router .section'); failed++; }
process.exit(failed ? 1 : 0);
