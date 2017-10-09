
window.onload = function(){
	var music = document.getElementById("music");
	var pre = document.getElementsByClassName("btn1")[0].children[0];
	var next = document.getElementsByClassName("btn1")[0].children[2];
	var play = document.getElementsByClassName("btn1")[0].children[1];
	var random = document.getElementsByClassName("btn2")[0].children[0];
	var restart = document.getElementsByClassName("btn2")[0].children[1];
	var list = document.getElementById("list").children;
	list = Array.from(list);
	var name = document.getElementsByClassName("message")[0].children[0];
	var time1 = document.getElementsByClassName("long")[0].children[0];
	var time2 = document.getElementsByClassName("long")[0].children[1];
	var bg = document.getElementsByClassName("bg")[0];
	var twig = document.getElementsByClassName("twig")[0];
	var people = document.getElementsByClassName("people_img")[0];
	var voice2 = document.getElementsByClassName("voice_bg")[0];
	var voice = document.getElementsByClassName("voice_bar")[0];
	var bar = document.getElementsByClassName("progress_bar")[0];
	var barwidth = parseInt(getStyle(bar,"width"));
	var flag = true;
	
	//初始化
	getTime();
	getVoice();
	
	//前一个
	pre.onclick = function(){
		var premusic = "";
		list.forEach(function(item,value){
			if(item.children[0].innerText == name.innerText ){
				if(value == 0){
					premusic = list[3].children[0].innerHTML;
				}else{
					premusic = item.previousElementSibling.children[0].innerHTML;
				}
			}
		})
		name.innerText = premusic;
		music.src = "music/"+premusic+" - 薛之谦.mp3";
		bg.style.width = 0;
		flag = true;
		play.onclick();
	}
	//后一个
	next.onclick = function(){
		var nextmusic = "";
		list.forEach(function(item,value){
			if(item.children[0].innerText == name.innerText ){
				if(value == 3){
					nextmusic = list[0].children[0].innerHTML;
				}else{
					nextmusic = item.nextElementSibling.children[0].innerHTML;
				}
			}
		})
		name.innerText = nextmusic;
		music.src = "music/"+nextmusic+" - 薛之谦.mp3";
		bg.style.width = 0;
		flag = true;
		play.onclick();
	}
	
	//随机选择歌曲
	random.onclick = function(){
		var randomMusic = "";
		var num = 0;
		var renum = 0;
		list.forEach(function(item,value){
			if(item.children[0].innerText == name.innerText ){
				num = value;
			}
		})
		
		renum = Math.floor(Math.random()*4);
		while(renum == num){
			renum = Math.floor(Math.random()*4);
		}
		randomMusic = list[renum].children[0].innerHTML;
		name.innerText = randomMusic;
		music.src = "music/"+randomMusic+" - 薛之谦.mp3";
		bg.style.width = 0;
		flag = true;
		play.onclick();
	}
	
	//音量调节按钮
	voice.onclick = function(e){
		var x = e.offsetX;
		music.volume = x/100;
		voice2.style.width = x+"px";
	}
	
	//拖动播放位置
	bar.onclick = function(e){
		var x = e.offsetX;
		var nowtime = parseInt(x/barwidth*music.duration);
		music.currentTime = nowtime;
	}
	
	//播放按钮
	var timer = "";
	play.onclick= function(){
		if(flag){
			music.play();
			flag = false;
			play.innerHTML = "&#xf006d;";
			timer = setInterval(function(){
				time2.innerText = parseInt(Math.floor(music.currentTime)/60)+":"+(Math.floor(music.currentTime)%60>=10?Math.floor(music.currentTime)%60:"0"+Math.floor(music.currentTime)%60)
				bg.style.width = parseInt(music.currentTime)/parseInt(music.duration)*barwidth+"px";
				console.log(Math.floor(music.currentTime));
			},1000);
			twig.style.transform = "rotate(0deg)";
			people.style.animation = "run 20s linear infinite";
			
		}else{
			music.pause();
			flag = true;
			play.innerHTML = "&#xe634;";
			clearInterval(timer);
			twig.style.transform = "rotate(-21deg)";
			people.style.animationPlayState = "paused";
			
		}
	}
	//重置按钮
	restart.onclick = function(){
		music.currentTime = 0;
		getTime();
		bg.style.width = 0;
	}
	
	//歌单选择
	list.forEach(function(item,value){
		item.onclick = function(){
			name.innerText = item.children[0].innerText;
			music.src = "music/"+item.children[0].innerText+" - 薛之谦.mp3";
			bg.style.width = 0;
			flag = true;
			play.onclick();
		}
	})
}


