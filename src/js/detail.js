require(["../js/config.js"],function  () {
	require(["jquery","comment","cookie","template"],function  ($,comment,cookie,template) {
		
	
		class Shop{
			constructor(options){
				
				this.url=options.url;
				this.load();
			};
			load(){
				var that=this;
				$.ajax({
					url:this.url,
					success:function  (data) {
						console.log(data)
						that.data=data;
						that.display();
						that.Magnifier()
}
				});
			};
			display(){
				let goodid=$.cookie('goodsid');
			
				for (var i=0;this.data.length;i++) {
					
					if(this.data[i].id==goodid){
						let index=i;
						let goodsdata=this.data[index];
						let goodsone=template("detailone",{list:goodsdata});
						$(".one-l").append(goodsone);
						let goodstwo=template("detailtwo",{list:goodsdata})
						$(".main-content").append(goodstwo);
						break;
					}
				}
				this.addEvent()
				
			}
			addEvent(){
				let that=this;
				$(".sum-add").click(function  () {
					let num=$("#sum").val();
					num++;
					if (num>=99) {
						num=99;
					}
					$("#sum").val(num);
					
				})
				$(".sum-down").click(function  () {
					let num=$("#sum").val();
					num--;
					if (num<=1) {
						num=1
					}
					$("#sum").val(num);
				})
				$(".sum-btn").click(function  () {
					that.setCookie()
				})
				
			}
			setCookie(){
				let goodid=$('.goodstit').attr('data-id');
				let sumval=$("#sum").val()
				this.goodinfo=JSON.parse($.cookie("goodsinfo"))||[];
				if(this.goodinfo.length<1){
					this.goodinfo.push({"goodsid":goodid,"goodsnum":sumval})
				}else{
					let that=this;
					let onoff=true;
					$.each(this.goodinfo,function  (index,item) {
						if (item.goodsid==goodid) {
							
							that.goodinfo[index].goodsnum=parseInt(that.goodinfo[index].goodsnum)+parseInt(sumval);
							
							onoff=false;
						}
					})
					console.log(that.goodinfo)
					if (onoff) {
						this.goodinfo.push({
							"goodsid":goodid,
							"goodsnum":sumval
						})
					}
				}
				$.cookie("goodsinfo",JSON.stringify(this.goodinfo))
				alert('加入购物车成功！')
			}
			Magnifier(){
				let mouse=$(".bigimg-p");
				let mback=$(".mask");
				
				let bigimg=$('.pro-img img')
				bigimg.width("1100px")
				bigimg.height("1080px")
				
				let scalet=bigimg.height()/mback.height();
				let scalel=bigimg.width()/mback.width();
				
				mback.hover(function  () {
					$('.pro-img').show()
				},function  () {
					$('.pro-img').hide();
					mouse.css({
						top:0,
						left:0
					})
				})
				mback.mousemove(function  (e) {
					
					let _left=e.pageX-$(this).offset().left-mouse.width()/2;
					let _top=e.pageY-$(this).offset().top-mouse.height()/2;
					mouse.css({
						"left":Math.min(Math.max(0,_left),mback.width()-mouse.width()),
						"top":Math.min(Math.max(0,_top),mback.height()-mouse.height())
					})
					
					bigimg.css({
						left: -mouse.position().left*scalel,
						top:-mouse.position().top*scalet
					})
					
				})
			}
			
		}
		
		new Shop({
			url:"../js/json/cjpl.json"
		})
		
		
		
	
		
		
		
		
		//展示
		
		/*$.ajax({
			url:"../js/json/cjpl.json",
			//dataType:"json",
			success:function(data){
				console.log(data)
				let goodid=$.cookie("goodsid")
				
				//商品展示
				for (var i=0;i<data.length;i++) {
					if (data[i].id==goodid) {
						let index=i;
						let goodsdata=data[index];
						let goodsone=template("detailone",{list:goodsdata});
						$(".one-l").append(goodsone);
						let goodstwo=template("detailtwo",{list:goodsdata})
						$(".main-content").append(goodstwo);
					}
				}
				//商品放大镜；
				
				magnifier();
				
				//购物车功能
				
				
				addcar ();
				
				
			}
			
		});*/
		
		
		
		
	})
})
function  magnifier() {
	let mouse=$(".bigimg-p");
	let mback=$(".mask");
	
	let bigimg=$('.pro-img img')
	bigimg.width("1100px")
	bigimg.height("1080px")
	
	let scalet=bigimg.height()/mback.height();
	let scalel=bigimg.width()/mback.width();
	
	mback.hover(function  () {
		$('.pro-img').show()
	},function  () {
		$('.pro-img').hide();
		mouse.css({
			top:0,
			left:0
		})
	})
	mback.mousemove(function  (e) {
		
		let _left=e.pageX-$(this).offset().left-mouse.width()/2;
		let _top=e.pageY-$(this).offset().top-mouse.height()/2;
		mouse.css({
			"left":Math.min(Math.max(0,_left),mback.width()-mouse.width()),
			"top":Math.min(Math.max(0,_top),mback.height()-mouse.height())
		})
		
		bigimg.css({
			left: -mouse.position().left*scalel,
			top:-mouse.position().top*scalet
		})
		
		
		
	})
}
function addcar () {
	
	$(".sum-add").click(function  () {
		let num=$("#sum").val();
		num++;
		if (num>=99) {
			num=99;
		}
		$("#sum").val(num);
		
	})
	
	$(".sum-down").click(function  () {
		let num=$("#sum").val();
		num--;
		if (num<=1) {
			num=1
		}
		$("#sum").val(num);
	})
	//console.log($.cookie("goodsinfo"))
	$(".sum-btn").click(function  () {
		
		let goodinfo1=$.cookie("goodsinfo");
		let goodid=$('.goodstit').attr('data-id');
		let sumval=$("#sum").val()
		
		if(goodinfo1){
			let goodinfo=JSON.parse(goodinfo1);
			
			let flag=goodinfo.some(function(item,index) {
			    			
			    			return item.goodsid==goodid;
    		})
    		//console.log(flag)
    		if (flag) {
    			for (var i=0;i<goodinfo.length;i++) {
    			
	    			if (goodinfo[i].goodsid==goodid) {
	    				
	    				let num=Number(goodinfo[i].goodsnum)+parseInt(sumval);
	    				
	    				goodinfo[i]={"goodsid":goodid,"goodsnum":num}
             		
             			$.cookie("goodsinfo",JSON.stringify(goodinfo))
	    				
	    				break;
	    				
	    			}
	    		}
			}else{
				
				goodinfo.push({"goodsid":goodid,"goodsnum":sumval})
				$.cookie("goodsinfo",JSON.stringify(goodinfo))
			
			}
		}else{
			let goodinfo=[];
			goodinfo[goodinfo.length]={"goodsid":goodid,"goodsnum":sumval}
			
			$.cookie("goodsinfo",JSON.stringify(goodinfo),{ expires:7})
		}
		
		alert('加入成功')
		/*$(location).attr("href","shoppingcart.html")*/
		
		
	})
	
	
}