var test      =  require('tap').test;
var fs        =  require('fs');
var path      =  require('path');
var through   =  require('through');
var convert   =  require('convert-source-map');
var transform =  require('..');

test('transform adds sourcemap comment when sourceMap option is true', function (t) {
    t.plan(1);
    var data = '';

    var file = path.join(__dirname, '../example/foo.coffee');
    fs.createReadStream(file)
        .pipe(transform(file, {sourceMap: true}))
        .pipe(through(write, end));

    function write (buf) { data += buf }
    function end () {
        var sourceMap = convert.fromSource(data).toObject();

        t.deepEqual(
            sourceMap,
            { version: 3,
              file: 'foo.js',
              sourceRoot: '',
              sources: [ 'foo.coffee' ],
              names: [],
              mappings: 'AAAA,OAAO,CAAC,GAAR,CAAY,OAAA,CAAQ,UAAR,CAAZ',
              sourcesContent: [ 'console.log(require \'./bar.js\')\n' ] },
            'adds sourcemap comment including original source'
      );
    }
});

test('transform does not add sourcemap when sourceMap option is false', function (t) {

  t.plan(1);
  var data = '';

  var file = path.join(__dirname, '../example/foo.coffee');
  fs.createReadStream(file)
    .pipe(transform(file, {sourceMap: false}))
    .pipe(through(write, end));

  function write (buf) { data += buf }
  function end () {
    var sourceMap = convert.fromSource(data);
    t.equal(sourceMap, null);
  }

});
