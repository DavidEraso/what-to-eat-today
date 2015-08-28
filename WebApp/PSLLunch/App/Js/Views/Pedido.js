define(['require',
        'backbone',
        'ThirdParty/text!../../Templates/Pedido.html',
        'ThirdParty/text!../../Templates/AlmuerzosResultTable.html',
        'Collections/Almuerzo'],

    function (require,
        Backbone,
        PedidoTemplate,
        AlmuerzosResultTableTemplate,
        AlmuerzoCollection) {

        var View = Backbone.View.extend({
            id: 'pedidoPage',
            pedidoTemplate: Handlebars.compile(PedidoTemplate),
            almuerzosResultTableTemplate: Handlebars.compile(AlmuerzosResultTableTemplate),

            initialize: function () {;
                _.extend(AlmuerzoCollection, Backbone.Singleton);

                this.almuerzoCollection = AlmuerzoCollection.getInstance();
            },

            getAlmuerzo: function () {
                return this.almuerzoCollection.fetch();
            },
            
            render: function () {
                this.$el.html(this.pedidoTemplate());

                this.buscarAlmuerzos();
                return this;
            },

            events: {
                'click #backButton': 'navigateMain',
                'click #exportar': 'exportarToExcel',
            },

            navigateMain: function () {
                var route = $(event.target).data('route');
                globalRouter.navigate(route, { trigger: true });
            },

            exportarToExcel: function (e) {
                window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
                e.preventDefault();
            },

            buscarAlmuerzos: function () {
                this.getAlmuerzo().done((function (response) {

                    var resultTemplateInfo = {
                        Result: response
                    };
                    $('#resultTable').html(this.almuerzosResultTableTemplate(resultTemplateInfo));

                    var tds = this.$('#tableShowed tr')

                    for (var i = 0; i <= (tds.length - 1) ; i++)
                    {
                        if (i > 0) {
                            if (i >= (tds.length - 3)) {
                                console.log(tds[i]);
                                $(tds[i]).addClass("danger");
                            }
                        }
                    }

                    $('#pedidoDiv').hide();
                }).bind(this));
            },
        });

        return View;
    });