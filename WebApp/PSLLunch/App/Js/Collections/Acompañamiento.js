define(['require',
        'backbone'],
    function (require,
        Backbone) {

        var AcompañamientoCollection = Backbone.Collection.extend({
            model: Backbone.Model.extend({}),
            baseUrl: 'api/Acompañamiento?OnlyActive=',
            setUrl: function (onlyActive) {
                this.url = this.baseUrl + onlyActive;
                return this.fetch();
            }
        });

        return AcompañamientoCollection;
    });