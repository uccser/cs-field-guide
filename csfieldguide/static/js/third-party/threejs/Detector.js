/**
 * Copyright 2010-2011 three.js Authors
 * licensed under MIT licence.
 * third-party-licences/threejs.txt
 * By inspection, this is specifically from:
 * https://github.com/alteredq/three.js/blob/master/examples/js/Detector.js
 *
 * Browserify support modification by Alasdair Smith
 * ---------------------------------------------
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var Detector = {

    canvas: !!window.CanvasRenderingContext2D,
    webgl: (function () { try { return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl'); } catch (e) { return false; } })(),
    workers: !!window.Worker,
    fileapi: window.File && window.FileReader && window.FileList && window.Blob,

    getWebGLErrorMessage: function () {

        var domElement = document.createElement('div');

        domElement.style.fontFamily = 'monospace';
        domElement.style.fontSize = '13px';
        domElement.style.textAlign = 'center';
        domElement.style.background = '#eee';
        domElement.style.color = '#000';
        domElement.style.padding = '1em';
        domElement.style.width = '475px';
        domElement.style.margin = '5em auto 0';

        if (!this.webgl) {

            domElement.innerHTML = window.WebGLRenderingContext ? [
                'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />',
                'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
            ].join('\n') : [
                'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br/>',
                'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
            ].join('\n');

        }

        return domElement;

    },

    addGetWebGLMessage: function (parameters) {

        var parent, id, domElement;

        parameters = parameters || {};

        parent = parameters.parent !== undefined ? parameters.parent : document.body;
        id = parameters.id !== undefined ? parameters.id : 'oldie';

        domElement = Detector.getWebGLErrorMessage();
        domElement.id = id;

        parent.appendChild(domElement);

    }

};

// browserify support
if ( typeof module === 'object' ) {

	module.exports.Detector = Detector;

}
