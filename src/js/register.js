require(["../js/config.js"],function(){
	require(["jquery"],function($){
		$(function  () {
			
			//输入框显示隐藏标签
			
			$(".form_item").each(function  () {
				$(this).find('input').focus(function  () {
					//console.log($(this))
					$(this).siblings('label').show()
					$(this).siblings('.prompt').show()
				});
				
				
			})
			
			
			//验证
			
			iph();
			mess() ;
			sword();
			aword();
			
			//存储
			
			
			
			$(".register-btn").click(function  () {
				
				let user=$("#userName").val();
				let pass=$("#setpassWord").val();
				let attronoff=$(".register").find('.err-bar').attr('data-val')
			
				let	idarr=[];
				
				/*window.location.href="index.html";
				window.event.returnValue=false;*/
				
					//console.log(localStorage.getItem("idarr"))
				if (attronoff==0) {
					
					alert('请按要求输入信息')
					
				}else{
					let oidarr=JSON.parse(localStorage.getItem("idarr"))
					if (oidarr) {
						let flag=oidarr.some(function  (index) {
							return index.username==user;
						})
						
						if (flag) {
							alert('注用户名已存在')
						}else{
							oidarr.push({"username":user,"password":pass})
							
							localStorage.setItem("idarr",JSON.stringify(oidarr))
							console.log(localStorage.getItem('idarr'))
							$(location).attr('href', 'index.html');
							alert('注册成功')
						}
						
					}else{
						let oidarr=[];
						oidarr.push({"username":user,"password":pass})
							
						localStorage.setItem("idarr",JSON.stringify(oidarr))
						console.log(localStorage.getItem('idarr'))
						alert('注册成功')
						$(location).attr('href', 'index.html');
					}
				}
				
			})
			
			
			
			
			
		
			
			
			
			
			
			
		})
		
		//用户名验证
			
				$("#userName").blur(function  () {
					user()
				})
				
			
			function user () {
				let userErr= $('.user-error');
				
				let user= $("#userName").val();
				
				if(user.length<4||user.length>16){
						userErr.css('background','#fff4d7').text("请输入4到16位用户名")
						userErr.attr('data-val','0')
						return false;
					}else if(/^[0-9a-zA-Z_\u2E80-\u9FFF]{4,16}$/.test(user)==false){
						
						userErr.css('background','#fff4d7').text("用户名可以是数字,下划线,字母,汉字")
						userErr.attr('data-val','0')
						return false;
					}else{
						userErr.css('background','#e4e4e4').text("输入正确")
						userErr.attr('data-val','1')
						return true;
					}
			}
			
			//手机号验证
			function iph() {
				$("#iphone").blur(function  () {
				let iphoneErr=$(".iphone-error");
				let iphone=$("#iphone").val();
				
				if (/^1[345678]\d{9}$/.test(iphone)==false) {
						
						iphoneErr.css('background','#fff4d7').text("请输入正确的手机号码")
						iphoneErr.attr('data-val','0')
				}else{
					iphoneErr.css('background','#e4e4e4').text("输入正确")
					iphoneErr.attr('data-val','1')
				}
				})
			}
			
			//短信验证码
			function mess () {
				$(".get-code").click(function  () {
				
					let str=''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10)+''+Math.floor(Math.random()*10);
					
					$('.messge-error').css('display','block').html(str)
					
					$("#messge").blur(function  () {
						
						let messge=$("#messge").val();
						
						if (messge==$('.messge-error').text()&&$('.messge-error').text()!='') {
							$('.messge-error').text('输入正确');
							$('.messge-error').attr('data-val','1')
						}else {
							$('.messge-error').text('输入错误');
							$('.messge-error').attr('data-val','0')
							
						}
						
						
					})
					
				})
			}
			
			
			
			
			
			
			
			//密码验证
			function sword () {
				$("#setpassWord").blur(function  () {
					let passErr=$('.set-password ');
					let pass=$("#setpassWord").val();
					
					if (pass.length<6||pass.length>10) {
						
						passErr.css('background','#fff4d7').text("请输入6-10位密码")
						 passErr.attr('data-val','0')
					}else if (/^[0-9]+$/.test(pass)||/^[a-zA-Z]+$/.test(pass)) {
						
						passErr.css('background','#fff4d7').text("密码应包含字母和数字")
						 passErr.attr('data-val','0')
					}else{
						passErr.css('background','#e4e4e4').text("格式正确")
						 passErr.attr('data-val','1')
					}
				})
			}
			
			
			//确认密码
			function aword () {
				
				$("#affirmpassWord").blur(function  () {
					let apassErr=$('.affirm-password');
					let pass=$("#setpassWord").val();
					let apass=$("#affirmpassWord").val();
					
					if (apass==pass) {
						
						apassErr.css('background','#e4e4e4').text("输入成功")
						apassErr.attr('data-val','1')
					}else{
						
						apassErr.css('background','#fff4d7').text("两次输入密码不匹配")
						apassErr.attr('data-val','0')
					}
					
				})
			
			}
		
		
		
	})
	
	
})
