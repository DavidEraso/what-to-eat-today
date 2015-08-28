define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var almuerzoCollection = Backbone.Collection.extend({
            model: Backbone.Model.extend({}),
            url: 'api/Almuerzo'
        });

        return almuerzoCollection;
    });