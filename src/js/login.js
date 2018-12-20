require(["../js/config.js"],function  () {
	require(["jquery","cookie"],function  ($,cookie) {
		$(function  () {
			
			//用户名验证
			
			$("#userName").blur(function  () {
				let userErr= $(".user-error");
				
				let user= $("#userName").val();
				
				if(user.length<4||user.length>16){
					
					userErr.text("请输入4到16位用户名");
					userErr.attr('data-val','0')
					
				}else if(/^[0-9a-zA-Z_\u2E80-\u9FFF]{4,16}$/.test(user)==false){
					
					userErr.text("用户名可以是数字,下划线,字母,汉字");
					userErr.attr('data-val','0')
					
				}else{
					userErr.text("");
					userErr.attr('data-val','1')
				}
				
				
			})
			//密码验证
			$("#passWord").blur(function  () {
				let passErr=$(".password-error");
				let pass=$("#passWord").val();
				
				if (pass.length<6||pass.length>10) {
				
					passErr.text("请输入6-10位密码");
					
					passErr.attr('data-val','0');
				}else if (/^[0-9]+$/.test(pass)||/^[a-zA-Z]+$/.test(pass)) {
				
					passErr.text("密码应包含字母和数字");
					
					passErr.attr('data-val','0');
				}else{
					passErr.text("");
					passErr.attr('data-val','0');
				}
			})
		//登录
			$(".login-btn").click(function () {
				
				let onoff=$('.login').find('.error').attr('data-val');
				let user= $("#userName").val();
				let pass=$("#passWord").val();
				
				if (onoff==0) {
					alert("请输入用户名和密码")
				}else{
					let oidarr=JSON.parse(localStorage.getItem("idarr"))
					
					let userflag=oidarr.some(function  (index) {
						return index.username==user&&index.password==pass;
					})
					if(userflag){
						
						$.cookie('username',user)
						alert("登陆成功")
						$(location).attr('href','index.html')
						
						
					}else{
						
						alert("请输入正确的用户名和密码")
						
					}
					
					
				}
				
				
			})
			
		})
		
		
		
	})
})
