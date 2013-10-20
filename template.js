/**
 * grunt-init-webcomponent v0.1.1, 2013-10-20
 *
 * Hosted on http://github.com/b3tamax/grunt-init-webcomponent
 * Copyright (c) 2013 b3tamax - http://b3tamax.github.io
 * Licensed under the MIT license.
 */

/*jshint
    unused: true,
    debug: true,
    devel: true,
    browser: true,
    asi: true
 */


// Basic template description.
exports.description = 'Create a basic setup for authoring Web Components using X-Tags';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'X-Tag is a small JavaScript library, created and supported by Mozilla, that brings Web Components Custom Element capabilities to all modern browsers. For more see http://www.x-tags.org/\n\nAssembled by @b3tamax';

// Template-specific notes to be displayed after question prompts.
exports.after = '\nNext steps:\n\n1) Install dependencies: \n$ npm install\n2) Run the development server:\n$ grunt:connect';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function( grunt, init, done ) {

    init.process(

        { type: 'webcomponent' },

        // Prompt for these values.
        [
            init.prompt( 'name' ),
            init.prompt( 'version' ),
            init.prompt( 'title' ),
            init.prompt( 'description', 'The revolutionary component.' ),
            init.prompt( 'homepage' ),
            init.prompt( 'repository' ),
            init.prompt( 'licenses', 'MIT' ),
            init.prompt( 'author_name' ),
            init.prompt( 'author_email' ),
            init.prompt( 'author_url' )
        ],

        function( error, props ) {

            // Grab all the files to copy and process.
            var pkgFiles = init.filesToCopy( props )

            // Add the license files.
            init.addLicenseFiles( pkgFiles, props.licenses )

            // Other data to hold in the `package.json` file.
            props.keywords = []
            props.dependencies = {}
            props.devDependencies = {
              "grunt": "~0.4.0",
              "grunt-smush-components": "~0.2.0",
              "grunt-contrib-concat": "~0.1.2",
              "grunt-contrib-jshint": "~0.3.0",
              "grunt-tagrelease": "~0.2.0",
              "grunt-bumpup": "~0.2.0",
              "grunt-contrib-connect": "~0.3.0"
            }

            // Do the file copying and processing.
            init.copyAndProcess( pkgFiles, props )

            // Create the `package.json` file.
            init.writePackageJSON( 'package.json', props )

            // Aaand we're done!
            done()
        }

    ) //init.process

} //exports.template

