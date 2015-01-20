module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine-jquery','jasmine'],
        files: [
            'src/**/*.js',
            'release/scripts/**/*.js',
            'test/**/*.spec.js',
            'node_modules/tv4/tv4.js',
            'release/schema/Schemas.js',
            {pattern: 'release/schema/*.schema.json', watched: true, served: true, included: false}

        ]
    });
};