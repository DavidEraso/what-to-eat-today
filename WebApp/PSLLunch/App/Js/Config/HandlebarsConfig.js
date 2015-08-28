define([], function () {
    var initialize = function () {
        Handlebars.registerHelper('formatPhone', function (phone) {
            return '(' + phone.slice(0, 3) + ') ' + phone.slice(3, 6) + '-' + phone.slice(6, 10);
        });

        Handlebars.registerHelper('currency', function (amount) {
            return numeral(amount).format('$0,0.00');
        });

        Handlebars.registerHelper('formatDate', function (date) {
            return Moment(date).format('MM/DD/YYYY');
        });
    };

    return {
        initialize: initialize
    };
});