define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var EntradasCollection = Backbone.Collection.extend({
            model: Backbone.Model.extend({}),
            baseUrl: 'api/Entradas?OnlyActive=',
            setUrl: function (onlyActive) {
                this.url = this.baseUrl + onlyActive;
                return this.fetch();
            }
        });

        return EntradasCollection;
    });