/*
 * grunt-init
 * https://gruntjs.com/
 *
 * Copyright (c) 2012 "Cowboy" Ben Alman, contributors
 * Licensed under the MIT license.
 */
var join = require('path').join;
var child_process = require('child_process');
'use strict';

// Basic template description.
exports.description = 'Create mojito project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, ' +
    'but you will most likely need to edit the generated Gruntfile.js file before running grunt. '.red +
    '_If you run grunt after generating the Gruntfile, and ' +
    'it exits with errors, edit the file!_';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '';

// The actual init template.
exports.template = function (grunt, init, done) {

    init.process({}, [
        // Prompt for these values.
        {
            name:'app_name',
            message:'your app name?',
            default:'mojito_demo',
            warning:''
        },
        {
            name:'type',
            message:'"app", "mojit", or "custom".?',
            default:'app',
            warning:''
        },
        {
            name:'archetype',
            message:'optional template. Possible values are default, full, simple' +
                '"app" types also have a "hybrid" archetype which creates an app and a' +
                'mojit with common configurations for use with hybrid app. ' +
                'If the type is "custom" then this is the path to your own archetype' +
                'directory.?',
            default:'hybrid',
            warning:''
        }
    ], function (err, props) {

        child_process.exec(grunt.runtime.getMojito() + " create " + props.type + " " + props.archetype + " " + props.app_name, function (err, stdout, stderr) {
            if (err) {
                grunt.log.error(stderr);
            } else {
                grunt.log.success(stdout);
                // Files to copy (and process).
                var files = init.filesToCopy(props);
                Object.prototype.renameProperty = function (oldName, newName) {
                    // Check for the old property name to avoid a ReferenceError in strict mode.
                    if (this.hasOwnProperty(oldName)) {
                        this[newName] = this[oldName];
                        delete this[oldName];
                    }
                    return this;
                };
                for (var key in files) {
                    files.renameProperty(key, join(props.app_name, key));
                }
                // Actually copy (and process) files.
                init.copyAndProcess(files, props);

                // All done!
                done();
            }
        });

//
    });

};
