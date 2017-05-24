// 定义工具函数
var Class = {
    create: function () {
        return function () {
            this.init.apply(this,arguments);
        }
    }
}
var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
}

var supportPostMessage='postMessage' in window;

// 消息对象
var Target=function(target,name){
	var errMsg='';
	if(arguments.length < 2){
        errMsg = 'target error - target and name are both required';
    } else if (typeof target != 'object'){
        errMsg = 'target error - target itself must be window object';
    } else if (typeof name != 'string'){
        errMsg = 'target error - target name must be string type';
    }
    if(errMsg){
        throw new Error(errMsg);
    }
    this.target=target;
    this.name=name;
}

// 发送信息
Target.prototype.send=function(msg){
	// 如果支持postMessage，则用之，IE8+
	if(supportPostMessage){
		this.target.postMessage(msg,'*');
	}else{ // 不支持如果支持postMessage，利用window.navigator对象在每个frame共享
		var targetFunc=window.navigator[this.name];
		if ( typeof targetFunc == 'function' ) {
			targetFunc(msg, window)	     
        } else {
            throw new Error("target callback function is not defined");
        }		
	}
}

var Message=Class.create();

Message.prototype={
	init:function(options){
		this.setOption(options);
		this.name=this.options.name;
		this.targets=this.options.targets;
		this.listenFunc=this.options.listenFunc;
		this.initListen(); // 初始化监听
	},
	
	setOption:function(options){
		this.options={
			name:'message',
			targets:{},
			listenFunc:[]
		}
		Extend(this.options, options || {});
	},
	
	initListen:function(){
		var self=this;
		
		var generalCallback=function(msg){
			if(typeof msg === 'object' && msg.data){
				msg=msg.data;
			}
			for(var i = 0; i < self.listenFunc.length; i++){
                self.listenFunc[i](msg);
            }
		}
		
		if( supportPostMessage){
			if(window.addEventListener){
				window.addEventListener('message',generalCallback,false);
			}else{ // 兼容IE8
				window.attachEvent('onmessage',generalCallback)
			}
		}else{
			window.navigator[this.name]=generalCallback;
		}
	},
	
	// 添加一个消息对象
	addTarget:function(target,name){
		var targetObj=new Target(target,this.name);
		this.targets[name]=targetObj;
	},
	
	// 添加一个侦听
	listen:function(callback){
		this.listenFunc.push(callback);
	},
	
	// 清除所有侦听
	clear:function(){
		this.listenFunc=[];
	},
	
	// 对每个注册的消息对象广播消息
	send:function(msg){
		for(var target in this.targets){
			if(this.targets.hasOwnProperty(target)){
				this.targets[target].send(msg);
			}
		}
	}
};
