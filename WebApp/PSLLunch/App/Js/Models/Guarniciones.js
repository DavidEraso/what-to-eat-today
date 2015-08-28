define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var GuarnicionesModel = Backbone.Model.extend({
            url: 'api/Guarnicion'
        });

        return GuarnicionesModel;
    });