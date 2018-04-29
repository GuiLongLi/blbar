define(['backbone'],function(){
	var routerMap = {
		'ex1':'module/canvas/ex1/controller.js',
		'ex2':'module/canvas/ex2/controller.js',


		//默认路由
		'':'module/defaultAction/controller.js',
		'*actions':'module/defaultAction/controller.js'
	};

	var Router = Backbone.Router.extend({
		routes:routerMap,
		defaultAction:function(){
			console.log(404);
			location.hash = '';
		}
	});

	var router = new Router();
	router.on('route',function(route,params){
		require([route],function(controller){
			if(router.currentController && router.currentController !== controller){
				router.currentController.onRouteChange && router.currentController.onRouteChange();
			}
			router.currentController = controller;
			//每个模块都约定返回controller
			controller.apply(null,params);
		});

		//默认路由
		require(['module/common/controller.js'],function(controller){
			controller.apply(null,params);
		})
	});
	return router;
})