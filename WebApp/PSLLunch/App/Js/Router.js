define(['require',
        'backbone',
        'Config/RouterConfig',
        'Config/ViewPaths',
        'Config/ViewManager'
],

    function (require,
        Backbone,
        RouterConfig,
        ViewPaths) {

        var routes = _.mapObject(RouterConfig.viewRoutes, function (val, key) {
            return val.type;
        });

        routes[''] = 'index';

        var initialize = function () {
            var AppRouter = Backbone.Router.extend({

                
                routes: routes,


                // Render Index view as index view
                index: function () {
                    var ViewManager = _.extend(require('Config/ViewManager'),
                                               Backbone.Singleton);
                    require([ViewPaths.main], function (MainView) {
                        var mainView = _.extend(MainView, Backbone.Singleton);
                        ViewManager.getInstance().showView(mainView, RouterConfig.containers.view);
                    });
                },

               
                view: function (event) {
                    var ViewManager = _.extend(require('Config/ViewManager'),
                                               Backbone.Singleton);
                    require([
                        RouterConfig.viewRoutes[Backbone.history.fragment].path
                    ], function (independentView) {
                        console.log("independentView");
                        console.log(independentView);
                        independentView = _.extend(independentView, Backbone.Singleton);
                        ViewManager.getInstance()
                            .showView(independentView, RouterConfig.containers.view);
                    });
                },

              

                subView: function (event) {
                    var ViewManager = _.extend(require('Config/ViewManager'),
                                               Backbone.Singleton);
                    require([
                        RouterConfig.viewRoutes[Backbone.history.fragment].path
                    ], function (dependentView) {

                        dependentView = _.extend(dependentView, Backbone.Singleton);
                        ViewManager.getInstance()
                            .showView(dependentView, RouterConfig.containers.subView);
                    });
                }

            });

            _.extend(AppRouter, Backbone.Singleton);

            window.globalRouter = AppRouter.getInstance();
          

            Backbone.history.start();
        };

        return {
            initialize: initialize
        };

    });
