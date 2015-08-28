define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var MenuCollection = Backbone.Collection.extend({
            model: Backbone.Model.extend({}),
            baseUrl: 'api/Menu?OnlyActive=',
            setUrl: function (onlyActive) {
                this.url = this.baseUrl + onlyActive;
                return this.fetch();
            }
        });

        return MenuCollection;
    });