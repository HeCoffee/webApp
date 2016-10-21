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
	window.onload=function(){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		myScroll = new IScroll('.user-body',{ 
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