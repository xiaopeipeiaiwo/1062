var cont = "";
var psd0 = "";
var psd1 = "";
$(function(){
	//手机号码的验证
			//手机号码输入框失去焦点
	$(".phone_num input").blur(function(){
		cont = $(this).val();
		if(/\d+/.test(cont) && cont.length == 11){
			$(".phone_num .bfr").css("display", "none");
			$(".phone_num .latr").css("display", "block");
			$(".psw i a").css("background", "#fafafa");
			$(".psw i a").css("color", "#666");
			$(".phone_num .error").css("display", "none");
		}else if(/^\s*$/.test(cont)){
			dis("手机号不能为空");
		}else{
			dis("手机号格式错误");
		}
	})
		//手机号码输入框获得焦点
	$(".phone_num input").focus(function(){
		$(".phone_num .error").css("display", "none");
	})
		//手机号码验证的错误提示消息
		function dis(des){
			$(".phone_num .error span").html(des);
			$(".phone_num .error").css("display", "block");
			$(".phone_num .bfr").css("display", "block");
			$(".phone_num .latr").css("display", "none");
		}

	//验证码框的设置
	$(".psw a").click(function(){
		var num = 60;
		var _this = this;
		clearInterval(time);
		var time = setInterval(function(){
			num--;
			//alert(111)
			$(".psw i a").css("background", "#e4e4e4");
			$(".psw i a").css("color", "#c7c7c7");
			$(_this).html(num + "后重发");
			if(num == 0){
				clearInterval(time);
				$(".psw i a").css("background", "#fafafa");
				$(".psw i a").css("color", "#666");
				$(_this).html("重新获取");
			}
		},1000);
		
		
	})
	//输入密码的验证
			//密码输入框失去焦点
	$(".psd0 input").blur(function(){
		psd0 = $(this).val();
		if(/^\s*$/.test(psd0)){
			$(".psd0 .error span").html("密码不能为空");
			dis0();			
		}else if(psd0.length > 18){
			$(".psd0 .error span").html("密码太长啦,最长18位");
			dis0();
		}else if(psd0.length < 6){		
			$(".psd0 .error span").html("密码太短啦,最少6位");
			dis0();
		}else{
			$(".psd0 .bfr").css("display", "none");
			$(".psd0 .latr").css("display", "block");
		}
	})
		//密码输入框获得焦点
	$(".psd0 input").focus(function(){
		$(".psd0 .error").css("display", "block");
		$(".psd0 .error").css("display", "none");
	})
		//密码验证的错误提示消息
	function dis0(){
		$(".psd0 .error").css("display", "block");
		$(".psd0 .bfr").css("display", "block");
		$(".psd0 .latr").css("display", "none");
	}


		//重复密码的验证
			//重复密码输入框失去焦点
		$(".psd1 input").blur(function(){
			psd1 = $(this).val();
			if(/^\s*$/.test(psd1)){
				dis1("重复密码不能为空");
				$(".psd1 .error").css("display", "block");
			}else if(psd0 == psd1){
				$(".psd1 .latr").css("display", "block");
				$(".psd1 .error").css("display", "none");
			}else{
				dis1("两次输入密码不一致");
			}
		})
			//重复密码输入框获得焦点
			$(".psd1 input").focus(function(){
				$(".psd1 .error").css("display", "block");
				$(".psd1 .error").css("display", "none");
			})
			//重复输入密码的错误提示
		function dis1(des){
			$(".psd1 .error span").html(des);
			$(".psd1 .error").css("display", "block");
			$(".psd1 .latr").css("display", "none");
		}
		//cookie缓存
		$(".resign").click(function(){
			if($(".error").css("display") == "none"){
				var first = $.cookie("sign") == null ? true : false;
				var same = false;
				if(first){
					var num1 = $(".phone_num input").val();
					var pas1 =  $(".psd0 input").val();

					$.cookie("sign",'[{phoneNum: '+ num1 + ',password:'+ pas1 +'}]',{expires:7});
					$(this).attr("href", "login.html");	
				}else{
					var str = $.cookie("sign");
					var arr = eval(str);
					for(var i in arr){
						if(arr[i].phoneNum ==  $(".phone_num input").val()){
							$(".phone_num .error").css("display", "block");
							$(".phone_num .error span").html("此账号已存在");
							same = true;
						}
					}
					if(!same){
						var obj = {phoneNum:$(".phone_num input").val(), password: $(".psd0 input").val()};
						arr.push(obj);
						var cookieStr = JSON.stringify(arr);
						$.cookie("sign",cookieStr);
					}
				}
				
			}		

		})
})
