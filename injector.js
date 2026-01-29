(function () {
    const PROJECT_URL = window.ES_SELECTED_SB3;

    function getVM() {
        // TurboWarp
        if (window.vm) return window.vm;
        if (window.__TW_VM__) return window.__TW_VM__;

        // Scratch (React)
        const app = document.getElementById("app");
        if (app) {
            // React 18+
            const key = Object.keys(app).find(k => k.startsWith("__reactContainer"));
            if (key) {
                try {
                    let fiber = app[key];
                    let node = fiber.child;
                    while (node) {
                        if (node.memoizedProps?.store) {
                            return node.memoizedProps.store.getState().scratchGui.vm;
                        }
                        node = node.child;
                    }
                } catch(e){}
            }

            // React legacy
            if (app._reactRootContainer) {
                try {
                    const store = app._reactRootContainer._internalRoot.current.child.pendingProps.store;
                    return store.getState().scratchGui.vm;
                } catch(e){}
            }
        }

        return null;
    }

    alert("loading injection");

    const vm = getVM();
    if (!vm) {
        alert("Scratch/TurboWarp VM not found");
        return;
    }

    vm.runtime.canAddCloudVariable = () => true;

    fetch(PROJECT_URL)
        .then(r => r.arrayBuffer())
        .then(buf => vm.loadProject(buf))
        .then(() => alert("injection complete"))
        .catch(e => {
            alert("Injection failed");
            console.error(e);
        });
})();
