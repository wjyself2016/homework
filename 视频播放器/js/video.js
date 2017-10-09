(function(){
	
	var flag = true;
	
	$(function(){
		var $play = $("#play");
		var $video = $("#video");
		var $word1 = $(".long").find("span:eq(0)");
		var $word2 = $(".long").find("span:eq(1)");
		var $progress = $(".progress-bar");
		var $pro = $(".progress");
		var $voicep = $("#voice_power");
		var $voiceb = $("#voice_bg");
		var $cover = $("#cover");
		var $fullbtn = $("#fullScreen");
		
		playBtn($play,$video,$word2,$progress);
		videoTime($video,$word1,$word2);
		chooseTime($video,$progress,$pro,$word2);
		voicePower($video,$voiceb,$cover);
		fullScreen($video,$fullbtn);
	})
	
	function playBtn($play,$video,$word2,$progress){
		var timer = "";
		$play.click(function(){
			if(flag){
				$video.get(0).play();
				flag = false;
				$play.html("&#xe629;");
				timer = setInterval(function(){
					$word2.html(parseInt(Math.floor($video.get(0).currentTime)/60)+":"+(Math.floor($video.get(0).currentTime)%60>=10?Math.floor($video.get(0).currentTime)%60:"0"+Math.floor($video.get(0).currentTime)%60));
					$progress.width(Math.floor($video.get(0).currentTime/$video.get(0).duration*1000)/10+"%");
				},500);
			}else{
				$video.get(0).pause();
				flag = true;
				$play.html("&#xe624;");
				clearInterval(timer);
			}
		})
	}
	
	function videoTime($video,$word1,$word2){
		$video.get(0).oncanplay = function(){
			$word1.html(Math.floor(Math.floor($video.get(0).duration)/60)+":"+(Math.floor($video.get(0).duration)%60>=10?Math.floor($video.get(0).duration)%60:"0"+Math.floor($video.get(0).duration)%60)+"/");
			$word2.html(parseInt(Math.floor($video.get(0).currentTime)/60)+":"+(Math.floor($video.get(0).currentTime)%60>=10?Math.floor($video.get(0).currentTime)%60:"0"+Math.floor($video.get(0).currentTime)%60));
		}
	}
	
	function chooseTime($video,$progress,$pro,$word2){
		$pro.click(function(e){
			var x = e.offsetX;
			var allwidth = $pro.width();
			$progress.width(Math.floor(x/allwidth*1000)/10+"%");
			$video.get(0).currentTime = (Math.floor(x/allwidth*1000)/1000)*$video.get(0).duration;
			$word2.html(parseInt(Math.floor($video.get(0).currentTime)/60)+":"+(Math.floor($video.get(0).currentTime)%60>=10?Math.floor($video.get(0).currentTime)%60:"0"+Math.floor($video.get(0).currentTime)%60));
			console.log($video.get(0).currentTime);
		})
	}
	
	function voicePower($video,$voiceb,$cover){
		var initVoice = $video.get(0).volume;
		$voiceb.height($cover.height()*initVoice);
		$cover.click(function(e){
			console.log(e.offsetY)
			var y = $cover.height() - e.offsetY;
			$video.get(0).volume = y/100;
			$voiceb.height($cover.height()*$video.get(0).volume);
		})
	}
	
	function fullScreen($video,$fullbtn){
		$fullbtn.click(function(){
			$video.get(0).webkitRequestFullscreen();
		})
	}
})();


	
