var assert = require('assert'),
    fu = require('../lib/fileUtil');

exports['teardown'] = function(done) {
  fu.lookupPath('');
  done();
};

exports['resolve-path'] = function() {
  fu.lookupPath('foo/bar');

  assert.equal(fu.resolvePath('foo'), 'foo/bar/foo');
  assert.equal(fu.resolvePath('foo/bar/foo'), 'foo/bar/foo');
  assert.equal(fu.resolvePath('/foo'), '/foo');
  assert.equal(fu.resolvePath('c:\\foo'), 'c:\\foo');
  assert.equal(fu.resolvePath('c:/foo'), 'c:/foo');
};

exports['file-list-file'] = function(done) {
  fu.fileList('test/file-util.js', function(err, files) {
    if (err) {
      throw err;
    }

    assert.deepEqual(files, ['test/file-util.js']);
    done();
  });
};

exports['file-list-file-lookup'] = function(done) {
  fu.lookupPath('test');
  fu.fileList('file-util.js', function(err, files) {
    if (err) {
      throw err;
    }

    assert.deepEqual(files, ['test/file-util.js']);
    done();
  });
};

exports['file-list-file-no-filter'] = function(done) {
  fu.fileList('test/file-util.js', /notjason/, function(err, files) {
    if (err) {
      throw err;
    }

    assert.deepEqual(files, ['test/file-util.js']);
    done();
  });
};

exports['file-list-file-not-found'] = function(done) {
  fu.fileList('test/file-util.js.foo', function(err, files) {
    assert.equal(files, undefined);
    assert.equal(err.code, 'ENOENT');

    done();
  });
};

exports['file-list-multiple'] = function(done) {
  fu.lookupPath('test');
  fu.fileList(['file-util.js', 'file-util.js', 'artifacts/router.json'], function(err, files) {
    if (err) {
      throw err;
    }

    assert.deepEqual(files, ['test/artifacts/router.json', 'test/file-util.js']);
    done();
  });
};

exports['file-list-dir'] = function(done) {
  fu.lookupPath('test');
  fu.fileList(['file-util.js', 'artifacts/js'], function(err, files) {
    if (err) {
      throw err;
    }

    assert.deepEqual(files, [
      'test/artifacts/js/base.js',
      'test/artifacts/js/home/home.js',
      'test/artifacts/js/iphone.js',
      'test/artifacts/js/web.js',
      'test/file-util.js'
    ]);
    done();
  });
};

exports['file-list-filtered'] = function(done) {
  fu.lookupPath('test');
  fu.fileList(['file-util.js', 'artifacts'], /js\/.*\.js$/, function(err, files) {
    if (err) {
      throw err;
    }

    assert.deepEqual(files, [
      'test/artifacts/js/base.js',
      'test/artifacts/js/home/home.js',
      'test/artifacts/js/iphone.js',
      'test/artifacts/js/web.js',
      'test/file-util.js'
    ]);
    done();
  });
};
