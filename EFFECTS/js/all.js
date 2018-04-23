$(function(){
	var thumbSize = 'large',		// 設定要取得的縮圖是大圖還是小圖
						// 大圖寬高為 480X360；小圖寬高為 120X90
		imgWidth = '120',		// 限制圖片的寬
		imgHeight = '90',		// 限制圖片的高
		swfWidth = '480',		// 指定 YouTube 影片的寬
		swfHeight = '360',		// 指定 YouTube 影片的高
		autoPlay = '&autoplay=0',	// 是否載入 YouTube 影片後自動播放；若不要自動播放則設成 0
		fullScreen = '&fs=1';		// 是否允許播放 YouTube 影片時能全螢幕播放
 
	$('.playlist>li>a').each(function(){
		// 取得要連結轉換的網址及訊息內容
		var _this =  $(this),
			_url = _this.attr('href'),
			_info = _this.text(),
			_type = (thumbSize == 'large') ? 0 : 2;
 
		// 取得 vid
		var vid = _url.match('[\\?&]v=([^&#]*)')[1];
 
		// 取得縮圖
		var thumbUrl = "http://img.youtube.com/vi/"+vid+"/" + _type + ".jpg";
 
		// 把目前超連結的內容轉換成圖片並加入 click 事件
		_this.html('<img src="'+thumbUrl+'" alt="'+_info+'" title="'+_info+'" width="'+imgWidth+'" height="'+imgHeight+'" />').click(function(){
			return false;
		}).focus(function(){
			this.blur();
		}).children('img').click(function(){
			// 當點擊到圖片時就轉換成 YouTube 影片
			var swf  = '<object width="'+swfWidth+'" height="'+swfHeight+'">';
			swf += '<param name="movie" value="http://www.youtube.com/v/'+vid+autoPlay+fullScreen+'"></param>';
			swf += '<param name="wmode" value="transparent"></param>';
			swf += (fullScreen == '&fs=1') ? '<param name="allowfullscreen" value="true"></param>' : '';
 
			swf += '<embed type="application/x-shockwave-flash" src="http://www.youtube.com/v/'+vid+autoPlay+fullScreen+'" ';
			swf += (fullScreen == '&fs=1') ? 'allowfullscreen="true" ' : '';
			swf += 'wmode="transparent" width="'+swfWidth+'" height="'+swfHeight+'"></embed>';
 
			swf += '</object/>';
 
			$('.video').html(swf);
 
			return false;
		});
	});
 
	// 先載入第一個影片
	$('.playlist>li>a').eq(0).children('img').click();
 
	// 變更影片播放為自動播放
	autoPlay = '&autoplay=1';
});