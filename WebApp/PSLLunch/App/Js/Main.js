require.config({

    paths: {
        //AMD third party libraries and in-house modules
       
        'backbone': 'ThirdParty/backbone',
        'handlebars': 'ThirdParty/handlebars',
        'jquery': 'ThirdParty/jquery',
        'underscore': 'ThirdParty/underscore-amd',
        'moment': 'ThirdParty/moment',
        'numeral': 'ThirdParty/numeral',
        "bootstrap": 'ThirdParty/bootstrap'

    },

    //Non-amd third party libraries
    shim: {
        'bootstrap': {
            'deps':['jquery']
        }
    },
});


require(['AppConfig'], function (AppConfig) {
    AppConfig.initialize();
    console.log("Application Started");
});