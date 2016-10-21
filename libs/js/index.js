$(function(){
	//初始化轮播图
	var swiper = new Swiper('#wrapper .swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
   });
	
	
	
	var $loading=$('<div class="loading">Loading...</div>');//遮罩层
	var page=0;//判断加载的页数
	var myScroll;
	
	
	window.onload=function(){
		iScroll(myScroll);//初始化iscroll		
	}




	//初始化iScroll插件
	function iScroll(myScroll){
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
			myScroll = new IScroll('#wrapper',{ bounceEasing: 'circular',probeType:3, bounceTime: 600,scrollbars:true,fadeScrollbars:true,mouseWheel:true,click:true });
			loading();
			myScroll.refresh();	
			myScroll.on('scroll',function(){
				if(this.y<=-700){
					$('.he_top').show();
				}else{
					$('.he_top').hide();
				}
				
			});
			/*开始滚动就刷新一下高度*/
			myScroll.on('scrollStart',function(){
				myScroll.refresh();
			});
			myScroll.on('scrollEnd',function(){			
				if(this.y<=this.maxScrollY){
					$loading.appendTo('body');
					setTimeout(function(){
						loading(myScroll);
						myScroll.refresh();
						$loading.remove();
					},500);
					
				}
			});
			
			//回到顶部功能
			$('.he_top').on('touchend',function(){
				myScroll.scrollTo(0,0,300,IScroll.utils.ease.circular);
				return false;
			});
			
	}
	
	
	//加载商品
	function loading(myScroll){
			$.get('libs/JSON/product.json',function(date){
				if(page==date.length){
					return;
				}
				for(var i=0;i<date[page].length;i++){
					var cloneLi=$('.product_box li:eq(0)').clone(true,true);
					cloneLi.appendTo('.product_box ul');
					$('a',cloneLi).prop('href',date[page][i].href);
					$('img',cloneLi).prop('src',date[page][i].src);
					$('p',cloneLi).html(date[page][i].title);
					$('span',cloneLi).html('¥'+date[page][i].price);
					if(page==0&&i==0){
						$('.product_box li:eq(0)').remove();
					}
				}
				page++;
						
			});
	}










});






