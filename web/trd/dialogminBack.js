define(['jquery'], function() {

	var dialogminBack = function(content,fun){
			var dialogdiv =
                "<div class='tanchuA' id='dialogminBack'>"+
                     "<div class='tc_con'>"+
                        "<div class='gbCon'>"+content+"</div>"+
                        "<div class='addsjdx' id='diaok'>确认</div>"+
                        "<div class='gbBnt' id='diacancel'>取消</div>" +
                "</div></div>";
			$('body').append(dialogdiv);
            $("#diaok").click(function(){
                fun(true)
                $("#dialogminBack").remove();
            });
            $("#diacancel").click(function(){
                fun(false)
                $("#dialogminBack").remove();
            });

	};

	return dialogminBack;
});