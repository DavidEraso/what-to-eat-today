define(['backbone'],

    function (Backbone) {
        
       
        var initialize = function () {
            //Adding Singleton pattern class to Backbone
            Backbone.Singleton = {
                getInstance: function (param) {
                    if (this._instance === undefined) {
                        this._instance = new this(param);
                    } else {
                        if (this._instance instanceof Backbone.View) {
                            this._instance.delegateEvents();
                        }
                    }

                    return this._instance;
                },

                getNewInstance: function (param) {
                    this._instance = new this(param);
                    return this._instance;
                }
            };

            //Adding close routine to backbone views
            Backbone.View.prototype.close = function () {
                if (this.onClose) {
                    this.onClose();
                }

                this.remove();
                this.unbind();
            };

        };

        return {
            initialize: initialize
        };
    });
