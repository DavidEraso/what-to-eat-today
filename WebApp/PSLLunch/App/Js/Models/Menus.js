define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var MenusModel = Backbone.Model.extend({
            url: 'api/Menu'
        });

        return MenusModel;
    });