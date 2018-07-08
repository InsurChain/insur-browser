
import { wsurl } from './bus.js'

const global={
	sendSocket:[
		'{"method":"call","params":[1,"login",["",""]],"id":1}',
		'{"method":"call","params":[1,"history",[]],"id":4}',
		'{"method":"call","params":[0,"set_subscribe_callback",[8,true]],"id":8}'
	],
	heartCheck:{
		timeout: 60000,//60ms
		timeoutObj: null,
		serverTimeoutObj: null,
		reset: function( ws,reconnect ){
			// alert(this.timeoutObj)
			clearTimeout(this.timeoutObj);
			clearTimeout(this.serverTimeoutObj);
	　　　　 this.start( ws,reconnect );
		},
		start: function( ws,reconnect ){
			// alert(ws)
			var self = this;
			// alert(this.timeoutObj)
			self.timeoutObj = setTimeout(function(){
				ws.send("HeartBeat");
				self.serverTimeoutObj = setTimeout(function(){
					// alert(1111)
					// ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
					reconnect();
					
				}, self.timeout)
			}, self.timeout)
		},
	},
	WebSocketTest:function( callback,sendSocket,router,ws ){
		let _this = this;

		// var heartCheck = {
		// 	timeout: 60000,//60ms
		// 	timeoutObj: null,
		// 	serverTimeoutObj: null,
		// 	reset: function(){
		// 		// alert(this.timeoutObj)
		// 		clearTimeout(this.timeoutObj);
		// 		clearTimeout(this.serverTimeoutObj);
		// 　　　　 this.start();
		// 	},
		// 	start: function(){
		// 		var self = this;
		// 		self.timeoutObj = setTimeout(function(){
		// 			ws.send("HeartBeat");
		// 			self.serverTimeoutObj = setTimeout(function(){
		// 				// alert(1111)
		// 				ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
						
		// 			}, self.timeout)
		// 		}, self.timeout)
		// 	},
		// }

		if ("WebSocket" in window) {
			try{
				// var ws = new WebSocket(wsurl);
				let _this = this;  

				ws.onopen = function() {
					heartCheck.start();
					for (var i = 0; i < sendSocket.length; i++){
						ws.send( sendSocket[i]);
					}
				};
			   
				ws.onmessage = function (evt)  { 
					heartCheck.reset();
					callback(evt);
				};
				ws.onclose = function () {
					_this.WebSocketTest( callback,sendSocket,router )
					
				};
				ws.onerror = function () {
					heartCheck.timeoutObj = null;
					heartCheck.serverTimeoutObj = null;
					clearTimeout(heartCheck.timeoutObj);
					clearTimeout(heartCheck.serverTimeoutObj);
					_this.WebSocketTest( callback,sendSocket,router )
					
				};
				router.afterEach(function () {
				   ws.close();
				})
			}catch( err){
				
			}
			
		}else {
			alert("您的浏览器不支持 WebSocket!");
		}
      

	},
	convertUTCTimeToLocalTime:function(UTCDateString){
		if(!UTCDateString){
			return '-';
		  }
		  function formatFunc(str) {    //格式化显示
			return str > 9 ? str : '0' + str
		  }
		  var date2 = new Date(UTCDateString);     //这步是关键
		  var year = date2.getFullYear();
		  var mon = formatFunc(date2.getMonth() + 1);
		  var day = formatFunc(date2.getDate());
		  var hour = date2.getHours();
		  var noon = hour >= 12 ? 'PM' : 'AM';
		  hour = hour>=12?hour-12:hour;
		  hour = formatFunc(hour);
		  var min = formatFunc(date2.getMinutes());
		  var dateStr = year+'-'+mon+'-'+day+' '+noon +' '+hour+':'+min;
		  return dateStr;
	},
	getCookie(name,defaultValue) {
		var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
		if (arr = document.cookie.match(reg))
		  return unescape(arr[2]);
		else
		  return defaultValue;
	  }


}	
export default global