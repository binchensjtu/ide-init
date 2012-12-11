module.exports = function (grunt) {
    'use strict';

    // Grunt configuration:

    grunt.initConfig({

        // Project configuration
        // ---------------------
        // specify mojito configuration

        mojito:{
            context:'build:debug'
            //release flow if version and snapshotTag is setted
            //version:'1.0.0',
            //snapshotTag:'tag'
        },
        //Specify for remote debugger. Instrument file list and settings.
        debug:{
            serverHost:'localhost',
            serverPort:8080,
            wserverPort:8080,
            fileServerPort:8050
        },
        //specify pakcages to be add to maitai repository, for multi-pakcage used. Reserved.
        push:{
            packages:[]
        },
        //specify arguments for rt
        rt:{
            iconfile:'',
            devorship:'dev',
            simordev:'simulator'//determin the localhost or internet IP

            //host:'',			//maitail server host
            //port:'',			//maitail server port
            //initialtime:'',	//RT initial waiting time
            //frequency:''	    //RT query maitai frequency.
        },

        package:{
            iossdk:'iphonesimulator6.0',

            apilevel:14
        },
        launch:{
            //ios
            devicefamily:'iphone', //launch simulator type
            //android. Will remove after setting up avd manager
            avdport:5554,
            device:'avd'
        },
        //For screwdriver. Reserved.
        ci:{
            svn:'',
            branch:''
        },
        //For manhattan. Reserved.
        deploy:{
            appfolder:[],
            instancename:''
        }

    });

    // Alias the `default` task to run `build:ios` task instead
    //	User can manual schedule task
    grunt.registerTask('default', 'build:ios');

};
