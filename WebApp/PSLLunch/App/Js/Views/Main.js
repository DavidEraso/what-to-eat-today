define(['require',
        'backbone',
        'ThirdParty/text!../../Templates/Main.html',
        'ThirdParty/text!../../Templates/AlmuerzosResultTable.html',
        'Collections/Entradas',
        'Collections/Menu',
        'Collections/Carne',
        'Collections/Guarnicion',
        'Collections/Acompañamiento',
        'Collections/Almuerzo',
        'Models/Almuerzos'],

    function (require,
        Backbone,
        MainTemplate,
        AlmuerzosResultTableTemplate,
        EntradasCollection,
        MenuCollection,
        CarneCollection,
        GuarnicionCollection,
        AcompañamientoCollection,
        AlmuerzoCollection,
        AlmuerzosModel) {

        var View = Backbone.View.extend({

            id: 'indexPage',
            mainTemplate: Handlebars.compile(MainTemplate),
            almuerzosResultTableTemplate: Handlebars.compile(AlmuerzosResultTableTemplate),

            initialize: function () {
                _.extend(EntradasCollection, Backbone.Singleton);
                _.extend(MenuCollection, Backbone.Singleton);
                _.extend(CarneCollection, Backbone.Singleton);
                _.extend(GuarnicionCollection, Backbone.Singleton);
                _.extend(AcompañamientoCollection, Backbone.Singleton);
                _.extend(AlmuerzoCollection, Backbone.Singleton);

                _.extend(AlmuerzosModel, Backbone.Singleton);

                this.entradasCollection = EntradasCollection.getInstance();
                this.menuCollection = MenuCollection.getInstance();
                this.carneCollection = CarneCollection.getInstance();
                this.guarnicionCollection = GuarnicionCollection.getInstance();
                this.acompañamientoCollection = AcompañamientoCollection.getInstance();
                this.almuerzoCollection = AlmuerzoCollection.getInstance();

                this.almuerzoModel = AlmuerzosModel.getInstance();
            },

            getEntradas: function () {
                return this.entradasCollection.setUrl('true');
            },

            getMenu: function () {
                return this.menuCollection.setUrl('true');
            },

            getCarne: function () {
                return this.carneCollection.setUrl('true');
            },

            getGuarnicion: function () {
                return this.guarnicionCollection.setUrl('true');
            },

            getAcompañamiento: function () {
                return this.acompañamientoCollection.setUrl('true');
            },

            getAlmuerzo: function () {
                return this.almuerzoCollection.fetch();
            },

            renderAsync: function () {
                var mainTemplateInfo = {
                    Entradas: this.entradasCollection.toJSON(),
                    Menu: this.menuCollection.toJSON(),
                    Carnes: this.carneCollection.toJSON(),
                    Guarnicion: this.guarnicionCollection.toJSON(),
                    Acompañamiento: this.acompañamientoCollection.toJSON()
                };
                this.$el.html(this.mainTemplate(mainTemplateInfo));

                this.$('#selMenu').change();
            },

            render: function () {
                $.when(
                        this.getEntradas(), this.getMenu(), this.getCarne(), this.getGuarnicion(), this.getAcompañamiento()
                    ).done(
                        (function () {
                            this.renderAsync();
                        }).bind(this)
                    ).fail(
                        (function (error) {
                            console.log('error');
                            console.log(error);
                        })
                    );
                return this;
            },

            events: {
                'click #pedidosButton': 'navigateConfig',
                //JTORRES
                'click #ordenar': 'doOrder',
                'click #exportar': 'exportarToExcel',

                'change #selMenu': 'validateCarneGuarnicion'
               
            },

            navigateConfig: function () {
                var route = $(event.target).data('route');

                globalRouter.navigate(route, { trigger: true });
            },

            doOrder: function(){
                var entradaVal = $('#selEntrada').val();
                var menuVal = $('#selMenu').val();

                var carneVal = null;
                var guarnicionVal = null;

                if (menuVal == 1) {
                    carneVal = $('#selCarne').val();
                    guarnicionVal = $('#selGuarnicion').val();
                }
                var acompañamientoVal = $('#selAcompañamiento').val();

                var pagoEfectivo = 0;
                var pagoSodexo = 0;
                var pagoTickete = 0;
                
                if($('#PagoEfectivo').val() != ""){
                    pagoEfectivo = parseInt($('#PagoEfectivo').val());
                }
                if ($('#PagoSodexo').val() != "") {
                    pagoSodexo = parseInt($('#PagoSodexo').val());
                } 
                if ($('#PagoTiquete').val() != "") {
                    pagoTickete = parseInt($('#PagoTiquete').val());
                }

                if (this.validarPago(pagoEfectivo, pagoSodexo, pagoTickete)) {


                    var almuerzo = {
                        Nombre: $('#Nombre').val(),
                        AcompañamientoId: acompañamientoVal,
                        CarneId: carneVal,
                        GuarnicionId: guarnicionVal,
                        EntradaId: entradaVal,
                        MenuId: menuVal,
                        PagoTicket: pagoTickete,
                        PagoSodexo: pagoSodexo,
                        PagoEfectivo: pagoEfectivo,
                        Comentario: $('#Comentario').val()
                    }

                    //save the Order
                    this.almuerzoModel.save(almuerzo, {
                        success: (function () {
                            this.buscarAlmuerzos()
                        }).bind(this)
                    });
                }
                else {
                    alert("Monto de pago menor al costo del amuerzo");
                }
            },
            
            exportarToExcel: function(e){
                window.open('data:application/vnd.ms-excel,' + $('#dvData').html());
                e.preventDefault();
            },

            validarPago: function (pagoEfectivo, pagoSodexo, pagoTickete) {
                var valorTotal = pagoEfectivo + pagoSodexo + pagoTickete;
                
                if (valorTotal >= parseInt($('#PagoTotal').html()))
                {
                    return true;
                }
                else {
                    return false;
                }
            },

            buscarAlmuerzos: function () {
                this.getAlmuerzo().done((function (response) {
                    
                    var resultTemplateInfo = {
                        Result: response
                    };
                    $('#resultTable').html(this.almuerzosResultTableTemplate(resultTemplateInfo));

                    var tds = this.$('#tableShowed tr')
                    
                    for (var i = 0; i <= (tds.length - 1) ;i++)
                    {
                        if (i > 0) {
                            if(i >= (tds.length - 3)){
                                console.log(tds[i]);
                                $(tds[i]).addClass("danger");
                            }
                        }
                    }

                    $('#pedidoDiv').hide();
                }).bind(this));
            },

            guardarAlmuerzo: function (almuerzo) {
                var entrada = {
                    Id: $(event.target).data('id'),
                    Nombre: $(event.target).data('nombre'),
                    Activo: $(event.target)[0].checked
                }
                this.entradasModel.save(entrada);
            },

            validateCarneGuarnicion: function (event) {
                var menuValue = $(event.currentTarget).val();

                if (menuValue != 1) {
                    $('#CarneSelect, #GuarnicionSelect').hide();
                }
                else {
                    $('#CarneSelect, #GuarnicionSelect').show();
                }
                //
                var menuModel = this.menuCollection.where({ Id: parseInt(menuValue) });
                $('#PagoTotal').html(parseInt(menuModel[0].get("Costo")));
            }


        });

        return View;
    });