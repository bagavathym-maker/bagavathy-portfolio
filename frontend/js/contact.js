document.getElementById("contactForm").addEventListener("submit",async e=>{
 e.preventDefault();const form=e.currentTarget,status=document.getElementById("formStatus"),btn=form.querySelector("button");
 const data=Object.fromEntries(new FormData(form).entries());
 if(data.message.trim().length<10){status.textContent="Please enter a message of at least 10 characters.";return}
 btn.disabled=true;btn.textContent="Sending…";status.textContent="";
 try{await apiPost("/contact",data);form.reset();status.textContent="Message sent successfully.";showToast("Thanks — your message was sent.");}
 catch(err){status.textContent=err.message||"Could not send message.";showToast("Could not send message.")}
 finally{btn.disabled=false;btn.textContent="Send Message"}
});