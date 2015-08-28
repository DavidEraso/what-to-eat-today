define(['Router',
        'Config/ViewEventsHub'
],

    function (
        Router,
        Hub) {

        var initialize = function () {

            Hub.initialize();
            Router.initialize();
        };

        return {
            initialize: initialize
        };

    });