"use strict";
jQuery(document).ready(function () {

	// Clone the main menu to the mobile menu
	jQuery('#main-menu').clone().removeClass().appendTo('#mobile-menu-container');

	// Enable Menu menu toggling
	jQuery('#main-menu-handle').on('click', function () {
		jQuery(this).toggleClass('active').parents('#main-header').toggleClass('mobile-menu-active');
		jQuery('#mobile-menu-container').fadeToggle();
	});

	var sortHandle = jQuery('.sort-handle');
	if (sortHandle.length > 0) {
		sortHandle.on('click', function () {
			jQuery(this).next('ul').slideToggle();
		});
	}


	jQuery('.animated-box').on('inview', function (event, isInView) {
		if (isInView) {
			var _this          = jQuery(this),
				animationType  = _this.data('animation'),
				animationDelay = _this.data('delay');
			animationDelay ? setTimeout(function () {
				_this.addClass(animationType);
			}, animationDelay) : _this.addClass(animationType);
		}
	});

	if (jQuery.isFunction(jQuery.fn.select2)) {
		// Change all the select boxes to select2
		jQuery("select:not(.disable-select2)").select2({
			minimumResultsForSearch: 10
		});
	}

	jQuery('[data-bg-img]').each(function () {
		var _this = jQuery(this);
		_this.css('background-image', 'url(' + _this.data('bg-img') + ')');
	});

	var mainSlider = jQuery("#main-slider, #event-slider, #room-slider");
	if (mainSlider.length > 0 && jQuery.fn.owlCarousel) {
		// Main Slider
		mainSlider.owlCarousel({
			navigation:     !0,
			singleItem:     !0,
			addClassActive: !0,
			autoPlay:       !0,
			pagination:     !1,
			navigationText: ['<span>Prev</span>', '<span>Next</span>']
		});
	}


	// Booking datepicker
	jQuery.fn.datepicker && jQuery("#main-availability-form, #room-booking-form, #room-information-form").find('.input-daterange').datepicker({
		format:    "yyyy-mm-dd",
		autoclose: true,
		startDate: new Date()
	});

	var luxuryRooms = jQuery('#luxury-rooms');
	if (luxuryRooms.length > 0) {
		luxuryRooms.children('.room-boxes').each(function () {
			var _this = jQuery(this).children('.inner-container');
			_this.css('background-image', 'url(' + _this.data('bg') + ')');
		});
	}

	var mainImgContainer = jQuery(".image-main-box");
	// Enable the magnificPopup
	jQuery.fn.magnificPopup && mainImgContainer.magnificPopup({
		delegate:     '.item:not(":hidden") .more-details',
		type:         'image',
		removalDelay: 600,
		mainClass:    'mfp-fade',
		gallery:      {
			enabled:            true,
			navigateByImgClick: true,
			preload:            [0, 1] // Will preload 0 - before current, and 1 after the current image
		},
		image:        {
			titleSrc: 'data-title',
			tError:   '<a href="%url%">The image #%curr%</a> could not be loaded.'
		}
	});


	jQuery.fn.magnificPopup && jQuery('.video-url').magnificPopup({
		disableOn:       700,
		type:            'iframe',
		mainClass:       'mfp-fade',
		removalDelay:    600,
		preloader:       false,
		fixedContentPos: false
	});

	// Enable isotop for gallery
	if (jQuery.fn.magnificPopup && jQuery.fn.imagesLoaded) {
		mainImgContainer.isotope({
			transitionDuration: "0.7s"
		});
		mainImgContainer.imagesLoaded(function () {
			mainImgContainer.isotope("layout");
			jQuery(".sort-section-container").on("click", "a", function (e) {
				e.preventDefault();
				jQuery(".sort-section-container a").removeClass("active");
				jQuery(this).addClass("active");
				var filterValue = jQuery(this).attr("data-filter");
				mainImgContainer.isotope({filter: filterValue});
			});
		});
	}

	// Enable isotop for Events
	jQuery.fn.imagesLoaded && jQuery(".event-main-box, .dishes-main-box").imagesLoaded(function () {
		var eventContainer = jQuery(".event-main-box, .dishes-main-box");
		eventContainer.isotope({
			transitionDuration: "0.7s"
		});
		eventContainer.imagesLoaded(function () {
			eventContainer.isotope("layout");
			jQuery(".sort-section-container").on("click", "a", function (e) {
				e.preventDefault();
				jQuery(".sort-section-container a").removeClass("active");
				jQuery(this).addClass("active");
				var filterValue = jQuery(this).attr("data-filter");
				eventContainer.isotope({filter: filterValue});
			});
		});
	});

	// Enable isotop for Guest Book
	if (jQuery.fn.isotope && jQuery("#guest-book").length > 0) {

		jQuery('.inner-container', "#guest-book").isotope({
			itemSelector: ".guest-book-item"
		});
	}

	var bodyElement = jQuery("body");
	// Enable isotop for Guest Book
	if (jQuery.fn.isotope && bodyElement.hasClass('blog-masonry')) {
		var eventContainer = jQuery('.post-main-container', "#blog-section");
		eventContainer.isotope({
			transitionDuration: "0.7s"
		});
		eventContainer.imagesLoaded(function () {
			itemSelector : ".post-outer-box"
		});
	}

	// Testimonials slider
	jQuery.fn.owlCarousel && jQuery('.owl-carousel', "#testimonials-section").owlCarousel({
		navigation:     !0,
		singleItem:     !0,
		addClassActive: !0,
		pagination:     !1,
		navigationText: ['<span>Prev</span>', '<span>Next</span>'],
		autoPlay:       8000
	});

	jQuery.fn.owlCarousel && jQuery("#services-box").owlCarousel({
		items:             3,
		itemsTablet:       [980, 2],
		itemsMobile:       [480, 1],
		navigation:        !1,
		pagination:        !0,
		paginationNumbers: !0
	});


	//	 Booking Page js

	if (bodyElement.hasClass('booking')) {
		var mainBookingForm    = jQuery('#room-information-form'),
			roomFieldContainer = mainBookingForm.find('.room-field-container');

		mainBookingForm.find('.room-count').on('change', function () {
			var _thisVal = parseInt(jQuery(this).val(), 10);
			roomFieldContainer.empty();
			if (_thisVal) {
				for (var i = 1; i <= _thisVal; i++) {
					var cloneTmpl = jQuery('#room-field-tmpl').clone();
					cloneTmpl.attr('id', '');
					cloneTmpl.html(function (j, cloneTmplOld) {
						return cloneTmplOld.replace('{{id}}', i);
					});
					cloneTmpl.appendTo(roomFieldContainer);
				}
			}

			mainBookingForm.find('select').select2({
				minimumResultsForSearch: 10
			});
		});

		var bookingInlineDatepicker = jQuery('#booking-date-range-inline'),
			checkInDate             = null,
			checkOutDate            = null,
			oneDay                  = 24 * 60 * 60 * 1000;

		bookingInlineDatepicker.datepicker({
			format:    "yyyy-mm-dd",
			autoclose: true,
			startDate: new Date(),
			inputs:    jQuery('#booking-date-range-inline .check-in, #booking-date-range-inline .check-out')
		}).on('changeDate', function (e) {
			var newDate    = new Date(e.date),
				newDateStr = newDate.getFullYear() + '-' + ("0" + (newDate.getMonth() + 1)).slice(-2) + '-' + ("0" + newDate.getDate()).slice(-2);
			if (e.target.className.search('check-in') < 0) {
				checkInDate = newDate.getTime();
				mainBookingForm.find('.check-out').children('input').val(newDateStr);
				mainBookingForm.find('.check-out').find('.value').text(newDateStr);
			}
			else {
				checkOutDate = newDate.getTime();
				mainBookingForm.find('.check-in').children('input').val(newDateStr);
				mainBookingForm.find('.check-in').find('.value').text(newDateStr);
			}
			var diffDays = Math.round(Math.abs((checkInDate - checkOutDate) / (oneDay)));
			mainBookingForm.find('.duration').find('.value').text((diffDays >= 1 ? diffDays + ' Nights' : diffDays + ' Night'));
		});

		jQuery('.price-breakdown').magnificPopup({
			type:         'inline',
			preloader:    false,
			mainClass:    'mfp-fade',
			removalDelay: 600
		});

		jQuery('input[name="payment-method"]').on('change', function () {
			var _this = jQuery(this);
			if (_this.val() == 1) {
				_this.parents('.payment-method').next('.deposit-price').slideUp();
			} else {
				_this.parents('.payment-method').next('.deposit-price').slideDown();
			}
		})
	}

	// Google Map
	function initialize() {
		var myLatLng   = new google.maps.LatLng(40.6700, -73.9400);
		var mapOptions = {
			zoom:               15,
			center:             myLatLng,
			
			// Extra options
			scrollwheel:        false,
			mapTypeControl:     false,
			panControl:         false,
			zoomControlOptions: {
				style:    google.maps.ZoomControlStyle.SMALL,
				position: google.maps.ControlPosition.LEFT_BOTTOM
			}
		};
		var mapBox     = document.getElementById("google-map");
		var map        = new google.maps.Map(mapBox, mapOptions);

		var image = mapBox.getAttribute("data-marker");

		new google.maps.Marker({
			position: myLatLng,
			map:      map,
			icon:     image
		});
	}

	if (typeof google != 'undefined') {
		google.maps.event.addDomListener(window, "load", initialize);
	}

	var restaurantMenus = jQuery('#restaurant-menus');
	if (restaurantMenus.length > 0) {
		var menuTabs   = restaurantMenus.find('.tab-box'),
			tabContent = restaurantMenus.find('.tab-pane');

		menuTabs.on('click', function (e) {
			e.preventDefault();
			var _this          = jQuery(this),
				target         = _this.addClass('active').attr('href').slice(1),
				targetSelector = jQuery('#' + target),
				bgImg          = targetSelector.data('img-name');

			_this.siblings().removeClass('active');
			tabContent.removeClass('active');
			targetSelector.addClass('active');

			tabContent.parent('.tab-content').css('background-image', 'url(' + bgImg + ')');
		})
	}

});
var mainHeader = jQuery("#main-header");
jQuery(window).on('scroll', function () {
	jQuery(document).scrollTop() > 30 && mainHeader.addClass("sticky");
	jQuery(document).scrollTop() < 30 && mainHeader.removeClass("sticky");
});