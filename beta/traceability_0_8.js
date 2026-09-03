/* PrestaYa 0.8 - Trazabilidad por códigos de 6 dígitos.
   Se carga sobre la beta local existente para no reemplazar sus módulos. */
(function(){
  const FRAME_PATH='./microprestamos_beta_0_7.html';
  const NS='prestaya_codes_v1';
  function child(){return document.getElementById('prestayaApp')?.contentWindow}
  function load(win){
    try{
      const clients=JSON.parse(win.localStorage.getItem('prestaya_clients')||'[]');
      const loans=JSON.parse(win.localStorage.getItem('prestaya_loans')||'[]');
      const payments=JSON.parse(win.localStorage.getItem('prestaya_payments')||'[]');
      let map=JSON.parse(win.localStorage.getItem(NS)||'{}');
      const used=new Set(Object.values(map));
      function code(){let n;do{n=Math.floor(100000+Math.random()*900000).toString()}while(used.has(n));used.add(n);return n}
      let changed=false;
      clients.forEach(c=>{if(!c.clientCode){c.clientCode=code();changed=true}map['client:'+c.id]=c.clientCode});
      loans.forEach(l=>{if(!l.loanCode){l.loanCode=code();changed=true}map['loan:'+l.id]=l.loanCode});
      payments.forEach(p=>{if(!p.paymentCode){p.paymentCode=code();changed=true}map['payment:'+p.id]=p.paymentCode});
      if(changed){win.localStorage.setItem('prestaya_clients',JSON.stringify(clients));win.localStorage.setItem('prestaya_loans',JSON.stringify(loans));win.localStorage.setItem('prestaya_payments',JSON.stringify(payments));win.localStorage.setItem(NS,JSON.stringify(map))}
      return {clients,loans,payments,map};
    }catch(e){console.error('PrestaYa trazabilidad',e);return null}
  }
  function enhance(win){
    const data=load(win); if(!data)return;
    const doc=win.document;
    const style=doc.createElement('style');
    style.textContent='.py-code{font-family:monospace;font-weight:800;letter-spacing:1px}.py-ref{display:inline-block;padding:3px 7px;border-radius:6px;background:#eef2ff;color:#1e3a8a}.py-bar{background:#f8fafc;border:1px solid #dbe3ef;padding:10px 12px;border-radius:10px;margin:10px 0;font-size:13px}';
    doc.head.appendChild(style);
    const idMap={}; data.clients.forEach(c=>idMap[c.id]=c); 
    function refresh(){
      const d=load(win);if(!d)return;
      // Clientes: añade número de cliente a cada fila.
      doc.querySelectorAll('#ctab tr').forEach((tr,i)=>{const cells=tr.querySelectorAll('td');if(!cells.length)return;const name=cells[0]?.textContent?.trim();const c=d.clients.find(x=>x.name===name);if(c&&!tr.querySelector('.py-code')){const td=doc.createElement('td');td.innerHTML='<span class="py-code py-ref">'+c.clientCode+'</span>';tr.insertBefore(td,cells[0])}});
      // Préstamos: muestra código de préstamo y código de cliente.
      doc.querySelectorAll('#ltab tr').forEach(tr=>{const cells=tr.querySelectorAll('td');if(!cells.length||tr.querySelector('.py-loan-code'))return;const loanCode=cells[0]?.textContent?.trim();const l=d.loans.find(x=>x.loanCode===loanCode)||d.loans.find(x=>{const c=d.clients.find(c=>c.id===x.clientId);return c&&c.name===cells[1]?.textContent?.trim()});if(l){const td=doc.createElement('td');td.className='py-loan-code';td.innerHTML='<span class="py-code py-ref">'+l.loanCode+'</span>';tr.insertBefore(td,cells[0]);const c=d.clients.find(x=>x.id===l.clientId);const td2=doc.createElement('td');td2.innerHTML='<span class="py-code">'+(c?.clientCode||'')+'</span>';tr.insertBefore(td2,tr.children[1])}});
      // Pagos: agrega código de pago, préstamo y cliente cuando existen.
      doc.querySelectorAll('#ptab tr').forEach(tr=>{const cells=tr.querySelectorAll('td');if(!cells.length||tr.querySelector('.py-payment-code'))return;const receipt=cells[0]?.textContent?.trim();const p=d.payments.find(x=>x.receipt===receipt);if(p){const l=d.loans.find(x=>x.id===p.loanId),c=d.clients.find(x=>x.id===l?.clientId);const td=doc.createElement('td');td.className='py-payment-code';td.innerHTML='<span class="py-code py-ref">'+p.paymentCode+'</span>';tr.insertBefore(td,cells[0]);const tl=doc.createElement('td');tl.innerHTML='<span class="py-code">'+(l?.loanCode||'')+'</span>';tr.insertBefore(tl,tr.children[1]);const tc=doc.createElement('td');tc.innerHTML='<span class="py-code">'+(c?.clientCode||'')+'</span>';tr.insertBefore(tc,tr.children[2])}});
      // Aprobaciones: coloca referencia del préstamo y cliente.
      doc.querySelectorAll('#atab tr').forEach(tr=>{const cells=tr.querySelectorAll('td');if(!cells.length||tr.querySelector('.py-approval-code'))return;const name=cells[1]?.textContent?.trim();const l=d.loans.find(x=>d.clients.find(c=>c.id===x.clientId)?.name===name);if(l){const td=doc.createElement('td');td.className='py-approval-code';td.innerHTML='<span class="py-code py-ref">'+l.loanCode+'</span>';tr.insertBefore(td,cells[0]);const c=d.clients.find(x=>x.id===l.clientId);const tc=doc.createElement('td');tc.innerHTML='<span class="py-code">'+(c?.clientCode||'')+'</span>';tr.insertBefore(tc,tr.children[1])}});
      // Cabecera de secciones: referencia rápida y buscabilidad por códigos.
      ['clients','loans','payments','approvals'].forEach(id=>{const sec=doc.getElementById(id);if(!sec||sec.querySelector('.py-bar'))return;const bar=doc.createElement('div');bar.className='py-bar';bar.innerHTML='<b>🔎 Trazabilidad:</b> usa el código de 6 dígitos del cliente o préstamo como referencia interna en solicitudes, aprobaciones, pagos, garantías y comprobantes.';sec.querySelector('.card')?.prepend(bar)});
    }
    // Intercepta altas para asignar el código inmediatamente después de cada operación.
    ['addClient','createLoan','manualPay'].forEach(fn=>{
      if(typeof win[fn]!=='function'||win[fn].__pyWrapped)return;
      const original=win[fn];function wrapped(){const before=load(win);const r=original.apply(this,arguments);setTimeout(()=>{load(win);refresh()},20);return r}wrapped.__pyWrapped=true;win[fn]=wrapped;
    });
    refresh();
    new MutationObserver(()=>refresh()).observe(doc.body,{childList:true,subtree:true});
  }
  function boot(){const f=document.getElementById('prestayaApp');if(!f)return;f.onload=()=>setTimeout(()=>enhance(f.contentWindow),100);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
