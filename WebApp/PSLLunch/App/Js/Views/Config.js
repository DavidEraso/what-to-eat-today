define(['require',
        'backbone',
        'ThirdParty/text!../../Templates/Config.html',
        'ThirdParty/text!../../Templates/Modals/AcompañamientoModal.html',
        'ThirdParty/text!../../Templates/Modals/CarneModal.html',
        'ThirdParty/text!../../Templates/Modals/EntradaModal.html',
        'ThirdParty/text!../../Templates/Modals/GuarnicionModal.html',
        'ThirdParty/text!../../Templates/Modals/MenuModal.html',
        'Collections/Entradas',
        'Collections/Menu',
        'Collections/Carne',
        'Collections/Guarnicion',
        'Collections/Acompañamiento',
        'Models/Acompañamientos',
        'Models/Carnes',
        'Models/Entradas',
        'Models/Guarniciones',
        'Models/Menus'],

    function (require,
        Backbone,
        ConfigTemplate,
        AcompañamientoModalTemplate,
        CarneModalTemplate,
        EntradaModalTemplate,
        GuarnicionModalTemplate,
        MenuModalTemplate,
        EntradasCollection,
        MenuCollection,
        CarneCollection,
        GuarnicionCollection,
        AcompañamientoCollection,
        AcompañamientosModel,
        CarnesModel,
        EntradasModel,
        GuardicionesModel,
        MenusModel) {

        var View = Backbone.View.extend({

            id: 'configPage',
            configTemplate: Handlebars.compile(ConfigTemplate),

            acompañamientoModalTemplate: Handlebars.compile(AcompañamientoModalTemplate),
            carneModalTemplate: Handlebars.compile(CarneModalTemplate),
            entradaModalTemplate: Handlebars.compile(EntradaModalTemplate),
            guarnicionModalTemplate: Handlebars.compile(GuarnicionModalTemplate),
            menuModalTemplate: Handlebars.compile(MenuModalTemplate),

            initialize: function () {
                _.extend(EntradasCollection, Backbone.Singleton);
                _.extend(MenuCollection, Backbone.Singleton);
                _.extend(CarneCollection, Backbone.Singleton);
                _.extend(GuarnicionCollection, Backbone.Singleton);
                _.extend(AcompañamientoCollection, Backbone.Singleton);

                _.extend(AcompañamientosModel, Backbone.Singleton);
                _.extend(CarnesModel, Backbone.Singleton);
                _.extend(EntradasModel, Backbone.Singleton);
                _.extend(GuardicionesModel, Backbone.Singleton);
                _.extend(MenusModel, Backbone.Singleton);

                this.entradasCollection = EntradasCollection.getInstance();
                this.menuCollection = MenuCollection.getInstance();
                this.carneCollection = CarneCollection.getInstance();
                this.guarnicionCollection = GuarnicionCollection.getInstance();
                this.acompañamientoCollection = AcompañamientoCollection.getInstance();

                this.acompañamientosModel = AcompañamientosModel.getInstance();
                this.carnesModel = CarnesModel.getInstance();
                this.entradasModel = EntradasModel.getInstance();
                this.guarnicionesModel = GuardicionesModel.getInstance();
                this.menusModel = MenusModel.getInstance();
            },

            getEntradas: function () {
                return this.entradasCollection.setUrl('false');
            },

            getMenu: function () {
                return this.menuCollection.setUrl('false');
            },

            getCarne: function () {
                return this.carneCollection.setUrl('false');
            },

            getGuarnicion: function () {
                return this.guarnicionCollection.setUrl('false');
            },

            getAcompañamiento: function () {
                return this.acompañamientoCollection.setUrl('false');
            },

            renderAsync: function () {
                var configTemplateInfo = {
                    Entradas: this.entradasCollection.toJSON(),
                    Menu: this.menuCollection.toJSON(),
                    Carnes: this.carneCollection.toJSON(),
                    Guarnicion: this.guarnicionCollection.toJSON(),
                    Acompañamiento: this.acompañamientoCollection.toJSON()
                };
                
                console.log(configTemplateInfo.Menu);

                this.$el.html(this.configTemplate(configTemplateInfo));
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

                'click #backButton': 'navigateMain',

                //JTORRES
                'click #CrearAcompañamiento': 'showAcompañamientoModal',
                'click #CrearCarne': 'showCarneModal',
                'click #CrearEntrada': 'showEntradaModal',
                'click #CrearGuarnicion': 'showGuarnicionModal',
                'click #CrearMenu': 'showMenuModal',

                'click #saveAcompañamientoModalButton': 'guardarAcompañamientoButton',
                'click #saveCarneModalButton': 'guardarCarneButton',
                'click #saveEntradaModalButton': 'guardarEntradaButton',
                'click #saveGuarnicionModalButton': 'guardarGuarnicionButton',
                'click #saveMenuModalButton': 'guardarMenuButton',

                'change #AcompañamientoSelect input': 'actualizarAcompañamiento',
                'change #CarneSelect input': 'actualizarCarne',
                'change #EntradaSelect input': 'actualizarEntrada',
                'change #GuarnicionSelect input': 'actualizarGuarnicion',
                'change #MenuSelect input': 'actualizarMenu'

            },

            showAcompañamientoModal: function () {
                $('#modalDiv').html(this.acompañamientoModalTemplate());
                this.delegateEvents();
                $('#crearAcompañamientoModal').modal();
            },
            showCarneModal: function () {
                $('#modalDiv').html(this.carneModalTemplate());
                this.delegateEvents();
                $('#crearCarneModal').modal();
            },
            showEntradaModal: function () {
                $('#modalDiv').html(this.entradaModalTemplate());
                this.delegateEvents();
                $('#crearEntradaModal').modal();
            },
            showGuarnicionModal: function () {
                $('#modalDiv').html(this.guarnicionModalTemplate());
                this.delegateEvents();
                $('#crearGuarnicionModal').modal();
            },
            showMenuModal: function () {
                $('#modalDiv').html(this.menuModalTemplate());
                this.delegateEvents();
                $('#crearMenuModal').modal();
            },

            guardarAcompañamientoButton: function () {
                var nuevoAcompañamiento = {
                    Nombre: $('#NombreNuevoAcompañamiento').val(),
                    Activo: $('#ActivoNuevoAcompañamiento')[0].checked
                };

                $('#crearAcompañamientoModal').one('hidden.bs.modal', (function () {
                    this.render();
                }).bind(this));

                this.acompañamientosModel.save(nuevoAcompañamiento).done((function () {
                    $('#cerrarAcompañamientoModalButton').click();
                }).bind(this));
            },
            guardarCarneButton: function () {
                var nuevaCarne = {
                    Nombre: $('#NombreNuevaCarne').val(),
                    Activo: $('#ActivoNuevaCarne')[0].checked
                };
                
                $('#crearCarneModal').one('hidden.bs.modal', (function () {
                    this.render();
                }).bind(this));

                this.carnesModel.save(nuevaCarne).done((function () {
                    $('#cerrarCarneModalButton').click();
                }).bind(this));
            },
            guardarEntradaButton: function () {
                var nuevaEntrada = {
                    Nombre: $('#NombreNuevaEntrada').val(),
                    Activo: $('#ActivoNuevaEntrada')[0].checked
                };
                                
                $('#crearEntradaModal').one('hidden.bs.modal', (function () {
                    this.render();
                }).bind(this));

                this.entradasModel.save(nuevaEntrada).done((function () {
                    $('#cerrarEntradaModalButton').click();
                }).bind(this));
            },
            guardarGuarnicionButton: function () {
                var nuevaGuarnicion = {
                    Nombre: $('#NombreNuevaGuarnicion').val(),
                    Activo: $('#ActivoNuevaGuarnicion')[0].checked
                };
                
                $('#crearGuarnicionModal').one('hidden.bs.modal', (function () {
                    this.render();
                }).bind(this));

                this.guarnicionesModel.save(nuevaGuarnicion).done((function () {
                    $('#cerrarGuarnicionModalButton').click();
                }).bind(this));
            },
            guardarMenuButton: function () {
                var nuevoMenu = {
                    Nombre: $('#NombreNuevoMenu').val(),
                    Costo: $('#CostoNuevoMenu').val(),
                    Activo: $('#ActivoNuevoMenu')[0].checked
                };

                $('#crearMenuModal').one('hidden.bs.modal', (function () {
                    this.render();
                }).bind(this));

                this.menusModel.save(nuevoMenu).done((function () {
                    $('#cerrarMenuModalButton').click();
                }).bind(this));
            },

            navigateMain: function () {
                var route = $(event.target).data('route');
                globalRouter.navigate(route, { trigger: true });
            },

            actualizarAcompañamiento: function (event) {
                var acompañamiento = {
                    Id: $(event.target).data('id'),
                    Nombre: $(event.target).data('nombre'),
                    Activo: $(event.target)[0].checked
                }
                this.acompañamientosModel.save(acompañamiento);
            },

            actualizarCarne: function (event) {
                var carne = {
                    Id: $(event.target).data('id'),
                    Nombre: $(event.target).data('nombre'),
                    Activo: $(event.target)[0].checked
                }
                this.carnesModel.save(carne);
            },

            actualizarEntrada: function (event) {
                var entrada = {
                    Id: $(event.target).data('id'),
                    Nombre: $(event.target).data('nombre'),
                    Activo: $(event.target)[0].checked
                }
                this.entradasModel.save(entrada);
            },

            actualizarGuarnicion: function (event) {
                var guarnicion = {
                    Id: $(event.target).data('id'),
                    Nombre: $(event.target).data('nombre'),
                    Activo: $(event.target)[0].checked
                }
                this.guarnicionesModel.save(guarnicion);
            },

            actualizarMenu: function (event) {
                var menu = {
                    Id: $(event.target).data('id'),
                    Nombre: $(event.target).data('nombre'),
                    Activo: $(event.target)[0].checked
                }
                this.menusModel.save(menu);
            }

        });

        return View;
    });