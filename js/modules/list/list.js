define(function(require){
	require("modules/list/list.css");
	var Throttle=require("tools/Throttle");
	var list=Backbone.View.extend({
	tpl: _.template('<a href="#layer/<%=id%>"><img style="<%=style%>" src="<%=url%>" alt="" /></a>'),
	leftHeight:0,
	rightHeight:0,
	initialize:function(){
		this.getData();
		this.initDom();
		this.listenTo(this.collection,"add",function(model){
			//console.log(model)
			this.render(model);
		})
		this.bindEvents();
	},
	bindEvents:function(){
		var This=this;
		var lock=true;
		var lock1=true;
		
		//var navTop=$(".list .nav").offset().top;
		//console.log(navTop)
		$(window).scroll(function(){
			if($(window).scrollTop()>200&&lock1){
				lock1=false;
				$(".list .go-top").show();

			}
			if($(window).scrollTop()<200&&!lock1){
				lock1=true;
				$(".list .go-top").hide();
			}
			if($(window).scrollTop()>120&&lock){
				lock=false;
				console.log(1)
				$(".list .nav").css({"position":"fixed",
									"left":0,
									"top":0
									})
			}
			if($(window).scrollTop()<=120&&!lock){
				lock=true;
				console.log(2)
				$(".list .nav").css({"position":"relative"})
			}
			var scale=$(window).scrollTop()/($(document).height()-$(window).height());	
			if(scale>0.7){
				Throttle(This.getData,{time:350,context:This})			
			}	
		})
		$(window).keydown(function(event){
			var value=This.$(".search-input").val();;
			if(event.keyCode==13&&value){
				This.showSearch();
			}
		})
	},

	events:{
		"click .search-click":"showSearch",
		"click .nav li":"showListItem",
		"click .list .back":"showListBack",
		"tap .list .go-top":"showTop"
	},
	showTop:function(){
		$(window).scrollTop(0,0)
	},
	showListBack:function(){
		this.clearSearch();

		this.renderSearch(this.collection)

	},
	showListItem:function(e){
		var dom=e.target;
		var Id=this.getLiId(dom);
		var result=this.getClickData(Id,"type");
		this.renderModelFromTouch(result);
	},
	getClickData:function(val,key){
		 key=key||"title";
		var result=this.collection.filter(function(model){
			return model.get(key)==val;
		})
		return result;
	},
	renderModelFromTouch:function(data){
		this.clearSearch();
		this.renderSearch(data);

	},
	getLiId:function(dom){
		return $(dom).data("id");
	},
	showSearch:function(){
		var value=this.getSearchValue();
		if(value){	
		var result=this.getSearchData(value);
		this.resetView(result);
		};
		
	},
	resetView:function(result){
		this.clearSearch();
		this.renderSearch(result);
	},
	renderSearch:function(result){
		var This=this;
		result.forEach(function(model){
			This.render(model)
		})
	},
	clearSearch:function(){
		this.leftHeight=0;
		this.rightHeight=0;
		this.leftContainer.html("");
		this.rightContainer.html("");
	},
	getSearchData:function(val,key){
			 key=key||"title";
		var result=this.collection.filter(function(model){
			return model.get(key).indexOf(val)!=-1;
		})
		return result;
	},
	getSearchValue:function(){
		var value=this.$(".search-input").val();
		if(/^\s*$/.test(value)){
			alert("请输入query")
			return;
		}
		return value.replace(/^\s+|\s+$/g,"");
	},
	getData:function(){
		this.collection.feachData();
	},
	initDom:function(){
		this.leftContainer=this.$(".left-list");
		this.rightContainer=this.$(".right-list");
	},
	render:function(model){
		//console.log(model)
		
		var data={
			id:model.get("id"),
			style:["width:",model.get("showWidth"),"px;height:",model.get("showHeight"),"px;"].join(""),
			url:model.get("url")
		};
		//console.log(data)
		var tpl=this.tpl(data)
		//console.log(this.rightHeight)
		if (this.leftHeight > this.rightHeight) {
				this.renderRight(tpl, model.get('showHeight'));
			} else {
				this.renderLeft(tpl, model.get('showHeight'));
			}
	},
	renderLeft:function(tpl,height){
		this.leftHeight+=height+6;
		this.leftContainer.append($(tpl))
	},
	renderRight: function (tpl, height) {
			this.rightHeight += height + 6;
			this.rightContainer.append($(tpl))
		}
	})
	return list;
})