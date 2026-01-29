javascript:(function(){
  alert("Loading injection...");
  fetch("https://raw.githubusercontent.com/EEEE842/namehereinjectablemenu/main/injector.js")
    .then(r=>r.text())
    .then(code=>{
      eval(code);
      alert("Injection complete!");
    })
    .catch(()=>{
      alert("Injection failed!");
    });
})();
