var _this = null;
$(function(){
	//邮箱手机号验证
		//失去焦点
	$(".num").blur(function(){
		var mailP = $(this).val();
		var arr = mailP.split("@");		
		_this = this;
		//判断是否为空
		if(/^\s*$/.test(mailP)){
			$(_this).siblings(".error").css("display", "block").find("span").html("账号不能为空");
		//判断是否是邮箱格式	
		}else if(arr.length == 2){
			$(_this).siblings(".error").css("display", "none");
		//判断手机格式		
		}else if(/^\d+$/.test(mailP) && mailP.length == 11){
			$(_this).siblings(".error").css("display", "none");	
		}else{
			$(_this).siblings(".error").css("display", "block").find("span").html("账号格式错误");	
		}
			
	})

	//获得焦点
	$(".num").focus(function(){
		$(this).siblings(".error").css("display", "none");
	})

	//密码验证
	$(".pas").blur(function(){
		pas = $(this).val();
		_this = this;
		if(/^\s*$/.test(pas)){
			$(_this).siblings(".error").css("display", "block").find("span").html("密码不能为空");					
		}else if(pas.length > 18){
			$(_this).siblings(".error").css("display", "block").find("span").html("密码太长啦,最长18位");			
		}else if(pas.length < 6){		
			$(_this).siblings(".error").css("display", "block").find("span").html("密码太短啦,最少6位");			
		}else{
			$(_this).siblings(".error").css("display","none");
		}
	})
	//获得焦点
	$(".pas").focus(function(){
		$(this).siblings(".error").css("display", "none");
	})
	$(".log").click(function(){
		if($(".error").css("display") == "none"){
			var str0 = $.cookie("sign");
			var arr0 = eval(str0);
			for(var i in arr0){
				if($(".log_right .num").val() == arr0[i].phoneNum && $(".log_right .pas").val() == arr0[i].password){
					$(this).attr("href", "http://10.30.162.25/美图官网/index.html");	
				}else{
					$(".log_right .error").eq(0).css("display", "block");
					$(".log_right .error span").eq(0).html("此账号不存在,请注册后登陆");
				}
			}
		}

	})
})