$(function() {

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	// fancybox
	$("a.modal").fancybox();


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
				url: '/mail.php',
				data: msg,
				success: function(data) {
					$.magnificPopup.close();
					$("#ThankYou span").text(name);
					$("a[href='#ThankYou']").click();
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


	$('.autoWidth').lightSlider({
		autoWidth:true,
		loop:true,
		auto:false,
		slideMove:1,
		pauseOnHover: true,
		speed:400,
		onSliderLoad: function(el){
			var img = $(el).find("li.active img").attr("src");
			$(".active-div").css({
				"background-image": "url(" + img + ")"
			})
		},
		onBeforeSlide: function (el) {
			$('#current').text(el.getCurrentSlideCount());
		},
		onAfterSlide: function(el){
			var img = $(el).find("li.active img").attr("src");
			$(".active-div").css({
				"background-image": "url(" + img + ")"
			})
		}
	});




	$(".toggle_mnu").click(function() {
		$(".sandwich").toggleClass("active");
	});

	$(".top_mnu ul a").click(function() {
		$(".top_mnu").fadeOut(600);
		$(".sandwich").toggleClass("active");
		$(".top_text").css("opacity", "1");
	}).append("<span>");

	$(".toggle_mnu").click(function() {
		if ($(".top_mnu").is(":visible")) {
			$(".top_text").css("opacity", "1");
			$(".top_mnu").fadeOut(600);
			$(".top_mnu li a").removeClass("fadeInUp animated");
		} else {
			$(".top_text").css("opacity", ".1");
			$(".top_mnu").fadeIn(600);
			$(".top_mnu li a").addClass("fadeInUp animated");
		};
	});




	var workActive = $(".head-menu-ul li a.active").attr('href');
	var workCurrent = "";
	$(".head-menu-ul li a").on("click", function (e) {
		var $this = $(this);
		$(".head-menu-ul li a").removeClass("active");
		$this.addClass("active");
		$(workActive).fadeOut(600,function(){
			workCurrent = $this.attr('href');
			workActive = workCurrent;
			$(workCurrent).fadeIn(600);
			$(".work-block").removeClass(".work-active");
		});

	});













		/* This is basic - uses default settings */

		$("a#single_image").fancybox();

		/* Using custom settings */

		$("a#inline").fancybox({
			'hideOnContentClick': true
		});

		/* Apply fancybox to multiple items */

		$("a.group").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600,
			'speedOut'		:	200,
			'overlayShow'	:	false
		});







});
