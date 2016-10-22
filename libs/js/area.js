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
	$.cxSelect.defaults.url = 'libs/JSON/cityData.min.json';

	$('.input-group').cxSelect({
		selects: ['province', 'city', 'area'],
		nodata: 'none'
	});
	
})