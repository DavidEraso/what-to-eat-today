define(['require',
        'Application',
        'handlebars',
        'jquery',
        'underscore',
        'moment',
        'numeral',
        'bootstrap'
],

    function (require,
        Application,
        HandlebarsFW,
        Jquery,
        _,
        Moment,
        Numeral,
        Bootstrap) {

        var initialize = function () {
            // Main third party libs in Global scope.
            window._ = _;
            window.$ = Jquery;
            window.Handlebars = HandlebarsFW.default;
            window.Moment = Moment;
            window.Numeral = Numeral;

            require([
                'Config/BackboneConfig',
                'Config/HandlebarsConfig'
            ], function (BackboneConfig, HandlebarsConfig) {
               

                // Initialize Handlebars's helpers
                HandlebarsConfig.initialize();
                // Initialize Backbone custom routines
                BackboneConfig.initialize();

                Application.initialize();
            });
        };

        return {
            initialize: initialize
        };

    });
