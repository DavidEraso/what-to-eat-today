define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var almuerzosModel = Backbone.Model.extend({
            url: 'api/Almuerzo'
        });

        return almuerzosModel;
    });