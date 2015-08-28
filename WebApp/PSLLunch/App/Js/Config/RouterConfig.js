define(['backbone',
        'Config/ViewPaths'],

    function (Backbone,
        ViewPaths) {

        var RouterConfig = {
            containers: {
                view: '#appContainer',
                subView: '#subViewsContainer',

            },

            viewRoutes: {
                'Main': {
                    path: ViewPaths.main,
                    type: 'view'
                },
                'Config': {
                    path: ViewPaths.config,
                    type: 'view'
                },
                'Pedido': {
                    path: ViewPaths.pedido,
                    type: 'view'
                }
            }


        };

        return RouterConfig;
    }
);

