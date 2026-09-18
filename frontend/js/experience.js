async function loadExperience(){
 const el=document.getElementById("experienceList");
 try{
  const data=await apiGet("/experiences");
  el.innerHTML=data.length?data.map(x=>`<article class="timeline-item reveal"><div class="date">${escapeHtml(x.start_date||"")} ${x.end_date?"— "+escapeHtml(x.end_date):""}</div><h3>${escapeHtml(x.role)}${x.organization?" · "+escapeHtml(x.organization):""}</h3><p>${escapeHtml(x.description||"")}</p>${x.type?`<span class="tag">${escapeHtml(x.type)}</span>`:""}</article>`).join(""):`<div class="empty">Experience details will be updated as I continue building my professional journey.</div>`;
 }catch(e){el.innerHTML='<div class="empty">Experience details will be updated as I continue building my professional journey.</div>'}
}