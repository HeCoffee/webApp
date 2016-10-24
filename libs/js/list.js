var page=0;//全局页数
window.onload=function(){
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	var myScroll ;
	iScroll(myScroll);
	loadingPro();
	
	//分类列表显示隐藏
	$('.head_class div:eq(0)').on('touchend',function(){
		$('.class_box').toggle(300);
		$('.class_box1').hide(300);
	});
	$('.head_class div:eq(1)').on('touchend',function(){
		$('.class_box').hide(300);
		$('.class_box1').toggle(300);
	});
	
	//三级列表 1级
	$('.class_box div:eq(0) li').on('touchend',function(){
		$('.class_box div:eq(0) li').removeClass('bgf2');
		$(this).addClass('bgf2');
		var num=$('.class_box div:eq(0) li').index(this);
		$('.class_box div:eq(1) ul').hide().eq(num).show();
	});
	//三级列表 2级
	$('.class_box div:eq(1) li').on('touchend',function(){
		$('.class_box div:eq(1) li').removeClass('bgff');
		$(this).addClass('bgff');
		var num=$('.class_box div:eq(1) li').index(this);
		$('.class_box div:eq(2) ul').hide().eq(num).show();
		
	});
	
}


//初始化iScroll插件
function iScroll(myScroll){
	myScroll = new IScroll('#wrapperBox',{ 
		bounceEasing: 'circular',
		probeType:3, 
		bounceTime: 600,
		scrollbars:true,
		fadeScrollbars:true,
		mouseWheel:true,
		click:true 
	});
	myScroll.on('scrollStart',function(){
		myScroll.refresh();
	})
	myScroll.on('scrollEnd',function(){
		if(this.y<=this.maxScrollY){
			loadingPro();
		}
	})
}

//加载商品
function loadingPro(myScroll){
	$.get('libs/JSON/list_product.json',function(data){
		if(page==data.length){
				return;
		}
		for(var i=0;i<data[page].length;i++){
			var cloneA=$('#scroller a:eq(0)').clone(true,true);
			cloneA.prop('href',data[page][i].href);
			$('img',cloneA).prop('src',data[page][i].src);
			$('div:eq(0)',cloneA).html(data[page][i].title);
			$('div:eq(1)',cloneA).html('￥'+data[page][i].price);
			cloneA.appendTo('#scroller');
		}
		if(page==0){
			$('#scroller a:eq(0)').remove();
		}
		page++;
	});
	
}
