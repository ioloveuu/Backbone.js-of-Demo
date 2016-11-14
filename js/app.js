define(function(require){
	var list=require("modules/list/list");
	var layer=require("modules/layer/layer");
	var collection=require("modules/collection/img");
	var ImgCollection=new collection(); 
	var layerView=new layer({
				el:$("#layer"),
				collection:ImgCollection
			})
		var listView=new list({
				el:$("#list"),
				collection:ImgCollection
			})
	var Router=Backbone.Router.extend({
		routes:{
			"layer/:num":"showlayer",
			"*other":"showlist"
		},
		showlist:function(){
			$("#list").show();
			$("#layer").hide();
		},
		showlayer:function(num){
			
			layerView.render(num);
			$("#list").hide();
			$("#layer").show();
		}

		});

	return function(){
		var route=new Router();
		Backbone.history.start();
	}

	})
