define(['text!module/canvas/ex2/tpl.html'],function(tpl){
	var view = Backbone.View.extend({
		el:'#container',
		initialize:function(){

		},
		render:function(){
			this.$el.html(_.template(tpl)({canvas:'canvas'}));
			this.circleClock();
		},

		circleClock:function(){
			var option = {
				el:this.$el.children('#canvas')[0],
				snapshot:this.$el.children('#controls').children('#snapshot')[0]
			}
			require(['module/canvas/ex2/clock.js'],function(clock){
				var clocks = new clock(option);
			});

		}
	});

	return view;
})