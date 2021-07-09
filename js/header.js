(function(){
	var $btnSearch=$('#btn-search'),
		$clientSearch=$('#client-search'),
		$headerMenu=$('.header-menu-mobile'),
		$btnToggleLabel=$('.btn-toggle-label'),
		$menuLink=$('.header-menu-mobile a'),
		$nestedMenus=$('.nested-menu'),
		statesObj={btnSearchOpen:false,linesSum:1,phoneNumberPosition:0,iframeMustBeHidden:false,validEmail:false},
		xsWidth = 850
	;

	$btnSearch.on('click',function(){
		statesObj.btnSearchOpen = !statesObj.btnSearchOpen;
		if(statesObj.btnSearchOpen){
			$clientSearch.css('width','230px');
			$(this).attr('type','submit');
		}else{
			$clientSearch.css('width','0');
			$($clientSearch).val()? "" : $(this).attr('type','button');
		}
	});

	$btnToggleLabel.on('click',function(){
		if ($headerMenu.css('max-height') === '0px') {
			$headerMenu.css('max-height','1500px');
		} else {
			$headerMenu.css('max-height','0');
			nestedXsMenuItemsInit($nestedMenus, true);
		}
	});

	// ************************************** Products Menu **************************************
	// ************************************** Products Menu **************************************
	$nestedMenus.on('click', function(e){
		var currMenu = $(e.target);
		currMenu.toggleClass('active');

		if ($(window).width() < xsWidth) {
			nestedXsMenuItemsInit(currMenu);
			return
		}

		var childMenu = $('#' + currMenu.attr('data-child-menu'));
		var isVisible = childMenu.css('opacity') === '1';
		var headerWrp = $('.header-wrp');
		// var top = headerWrp.height() + parseInt(headerWrp.css('top') || 0);

		// childMenu.css({'display': 'flex', top: top});
		childMenu.css({'display': 'flex'});

		if (isVisible) {
			currMenu.removeClass('current-step-link');
			childMenu.css('opacity', '0');
			nestedMenuItemsInit(childMenu, false);
		} else {
			currMenu.addClass('current-step-link');
			$menuLink.removeClass('current-step-link');

			setTimeout(function() {
				childMenu.css('opacity', '1');
				nestedMenuItemsInit(childMenu, true);
			}, 10);
		}
	});

	function nestedXsMenuItemsInit(parentMenu, closeAll) {
		var menuContainer = $('[data-menu='+ parentMenu.attr('data-child-menu') +']', parentMenu.parent());
		var allSubMenu = $('.prod-sub-menu', menuContainer);
		var menuItem = $('.item > span', menuContainer);
		var isVisible = parentMenu.hasClass('active');

		if (closeAll) {
			menuItem.off();
			menuItem.parent().removeClass('active');
			$nestedMenus.removeClass('active');
			allSubMenu.slideUp('slow');
			menuContainer.slideUp('slow');
			return
		}

		if (isVisible) {
			menuItem.on('click', function (e) {
				e.stopPropagation();
				var currMenu = $(e.target).parent();

				allSubMenu.slideUp('slow');
				if (!currMenu.hasClass('active')) {
					$('.prod-sub-menu', currMenu).slideDown('slow');
					menuItem.parent().removeClass('active');
				}
				currMenu.toggleClass('active');
			});
		} else {
			menuItem.removeClass('active').parent().removeClass('active');
			menuItem.off();
			allSubMenu.slideUp('slow');
		}

		menuContainer.slideToggle('slow');
	}

	function nestedMenuItemsInit(parentMenu, parentVisible) {
		var allSubMenus = $('.menu-content', parentMenu);
		var leftMenu = $('.left-menu > .item', parentMenu);
		var menuContainerChild = $('.nested-menu-container > *');

		if (parentVisible) {
			menuContainerChild.on('click', function (e) {
				e.stopPropagation()
			});
			$(document).one('click', onNestedMenuClose);

			leftMenu.on('click', function(e) {
				var currMenu = $(e.target);
				var childMenu = $('#' + currMenu.attr('data-rel-id'));

				leftMenu.removeClass('active');
				currMenu.addClass('active');
				allSubMenus.css('opacity', '0');
				childMenu.css({display: 'flex'});

				setTimeout(function () {
					childMenu.css({opacity: '1'});
				}, 10);
				setTimeout(function () {
					allSubMenus.css('display', 'none');
					childMenu.css('display', 'flex');
				}, 400);
			})
		} else {
			onNestedMenuClose();
		}
	}

	function onNestedMenuClose() {
		var menuContainer = $('.nested-menu-container');
		var leftMenu = $('.left-menu > .item', menuContainer);
		var menuContainerChild = $('*', menuContainer);

		leftMenu.off();
		menuContainerChild.off();
		menuContainer.css({'opacity': '0', display: 'none'});
		$nestedMenus.removeClass('active').removeClass('current-step-link');
		$(document).off('click', onNestedMenuClose);
	}

	// ************************************** /Products Menu **************************************

	var touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);
	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if (touchDevice || isMobile) {
		var closeCart = function () {
			$('#shopping-cart-link').removeClass('opened');
		};

		$('#shopping-cart-link').on('touchstart click', function (e) {
			$(this).addClass('opened');
			$(document).one('touchstart click', closeCart);

			e.preventDefault();
			e.stopPropagation();
		});
	}

})();
