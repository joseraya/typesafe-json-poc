/* jshint node: true */
'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var typson = require('typson');
var path = require('path');

var PLUGIN_NAME  = "gulp-typson";

var typsonPlugin = function() {
    return through.obj(function(file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            cb(null, file);
        }

        if (file.isBuffer()) {
            typson.schema(file.path).done(function(schema){
                file.contents = new Buffer(JSON.stringify(schema, undefined, 2));
                var fileName = file.path.replace(file.base, "");
                var destFileName = fileName.replace(".d.ts", ".schema.json");
                file.path = path.join(file.base, destFileName);
                cb(null, file);
            });
        } else if (file.isStream()){
            throw new PluginError(PLUGIN_NAME, 'Streams are not supported!');
        } else {
            throw new PluginError(PLUGIN_NAME, 'File is neither buffer nor stream?');

        }
    });
};

module.exports = typsonPlugin;
