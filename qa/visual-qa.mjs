const checks=['desktop layout','mobile layout','login experience','admin role','supervisor role','cobrador role','cliente role','navigation hierarchy','primary actions visibility','financial values readability','responsive overflow','visual consistency'];
console.log('PrestaYa visual QA contract');
checks.forEach((x,i)=>console.log(`${String(i+1).padStart(2,'0')}. ${x}`));
console.log('Reference directory: qa/reference/');
console.log('Rule: never claim pixel comparison when no reference image exists.');
