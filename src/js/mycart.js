require(["../js/config.js"],function  () {
	require(["jquery","template","cookie","comment","bootstrap"],function  ($,template,cookie,comment,bootstrap) {
		
		class Mycart{
			constructor(){
				
				this.load()
			}
			load(){
				let that=this;
				$.ajax({
					url:"../js/json/cjpl.json",
					success:function(data){
						that.data=data;
						that.display();
						
					}
				});
			}
			display(){
				this.goodinfo=$.cookie("goodsinfo");
				
				if (this.goodinfo) {
					this.goodinfo=JSON.parse(this.goodinfo)
					console.log(this.goodinfo)
					let showarr=[];
					this.data.forEach( (item,index,arr) =>{
							this.goodinfo.forEach((val,index,arr)=>{
								if (item.id==val.goodsid){
									showarr.push(item)
								}
							})
					})
					let goodsstr=template("goodslist",{list:showarr,num:this.goodinfo})
						
					$(".cartlist_wrap").append(goodsstr);
					
					this.addEvent();
					this.check();
					this.remove()
				}else{
					
					alert("您的购物车空空如也呢，快去选择心爱的宝贝吧！")
					
				}
				
			}
			addEvent(){
				let that=this;
				$(".sum_down").click(function  () {
		
					let num=$(this).siblings("input").val();
					num++;
					
					that.addnum($(this),num)
					that.jiesuan()
					
				})
				$(".sum_add").click(function  () {
		
					let num=$(this).siblings("input").val();
					num--;
					if (num<=1) {
						num=1
					}
					
					that.addnum($(this),num)
					that.jiesuan()
				})
				this.allnum()
				
				
			}
			addnum(obj,num){
				
				let index=obj.parents('ul').index();
				let item_price=obj.parents('ul').find('.item_price');
				let item_sum=obj.parents('ul').find('.item_money');
				obj.siblings("input").val(num);
				this.goodinfo[index].goodsnum=num;
				
				$.cookie("goodsinfo",JSON.stringify(this.goodinfo))
				let goodn=JSON.parse($.cookie("goodsinfo"))
				
				
				let pricenum=num*item_price.text();
				item_sum.text(pricenum.toFixed(2))//计算每条价格和
				
				
				this.allnum()
				
			}
			allnum(){
				let sum=0
				$('.number-goods').each(function  (index,item) {
					sum+=parseInt($(item).val())
				})
				$('.goodsum').text(sum)
			}
			check (){
				let that=this;
				
				$('.cartlist_wrap .checkbox em').click(function  () {
					$(this).toggleClass('icon');
					
					if($('.cartlist_wrap .checkbox em').length==$('.cartlist_wrap .checkbox .icon').length){
						$('.pay_tools_bar .checkbox em').addClass('icon')
					}else{
						$('.pay_tools_bar .checkbox em').removeClass('icon')
					}
					
					that.jiesuan()
				})
				
				
				$('.pay_tools_bar .checkbox em').click(function  () {
					$(this).toggleClass('icon')
					if ($(this).hasClass('icon')) {
						$('.cartlist_wrap .checkbox em').each(function  (index,item) {
							$(item).addClass('icon')
							
						})
						//全部删除
								
						$('.allremove').click(function  () {
							if (confirm('确认全部删除！')) {
								$.cookie('goodsinfo',null);
								$(location).attr('href','shoppingcart.html')
							}
						})
					}else{
						$('.cartlist_wrap .checkbox em').each(function  (index,item) {
							$(item).removeClass('icon')
						})
					}
					that.jiesuan()
					 
					
				})
			}
			jiesuan(){
				let inum=0;
				let isum=0;
				let goodicon=$('.cartlist_wrap .icon');
				for (var i=0;i<goodicon.length;i++) {
					inum+=parseInt(goodicon.eq(i).parents('ul').find('.number-goods').val());
					isum+=parseInt(goodicon.eq(i).parents('ul').find('.item_money').text());
				}
				$('.goodsnum1').text(inum)
				$('.pay-sum').text(isum.toFixed(2))
			}
			remove(){
				let that=this
				$('.goodsremove').click(function  () {
						
						let index=$(this).parents('ul').index()
						
						$('.cartlist_wrap ul').eq(index).remove()
						
						let newarr=that.goodinfo.splice(index,1)//返回被删除的数组，会改变原数组
						
						$.cookie("goodsinfo",JSON.stringify(that.goodinfo))
						
						
					})
				
				
			}
			
			
			
		}
		
		new Mycart();
		
		
		/*$.ajax({
			url:"../js/json/cjpl.json",
			dataType:'json',
			success:function(data){
				let goodinfo1=$.cookie("goodsinfo");
				//获取数据
				
				if (goodinfo1) {
					let goodinfo=JSON.parse($.cookie("goodsinfo"));
					let aaa=[];
					data.forEach(function (item,index,arr) {
						goodinfo.forEach(function(val,index,arr){
							if (item.id==val.goodsid){
								aaa.push(item)
							}
						})
					})
					
					//商品展示
					let goodsstr=template("goodslist",{list:aaa,num:goodinfo})
					
					$(".cartlist_wrap").append(goodsstr);
					
					
					//数量价格计算
					addprice (goodinfo);
					
					//每条删除
					$('.goodsremove').click(function  () {
						
						let index=$(this).parents('ul').index()
						
						$('.cartlist_wrap ul').eq(index).remove()
						
						let newarr=goodinfo.splice(index,1)//返回被删除的数组，会改变原数组
						
						$.cookie("goodsinfo",JSON.stringify(goodinfo))
						
						
						console.log($.cookie("goodsinfo"))
						
					})
					
					
				}else{
					alert("您的购物车空空如也呢，快去选择心爱的宝贝吧！")
				}
				
				check ()
				
				
				
			}
		});
		
		
		//选择地址
		$('.address-btn').click(function  () {
			$('.address-con').toggle()
			$('.address-tit li').hover(function  () {
				$('.addcon').eq($(this).index()).show().siblings(".addcon").hide()
			})
		})
		*/
		
		
		
		
	})
})
//数量价格合计
/*function addprice (goodinfo) {
						
	let goodsum=0;
	
	$(".sum_down").click(function  () {
		
		let num=$(this).siblings("input").val();
		num++;
		//console.log(goodinfo)
		addnum ($(this),goodinfo,num);
		
	})
	
	$(".sum_add").click(function  () {
		
		let num=$(this).siblings("input").val();
		num--;
		if (num<=1) {
			num=1
		}
		addnum ($(this),goodinfo,num);
	})
	//初始化
	shuliang ()
	
}
//每一条数量价格合计
function addnum (obj,goodinfo,num) {
	let index=obj.parents('ul').index();
	let item_price=obj.parents('ul').find('.item_price');
	let item_sum=obj.parents('ul').find('.item_money');
	obj.siblings("input").val(num)
	goodinfo[index].goodsnum=num;
	
	$.cookie("goodsinfo",JSON.stringify(goodinfo))
	let goodn=JSON.parse($.cookie("goodsinfo"))
	let goodsum=0;
	
	let pricenum=num*item_price.text();
	item_sum.text(pricenum.toFixed(2))//计算每条价格和
}

//全选
function check () {
	$('.cartlist_wrap .checkbox em').click(function  () {
		$(this).toggleClass('icon');
		
		console.log($('.cartlist_wrap .checkbox em').length)
		if($('.cartlist_wrap .checkbox em').length==$('.cartlist_wrap .checkbox .icon').length){
			$('.pay_tools_bar .checkbox em').addClass('icon')
		}else{
			$('.pay_tools_bar .checkbox em').removeClass('icon')
		}
		//console.log(flag)
		
		jisuan ()
	})
	
	
	$('.pay_tools_bar .checkbox em').click(function  () {
		$(this).toggleClass('icon')
		if ($(this).hasClass('icon')) {
			$('.cartlist_wrap .checkbox em').each(function  (index,item) {
				$(item).addClass('icon')
				
			})
			//全部删除
					
			$('.allremove').click(function  () {
				if (confirm('确认全部删除！')) {
					$.cookie('goodsinfo',null);
					$(location).attr('href','shoppingcart.html')
				}
			})
		}else{
			$('.cartlist_wrap .checkbox em').each(function  (index,item) {
				$(item).removeClass('icon')
			})
		}
		 jisuan () 
		
	})
	
	
	$('.sum_down').click(function  () {
		 jisuan () 
		 shuliang ()
	})
	$('.sum_add').click(function  () {
		 jisuan () 
		 shuliang ()
	})
	
	
	
	
	
	
}

//每次点击重新计算数量价格	
function jisuan () {
	let num=0;
	let sum=0;
	let goodicon=$('.cartlist_wrap .icon');
	for (var i=0;i<goodicon.length;i++) {
		num+=parseInt(goodicon.eq(i).parents('ul').find('.number-goods').val());
		sum+=parseInt(goodicon.eq(i).parents('ul').find('.item_money').text());
	}
	$('.goodsnum1').text(num)
	$('.pay-sum').text(sum.toFixed(2))
	
}
//全选位置总数量计算
function shuliang () {
	let num=$('.number-goods');
	let sum=0
	num.each(function  (index,item) {
		sum+=parseInt($(item).val())
	})
	$('.goodsum').text(sum)
	
}
*/