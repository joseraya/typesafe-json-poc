var gulp = require('gulp');
var karma = require('karma').server;
var ts = require('gulp-typescript');
var eventStream = require('event-stream');

var tsProject = ts.createProject({
    declarationFiles: true,
    noExternalResolve: true
});

gulp.task('ts', function() {
    gulp.src('src/**/*.ts')
        .pipe(ts(tsProject))
        .pipe(gulp.dest('release'));
    /*return eventStream.merge(
        tsResult.dts.pipe(gulp.dest('release/definitions')),
        tsResult.js.pipe(gulp.dest('release'))
    );*/
});

gulp.task('test', ['ts'], function (done) {
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done);
});

gulp.task('tdd', function (done) {
    gulp.watch('src/**/*.ts', ['ts']);
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done);
});

gulp.task('clean', function () {
    var del = require('del')
    del.sync('release')
});

gulp.task('typson', function() {
    var typson = require('./gulp-typson');
    gulp.src("src/scripts/model/**.ts")
        .pipe(typson())
        .pipe(gulp.dest('release/schema'));

    var fs = require('fs');
    var schemas = {
        '$schema': 'http://json-schema.org/draft-04/schema#',
        definitions: {}
    };
    var generatedSchemas = fs.readdirSync('release/schema');
    for(var i in generatedSchemas) {
        if (generatedSchemas[i]=="Schemas.js") {
            continue;
        }
        var content = fs.readFileSync('release/schema/' + generatedSchemas[i]);
        var parsed = JSON.parse(content);
        for (var name in parsed.definitions) {
            schemas.definitions[name] = parsed.definitions[name];
        }
    }
    var _ = require('lodash');
    var template = _.template('var Schemas = <%= schemas %>;');
    fs.writeFileSync('release/schema/Schemas.js',template({schemas: JSON.stringify(schemas, null, 2)}) );
});

gulp.task('default', ['tdd']);
