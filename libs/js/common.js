$(function(){
	//后退一页
	$('header .fa-chevron-left').parents('span').on('touchend',function(){
		window.history.back(-1);
		return false;
	});
	
	//导航显示隐藏
	$('header .fa-th-list').parents('span').on('touchend',function(){
		$('.navbox').toggle(300);
	});
});
	