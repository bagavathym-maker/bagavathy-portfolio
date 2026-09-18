let allProjects=[];
const projectCategories=["All","AI / ML","Data Science","Full Stack","Web","Hackathon","Mini Projects"];
function projectInitial(title){return title.split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function projectCard(p){
  const tech=(p.technologies||"").split(",").map(x=>x.trim()).filter(Boolean);
  return `<article class="project-card reveal">
    <div class="project-image">${p.image_url?`<img src="${escapeHtml(p.image_url)}" alt="${escapeHtml(p.title)}">`:`<div class="monogram">${projectInitial(p.title)}</div>`}${p.featured?'<span class="featured">FEATURED</span>':""}</div>
    <div class="project-body"><div class="project-meta">${escapeHtml(p.category)}</div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.short_description)}</p>
    <div class="tags">${tech.slice(0,4).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join("")}</div>
    <div class="project-actions">${p.github_url?`<a class="mini-btn" href="${safeUrl(p.github_url)}" target="_blank" rel="noopener">GitHub ↗</a>`:""}${p.demo_url?`<a class="mini-btn" href="${safeUrl(p.demo_url)}" target="_blank" rel="noopener">Live Demo ↗</a>`:""}<button class="mini-btn details-btn" data-slug="${escapeHtml(p.slug)}">View Details</button></div></div></article>`;
}
function renderProjects(category="All"){
  const list=category==="All"?allProjects:allProjects.filter(p=>p.category===category);
  document.getElementById("projectsGrid").innerHTML=list.map(projectCard).join("");
  document.getElementById("projectsEmpty").hidden=list.length>0;
  document.querySelectorAll(".details-btn").forEach(b=>b.addEventListener("click",()=>openProject(b.dataset.slug)));
  requestAnimationFrame(()=>document.querySelectorAll(".project-card.reveal").forEach(x=>x.classList.add("visible")));
}
function renderFilters(){
  document.getElementById("filters").innerHTML=projectCategories.map((c,i)=>`<button class="filter ${i===0?"active":""}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join("");
  document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProjects(b.dataset.cat)}));
}
async function loadProjects(){try{allProjects=await apiGet("/projects");renderFilters();renderProjects()}catch(e){document.getElementById("projectsGrid").innerHTML="";document.getElementById("projectsEmpty").hidden=false;document.getElementById("projectsEmpty").textContent="Projects could not be loaded. Start the backend and refresh."}}
async function openProject(slug){
  try{
    const p=await apiGet("/projects/"+encodeURIComponent(slug));
    const tech=(p.technologies||"").split(",").map(x=>x.trim()).filter(Boolean);
    document.getElementById("modalContent").innerHTML=`<p class="eyebrow">${escapeHtml(p.category)}</p><h2 id="modalTitle">${escapeHtml(p.title)}</h2><p>${escapeHtml(p.description)}</p><div class="modal-tech">${tech.map(t=>`<span>${escapeHtml(t)}</span>`).join("")}</div><div class="actions" style="margin-top:25px">${p.github_url?`<a class="btn primary" href="${safeUrl(p.github_url)}" target="_blank" rel="noopener">GitHub ↗</a>`:""}${p.demo_url?`<a class="btn" href="${safeUrl(p.demo_url)}" target="_blank" rel="noopener">Live Demo ↗</a>`:""}</div>`;
    document.getElementById("modal").classList.add("open");document.getElementById("modal").setAttribute("aria-hidden","false");
  }catch(e){showToast("Unable to open project details.")}
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function safeUrl(v){try{const u=new URL(v);return ["http:","https:"].includes(u.protocol)?u.href:"#"}catch{return "#"}}
