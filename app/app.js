((App) => {
    let registeredModules = {};
    App.import = (moduleName) => {
        if (!registeredModules[moduleName]) {
            throw new Error('Module ' + moduleName + ' is unknown');
        }
        return registeredModules[moduleName];
    };
    App.export = (moduleName, module) => {
        if (registeredModules[moduleName]) {
            throw new Error('Redefining ' + moduleName + ' module');
        }
        registeredModules[moduleName] = module;
    };

})(window.App || (window.App = {}));

