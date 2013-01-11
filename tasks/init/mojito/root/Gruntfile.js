module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({

        mojito:{
            context:'build:debug',
            version:'{%= mojito_version %}'

        },

        debug:{
            remoteDebug:true,
            liveEdit:true,
            httpPort:8000,
            instrument:{
                instrumentIgnoreDir:['mojito'],
                instrumentIgnoreFileRegex:["^mojito.*\.js$", "^LazyLoad.*\.js$", "loader.*\.js"]
            }
        },
        push:{
            packages:[]
        },
        rt:{
            iconfile:'',
            devorship:'dev',
            simordev:'simulator'
        },

        package:{
            iossdk:'6.0',
            apilevel:14
        },
        launch:{
            devicefamily:'iphone'
        },

        ci:{
            svn:'',
            branch:''
        },

        deploy:{
            appfolder:[],
            instancename:''
        }

    });
};
