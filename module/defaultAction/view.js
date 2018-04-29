define(['text!module/defaultAction/tpl.html'],function(tpl){
	var view = Backbone.View.extend({
		el:'#container',
		
		initialize:function(){
		},
		render:function(){
			this.$el.html(_.template(tpl)({module:this.module}));
		}

	});

	return view;
})