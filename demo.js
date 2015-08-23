var route = VRoute();

var $main = $('#main');

route.get('/appendLi',function(){
	//模板写入
	var data = {
		list:['js','html','css']
	};
	var html = template('li-tpl',data);
	$main.html(html);

	//事件绑定，这里使用委托  
	/**
	 * 需要提到的一点，如果使用委托绑定，
	 * 不建议在视图未进入前就将所有用到的事件都绑定好，
	 * 可能会认为这样就不需要解绑了，是的，
	 * 但是这样一方面不利于各个视图的模块代码分离，
	 * 还很容易造成绑定事件的冲突，
	 * 更糟糕的是，使用委托绑定了大量未使用到的事件，会严重影响页面的性能。
	 */
	$main.off();//注意一定要先解绑事件
	$main.on('click','#list',function(){
		this.count ?  (this.count++) : (this.count = 1);
		$(this).append('<li>新增加的'+this.count+'</li>');
	});

}).get('/count',function(){
	//模板写入
	$main.html($('#count-tpl').html());
	
	//事件绑定，不使用委托绑定，不必解绑
	$main.find('.btn').on('click',function(){
		var $input = $(this).siblings('.input');
		$input.val(~~$input.val()+1);
	});

}).start();


$('#nav a').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
}).filter('[href="'+window.location.hash+'"]').click();
