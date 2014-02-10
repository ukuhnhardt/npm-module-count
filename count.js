var fs = require('fs');
var _ = require('underscore');
var file = __dirname + '/' + process.argv[2];

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
        console.log("Usage : $ node count.js [npm-shrinkwrap-file.json]")
        return;
    }

    var modules = JSON.parse(data);

    parseDependencies(modules.dependencies);
    console.log("Total unique Modules Count:", _.uniq(moduleRegistry).length);
});