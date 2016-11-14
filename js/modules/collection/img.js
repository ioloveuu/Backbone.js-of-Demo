define(function(require,exports,modules){
	var imgModel=require("modules/model/img");

	var imgCollection=Backbone.Collection.extend({
		model:imgModel,
		imageId:0,
		feachData:function(callback,data){
			var that=this;
			$.get("data/imageList.json",function(res){
				//console.log(res)
				if(res.errno===0){
						res.data.sort(function(){
						return Math.random()-0.5;
					})
					res.data.map(function(value){
						value.id=that.imageId++;
					})
					//console.log(res.data)
					that.add(res.data);
					callback&&callback();
					}			
			})

		}
	})
	modules.exports=imgCollection;
})