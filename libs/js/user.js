$(function(){

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