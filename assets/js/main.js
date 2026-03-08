/*
	Solid State by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); }
			});

		}

	// Menu.
		var $menu = $('#menu');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {

				event.stopPropagation();

				// Hide.
					$menu._hide();

			})
			.find('.inner')
				.on('click', '.close', function(event) {

					event.preventDefault();
					event.stopPropagation();
					event.stopImmediatePropagation();

					// Hide.
						$menu._hide();

				})
				.on('click', function(event) {
					event.stopPropagation();
				})
				.on('click', 'a', function(event) {

					var href = $(this).attr('href');

					event.preventDefault();
					event.stopPropagation();

					// Hide.
						$menu._hide();

					// Redirect.
						window.setTimeout(function() {
							window.location.href = href;
						}, 350);

				});

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

	// Scroll fade-in for sections.
		$('#one').css('opacity', '0').css('transform', 'translateY(30px)');

		$('#wrapper > section:not(#one), #four .features article').each(function() {
			var $this = $(this);
			$this.css('opacity', '0').css('transform', 'translateY(30px)').css('transition', 'opacity 0.6s ease, transform 0.6s ease');

			$this.scrollex({
				top: '20%',
				enter: function() {
					$this.css('opacity', '1').css('transform', 'translateY(0)');
				}
			});
		});

	// Fade in the first section on load.
		window.setTimeout(function() {
			$('#one').css('transition', 'opacity 0.6s ease, transform 0.6s ease')
					 .css('opacity', '1')
					 .css('transform', 'translateY(0)');
		}, 300);
		
// Active menu highlighting
    var currentPage = window.location.pathname.split('/').pop() || '/';
    $('#menu .links a').each(function() {
        var href = $(this).attr('href');
        if (href === '/' && (currentPage === '' || currentPage === '/') ) {
			$(this).css('color', '#9bf1ff');
			$(this).css('font-weight', 'bold');
        } else if (href !== '/' && currentPage === href.split('/').pop()) {
			$(this).css('color', '#9bf1ff');
			$(this).css('font-weight', 'bold');
        }
    });

})(jQuery);