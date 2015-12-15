var test = require('tap').test;
var browserify = require('browserify');
var vm = require('vm');
var convert = require('convert-source-map');
var path = require('path');
var fs = require('fs');

function bundle (file) {
    test('bundle transform', function (t) {
        t.plan(2);

        var bundle = browserify();
        var sourcepath = path.join(__dirname, file);

        bundle.add(sourcepath);
        bundle.transform(path.join(__dirname, '..'));
        bundle.bundle(function (error, src) {
            if (error) t.fail(error);
            vm.runInNewContext(src, {console: {log: log}});
            var map = convert.fromSource(String(src));
            t.ok(map == null, 'should not have a map when debug is off');
        });

        function log (msg) {
            t.equal(msg, 555);
        }
    });

    test('bundle transform includes sourcemaps with debug on', function (t) {
        t.plan(3);

        var bundle = browserify({debug: true});
        var sourcepath = path.join(__dirname, file);

        bundle.add(sourcepath);
        bundle.transform(path.join(__dirname, '..'));
        bundle.bundle(function (error, src) {
            if (error) t.fail(error);
            vm.runInNewContext(src, {console: {log: log}});
            var map = convert.fromSource(String(src));
            var relpath = path.relative(process.cwd(), sourcepath);
            var sourceIdx = map.sourcemap.sources.indexOf(relpath);
            t.ok(sourceIdx !== -1, 'should have source filename in map')
            var filesrc = fs.readFileSync(sourcepath).toString()
            t.equal(filesrc, map.sourcemap.sourcesContent[sourceIdx], 'should have source content in map')
        });

        function log (msg) {
            t.equal(msg, 555);
        }
    });


}

bundle('../example/foo.coffee');
bundle('../example/foo.litcoffee');
