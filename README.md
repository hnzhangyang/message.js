## message.js
 - 主页面与iframe，iframe与iframe之间的跨域交流
 - 使用简单
# usage
  首先请把message.js加入项目中
```html
  <script src="message.js"></script>
```
#实例化
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
  message.addTarget(window.frames[0],'iframe')
  message.targets['iframe'].send('hello');
 <script>
```
#接受消息
