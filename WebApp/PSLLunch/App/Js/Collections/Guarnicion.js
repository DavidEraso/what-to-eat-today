define(['require',
        'backbone'],

    function (require,
        Backbone) {

        var GuarnicionCollection = Backbone.Collection.extend({
            model: Backbone.Model.extend({}),
            baseUrl: 'api/Guarnicion?OnlyActive=',
            setUrl: function (onlyActive) {
                this.url = this.baseUrl + onlyActive;
                return this.fetch();
            }
        });

        return GuarnicionCollection;
    });