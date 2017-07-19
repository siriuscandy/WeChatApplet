require.config({
	baseUrl: $ctx+"/web/",
    //urlArgs:'v=0170530',
    //baseUrl: "/web/",
	paths: {
		text: "trd/requirejs/text",
		css: "trd/requirejs/css",
		jquery: "trd/jquery/jquery.2.1.4.min",
		bootstrap: 'trd/bootstrap/js/bootstrap.min',
		bootstrapSelect: 'trd/bootstrap/js/bootstrap-select',
        datetimepicker: 'trd/datetimepicker/js/bootstrap-datetimepicker.min',
        datetimepickerZHCN: 'trd/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN',
		knockout: "trd/knockout/knockout-3.2.0.debug",
		uui: "js/sys/uui/js/u.min",
		uuinew: "js/sys/uui/js/unew",
        ugrid: "js/sys/uui/js/u-grid",

		wizard:"trd/jquery-bootstrap-wizard/jquery.bootstrap.wizard",
		director:"trd/director/director",
		'jquery.file.upload' : "trd/juqery-file-upload/9.9.2/js/jquery.fileupload",
		'jquery.ui.widget':"trd/jquery-ui/jquery.ui.widget",
		'jquery.iframe.transport':"trd/jquery-iframe-transport/jquery.iframe-transport",
		biz: "js/sys/uui/js/u.biz",
        PCASClass: "trd/PCASClass",
        dialogmin:"trd/dialogmin",
        dialogminBack:"trd/dialogminBack",
        KinerCode:"js/KinerCode",
        security:"js/security",
        'uploader':"trd/uploader/js/webuploader",
        swiper:"trd/swiper/js/swiper-3.2.7.min",
        sha1:"trd/jsSHA-2.0.1/sha1",
        encrypt:"js/encrypt",
        ajaxcommon:"trd/ajaxcommon",
        ajaxCom:"trd/ajaxCom",
        ueditor_config:"trd/ueditor/ueditor.config",
        ueditor:"trd/ueditor/ueditor.min",
        ZeroClipboard:"trd/ueditor/third-party/zeroclipboard/ZeroClipboard",
        daterangpicker: 'trd/datetimepicker/js/daterangepicker',
        webuploaderdemo:"trd/uploader/js/demo",
        jqueryzclip:"trd/jquery-zclip/jquery-zclip",
        qrcode: "trd/jquery/jquery.qrcode.min",
        dropload: "trd/dropload/dropload.min",
        moment: 'trd/datetimepicker/js/moment',
        'jquery.spinner':"trd/jquery/jquery.spinner"

	},
    waitSeconds: 0,
	shim: {
        'webuploaderdemo':{
            deps: ["css!trd/uploader/css/demo.css",'uploader']

        },
        'jquery.spinner':{
            deps: ['jquery']

        },
        'dropload':{
            deps: ["css!trd/dropload/dropload.css"]

        },
        'ZeroClipboard':{
            exports:"ZeroClipboard"
        },
        'ueditor':{
            deps: ["ueditor_config",'ZeroClipboard'],
            exports:"UE"
        },
		'uui':{
			deps: ["jquery","bootstrap",'knockout']
		},
        'uuinew':{
			deps: ["jquery","bootstrap",'knockout','ugrid']
		},
		'bootstrap': {
			deps: ["jquery"]
		},
        'bootstrapSelect': {
			deps: ["bootstrap","css!trd/bootstrap/css/bootstrap-select.min.css"]
		},
		'jquery.file.upload':{
			deps: ["jquery","jquery.ui.widget","jquery.iframe.transport","css!trd/juqery-file-upload/9.9.2/css/jquery.fileupload.css"]
		},
		biz:{
			deps: ["uui","knockout"]
		},
		uploader:{
			deps: ["jquery", "css!trd/uploader/css/webuploader.css"]
		},
        swiper:{
            deps: ["jquery", "css!trd/swiper/css/swiper-3.2.7.min.css"]
        },
        sha1:{
            exports:"sha1"
        },
        datetimepicker:{
            deps: ["css!trd/datetimepicker/css/bootstrap-datetimepicker.min.css"]
        },
        datetimepickerZHCN:{
            deps: ["datetimepicker"]
        },
        daterangpicker:{
            deps: ["css!trd/datetimepicker/css/daterangepicker-bs3.css"]
        }
	}
});