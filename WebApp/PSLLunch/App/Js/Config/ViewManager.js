define(['backbone'], function (Backbone) {

    var viewManager = function () { };


    viewManager.prototype.showView = function (view, container) {

        console.log("View");
        console.log(view);
        var localview = _.extend(view, Backbone.Singleton);

        view = localview.getInstance();

        // Don't close view if it's currently active
        if (this.currentView && this.currentView !== view) {
            this.currentView.close();
        }

        this.currentView = view;
        this.currentView.render()
            .delegateEvents();

        $(container).html(this.currentView.el);
        $('html,body').animate({ scrollTop: $('body').offset().top }, 0);
    };


   

    return viewManager;

});
