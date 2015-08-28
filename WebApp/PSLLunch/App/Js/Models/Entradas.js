define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var EntradasModel = Backbone.Model.extend({
            url: 'api/Entradas'
        });

        return EntradasModel;
    });