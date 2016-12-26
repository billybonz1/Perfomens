$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	}

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });



//Форма отправки 2.0
	$(function() {
	$("[name=send]").click(function () {
		$(":input.error").removeClass('error');
		$(".allert").remove();

		var error;
		var btn = $(this);
		var ref = btn.closest('form').find('[required]');
		var msg = btn.closest('form').find('input, textarea');
		var send_btn = btn.closest('form').find('[name=send]');

		$(ref).each(function() {
			if ($(this).val() == '') {
				var errorfield = $(this);
				$(this).addClass('error').parent('.field').append('<div class="allert"><span>Заполните это поле</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
				error = 1;
				$(":input.error:first").focus();
				return;
			} else {
				var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
				if ($(this).attr("type") == 'email') {
					if(!pattern.test($(this).val())) {
						$("[name=email]").val('');
						$(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный e-mail</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
						error = 1;
						$(":input.error:first").focus();
					}
				}
				var patterntel = /^()[0-9]{9,18}/i;
				if ( $(this).attr("type") == 'tel') {
					if(!patterntel.test($(this).val())) {
						$("[name=phone]").val('');
						$(this).addClass('error').parent('.field').append('<div class="allert"><span>Укажите коректный номер телефона</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
						error = 1;
						$(":input.error:first").focus();
					}
				}
			}
		});
		if(!(error==1)) {
			$(send_btn).each(function() {
				$(this).attr('disabled', true);
			});

			var form = btn.closest('form'), name = form.find('[name=name]').val();

			$.ajax({
				type: 'POST',
				url: 'mail.php',
				data: msg,
				success: function(data) {
					$.magnificPopup.close();
					$("a[href='#ThankYou']").click();
					form[0].reset();
					send_btn.attr('disabled', false);
				},
				error: function(xhr, str) {
					alert('Возникла ошибка: ' + xhr.responseCode);
				}
			});
		}
		return false;
	});
});


	$(".js-example-basic-single").select2();


	$.fn.sliderMove = function(width) {
		width = parseInt(width);
		var windowWidth = $(window).width();
		var translate = width - windowWidth;
		this.css({
			"transform" : "translate3d(-"+ translate +"px,0,0)"
		});
	};

	$('.autoWidth').lightSlider({
		autoWidth:true,
		loop: false,
		auto:false,
		slideMargin: 0,
		slideMove:1,
		pauseOnHover: true,
		speed:400,
		onSliderLoad: function (el) {
			$(el).removeClass('cs-hidden');
			var width = $(el).css("width");
			$(el).sliderMove(width);
		}
	});



	var workActive = $(".head-menu-ul li a.active").attr('href');
	var workCurrent = "";
	$(".head-menu-ul li a").on("click", function (e) {
		e.preventDefault();
		var $this = $(this);
		workCurrent = $this.attr('href');
		if($(workCurrent).length && workActive != workCurrent){
			$(".head-menu-ul").removeClass("swiped");
			$(".head-menu-ul li a").removeClass("active");
			$this.addClass("active");
			$(workActive).fadeOut(500,function(){
				workActive = workCurrent;
				$(workCurrent).fadeIn(500);
				$(".work-block").removeClass(".work-active");
			});
		}
	});

		/* Apply fancybox to multiple items */

		$(".fancybox").magnificPopup({
			type: 'image',
			gallery:{
				enabled:true
			},
			callbacks: {
				beforeOpen: function () {
					this.disableOn = $(".autoWidth").hasClass("lsGrabbing") ? false : true;
				}
			}
		});

		$(".open-popup").magnificPopup({
			type:'inline',
			midClick: true
		});
		$(".category-work,.head-menu-ul").swipe( {
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if(direction == "right"){
					$(".head-menu-ul").addClass("swiped");
				}else if(direction == "left"){
					$(".head-menu-ul").removeClass("swiped");
				}

			}
		});




});
