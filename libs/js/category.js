$(function(){
	//后退一页
	$('header span:eq(0)').on('touchend',function(){
		window.history.back(-1);
		return false;
	});
	
	//导航显示隐藏
	$('header span:eq(1)').on('touchend',function(){
		$('.navbox').toggle(300);
	});
	//左侧导航栏标识
	$('.left_box li').on('touchend',function(){
		$('.left_box li').removeClass('active');
		$(this).addClass('active');
		var oLi=$(this);
		$.get('libs/JSON/category.json',function(data){
			var key = oLi.attr('name');
			for(var i =0 ;i<data[key].length;i++){
				$('.brandbox:eq(0) a img').eq(i).prop('src',data[key][i].src);
				$('.brandbox:eq(0) a span').eq(i).text(data[key][i].title);
				$('.brandbox:eq(1) a img').eq(i).prop('src',data[key][i].src);
				$('.brandbox:eq(1) a span').eq(i).text(data[key][i].title);

			}
		});
	});
	
	window.onload=function(){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		myScroll = new IScroll('.right_box',{ 
			bounceEasing: 'circular',
			probeType:3, 
			bounceTime: 600,
			scrollbars:true,
			fadeScrollbars:true,
			mouseWheel:true,
			click:true 
		});	
	}
	
	
});