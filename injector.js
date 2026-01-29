(function(){

const PROJECT_URL = window.ES_SELECTED_SB3;
if(!PROJECT_URL){
  alert("No SB3 selected");
  return;
}

function findVM(){
  // TurboWarp
  if (window.location.hostname.includes("turbowarp.org")) {
    if (window.vm) return window.vm;
  }

  // Scratch editor
  if (window.location.hostname.includes("scratch.mit.edu")) {
    const app = document.getElementById("app");
    if (!app) return null;

    // React Fiber
    const key = Object.keys(app).find(k => k.startsWith("__reactContainer"));
    if (key) {
      try{
        const fiber = app[key];
        const store = fiber.child?.memoizedProps?.store;
        if (store) return store.getState().scratchGui.vm;
      }catch{}
    }

    // React root fallback
    if (app._reactRootContainer) {
      try{
        const store = app._reactRootContainer._internalRoot.current.child.pendingProps.store;
        return store.getState().scratchGui.vm;
      }catch{}
    }
  }

  return null;
}

const vm = findVM();

if(!vm){
  alert("VM not found (Scratch/TurboWarp)");
  return;
}

alert("VM found — injecting");

vm.runtime.canAddCloudVariable = () => true;

fetch(PROJECT_URL)
  .then(r => r.arrayBuffer())
  .then(buf => vm.loadProject(buf))
  .then(() => alert("Injection complete"))
  .catch(e=>{
    console.error(e);
    alert("Injection failed");
  });

})();
