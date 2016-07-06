## message.js
 - 主页面与iframe，iframe与iframe之间的跨域交流
 - 使用简单


#实例化
  首先请把message.js加入项目中
```html
  <script src="message.js"></script>
```
  实例化一个message对象
```html
 <script>
   var message = new Message();
 <script>
```
#发送消息
  如果需要发送信息，请先用message.addTarget方法注册一个发送机,再使用send方法给目标发送消息。
  message.addTarget第一个参数为iframe实体，第二个为调用的名字。如果子iframe想给父页面发送消息，第一个参数传入window.parent。
```html
 <script>
   var message = new Message();
   message.addTarget(window.frames[0],'iframe')；
   message.targets['iframe'].send('hello');
 <script>
```
#接受消息
 接受消息用message.listen方法
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
 <script>
```
#Notes
 - 如果一个项目中使用多套message，实例化的时候请赋值name值。避免干扰
 ```html
 <script>
   var message1 = new Message({name:'message1'});
   var message2 = new Message({name:'message2'});
 </script>
 ```
 - 实例化的时候可以一次性添加多个侦听事件
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
  - 发送的信息建议使用字符串，避免低版本IE不兼容
 ```html
 <script>
   var message = new Message();
   message.addTarget(window.frames[0],'iframe')；
   message.targets['iframe'].send('hello');
 </script>
 ```
#感谢
  本组件源码来自 https://github.com/biqing/MessengerJS ，并做适当简化与修改。
