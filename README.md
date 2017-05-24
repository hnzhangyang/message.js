## message1222.js
 - 主页面与 iframe ，iframe 与 iframe 之间的跨全域交流
 - 使用简单，ie7以上以及现代浏览器支持


## 实例化
  首先请把 message.js 加入项目中
```html
  <script src="message.js"></script>
```
  实例化一个message对象
```html
 <script>
   var message = new Message();
 </script>
```
## 发送消息
   - 如果需要发送信息，请先用 message.addTarget 方法给目标注册一个发送机。
   - message.addTarget 方法接受两个参数。第一个参数为目标 iframe （如果是子 iframe 想给父页面发送消息，请用 window.parant 代替）。第二个参数为调用名称。
```html
 <script>
   var message = new Message();
   message.addTarget(window.frames[0],'iframe')；
 </script>
```
  - 发送消息请用send()方法
 
```html
 <script>
   var message = new Message();
   message.addTarget(window.frames[0],'iframe')；
   message.targets['iframe'].send('hello');
 </script>
```
## 接受消息
 接受消息用 message.listen 方法
 ```html
 <script>
   var message = new Message();
   message.listen(function(msg){
     console.log(msg);
   })
   //也可以添加多个侦听
   message.listen(function(msg){
     alert(msg);
   })
 </script>
```
## Notes
 - 如果一个项目中使用多套 message ，实例化的时候请赋值 name 值。避免干扰。
 
 ```html
 <script>
    var message1 = new Message({name:'message1'});
    var message2 = new Message({name:'message2'});
 </script>
 ```
 - 实例化的时候可以一次性添加多个侦听事件。
 
 ```html
 <script>
   var message = new Message({
     listenFunc:[
       function(){},
       function(){},
       function(){}
     ]
   });
 </script>
 ```
 - 发送的信息建议使用字符串，避免低版本IE不兼容。
  
 ```html
 <script>
    var message = new Message();
    message.addTarget(window.frames[0],'iframe')；
    message.targets['iframe'].send('hello');
 </script>
 ```
 
## 感谢
  本组件源码来自 https://github.com/biqing/MessengerJS ，并做适当简化与修改。