//获取歌曲长度的方法
function getTime(){
	var music = document.getElementById("music");
	var time1 = document.getElementsByClassName("long")[0].children[0];
	var time2 = document.getElementsByClassName("long")[0].children[1];
	
	music.oncanplay = function(){
		time1.innerText = parseInt(Math.floor(music.duration)/60)+":"+Math.floor(music.duration)%60+"/";
		time2.innerText = "0:00";
	}
}
//获取初始音量的方法
function getVoice(){
	var music = document.getElementById("music");
	var voice2 = document.getElementsByClassName("voice_bg")[0];
	var voicePower = music.volume;
	voice2.style.width = voicePower*100+"px";
}
//获取非行内样式的方法
function getStyle(ele, attr) {
	if(ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele)[attr];
	}
}




//方法               方法描述
//addTextTrack()    为音视频加入一个新的文本轨迹    
//canPlayType()    检查指定的音视频格式是否得到支持    
//load()    重新加载音视频标签    
//play()    播放音视频    
//pause()    暂停播放当前的音视频    
//-------------------------
//属性           属性描述
//audioTracks    返回可用的音轨列表（MultipleTrackList对象）    
//autoplay    媒体加载后自动播放    
//buffered    返回缓冲部件的时间范围(TimeRanges对象)    
//controller    返回当前的媒体控制器（MediaController对象）    
//controls    显示播控控件    
//crossOrigin    CORS设置    
//currentSrc    返回当前媒体的URL    
//currentTime    当前播放的时间，单位秒    
//defaultMuted    缺省是否静音    
//defaultPlaybackRate    播控的缺省倍速    
//duration    返回媒体的播放总时长，单位秒    
//ended    返回当前播放是否结束标志    
//error    返回当前播放的错误状态    
//initialTime    返回初始播放的位置    
//loop    是否循环播放    
//mediaGroup    当前音视频所属媒体组 (用来链接多个音视频标签)    
//muted    是否静音    
//networkState    返回当前网络状态    
//paused    是否暂停    
//playbackRate    播放的倍速    
//played    当前播放部件已经播放的时间范围(TimeRanges对象)    
//preload    页面加载时是否同时加载音视频    
//readyState    返回当前的准备状态    
//seekable    返回当前可跳转部件的时间范围(TimeRanges对象)    
//seeking    返回用户是否做了跳转操作    
//src    当前音视频源的URL    
//startOffsetTime    返回当前的时间偏移(Date对象)    
//textTracks    返回可用的文本轨迹(TextTrackList对象)    
//videoTracks    返回可用的视频轨迹(VideoTrackList对象)    
//volume    音量值    
//事件
//事件描述
//abort    当音视频加载被异常终止时产生该事件    
//canplay    当浏览器可以开始播放该音视频时产生该事件    
//canplaythrough    当浏览器可以开始播放该音视频到结束而无需因缓冲而停止时产生该事件    
//durationchange    当媒体的总时长改变时产生该事件    
//emptied    当前播放列表为空时产生该事件    
//ended    当前播放列表结束时产生该事件    
//error    当加载媒体发生错误时产生该事件    
//loadeddata    当加载媒体数据时产生该事件    
//loadedmetadata    当收到总时长，分辨率和字轨等metadata时产生该事件    
//loadstart    当开始查找媒体数据时产生该事件    
//pause    当媒体暂停时产生该事件    
//play    当媒体播放时产生该事件    
//playing    当媒体从因缓冲而引起的暂停和停止恢复到播放时产生该事件    
//progress    当获取到媒体数据时产生该事件    
//ratechange    当播放倍数改变时产生该事件    
//seeked    当用户完成跳转时产生该事件    
//seeking    当用户正执行跳转时操作的时候产生该事件    
//stalled    当试图获取媒体数据，但数据还不可用时产生该事件    
//suspend    当获取不到数据时产生该事件    
//timeupdate    当前播放位置发生改变时产生该事件    
//volumechange    当前音量发生改变时产生该事件    
//waiting    当视频因缓冲下一帧而停止时产生该事件

