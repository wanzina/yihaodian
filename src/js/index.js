require(["../js/config.js"],function  () {
	require(["jquery","comment","swiper","template","cookie"],function  ($,comment,swiper,template,cookie) {
		$(function  () {
			/*头部用户名*/
			
			function usergood () {
				
				$(".usergood").html("早上好！"+$.cookie("username"));
				$(".hd-login").hide();
				$(".hd-register").hide();
			}
			if($.cookie("username")){
				usergood ();	
			}else{
				$(".usergood").hide();
				$(".hd-login").show();
				$(".hd-register").show();
			}
			
			/*头部搜索框*/
			
			
			
			
			
			
			/*banner轮播图*/

			 var banner_s = new swiper('.banner-sc', {
     		  	  spaceBetween: 30,
     		  	  loop:true,
			      centeredSlides: true,
			      autoplay: {
			        delay: 2500,
			        disableOnInteraction: false,
			      },
			      pagination: {
			        el: '.banner-sp',
			        clickable: true,
			       
			      	renderBullet: function (index, className) {
			          var text='';
			          switch(index){
			          	default:text='';
			            case 0:text='国产食品';break;
			            case 1:text='家电清洁';break;
			            case 2:text='家电3C';break;
			            case 3:text='活色生鲜';break;
			            // case 4:text='伍';break;
			          }
			          return '<span class="' + className + '">' + text + '</span>';
			        },

			      }
			    });
			    
			    $(".banner-wrap").hover(function  () {
			    	banner_s.autoplay.stop()
			    },function  () {
			    	banner_s.autoplay.start()
			    })
			    
			    //超值单品/single
			    $.ajax({
		            type: "GET",
		            url: "../js/json/cjpl.json",
		            success: function(data) {
		              var singleStr=template("single",{lists:data});
		              $("#singlehtml").append(singleStr);
		              
		              let youlikestr=template("youlike",{list:data});
		              $(".youlike ul").append(youlikestr)
		              
		              //跳转详情页
		             $(".list_btn").click(function  () {
		             	let goodid=$(this).parent().attr("data-id");
		             	$.cookie("goodsid",goodid);
		             	$(this).attr("href","detail.html")
		             	
		             })
		             
		             $('.single-list a').click(function  () {
		             	let goodid=$(this).parent().attr("data-id");
		             	$.cookie("goodsid",goodid);
		             	$(this).attr("href","detail.html")
		             	
		             })
		         
		            }
		        })
			    //懂你想要
			    //单品品类四个
			    $.ajax({
			    	url:"../js/json/pinlei.json",
			    	dataType:"json",
			    	success:function  (data) {
			    		
			    		//模板引擎
			    		
			    		let pinlei1str=template("cjpinlei",{list:data});
			    		$(".main-content").append(pinlei1str)
			    		
			    		 // 品类类目1轮播图
			    	 var qua_brand_s = new swiper('.qua_brand_con .swiper-container', {
				     	 slidesPerView: 7,
				      
				     	 spaceBetween: 0,
				      
				     	 freeMode:true,
				     
				      navigation: {
				        nextEl: '.qua_brand_right_btn',
				        prevEl: '.qua_brand_left_btn',
				      },
				    });
			    		
			    		
			    	}
			    })
			    
			    //加购物车
			    
			    $('.youlike').on("click",".sh-car",function  (ev) {
			    	let $target=$(ev.target);
			    	
			    	let goodinfo=$.cookie('goodsinfo');
			    	
			    		
			    	let goodid=$target.parents('li').attr('data-id')
			    	
			    	let index=0
			    	console.log($.cookie("goodsinfo"))
			    	if (goodinfo) {
			    		let goodinfos=JSON.parse(goodinfo);
			    		
			    		
			    		let flag=goodinfos.some(function(item,index) {
			    			
			    			return item.goodsid==goodid;
			    		})
			    		//console.log(flag)
			    		if (flag) {
			    			for (var i=0;i<goodinfos.length;i++) {
			    			
				    			if (goodinfos[i].goodsid==goodid) {
				    				
				    				let num=goodinfos[i].goodsnum+1;
				    				
				    				goodinfos[i]={"goodsid":goodid,"goodsnum":num}
			             		
			             			$.cookie("goodsinfo",JSON.stringify(goodinfos))
				    				
				    				break;
				    				
				    			}
				    		}
			    		}else{
			    			goodinfos.push({"goodsid":goodid,"goodsnum":1})
			             		
			             	$.cookie("goodsinfo",JSON.stringify(goodinfos))
			             	
			    			
			    		}
			    		
			    	}else{
			    		let goodinfo=[];
			    		
			    		goodinfo.push({"goodsid":goodid,"goodsnum":1})
		             		
		             	$.cookie("goodsinfo",JSON.stringify(goodinfo))
			    		
			    		
			    	}
			    	alert('加入成功')
			    	
			    })
			    
			  
			    
			    //搜索框hotword
			      let hotwordarr=["格力", "剃球机", "凡芝", "熨斗板", "洁面", "脂肪粒", "杰尼亚", "美赞臣", "棉被双人", "富安娜"]
			      let hotwordstr=''
			      for (var i=0;i<hotwordarr.length;i++) {
			   		 hotwordstr+=`<a href="#">${hotwordarr[i]}</a>`
			      }
			    $(".searchSuggest").append(hotwordstr)
			    
			    
			    //brand超级品类
			    $.ajax({
			    	url:"../js/json/cjpp.json",
			    	success:function  (data) {
			    		
			    		let brandstr=template("brand",{lists:data})
			    		$(".brand").append(brandstr)
			    	}
			    });
			    
			    //商品倒计时
			    countDown("2018.12.20");
			    var timer1=null;
			    function countDown (overdate) {
			    	let overtime=new Date(overdate);
			    	
			    	let day=0;
			    	let h=0;
			    	let m=0;
			    	let s=0;
			    	clearInterval(timer1)
			    	let timer1=setInterval(function  () {
			    		
			    		
			    		let date = new Date();
			    		
			    		day=overtime.getDay()-date .getDay();
			    		
			    		h=23-date.getHours()+day*24;
			    		m=59-date.getHours();
			    		s=59-date.getSeconds();
			    		
			    		$('.time-hour').text(addzero(h));
			    		$('.time-min').text(addzero(m));
			    		$('.time-sec').text(addzero(s))
			    		if (day<0) {
			    			clearInterval(timer1)
			    		}
			    		
			    	},1000)
			    	
			    }
			    
			    function addzero(n){
			    	if (n<10) {
			    		return "0"+n;
			    	}else{
			    		return n;
			    	}
			    }
			    
			    	
			    
			    
			    
			    
			})
		
	})
})
