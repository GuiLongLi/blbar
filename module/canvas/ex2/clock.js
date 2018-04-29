define([],function(){
	var extend = function(target,source){
		for(var x in source){
			if(x in target){
				target[x] = source[x];
			}
		}
		return target;
	};

	var addEvent = function(obj,event,func){
		obj.addEventListener ? obj.addEventListener(event,func) : obj.attachEvent('on'+event,function(){func.call(obj)})
	};

	window.requestAnimation = function(){
		return  window.requestAnimationFrame || 
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				function(fn){
					return window.setTimeout(fn,1000/60);
				}
	};

	/**
     * 获取mimeType
     * @param  {String} type the old mime-type
     * @return the new mime-type
     */
    var _fixType = function(type) {  //获取图片的mime类型
        type = type.toLowerCase().replace(/jpg/i, 'jpeg');
        var r = type.match(/png|jpeg|bmp|gif/)[0];
        return 'image/' + r;
    };

    /**
     * 在本地进行文件保存
     * @param  {String} data     要保存到本地的图片base64数据
     * @param  {String} filename 文件名
     */
    var saveFile = function(data, filename){
        var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        save_link.href = data;
        save_link.download = filename;
       
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        save_link.dispatchEvent(event);
    };

	var init = function(opt){
		this.option = {
			//el是 dom 对象
			el : null,
			snapshot : null,
			fontWeight:15,
			margin:35,
		    numberSpacing:20,
		    loop: ''
		};

		extend(this.option,opt);
		this.initialize();
	};
	init.prototype = {
		initialize:function(){
			this.canvas = this.option.el;
			this.ctx = this.canvas.getContext('2d');

			this.option.handTruncation = this.canvas.width/25;
			this.option.hourHandTruncation = this.canvas.width/10;
			this.option.Radius = this.canvas.width/2-this.option.margin;
			this.option.handRadius = this.option.Radius + this.option.numberSpacing;

			
			var _this = this;
			//画时钟
			_this.drawClock(_this);
			this.loop = setInterval(function(){
				_this.drawClock(_this);
			}, 1000);

			//截图事件
			if(_this.option.snapshot){
				_this.option.snapshot.onclick = function(){
					_this.snapShot();
				}
			}
		},

		//画时钟
		drawClock:function(obj){
			obj.ctx.clearRect(0,0,obj.canvas.width,obj.canvas.height);
    		obj.ctx.save();
    		obj.ctx.fillStyle = 'rgba(255,255,255,0.8)';
			obj.ctx.fillRect(0, 0, obj.canvas.width, obj.canvas.height);
			obj.drawCircle();
			obj.drawCenter();
			obj.drawHands();
			obj.ctx.restore();
			obj.drawNumeral();
		},

		//画圆
		drawCircle:function(){
			this.ctx.beginPath();
			this.ctx.strokeStyle='#000';
			this.ctx.lineWidth=1;
			this.ctx.arc(this.canvas.width/2,this.canvas.height/2,this.option.Radius,0,Math.PI*2,true);
			this.ctx.stroke();
		},
		//画小时标识
		drawNumeral:function(){
			var numberal = [1,2,3,4,5,6,7,8,9,10,11,12],
			angle = 0,
			numeralWidth = 0
			_this = this;
			numberal.forEach(function(numberal){
				angle = Math.PI/6 * (numberal-3);
				numeralWidth = _this.ctx.measureText(numberal).width;
				_this.ctx.fillText(numberal,
					_this.canvas.width/2  + Math.cos(angle)*(_this.option.handRadius) - numeralWidth/2,
					_this.canvas.height/2 + Math.sin(angle)*(_this.option.handRadius) + _this.option.fontWeight/3
				)
			});

			
			
			for(var loc = 0;loc < 60;loc++){
				var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
			        handRadius = this.option.Radius-this.option.handTruncation+10;
			     if(loc % 5 == 0){
			        handRadius = this.option.Radius-this.option.handTruncation;
			        this.ctx.beginPath();
			        this.ctx.strokeStyle="#000";
			        this.ctx.lineWidth=2;
			     }else{
			     	this.ctx.beginPath();
			     	this.ctx.strokeStyle="#ccc";
			     }
			     	
			    this.ctx.moveTo(this.canvas.width/2  + Math.cos(angle)*handRadius, 
			                  this.canvas.height/2 + Math.sin(angle)*handRadius);
			    this.ctx.lineTo(this.canvas.width/2  + Math.cos(angle)*(this.option.Radius -1), 
			                  this.canvas.height/2 + Math.sin(angle)*(this.option.Radius - 1));
			    this.ctx.stroke();
				
			}

		},
		//画圆心
		drawCenter:function(){
			this.ctx.beginPath();
			this.ctx.fillStyle = "#000";
			this.ctx.lineWidth=1;
			this.ctx.arc(this.canvas.width/2,this.canvas.height/2,4,0,Math.PI*2,true);
			this.ctx.fill();
		},
		//画指针
		//handType = 1 小时 ，handType = 2 分 ， handType = 3 秒
		drawHand:function(loc, handType) {
		    var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
		        handRadius = handType == 1 ? this.option.Radius-this.option.handTruncation-this.option.hourHandTruncation 
		                           : this.option.Radius-this.option.handTruncation;
			this.ctx.beginPath();
            this.ctx.strokeStyle="#000";
            this.ctx.lineWidth=1;
		    this.ctx.moveTo(this.canvas.width/2, this.canvas.height/2);
		    this.ctx.lineTo(this.canvas.width/2  + Math.cos(angle)*handRadius, 
		                  this.canvas.height/2 + Math.sin(angle)*handRadius);
		    //画秒针反方向的小指针
		    if(handType == 3){
		    	var minangle = loc >= 30 ? (Math.PI*2) * (Math.abs(loc-30)/60) - Math.PI/2 : (Math.PI*2) * (Math.abs(loc+30)/60) - Math.PI/2;

		    	this.ctx.moveTo(this.canvas.width/2, this.canvas.height/2);
		    	this.ctx.lineTo(this.canvas.width/2  + Math.cos(minangle)*20, 
		                  this.canvas.height/2 + Math.sin(minangle)*20);
		    }
		    this.ctx.stroke();
		},
		//画指针时分秒
		drawHands:function() {
		    var date = new Date,
		        hour = date.getHours();
		    hour = hour > 12 ? hour - 12 : hour;
		    this.drawHand(hour*5 + (date.getMinutes()/60)*5, 1, 0.5);
		    this.drawHand(date.getMinutes(), 2, 0.5);
		    this.drawHand(date.getSeconds(), 3, 0.2);
		},

		//截图
		snapShot:function(){
			clearInterval(this.loop);
			// 图片导出为 png 格式
			var type = 'png';
			var imgData = this.canvas.toDataURL(type);  //获取canvas的图片base64数据

			// 加工image data，替换mime type
			imgData = imgData.replace(_fixType(type),'image/octet-stream');

			// 下载后的问题名
			var filename = '1.' + type;
			// download
			saveFile(imgData,filename);

			var _this = this;
			//画圆
			this.loop = setInterval(function(){
				_this.drawClock(_this);
			}, 1000);
			
		}

	}

	return init;
})