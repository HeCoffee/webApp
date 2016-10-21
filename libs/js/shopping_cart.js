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
	
	//加载购物车
	function getCart(){
		if(window.localStorage.getItem('cart')){
			var cart=JSON.parse(window.localStorage.getItem('cart'));
			for(var i =0 ;i<cart.length;i++){
				var clonaCart=$('.item-cart:eq(0)').clone(true,true);
				$('img',clonaCart).prop('src',cart[i].src);
				$('.count_box_top',clonaCart).html(cart[i].title);
				$('.col-xs-4 b',clonaCart).html(cart[i].price);
				$('.count_box_bottom span:eq(1)',clonaCart).html(cart[i].count);
				clonaCart.appendTo('.cart_body #scroller');	
			}
			$('.item-cart:eq(0)').remove();
		}else{
			$('.cart_body #scroller').html("快去添加商品吧<(￣︶￣)↗[GO!]");
		}
		iScroll();
	}
	
	//删除购物信息
	function deleteCart(name){
		var cart=JSON.parse(window.localStorage.getItem('cart'));
		var str='';
		for(var d=0;d<cart.length;d++){
			if(cart[d].title==name){
				cart.splice(d,1);
				if(cart.length>0){
					str=JSON.stringify(cart);
					window.localStorage.setItem('cart',str);
				}
				else{
					$('.cart_body #scroller').html("快去添加商品吧<(￣︶￣)↗[GO!]");
					window.localStorage.removeItem('cart');
				}
				return false;
			}
		}
	}
	
	
	
	
	//封装事件 以便重新加载购物车后添加事件
	function addEvent(){		
		//添加+
		$('.fa-plus').on('touchend',function(){
			$(this).parent().prev('span').html(parseInt($(this).parent().prev('span').html())+1);
			countAll();
		});
		
		//减少
		$('.fa-minus').on('touchend',function(){
			if(parseInt($(this).parent().next('span').html())==0){
				return;
			}
			$(this).parent().next('span').html(parseInt($(this).parent().next('span').html())-1);
			countAll();
		});
		
		//删除
		$('.fa-trash').on('touchend',function(){
			$(this).parents('.item-cart').remove();
			var name=$(this).parents('.item-cart').find('.count_box_top').html();
			deleteCart(name);
			countAll();
		});
		//打钩
		$('.check').on('touchend',function(){
			$(this).find('.fa').toggleClass('fa-circle-o').toggleClass('fa-check-circle');
			$('.check .fa').each(function(index,obj){
				if($(obj).hasClass('fa-check-circle')==false){
					$('footer .col-xs-3 .fa').removeClass('fa-check-circle').addClass('fa-circle-o');
					return false;
				}
				$('footer .col-xs-3 .fa').removeClass('fa-circle-o').addClass('fa-check-circle');
			
			});
			countAll();
		});
		
	}
	
	
	
	
	
	//全选
	$('footer .col-xs-3').on('touchend',function(){
		$('.fa',this).toggleClass('fa-circle-o').toggleClass('fa-check-circle');
		if($('.fa',this).hasClass('fa-check-circle')){
			$('.check .fa').removeClass('fa-circle-o').addClass('fa-check-circle');
		}else{
			$('.check .fa').removeClass('fa-check-circle').addClass('fa-circle-o');
		}
		countAll();
	});
	
	//支付方式
	$('footer a:eq(1)').on('touchend',function(){
		$('.mask').fadeIn(300);
	});
	
	
	//支付方式
	$('.mask-box').on('touchend',function(e){

		$('footer a:eq(1)').text($(e.target).text()+'>');
		$('.mask').fadeOut(100);
	});
	
	//计算金额
	function countAll(){
		var money=0;
		$('.check .fa-check-circle').parents('.item-cart').each(function(i,obj){
			var price=parseInt($('b',this).html());
			var count=parseInt($('.col-xs-6 span:eq(1)',this).html());
			money+=price*count;
		});
		$('footer i:eq(1)').html(money);
	}
	
	//初始化Iscroll
	function iScroll(){
		myScroll = new IScroll('.cart_body',{ 
			bounceEasing: 'circular',
			probeType:3, 
			bounceTime: 600,
			scrollbars:true,
			fadeScrollbars:true,
			mouseWheel:true,
			click:true 
		});
	}
	
	
	window.onload=function(){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		
		getCart();//加载购物车
		addEvent();//初始化事件
	
	}	
});

