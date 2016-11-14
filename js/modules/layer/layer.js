define(function(require){
	require("modules/layer/layer.css");
	var height = $(window).height();
	var layer=Backbone.View.extend({
		tpl:_.template($("#layer_tpl").html()),
		modelId:0,
		lastModel:[],
		getModelById:function(id){
			this.modelId=id;
			var model=this.collection.get(id);
			return model;
		},
		events:{
			"swipeLeft .img-container img": "showNextImage",
			'swipeRight .img-container img': 'showPreImage',
			"tap .back":"goback",
			"tap .img-container img":"toggleNav"
		},
		toggleNav:function(){
			this.$(".navbar").toggleClass("hide");
		},
		goback:function(){
			this.lastModel.pop();
			var id=this.lastModel[this.lastModel.length-1];
			if(id){
				var model=this.collection.get(id);
				this.changeImage(model);
			}
			else{
				window.location.hash="#";
			}
		},
		showNextImage:function(){
			console.log(222);
			var model=this.collection.get(++this.modelId);
			if(model){
				this.changeImage(model);
				this.lastModel.push(this.modelId);
			}else{
				alert('已经是最后一张了');
				this.modelId--;
			}
		},
		showPreImage:function(){
			console.log(111)
			var model = this.collection.get(--this.modelId)
			if (model) {
				this.changeImage(model);
				this.lastModel.push(this.modelId);
			} else {
				alert('已经是第一张了');
				this.modelId++;
			}
		},
		changeImage:function(model){
			this.$(".img-container img").attr("src",model.get("url"));
			this.$('.navbar h1').html(model.get('title'));
		},
		render:function(id){
			//console.log(1)
			var model=this.getModelById(id);
			if(!model){
				window.location.hash="#";
				return;
			}
			this.lastModel.push(this.modelId)
			//console.log(model)
			var data=model.pick(["url","title"]);
			//console.log(data)
			data.styles='line-height: ' + height + 'px';
			var tpl=this.tpl(data);
			this.$el.html(tpl);
			this.$el.show();
		
		}
	})
	return layer;
})