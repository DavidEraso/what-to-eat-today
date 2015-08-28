define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var AcompañamientosModel = Backbone.Model.extend({
            url: 'api/Acompañamiento'
        });

        return AcompañamientosModel;
    });