javascript:(function(){
fetch("https://raw.githubusercontent.com/EEEE842/test/main/injector.js")
  .then(r=>r.text())
  .then(code=>eval(code));
})();
