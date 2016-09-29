
var banner_img = null;
var time = null;
var timer = null;
var speed = null;
var count = 0;
var istrue = false;
$(function(){
	/* --------- top_left (top_left_nav)--------- */
	$(".top_left_nav").hover(function(){
		$(this).find(".icon").css("background", "url(../images/arrow-down.png) top right no-repeat)");
		$(this).find(".top_menu").stop().slideDown(200);
	},function(){
		$(this).find(".top_menu").stop().slideUp(50);
	});

	/* --------- top_center --------- */
	$(".top_center").hover(function(){
		$(this).find("a").css("color", "#333");
	},function(){
		$(this).find("a").css("color", "#dedede");
	})

	/* --------- top_right_buy 购物车--------- */
	//页面刷新的时候获取购物车内的商品数量
	//sc_car();

	$(".top_right_buy").hover(function(){
		$(this).css("background", "#fff");
		$(this).find("i").css("color", "#f8177c");
		$(this).find("span").css("color", "#f8177c");
		sc_msg();
		$(".clear_shopcar").stop().slideDown(300);
		$(".top_shopcar").stop().slideDown(300).css("height","auto");
		
	},function(){
		$(this).css("background", "#27252e");
		$(this).find("i").css("color", "#dedede");
		$(this).find("span").css("color", "#dedede");
		sc_msg();
		$(".clear_shopcar").stop().slideUp(100);
		$(".top_shopcar").stop().slideUp(100).css("height","auto");
		
	})
	
	//cookie取购物车商品信息
	function sc_msg(){
		$.ajax({
			url:"http://10.30.162.25/美图官网/json/meitu1.json",
			type:"get",
			success:function(data){
				var obj0 = eval(data)._intr0;
				var str = $.cookie("goods");
				//如果购物车不为空
				if(str){
					var arr = eval(str);
					var oHtml = "";
					var tNum = 0;
					//删除class名为clear_shopcar
					if($(".clear_shopcar").length){
						$(".clear_shopcar").parent().remove($(".clear_shopcar"));
					}

					var oUl = $('<ul></ul>');
					var tPrice = 0;
					for(var i in arr){
						var oPrice = Number(obj0[arr[i].id].price.replace("￥","") * arr[i].num);
						oHtml += '<li><a class="small" href = "#"><img src =' + obj0[arr[i].id].small +'></a><b class = "top_intr">' + obj0[arr[i].id].title + '</b><a class = "reduce iconfont0" href="#"></a><b class = "top_count">' + arr[i].num + '</b><a class = "increase iconfont0" href="#"></a><b class = "top_price">' + oPrice + '</b></li>';
						tPrice += Number(oPrice);
						tNum += parseInt(arr[i].num);
					}					
					var oTotal = '<div class = "top_account"><p>共<strong>'+ tNum + '</strong>件商品</p><h4 class = "total_price"><strong>' + tPrice + '</strong>元</h4><a href="#">去购物车结算</a></div>';

					//判断购物车是否是第一次放东西
					//如果不是第一次放东西,div的class名已经存在
					if($(".top_shopcar").length){
						oUl.html(oHtml);
						$(".top_shopcar").html(oUl);
						$(".top_shopcar").append(oTotal);
						$(".top_right_buy").append($(".top_shopcar"));
						$(".top_shopcar").css("height","auto");		
					//如果是第一次放东西,要创建div
					}else{
						var oDiv = $('<div class="top_shopcar"></div>');
						oUl.html(oHtml);					
						oDiv.html(oUl);
						oDiv.append(oTotal);
						$(".top_right_buy").append(oDiv).css("height","auto");
					}
				//如果购物车为空
				}else{
					//判断oHtml是否已经放进过top_right_buy中
					if($(".clear_shopcar").length){

					}else{
						var oHtml = '<div class="clear_shopcar"><ul><li class="clear">购物车中还没有东西,<a href= "http://10.30.162.25/美图官网/detail.html" target="_blank">现在去挑选...</a></li></ul></div>';
						$(".top_right_buy").append(oHtml);
					}
					
				}
			}
		});
	}
	


	/* --------- ajax调用数据 header_nav_a0(手机)--------- */
	ajax("get", "json/meitu1.json", "",function(data){
		var arr = JSON.parse(data)._data0;
		var oUl = $('<ul class = "header_inner"></ul>');
		for(var i = 0; i < arr.length; i++){
			var oLi = $("<li></li>");
			var oA = $('<a href = "#"></a>');
			var oImg = $("<img />");
			oImg.attr("src", arr[i].url);
			var oSpan = $("<span></span>");
			oSpan.html(arr[i].title);
			oImg.appendTo(oA);
			oSpan.appendTo(oA);
			oA.appendTo(oLi);
			oLi.appendTo(oUl);
		}
		oUl.appendTo($(".wrap0").eq(0));
	})

	var line = document.getElementsByClassName("line")[0];
/* ---------header_nav_a0(手机)的鼠标滑过离开的样式设置--------- */
	$(".header_nav_a0").hover(function(){
		$(".wrap0").css("display","none");
		$(".wrap0").eq(0).stop().slideDown(400);
		$(this).css("display","block");
		$(".line").css("display", "block");
		startMove(line, 285, 30);
	},function(){
			/* ---------header_nav_a0(手机)下图标--------- */
			$(".wrap0").eq(0).hover(function(){
				$(this).find("li").hover(function(){
					$(this).find("span").css("color", "#f8177c");
					$(".line").css("display", "block");
				},function(){
					$(this).find("span").css("color", "#555");
					$(".line").css("display", "none");
				})
			},function(){
				$(this).stop().slideUp(200);
				$(".line").css("display", "none");
			})
	})

	/* --------- ajax调用数据 header_nav_a1(相机)--------- */
	ajax("get", "json/meitu1.json", "",function(data){
		var arr = JSON.parse(data)._data1;
		var oUl = $('<ul class = "header_inner"></ul>');
		for(var i = 0; i < arr.length; i++){
			var oLi = $("<li></li>");
			var oA = $('<a href = "#"></a>');
			var oImg = $("<img />");
			oImg.attr("src", arr[i].url);
			var oSpan = $("<span></span>");
			oSpan.html(arr[i].title);
			oImg.appendTo(oA);
			oSpan.appendTo(oA);
			oA.appendTo(oLi);
			oLi.appendTo(oUl);
		}
		oUl.appendTo($(".wrap0").eq(1));
	})
/* ---------header_nav_a1(相机)的鼠标滑过离开的样式设置--------- */
	$(".header_nav_a1").hover(function(){
		$(".wrap0").css("display","none");
		$(".wrap0").eq(1).stop().slideDown(400);
		$(this).css("display","block");
		$(".line").css("display", "block");
		startMove(line, 361, 30);
	},function(){	
			$(".wrap0").eq(1).hover(function(){
				$(this).find("li").hover(function(){
					$(this).find("span").css("color", "#f8177c");
					$(".line").css("display", "block");
				},function(){
					$(this).find("span").css("color", "#555");
					$(".line").css("display", "none");
				})
			},function(){
				$(this).stop().slideUp(200);
				$(".line").css("display", "none");
			})
	})

	/* --------- ajax调用数据 header_nav_a2(配件)--------- */
	ajax("get", "json/meitu1.json", "",function(data){
		var arr = JSON.parse(data)._data2;
		var oUl = $('<ul class = "header_inner"></ul>');
		for(var i = 0; i < arr.length; i++){
			var oLi = $("<li></li>");
			var oA = $('<a href = "#"></a>');
			var oImg = $("<img />");
			oImg.attr("src", arr[i].url);
			var oSpan = $("<span></span>");
			oSpan.html(arr[i].title);
			oImg.appendTo(oA);
			oSpan.appendTo(oA);
			oA.appendTo(oLi);
			oLi.appendTo(oUl);
		}
		oUl.appendTo($(".wrap0").eq(2));
	})
	/* ---------header_nav_a2(配件)的鼠标滑过离开的样式设置--------- */
	$(".header_nav_a2").hover(function(){
		$(".wrap0").css("display","none");
		$(".wrap0").eq(2).stop().slideDown(400);
		$(this).css("display","block");
		$(".line").css("display", "block");
		startMove(line, 437, 30);
	},function(){	
			$(".wrap0").eq(2).hover(function(){
				$(this).find("li").hover(function(){
					$(this).find("span").css("color", "#f8177c");
					$(".line").css("display", "block");
				},function(){
					$(this).find("span").css("color", "#555");
					$(".line").css("display", "none");
				})
			},function(){
				$(this).stop().slideUp(200);
				$(".line").css("display", "none");
			})
	})

	/* ---------header_nav_a3,header_nav_a4--------- */
	oNav(".header_nav_a3");
	oNav(".header_nav_a4");
	function oNav(obj){
		$(obj).mouseover(function(){
			$(".wrap0").stop().slideUp(200);
			$(".line").css("display", "none");	
		})
	}	
	
	/* --------- ajax调用数据 显示banner图--------- */
	ajax("get", "json/meitu1.json", "",function(data){
		var arr = JSON.parse(data)._data3;
		var oUl = $('<ul class = "banner_img"></ul>');
		for(var i = 0; i < arr.length; i++){
			var oLi = $('<li></li>');
			var oA = $('<a href = "#"></a>');
			var oImg = $('<img />');
			oImg.attr("src", arr[i].url);
			oImg.appendTo(oA);
			oA.appendTo(oLi);
			oLi.appendTo(oUl);
		}
		oUl.prependTo($(".wrap").eq(2));
		/* ---------banner图的显示自动滚动时按钮对应设置--------- */
		var aLi = oUl.find("li");		
		time = setInterval(function(){
			$(".banner").find("input").css("opacity", "0.6");
			$(".banner").find("input").eq(count % 4).css("opacity", "0.9");		
			aLi.css("display","none");
			aLi.eq(count % 4).css("display","block");		
			count++;
		},2000)
	})
	
	/* ---------banner图的按钮点击--------- */
	oClick(".btn0");
	oClick(".btn1");
	oClick(".btn2");
	oClick(".btn3");
	function oClick(obj){
		$(obj).click(function(){
			setTimeout(time,2000);
			count = $(this).index();			
			$(".banner_img").find("li").css("display", "none");
			$(".banner_img").find("li").eq($(this).index() -1).css("display","block");
			$("input").css("opacity", "0.6");
			$(this).css("opacity", "0.9");
		})
	}

	/* --------- ajax调用数据 显示banner_left--------- */
	ajax("get", "json/meitu1.json", "", function(data){
		var arr1 = JSON.parse(data)._data4;
		var oUl = $("<ul></ul>");
		for(var i = 0; i < arr1.length; i++){
			var oLi = $("<li></li>");
			var oH3 = $("<h3></h3>");			
			var oA1 = $('<a href = "#"></a>');
			oA1.html(arr1[i].title);
			oA1.appendTo(oH3);
			oH3.appendTo(oLi);
			if(arr1[i].des){
				var arr2 = arr1[i].des;
				for(var j = 0; j < arr2.length; j++){
					var oA2 = $('<a href = "#"></a>');
					var oSpan = $("<span></span>");
					oA2.html(arr2[j]);
					oA2.appendTo(oSpan);
					oSpan.appendTo(oLi);
				}
			}else{
				oLi.attr("class", "banner_bot");
			}									
			oUl.append(oLi);			
		}
		oUl.appendTo($(".banner_left"));

		/* ---------banner图右侧的鼠标滑过离开的样式设置--------- */	
		$(".banner_left").find("li").hover(function(){
			/*背景色变化*/
			$(".banner_left").find("li").css("background","");
			$(this).css("background","#f53a8a");
			/*span a 颜色变化*/
			$(".banner_left").find("li span a").css("color","#cfcfcf");
			$(this).find("span a").css("color", "#fff");
			/*banner_right 样式变化*/
			$(".banner_right").css("display","none");
			$(".banner_right").eq($(this).index()).css("display","block");
		},function(){
		/* ---------banner_right防止鼠标划过时消失--------- */
			/* ---判断鼠标离开时鼠标位置是否在banner_right上--- */
			if($(this).find("span").length){
				$(".banner_right").eq($(this).index()).hover(function(){

				},function(){
					$(".banner_left").find("li").css("background","");
					$(".banner_right").css("display","none");
				})	
			}else{
				$(".banner_left").find("li").css("background","");
			}				
		})	
	})

	/* --------- ajax调用数据 显示banner_right--------- */
	ajax("get", "json/meitu1.json", "", function(data){
			var arr = JSON.parse(data)._data5;
			var oUl = $("<ul></ul>");
			for(var i = 0; i < arr.length; i++){
				var oLi = $("<li></li>");
				var oA = $('<a href = "#"></a>');
				var oImg = $('<img />');
				var oSpan = $("<span></span>");
				oImg.attr("src", arr[i].url);
				oSpan.html(arr[i].title);
				oImg.appendTo(oA);
				oSpan.appendTo(oA);
				oA.appendTo(oLi);
				oLi.appendTo(oUl);
			}
			oUl.appendTo($(".banner_right").eq(0));
	})
	ajax("get", "json/meitu1.json", "", function(data){
			var arr = JSON.parse(data)._data6;
			var oUl = $("<ul></ul>");
			for(var i = 0; i < arr.length; i++){
				var oLi = $("<li></li>");
				var oA = $('<a href = "#"></a>');
				var oImg = $('<img />');
				var oSpan = $("<span></span>");
				oImg.attr("src", arr[i].url);
				oSpan.html(arr[i].title);
				oImg.appendTo(oA);
				oSpan.appendTo(oA);
				oA.appendTo(oLi);
				oLi.appendTo(oUl);
			}
			oUl.appendTo($(".banner_right").eq(1));
	})	
	ajax("get", "json/meitu1.json", "", function(data){
			var arr = JSON.parse(data)._data7;
			var oUl = $("<ul></ul>");
			for(var i = 0; i < arr.length; i++){
				var oLi = $("<li></li>");
				var oA = $('<a href = "#"></a>');
				var oImg = $('<img />');
				var oSpan = $("<span></span>");
				oImg.attr("src", arr[i].url);
				oSpan.html(arr[i].title);
				oImg.appendTo(oA);
				oSpan.appendTo(oA);
				oA.appendTo(oLi);
				oLi.appendTo(oUl);
			}
			oUl.appendTo($(".banner_right").eq(2));
	})
	ajax("get", "json/meitu1.json", "", function(data){
			var arr = JSON.parse(data)._data8;
			var oUl = $("<ul></ul>");
			for(var i = 0; i < arr.length; i++){
				var oLi = $("<li></li>");
				var oA = $('<a href = "#"></a>');
				var oImg = $('<img />');
				var oSpan = $("<span></span>");
				oImg.attr("src", arr[i].url);
				oSpan.html(arr[i].title);
				oImg.appendTo(oA);
				oSpan.appendTo(oA);
				oA.appendTo(oLi);
				oLi.appendTo(oUl);
			}
			oUl.appendTo($(".banner_right").eq(3));
	})			
	ajax("get", "json/meitu1.json", "", function(data){
			var arr = JSON.parse(data)._data8;
			var oUl = $("<ul></ul>");
			for(var i = 0; i < arr.length; i++){
				var oLi = $("<li></li>");
				var oA = $('<a href = "#"></a>');
				var oImg = $('<img />');
				var oSpan = $("<span></span>");
				oImg.attr("src", arr[i].url);
				oSpan.html(arr[i].title);
				oImg.appendTo(oA);
				oSpan.appendTo(oA);
				oA.appendTo(oLi);
				oLi.appendTo(oUl);
			}
			oUl.appendTo($(".banner_right").eq(4));
	})
	ajax("get", "json/meitu1.json", "", function(data){
			var arr = JSON.parse(data)._data9;
			var oUl = $("<ul></ul>");
			for(var i = 0; i < arr.length; i++){
				var oLi = $("<li></li>");
				var oA = $('<a href = "#"></a>');
				var oImg = $('<img />');
				var oSpan = $("<span></span>");
				oImg.attr("src", arr[i].url);
				oSpan.html(arr[i].title);
				oImg.appendTo(oA);
				oSpan.appendTo(oA);
				oA.appendTo(oLi);
				oLi.appendTo(oUl);
			}
			oUl.appendTo($(".banner_right").eq(5));
	})

	/* --------- ajax调用数据 显示 right_info--------- */
	ajax("get", "json/meitu1.json", "", function(data){
		var arr0 = JSON.parse(data)._data10;		
	/* --- ajax调用数据 显示phone --- */	 
		for(var i = 0; i < arr0.length; i++){
			var oImg = $("<img />");
			var oA = $('<a href = "#"></a>');
			var oH1 = $("<h1></h1>");
			var oH2 = $("<h2></h2>");
			var oP3 = $("<p></p>");
			oImg.attr("src", arr0[i].url);
			oH1.html(arr0[i].title);
			oH2.html(arr0[i].des);
			oP3.html(arr0[i].price);
			oImg.appendTo(oA);
			oH1.appendTo(oA);
			oH2.appendTo(oA);
			oP3.appendTo(oA);
			oA.appendTo($(".right_info").eq(0).find("li").eq(i % 4));
		}
		/* --- ajax调用数据 显示fittings --- */
		var arr1 = JSON.parse(data)._data11;	 
		for(var i = 0; i < arr1.length; i++){
			var oImg = $("<img />");
			var oA = $('<a href = "http://10.30.162.25/美图官网/detail.html" target = "_blank"></a>');
			var oH1 = $("<h1></h1>");
			var oH2 = $("<h2></h2>");
			var oP3 = $("<p></p>");
			oImg.attr("src", arr1[i].url);
			oH1.html(arr1[i].title);
			oH2.html(arr1[i].des);
			oP3.html(arr1[i].price);
			oImg.appendTo(oA);
			oH1.appendTo(oA);
			oH2.appendTo(oA);
			oP3.appendTo(oA);
			oA.appendTo($(".right_info").eq(1).find("li").eq(i % 4));
		}

		/* --- ajax调用数据 显示life_style --- */
		var arr2 = JSON.parse(data)._data12;	 
		for(var i = 0; i < arr2.length; i++){
			var oImg = $("<img />");
			var oA = $('<a href = "#"></a>');
			var oH1 = $("<h1></h1>");
			var oH2 = $("<h2></h2>");
			var oP3 = $("<p></p>");
			oImg.attr("src", arr2[i].url);
			oH1.html(arr2[i].title);
			oH2.html(arr2[i].des);
			oP3.html(arr2[i].price);
			oImg.appendTo(oA);
			oH1.appendTo(oA);
			oH2.appendTo(oA);
			oP3.appendTo(oA);
			oA.appendTo($(".right_info").eq(2).find("li").eq(i % 4));
		}

	/* ---------商品详情里的鼠标滑过事件(给每一个定时器添加一个方法)--------- */
		$(".right_info").find("a").hover(function(){					
			$(this).find("h1").stop().animate({"opacity":"0",height:"0"});
			$(this).find("h2").stop().animate({"opacity":"0",height:"0"});			
			$(this).find("img").stop().animate({height:"220px", width:"220px"});
			$(this).find("p").css("font-size", "18px");					
		},function(){
			$(this).find("h1").stop().animate({"opacity":"1",height:"20px"});
			$(this).find("h2").stop().animate({"opacity":"1",height:"20px"});			
			$(this).find("img").stop().animate({height:"190px", width:"190px"});
			$(this).find("p").css("font-size", "14px");
		})	
	})

	/* ---------mitu 的向左向右运动的箭头--------- */
	var mitu = document.getElementsByClassName("mito_ul")[0];	
	$(".iconfont2").click(function(){			
		startMove(mitu, -1120, 10);
	})
	$(".iconfont3").click(function(){			
		startMove(mitu, 0, 10);
	})

	/* ---------mitu li的鼠标滑过向上移动(给每一个定时器添加一个方法)--------- */
	$(".mito_ul").find("li").hover(function(){
		$(this).stop().animate({"margin-top":"4px"})
	},function(){
		$(this).stop().animate({"margin-top":"10px"})
			
	})

	/* ---------service h5 i的鼠标滑过时文字颜色同时变化--------- */	
	oChange($(".service0"), "#82a7ee");
	oChange($(".service1"), "#89d4b6");
	oChange($(".service2"), "#ffa656");
	oChange($(".service3"), "#ff4981");
	function oChange(obj, clr){
		obj.find("a").hover(function(){
			$(this).find("h5").css("color",clr);
			$(this).find("i").css("color",clr);
		},function(){
			$(this).find("h5").css("color","#727272");
			$(this).find("i").css("color","#b6b6b6");
		})
	}
	
	/* ---------about .code 公众号滑过的样式--------- */

	$(".code").hover(function(){
		$(".public").css("display", "block");
		$(this).css("background", "url('images/1.png') -47px -47px");
	},function(){
		if(!istrue){
			$(".public").hover(function(){
		
			},function(){
				$(this).css("display", "none");
				$(".code").css("background", "url('images/1.png') -7px -47px");
				istrue = true;
				
			});
		}else{
			$(".public").css("display", "none");
			$(".code").css("background", "url('images/1.png') -7px -47px");
			istrue = false;
		}
	})

	//滑动时出现up向上的箭头
	$(window).scroll(function(){
		if($(document).scrollTop() > 600){
			$(".about_up").css("display","block");
		}else{
			$(".about_up").css("display","none");

		}
	})
	
})


	/* ---------匀速运动的函数--------- */	
	function startMove(obj, iTarget ,num){
		
		clearInterval(time);
		time = setInterval(function(){
			if(obj.offsetLeft > iTarget){
				speed = -15;
			}else{
				speed = 15;
			}
			if(Math.abs(obj.offsetLeft - iTarget) < Math.abs(speed)){
				obj.style.left = iTarget + "px";
				clearInterval(time);
			}else{
				obj.style.left = obj.offsetLeft + speed + "px";
			}
		},num);
	}


