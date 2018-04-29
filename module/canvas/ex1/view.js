define(['text!module/canvas/ex1/tpl.html'],function(tpl){
	var view = Backbone.View.extend({
		el:'#container',
		initialize:function(){

		},
		render:function(){
			this.$el.html(_.template(tpl));
			this.canvas();
		},
		canvas:function(){
			var can = this.$el.children('#canvas')[0];
			var ctx = can.getContext('2d');
			ctx.font = '38px arial';
			ctx.fillStyle = 'cornflowerblue';
			ctx.strokeStyle = 'blue';
			ctx.fillText('hello canvas',canvas.width/2 - 150,
                                 canvas.height/2 + 15);

			ctx.strokeText('hello canvas',canvas.width/2 - 150,
                                   canvas.height/2 + 15 );
		}
	});

	return view;
})