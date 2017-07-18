define(['jquery'], function() {
	
	var dialogmin = function(content,time){
            if(time==undefined){time = 2000;    }
			var dialogdiv = "<div class='dialogmin' style='z-index:9999; position: fixed; width: 30%; top:30%; background: rgba(0,0,0,.5);color: #fff; padding: 10px 5px; left:35%; text-align: center; border-radius: 10px'><span>"+content+"</span></div>";
			$('body').append(dialogdiv);
			setTimeout(function(){
				$(".dialogmin").remove();
			},time)
	};

	return dialogmin;
});