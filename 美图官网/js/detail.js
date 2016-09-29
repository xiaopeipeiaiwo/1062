$(function(){
	/* --------- ajax 调用数据显示小图标--------- */
	$.ajax({
		url:"json/meitu1.json",
		type:"get",
		data:"",
		success:function(data){

	 		//ajax 调用数据显小图标
			var arr0 = eval(data)._img0;
			var oLi = "";
			for(var i = 0; i < arr0.length; i++){
				oLi += "<li><a href = '#'><img src = " + arr0[i]._url + "></a></li>"
			}
			$(".detail_desc").html(oLi).find("li").eq(0).attr("class", "space");

			//ajax 调用数据显示要做放大镜的图标
			/*var arr1 = eval(data)._big0;
			var aLi = "";
			for(var i = 0; i < arr1.length; i++){
				aLi += "<li><img src=" + arr1[i]._url + "></li>";
			}

			$(".detail_large ul").append(aLi).find("li").eq(0).attr("class", "box");*/
			var arr1 = eval(data)._big0;
			var aLi = "";
			for(var i = 0; i < arr1.length; i++){
				aLi += "<li><img class='one' src=" + arr1[i]._url + "><img class='two' src=" + arr1[i]._url + "></li>";
			}

			$(".detail_large ul").append(aLi).find("li").eq(0).attr("class", "box");

			//放大镜
			$(".detail_large ul li img").hover(function(){
				$(this).siblings(".one").css("display","none");
			},function(){
				$(this).siblings(".two").css("display","block");
			})
			
			$(".detail_large ul li img").mousemove(function(ev){
				//水平位置动起来
				var left = ev.offsetX - $(".position_box").width()/2;
				if(left < 0){
					left = 0;
				}else if(left > $(".detail_large ul li").width()-$(".position_box").width()){
					left = $(".detail_large ul li").width()-$(".position_box").width();
				}
				$(".position_box").css("left", left + "px");
				//垂直位置动起来
				var top = ev.offsetY - $(".position_box").height()/2;
				if(top < 0){
					top = 0;
				}else if(top > $(".detail_large ul li").height()-$(".position_box").height()){
					top = $(".detail_large ul li").height()-$(".position_box").height();
				}
				$(".position_box").css("top", top + "px");

				//移动的比例  把X值和Y值换算成比例;

				var proportionX=left/$(".detail_large ul li").width()-$(".position_box").width();
				var proportionY=top/$(".detail_large ul li").height()-$(".position_box").height();
				console.log(proportionX+':'+proportionY);
				//var oImg =$(".detail_large ul li img");
				//alert(proportionX)
				//利用比例去算出大小不同的元素的偏移距离;
				$(".two").css(left, -proportionX*($(".two").width()-$(".detail_large ul li").width())+'px');
				$(".two").css(top,-proportionY*($(".two").height()-$(".detail_large ul li").height())+'px');
			})

			//detail_inform 鼠标移动时border颜色变化
			$(".detail_desc").find("li").mouseover(function(){
				$(".detail_large").find("li").attr("class","");
				$(".detail_large").find("li").eq($(this).index()).attr("class","box");
				$(".detail_desc").find("li").attr("class","");
				$(this).attr("class","space");
			})



			//ajax 调用数据显示最右边商品信息
			var arr2 = eval(data)._intr0;
			var oA = "";
			//取arr2中的第一组数据,以后界面依次取第2,3...组数据
			$(".detail_intr h3").html(arr2[0].title);
			//适配机型
			for(var i = 0; i < arr2[0].des.length; i++){
				if(i == arr2[0].des.length - 1){
					oA += "<a href = '#'>"+ arr2[0].des[i] + "</a>";
				}else{
					oA += "<a href = '#'>"+ arr2[0].des[i] + "</a>" + "/";
				}
				
			}
			$(".detail_intr p b").html(oA);

			//价格
			var oI = "<i>" + arr2[0].price + "</i>";
			$(".detail_intr ul .li_0").append(oI);

			//型号
			var oA2 ="<a href = '#'><img src =" + arr2[0].url + "></a>";
			$(".detail_intr ul .li_1").append(oA2);

			var oA3 = '<a href="#" class = "put_car 0" id ='+ arr2[i].id +'>加入购物车</a><a href="#" class = "purchase">立即购买</a>'
			$(".detail_inform .detail_wrap").append(oA3);
			
			//商品详情
			var xLi = "";
			for(var i = 0; i < arr2[0].imgs.length; i++){
				xLi += "<li><img src =" + arr2[0].imgs[i] + "></li>";
			}
			$(".detail_content ul").html(xLi);

			//规格参考
			var oP = "<p><span>" + arr2[0].norms +"</span><i>" + arr2[0].parameter + "</i></p>";
			$(".detail_size .detail_wrap").html(oP);

			//商品详情定位后右侧显示的信息
			var oInf = "<span>" + arr2[0].title + "</span><span>价格<i>" + arr2[0].price + "</i></span>";
			$(".description_left").html(oInf);
		}
	});
	/* ---- description 到 description_fix 的class名变换---- */
	$(window).scroll(function(){
			if($(document).scrollTop() > 704){
				$("#detail_description").attr("class","description_fix");
			}else{
				$("#detail_description").attr("class","description");

			}
		})
	//商品详情和规格的变化
	$(".des1").click(function(){
		$(this).css("color","#e92076");
		$(".des2").css("color","#333");
	})
	$(".des2").click(function(){
		$(this).css("color","#e92076");
		$(".des1").css("color","#333");
	})




	/* ---- sub_page.js购物车---- */
	ajax("get", "json/meitu1.json", "", function(data){
		var arr0 = JSON.parse(data)._intr0;	
		/* --- ajax调用数据 --- */	 
		for(var i = 0; i < arr0.length; i++){
			var oDiv = $('<div><a href="#" class="iconfont5 put_car" id ='+ arr0[i].id + '></a><a href="#" class="im1" ><img class="im_tp" src='+ arr0[i].small +'></a><a  href="#" class = "im2"><img class="im_bt" src=' + arr0[i].small + '></a><h3>'+ arr0[i].title +'</h3><h2>'+ arr0[i].price +'</h2></div>');
			oDiv.appendTo($(".sub_new .s_wrap ul").find("li").eq(i % 4));
		}
		//大图标样式变化
		$(".sub_new ul li div").hover(function(){
			$(this).css("border", "8px solid #f0f0f0");
			$(this).css("padding","0");
			$(this).find(".im1").stop().animate({"padding-top":20});
			$(this).find(".im2").stop().animate({"padding-top":10});
		},function(){
			$(this).css("border", "none");
			$(this).css("border-bottom", "1px solid #f0f0f0");
			$(this).css("padding","8px");
			$(this).find(".im1").stop().animate({"padding-top":30});
			$(this).find(".im2").stop().animate({"padding-top":0});
		})
		//小图片样式变化
		$(".im_bt").hover(function(){
			$(this).css("border","1px solid #e92076");
		},function(){
			$(this).css("border","1px solid #f0f0f0");
		})

		//鼠标滑过时购物车出现
		$(".sub_new ul li div").hover(function(){
			$(this).find(".put_car").css("display","block");
		},function(){
			$(this).find(".put_car").css("display","none");
		})

		//加入购物车
		$(".put_car").click(function(){
			var id = this.id;
			//判断是否有过cookie缓存
			var first = $.cookie("goods") == null ? true : false;
			//判断是否有相同的商品
			var same = false;
			if(first){
				//第一次添加的时候,建立json结构
				$.cookie("goods","[{id:" + id + ",num:1}]");
				$.cookie("first","false");
			}else{
				var str = $.cookie("goods");
				var arr = eval(str);
		
				//遍历所有的对象,如果id相同,让该商品的数量递增。
				for(var i in arr){
					if(arr[i].id == id){
						arr[i].num = arr[i].num + 1;
						var cookieStr = JSON.stringify(arr);
						$.cookie("goods",cookieStr);
						same = true;
					}
				}

				//如果id不同,添加该商品
				if(!same){
					var obj = {id:id,num:1};
					arr.push(obj);
					var cookieStr = JSON.stringify(arr);
					$.cookie("goods",cookieStr);
				}
			}
			sc_car();
		})

		//商品数量减少
		/*$(".reduce").click(function(){
			var id0 = this.id;
			var str = $.cookie("goods");
			var arr4 = eval(str);
			for(var i in arr4){
				if(arr4[i].id == id0){
					arr4[i].num = arr4.num - 1;
					var cookieStr0 = JSON.stringify(arr4);
					$.cookie("goods",cookieStr0);
				}
			}	
		})*/
	});



		
	//页面刷新的时候获取购物车内的商品数量
	sc_car();
	//统计购物车中所有商品的总数量
	function sc_car(){
		var str = $.cookie("goods");
		if(str){
			var obj = eval(str);
			var num = 0;
			for(var i in obj){
				num += Number(obj[i].num);
			}
			$(".top_right_buy .road em").html(num);
		}
	}
	

//cookie取购物车商品信息
	function sc_msg(){
		$.ajax({
			url:"json/meitu1.json",
			type:"get",
			success:function(data){
				var obj0 = eval(data)._intr0;
				var str = $.cookie("goods");
				//如果购物车不为空
				if(str){
					var arr = eval(str);
					var oHtml = "";
					var tNum = "";
					//删除class名为clear_shopcar
					if($(".clear_shopcar").length){
						$(".clear_shopcar").parent().remove($(".clear_shopcar"));
					}

					var oUl = $('<ul></ul>');
					var tPrice = 0;
					for(var i in arr){
						var oPrice = Number(obj0[arr[i].id].price.replace("￥","") * arr[i].num);
						oHtml += '<li><a class="small" href = "#"><img src =' + obj0[arr[i].id].small +'></a><b class = "top_intr">' + obj0[arr[i].id].title + '</b><a class = "reduce iconfont0" href="#"></a><b class = "top_count">' + arr[i].num + '</b><a class = "increase iconfont0" href="#"></a><b class = "top_price">' + oPrice + '</b></li>';
						/*oHtml += '<li><a class="small" id= "' + arr[i].id + 'a" href = "#"><img src =' + obj0[arr[i].id].small  +'></a><b class = "top_intr">' + obj0[arr[i].id].title + '</b><a class = "reduce iconfont0" href="#"></a><b class = "top_count">' + arr[i].num + '</b><a class = "increase iconfont0" href="#"></a><b class = "top_price">' + oPrice + '</b></li>';*/
						tPrice += oPrice;
						tNum += arr[i].num;
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
						$(".top_right_buy").append(oDiv);
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


})