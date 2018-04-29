define(['text!module/common/tpl.html'],function(tpl){
	var view = Backbone.View.extend({
		el:'#naver',
		module:[
			{'module':'',name:'index'},
			{'module':'ex1',name:'ex1'},
			{'module':'ex2',name:'ex2'},
		],
		initialize:function(){

		},
		render:function(){
			this.$el.html(_.template(tpl)({module:this.module}))
		}
	});
	return view;
})