require(["../js/config.js"],function(){
	
	require(["jquery"],function  ($) {
		
		//下拉菜单显示隐藏
		$(".allmenu").hover(function  () {
			$(".menu-wrap").css("display","block")
		},function  () {
			$(".menu-wrap").css("display","none")
		})
		
		
		$(".hd-search input").on("input",function  () {
			$.ajax({
				type:"get",
				url:`http://suggestion.baidu.com/su?wd=${$(this).val()}`,
				dataType:"jsonp",
				jsonp:"cb",
				success:function  (data) {
					
					$('.search-list').show()
					var str='';
					for (var i=0;i<data.s.length;i++) {
						str+=`<li>${data.s[i]}</li>`;
					}
					
					$('.search-list ul').html(str)
					
				}
			});
		})
		
	/*	$(".hd-search input").focus(function  () {
			$(".hd-search .search-list").toggle()
		})*/
		
		/*$(document).click(function  (ev) {
			let $target=$(ev.target)
			
			
			if ($target.is('.search-list li')) {
				
				$(".hd-search input").val($target.html())
				$(".hd-search .search-list").hide()
			}
			
			if(!$target.is('.hd-search')){
				$(".hd-search .search-list").toggle()
			}
		})*/
		
		
		
		
		
		
		
	})
	
	
	
})
