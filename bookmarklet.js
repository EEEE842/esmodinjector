javascript:(function(){
  alert("Loading injection...");
  fetch("https://raw.githubusercontent.com/EEEE842/test/main/injector.js")
    .then(r=>r.text())
    .then(code=>{
      eval(code);
      alert("Injection complete!");
    })
    .catch(()=>{
      alert("Injection failed!");
    });
})();
