/* script.js - basic interactivity
   TODOs:
   - If you want real leads: replace the demo form handler with a POST to your API endpoint.
   - To include analytics, add your analytics snippet here.
   - For ZIP packaging: integrate JSZip (https://stuk.github.io/jszip/) and build a proper zip on the client.
*/

  const form = document.getElementById('leadForm');
  const msg = document.getElementById('formMsg');
  const downloadBtn = document.getElementById('downloadBtn');
  
/*****************************FORM***********************************/


const scriptURL = "https://script.google.com/macros/s/AKfycbyD3HwDCeVhINwSvTqYpXDkhL6C8f9YpSXk7PF_BEcJ30DGaY40GhzMD0qcFFwPKzFo/exec";

/*
function booking(){

  const form = document.forms["contact-form"];

    form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById("client-name").value.trim();
    const email = document.getElementById("client-email").value.trim();
    const message = document.getElementById("client-message").value.trim();
    const website = document.getElementById("client-website").value.trim();
    

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert("Thank you! Your Form is submitted successfully."))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message));
    // Demo behaviour: show friendly message. Replace with fetch('/api/lead', {method:'POST', body: formData}) to send to server.
    msg.innerHTML = '<p style="color:green">Thanks, ' + (data.get('name') || 'there') + '! Your inquiry was received. I will reply within one business day.</p>';
    form.reset();
  });

}
  */


function booking(){
  const form = document.forms["contact-form"];


  form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    //capture the html elements
    const name = document.getElementById("client-name").value.trim();
    const email = document.getElementById("client-email").value.trim();
    const website = document.getElementById("client-website").value.trim();
    const message = document.getElementById("client-message").value.trim();

    if (!name || !email || !website || !message) {
        alert("Please fill in all required fields!");
        return;
      }

    e.preventDefault();  
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => alert(`Thank you ${data.get('your-name')}! Your Form was submitted successfully.`))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message));
  })
}





/*****************************FORM***********************************/
  downloadBtn.addEventListener('click', function(){
    // Trigger separate downloads of the demo files with instruction placeholders.
    triggerDownload(`index.html`, document.documentElement.outerHTML);
    triggerDownload(`styles.css`, `/* styles.css - paste your production styles here (edit as needed) */\n` + document.querySelector('link[rel=stylesheet]')?.getAttribute('href') || '');
    triggerDownload(`script.js`, `/* script.js - paste your production JS here (edit as needed) */\n` + '// See prepackaged demo in repository.');
  });

  function triggerDownload(name, content){
    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(a.href),2000);
  }
