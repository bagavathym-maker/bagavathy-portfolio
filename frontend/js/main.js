const githubUrl=""; // Add your verified GitHub URL here when available.
window.addEventListener("load",()=>{document.getElementById("loader").classList.add("hide");});
document.getElementById("year").textContent=new Date().getFullYear();
const exploring=["Python","AI & Data Science","Machine Learning","SQL","Full-Stack Development","Git & GitHub","Problem Solving"];
document.getElementById("exploringTags").innerHTML=exploring.map(x=>`<span class="tag">${x}</span>`).join("");
const skillGroups=[
 ["Programming",["Python","C"]],["Frontend",["HTML5","CSS3","JavaScript"]],["Backend",["Node.js","Django"]],
 ["Database",["MySQL"]],["AI & Data",["NumPy","Pandas","Matplotlib","Scikit-learn","Machine Learning Fundamentals"]],
 ["Tools",["Git","GitHub","VS Code"]],["Development Approach",["AI-assisted coding","Debugging","Rapid prototyping","Prompt engineering / AI-assisted development"]]
];
document.getElementById("skillsGrid").innerHTML=skillGroups.map(([name,items])=>`<article class="skill-card reveal"><h3>${name}</h3><div class="skill-list">${items.map(i=>`<span>${i}</span>`).join("")}</div></article>`).join("");
const menuBtn=document.getElementById("menuBtn"),nav=document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",open)});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
const profile=document.getElementById("profileImage"),fallback=document.getElementById("profileFallback");
profile.addEventListener("error",()=>{profile.style.display="none";fallback.style.display="flex"});
document.getElementById("modalClose").addEventListener("click",closeModal);
document.getElementById("modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});
function closeModal(){document.getElementById("modal").classList.remove("open");document.getElementById("modal").setAttribute("aria-hidden","true")}
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});
function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3000)}
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.08});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));
loadProjects();loadExperience();loadCertifications();