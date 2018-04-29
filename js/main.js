'use strict';
(function(win){
	//配置baseurl
	var baseUrl = document.getElementById('main').getAttribute('data-baseUrl');

	/*
	*  配置依赖
	*/
	var config = {
		baseUrl : baseUrl,
		paths:{
			zepto : 'libs/zepto.min',
			jquery : 'libs/zepto.min',
			underscore : 'libs/underscore-min',
			backbone : 'libs/backbone-min',
			text : 'libs/text',
			router : 'js/router-cfg-version',
		},
		shim:{
			'underscore':{
				exports:'_'
			},
			'jquery':{
				exports:'_'
			},
			'zepto':{
				exports:'$'
			},
			'backbone':{
				deps:['underscore','jquery'],
				exports:'Backbone'
			}
		}
	};
	require.config(config);

	//Backbone会把自己加到全局变量中
	require(['backbone','underscore','router'],function(){
		Backbone.history.start();
	});
})(window);