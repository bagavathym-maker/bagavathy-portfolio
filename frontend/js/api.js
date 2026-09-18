const API_BASE = window.PORTFOLIO_API_BASE || "http://localhost:5000/api";
async function apiGet(path){
  const res=await fetch(API_BASE+path);
  const json=await res.json();
  if(!res.ok || !json.success) throw new Error(json.message||"Request failed");
  return json.data;
}
async function apiPost(path, body){
  const res=await fetch(API_BASE+path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});
  const json=await res.json();
  if(!res.ok || !json.success) throw new Error(json.message||"Request failed");
  return json.data;
}