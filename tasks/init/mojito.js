var join = require('path').join;
var child_process = require('child_process');
'use strict';

// Basic template description.
exports.description = 'Create mojito project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'This template tries to guess file and directory paths, ' +
    'but you will most likely need to edit the generated Gruntfile.js file before running grunt. '.blue;

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '';

// The actual init template.
exports.template = function (grunt, init, done) {

    var props = {};
    var mojito_version = grunt.option('mojitoversion');
    var name = grunt.option('name');
    var type = grunt.option('type');
    var archetype = grunt.option('archetype');


    if ((typeof name === 'string') && (typeof type === 'string')) {
        if (!(typeof archetype === 'string')) {
            archetype = '';
        }

        props.mojito_version = mojito_version;
        props.app_name = name;
        props.type = type;
        props.archetype = archetype;

        mojitoCreate(grunt.runtime.getMojito(mojito_version), props);
    } else {
        init.process({}, [
            // Prompt for these values.
            {
                name:'mojito_version',
                message:'mojito version?',
                default:'0.4',
                warning:''
            },
            {
                name:'app_name',
                message:'your app name?',
                default:'mojitodemo',
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
            mojitoCreate(grunt.runtime.getMojito(props.mojito_version), props);
        });
    }

    function mojitoCreate(mojitoPath, props) {
        child_process.exec(mojitoPath + " create " + props.type + " " + props.archetype + " " + props.app_name, function (err, stdout, stderr) {
            if (err) {
                grunt.log.error(stderr);
            } else {
                grunt.log.success(stdout);
                if (props.type === 'app') {
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
                }
                // All done!
                done();
            }
        });
    }

};
