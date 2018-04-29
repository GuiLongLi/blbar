define(['module/canvas/ex1/view.js'],function(View){
	var controller = function(){
		var view = new View();
		view.render();
	};

	return controller;
})