async function loadCertifications(){
 const grid=document.getElementById("certGrid"),empty=document.getElementById("certEmpty");
 try{
  const data=await apiGet("/certifications");
  grid.innerHTML=data.map(x=>`<article class="cert-card reveal"><p class="eyebrow">${escapeHtml(x.issue_date||"")}</p><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(x.issuer)}</p>${x.credential_url?`<a class="linkedin-link" href="${safeUrl(x.credential_url)}" target="_blank" rel="noopener">View credential ↗</a>`:""}</article>`).join("");
  empty.hidden=data.length>0;
 }catch(e){grid.innerHTML="";empty.hidden=false}
}

const CERT_STORAGE_KEY = "bagavathy_personal_certificates_v1";

function getPersonalCertificates(){
  try { return JSON.parse(localStorage.getItem(CERT_STORAGE_KEY) || "[]"); }
  catch(e){ return []; }
}
function savePersonalCertificates(items){
  localStorage.setItem(CERT_STORAGE_KEY, JSON.stringify(items));
}
function renderPersonalCertificates(){
  const grid=document.getElementById("uploadedCertificates");
  const empty=document.getElementById("uploadedCertificatesEmpty");
  if(!grid || !empty) return;
  const items=getPersonalCertificates();
  empty.hidden=items.length>0;
  grid.innerHTML=items.map((x,i)=>{
    const preview=x.type.startsWith("image/")
      ? `<div class="cert-preview"><img src="${x.data}" alt="${escapeHtml(x.title)} certificate"></div>`
      : `<div class="cert-preview"><span class="pdf-preview">PDF Certificate</span></div>`;
    return `<article class="cert-card uploaded-cert-card reveal visible">
      <button class="delete-cert" type="button" data-cert-delete="${i}" aria-label="Remove ${escapeHtml(x.title)}">×</button>
      ${preview}
      <p class="eyebrow">${escapeHtml(x.date || "Completed")}</p>
      <h3>${escapeHtml(x.title)}</h3>
      <p>${escapeHtml(x.issuer)}</p>
      <a class="cert-link" href="${x.data}" target="_blank" rel="noopener">View certificate ↗</a>
    </article>`;
  }).join("");
  grid.querySelectorAll("[data-cert-delete]").forEach(btn=>btn.addEventListener("click",()=>{
    const items=getPersonalCertificates();
    items.splice(Number(btn.dataset.certDelete),1);
    savePersonalCertificates(items);
    renderPersonalCertificates();
  }));
}

function setupCertificateUpload(){
  const form=document.getElementById("certificateUploadForm");
  if(!form) return;
  renderPersonalCertificates();
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const title=document.getElementById("certificateTitle").value.trim();
    const issuer=document.getElementById("certificateIssuer").value.trim();
    const date=document.getElementById("certificateDate").value;
    const file=document.getElementById("certificateFile").files[0];
    if(!file) return;
    if(file.size > 3 * 1024 * 1024){ alert("Please choose a certificate file smaller than 3 MB."); return; }
    const reader=new FileReader();
    reader.onload=()=>{
      const items=getPersonalCertificates();
      items.unshift({title,issuer,date,type:file.type,data:reader.result});
      try{
        savePersonalCertificates(items);
        renderPersonalCertificates();
        form.reset();
        if(typeof showToast === "function") showToast("Certificate added successfully");
      }catch(err){
        alert("This browser storage is full. Please use smaller certificate files.");
      }
    };
    reader.readAsDataURL(file);
  });
}

document.addEventListener("DOMContentLoaded",setupCertificateUpload);
