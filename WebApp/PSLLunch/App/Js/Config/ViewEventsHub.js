define(['backbone'],

    function (Backbone) {
        var initialize = function () {
            var Hub = function () {
                this.events = _.extend({}, Backbone.Events);
            };

            _.extend(Hub, Backbone.Singleton);
            window.GlobalHub = Hub.getInstance();
        };

        return {
            initialize: initialize
        };

    });