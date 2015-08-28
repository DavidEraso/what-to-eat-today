define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var CarnessModel = Backbone.Model.extend({
            url: 'api/Carnes'
        });

        return CarnessModel;
    });