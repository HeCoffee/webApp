$(function(){
	//全局评论页数
	var page = 0;
	
	//后退一页
	$('header span:eq(0)').on('touchend',function(){
		window.history.back(-1);
		return false;
	});
	
	//导航显示隐藏
	$('header span:eq(1)').on('touchend',function(){
		$('.navbox').toggle(300);
	});
	//初始化轮播图
	var swiper = new Swiper('.swiper_box .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
   });
   	//加载评论
   	loadingEva();
    //评论显示
   	$('.centerbox a').eq(1).on('touchend',function(){
   		$('.centerbox a').removeClass('active');
   		$(this).addClass('active');
   		$('.evaluate').show();
   		myScroll1 = new IScroll('.evaluate',{ 
			bounceEasing: 'circular',
			probeType:3, 
			bounceTime: 600,
			scrollbars:true,
			fadeScrollbars:true,
			mouseWheel:true,
			click:true 
		});
   	});
   	
   	//评论隐藏
   	$('.centerbox a').eq(0).on('touchend',function(){
   		$('.centerbox a').removeClass('active');
   		$(this).addClass('active');
   		$('.evaluate').hide();
   	});
   	
   	//获取ID
   	function getId(){
   		var id=0;//默认id等于0
   		var oDate=window.location.search;
	   	oDate=oDate.replace('?','');
	   	var array1=oDate.split("&");
	   	for(var a=0;a<array1.length;a++){
	   		if(array1[a].search('id')>=0){
	   			var array2=array1[a].split('=');
	   			id=array2[1];
	   			return id;
	   		}
	   	}
   	}
   	var id=getId();
   	console.log(id);
   	//动态加载页面
	function loadingPage(id){
		$.get('libs/JSON/page.json',function(data){
			$('.item-title').html(data['page'+id].title);
			$('.item-price b').html(data['page'+id].price);
		});
	}
	loadingPage(id);
	
	//加入购物车
	function joinCart(){
		var id1=getId();
		if(window.localStorage.getItem('cart')){
			var cart=JSON.parse(window.localStorage.getItem('cart'));
		}
		else{
			var cart=[];
		}
		var str='';
		for(var d=0;d<cart.length;d++){
			if(cart[d].Id==id1){
				cart[d].count++;
				str=JSON.stringify(cart);
				window.localStorage.setItem('cart',str);
				return false;
			}
		}
		var product={};
		product.Id=id1;
		product.count=1;
		product.title=$('.item-title').html();
		product.price=$('.item-price b').html();
		//添加个图片路径
		product.src='libs/images/'+(54+parseInt(id))+'.jpg';
		cart.push(product);
		str=JSON.stringify(cart);
		window.localStorage.setItem('cart',str);
	}
	//点击加入
	$('footer a:eq(1)').on('touchstart',function(){
		joinCart();
		badge();
		alert('加入成功');
		return false;
	});
	
	//初始化徽章
	function badge(){
		if(window.localStorage.getItem('cart')){
			var cart=JSON.parse(window.localStorage.getItem('cart'));
			$('.badge').html(cart.length);
		}
		else{
			$('.badge').html('');
		}
	}
	badge();

   	//初始化Iscroll
	var myScroll;
	var myScroll1;
	window.onload=function(){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		myScroll = new IScroll('.product_body',{ 
			bounceEasing: 'circular',
			probeType:3, 
			bounceTime: 600,
			scrollbars:true,
			fadeScrollbars:true,
			mouseWheel:true,
			click:true 
		});	
		myScroll1 = new IScroll('.evaluate',{ 
			bounceEasing: 'circular',
			probeType:3, 
			bounceTime: 600,
			scrollbars:true,
			fadeScrollbars:true,
			mouseWheel:true,
			click:true 
		});
		//加载下一页评论
		/*开始滚动就刷新一下高度*/
//		myScroll1.on('scrollStart',function(){
//			myScroll.refresh();
//		});
		myScroll1.on('scrollEnd',function(){
			if(this.y<=this.maxScrollY){					
				loadingEva();
				myScroll1.refresh();					
			}
		});
		
		
	}
	//加载评论
	function loadingEva(){
		$.get('libs/JSON/evaluate.json',function(data){
			if(page==data.length){
				return;
			}
			for(var i =0 ;i<data[page].length;i++){
				var cloneE=$('.item-evaluate:eq(0)').clone(true,true);
				$('img',cloneE).prop('src',data[page][i].src1);
				$('li:eq(0) span',cloneE).text(data[page][i].name);
				$('li:eq(1)',cloneE).text(data[page][i].date);
				$('li:eq(2)',cloneE).html('');
				for(var j=0;j<data[page][i].star;j++){
					$('li:eq(2)',cloneE).append('<i class="fa fa-star"></i>');
				}
				$('li:eq(3)',cloneE).text(data[page][i].title);
				$('li:eq(4) span',cloneE).text(data[page][i].date);
				cloneE.appendTo('.evaluate #scroller');
			}
			if(page==0){
				$('.item-evaluate:eq(0)').remove();
			}
			
			page++;
		});
	}
	
});