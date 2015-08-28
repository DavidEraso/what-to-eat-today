define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var CarneCollection = Backbone.Collection.extend({
            model: Backbone.Model.extend({}),
            baseUrl: 'api/Carnes?OnlyActive=',
            setUrl: function (onlyActive) {
                this.url = this.baseUrl + onlyActive;
                return this.fetch();
            }
        });

        return CarneCollection;
    });