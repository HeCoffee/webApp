$(function(){
	
	//初始化三级联动
	$.cxSelect.defaults.url = 'libs/JSON/cityData.min.json';
	$('.input-group').cxSelect({
		selects: ['province', 'city', 'area'],
		nodata: 'none'
	});
	
})