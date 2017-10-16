/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function Init() {

	var screenSize = screen.width + "x" + screen.height;
	var w = window,
	        d = document,
	        e = d.documentElement,
	        g = d.getElementsByTagName('body')[0],
	        x = w.innerWidth || e.clientWidth || g.clientWidth,
	        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
	    var brwsr = x + ' × ' + y;


	var randomVisitor = Math.floor(Math.random() * 1000) + 1;

	var carsOptions = ["Volkswagon", "Ford", "Nissan", "Tesla", "Volvo", "Chevrolet", "Mercedes", "BMW", "Audi", "Honda"];
	var titleOptions = ["Mr. Manager", "Team Lead", "Admin", "Foreman", "Associate", "Senior", "Junior", "Product Manager", "Customer Succcess", "Janitor"];
	var firstNameOptions = ["Matt", "Adam", "Rick", "Sawyer", "Spencer", "Chantelle", "Avery", "Beth", "Erika", "Erin"];
	var lastNameOptions = ["Kerbawy", "Chasen", "Kedlac", "Jinkins", "Harwood", "Becker", "Welp", "Sullivan", "Greenberg", "Shlotzky"];
	var optionsSelector = Math.floor(Math.random() * 10);
	var optionsSelector2 = Math.floor(Math.random() * 10);
	var optionsSelector3 = Math.floor(Math.random() * 10);
	var optionsSelector4 = Math.floor(Math.random() * 10);

	function permLevelSet(x) {
		if (x % 2 === 0) {
			return "Admin";
		}
		else {
			return "Non-Admin";
		}
	}

	var date = new Date('Sun Nov 12 2019 17:47:47 GMT-0500 (EST)');
	var accountIdPlaceholder = date.getDay();
	var accountString = accountIdPlaceholder.toString() + "&&" + (randomVisitor % 9).toString();
	date = date.toString();

	var pendoVariableInitialization =
	{
		visitor: {
			//id: 'BMC_TEST',
			id: randomVisitor,
			//id: window.prompt("enter visitor ID", "Your ID"),//Math.round(Math.random()*10)  // Required if user is logged in
			screen:screenSize,
			browser:brwsr,
			firstName: firstNameOptions[optionsSelector],
			lastName: lastNameOptions[optionsSelector2],
			title: titleOptions[optionsSelector3],
			carModels: carsOptions[optionsSelector4],
			numberOfCars: 1,
			//randomTestField: "'forcing quotes''/'\''",
			permissionsLevel: permLevelSet(optionsSelector),
			trialEndDate: date
		},
		account: {
			id: accountString,//"Test Account ID",
			//accountName: window.prompt("enter account name", "Account Name"),
			immuteString: "unchanging"

		},
		parentAccount: {
			id: null
		},
		events: {
			ready: function printStuffReady() {
				console.log("pendo is ready!");
			},
			guidesLoaded: function printStuffLoaded()  {
				console.log("Your pendo guides have loaded.");
			},
			guidesFailed: function printStuffFailed() {
				console.log("Your pendo guides have timed out.");
			}
		}
	};
	return pendoVariableInitialization;
}

document.addEventListener('DOMContentLoaded', function () {
  var collection = $('#main > .special > .major:nth-child(1):first');
	collection[0].addEventListener('click', function () {
							pendo.onGuideDismissed();
							pendo.showGuideById('NvNtOtI0jaQpq9d7T2A4BxiZ9pg');
					});
				});

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Nav.
			var $nav = $('#nav');

			if ($nav.length > 0) {

				// Shrink effect.
					$main
						.scrollex({
							mode: 'top',
							enter: function() {
								$nav.addClass('alt');
							},
							leave: function() {
								$nav.removeClass('alt');
							},
						});

				// Links.
					var $nav_a = $nav.find('a');

					$nav_a
						.scrolly({
							speed: 1000,
							offset: function() { return $nav.height(); }
						})
						.on('click', function() {

							var $this = $(this);

							// External link? Bail.
								if ($this.attr('href').charAt(0) != '#')
									return;

							// Deactivate all links.
								$nav_a
									.removeClass('active')
									.removeClass('active-locked');

							// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
								$this
									.addClass('active')
									.addClass('active-locked');

						})
						.each(function() {

							var	$this = $(this),
								id = $this.attr('href'),
								$section = $(id);

							// No section for this link? Bail.
								if ($section.length < 1)
									return;

							// Scrollex.
								$section.scrollex({
									mode: 'middle',
									initialize: function() {

										// Deactivate section.
											if (skel.canUse('transition'))
												$section.addClass('inactive');

									},
									enter: function() {

										// Activate section.
											$section.removeClass('inactive');

										// No locked links? Deactivate all links and activate this section's one.
											if ($nav_a.filter('.active-locked').length == 0) {

												$nav_a.removeClass('active');
												$this.addClass('active');

											}

										// Otherwise, if this section's link is the one that's locked, unlock it.
											else if ($this.hasClass('active-locked'))
												$this.removeClass('active-locked');

									}
								});

						});

			}

		// Scrolly.
			$('.scrolly').scrolly({
				speed: 1000
			});

	});

})(jQuery);
