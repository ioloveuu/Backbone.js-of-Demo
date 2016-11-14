define(function(require,exports,modules){
	var listWidth=parseInt(($(window).width()-6*3)/2);
	var imgModel=Backbone.Model.extend({
		initialize:function(){
			this.on("add",function(model){
				var h=parseInt(model.get("height")*listWidth/model.get("width"));
				model.set({
					showWidth:listWidth,
					showHeight:h
				})
			})
		}
	})
	modules.exports=imgModel;

})