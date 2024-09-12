const { task, option, file } = require("grunt");

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less:{
            development:{
                files:{
                    'dev/styles/main.css' : 'src/styles/main.less'
                }
            },
            production:{
                options:{
                    compress: true,
                },
                files:{
                    'dist/styles/main.min.css' : 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['src/styles/**/*.less'],
                task:['less:development']
            },
            html:{
                files:['src/index.html'],
                task:['replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: '../src/scripts/main.js'
                    }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist:{
                options:{
                    patterns:[
                    {
                        match: 'ENDERECO_DO_CSS',
                        replacement: './styles/main.min.css'
                    },
                    {
                        match: 'ENDERECO_DO_JS',
                        replacement: './scripts/main.min.js'
                    }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src: ['preBuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options:{
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'preBuild/index.html' : 'src/index.html'
                }
            }
        },
        clean: ['preBuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js' : 'src/scripts/main.js'
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['less:development', 'replace:dev']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']);

}