var fs = require('fs');
var _ = require('underscore');
var file = __dirname + '/npm-shrinkwrap.json';

var moduleRegistry = [];

var parseDependencies = function (dependencies) {
    _.each(dependencies, function (dep) {
        if (dep.resolved) {
            moduleRegistry.push(dep.resolved);
        }
        if (dep.dependencies) {
            parseDependencies(dep.dependencies);
        }
    });
};


fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
        console.log('Error: ' + err);
        return;
    }

    var modules = JSON.parse(data);

    parseDependencies(modules.dependencies);
    console.log(moduleRegistry, "Modules Count", _.uniq(moduleRegistry).length);
});