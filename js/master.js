jQuery(document).ready(function ($) {
  var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) {
    $(document.body).addClass('ios');
  };
  //input date
  if ($('.input-date').length) {
    var pkcont = 'body';
    if ($('.picker-container').length) {
      pkcont = '.picker-container';
    }
    $('.input-date').datepicker({
      todayHighlight: true,
      startDate: "0d",
      container: pkcont
    });
  }

  // Applied auto resize textareas with 
  // $(".textarea-js-title").on("keyup change", function (e) {
  //   e.stopPropagation();
  //   var h = $(this).prop('scrollHeight');
  //   console.log(e.step());
  //   if (h > 30) {
  //     this.style.height = 'auto';
  //     this.style.height = (this.scrollHeight) + 'px';
  //   }
  // });

  //archive button
  $(document).on('click', '.archive-button', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parents('.phenom').toggleClass('archive-visible')
  })
    
  //edit comment
  $(document).on('click', '.phenom .js-edit-action', function (e) {
    e.stopPropagation();
    e.preventDefault();
    var saveBtn = '<div class="edit-controls clear">' +
                    '<div class="js-too-long-warning">' +
                      '<p>Your comment is too long.</p>' +
                    '</div>' +
                    '<div class="js-is-empty-warning">' +
                      '<p>You havenot typed anything!</p>' +
                    '</div>' +
                    '<button class="mn-btn btn-green">Lưu</button>' +
                    '<a class="js-discard-comment-edits lg-icon dark-hover" href="#"><i class="fas fa-times"></i></a>' +
                  '</div>';
    $(this).parents('.phenom').addClass('is-editing').append(saveBtn);
  })

  $(document).on('click', '.js-discard-comment-edits', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parents('.phenom').removeClass('is-editing');
    $(this).parents('.edit-controls').remove();
  })

  //checkable
  $(document).on('click', '.checkable li a', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parents('li').addClass('active').siblings().removeClass('active');
  })

  $(document).on('click', '.multi-checkable li a', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parents('li').toggleClass('active');
  })


  //
  $('.sorttable-wrap').on('click', '.card__dt-label .label-bar', function (e) {
    e.stopPropagation();
    $('.body-container').toggleClass('body-card-label-text');
  });

  $('.js-open-add-list').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.mod-add').removeClass('is-idle')
  })

  $('.mod-add .js-cancel-edit').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.mod-add').addClass('is-idle');
  })

  $('.js-open-composer').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.s-table-composer').addClass('show-composer')
  })

  $('.s-table-composer .js-cancel-edit').on('click', function (e) {
    e.preventDefault();
    $(this).parents('.s-table-composer').removeClass('show-composer');
  })

  /* js-open-drawerboard */

  $('.js-open-drawerboard').on('click', function (e) {
    e.stopPropagation();
    e.preventDefault();
    $('.board-drawer').addClass('show');
  })

  $(document).on('click', function (e) {
    e.stopPropagation();
    if (
      $('.board-drawer').is(":visible")
      && ((!$('.board-drawer').is(e.target) && $('.board-drawer').has(e.target).length === 0))
    ) {
      $('.board-drawer').removeClass('show');
    }
  })

  $('.js-keep-drawerboard').on('click', function (e) {
    e.stopPropagation();
    $('.body-container').addClass('body-pinned-drawer');
    
  })

  $('.js-remove-drawerboard').on('click', function (e) {
    e.stopPropagation();
    $('.body-container').removeClass('body-pinned-drawer');

  })

  //BOARD MENU
  $(document).on('click', '.js-open-boardmenu', function (e) {
    e.stopPropagation();
    $('.board-wrapper').addClass('is-show-menu');
  })
  
  $(document).on('click', '.js-close-boardmenu', function (e) {
    e.stopPropagation();
    $('.board-wrapper').removeClass('is-show-menu');
  })
  
  $(document).on('click', '.js-open-more-menu', function (e) {
    e.stopPropagation();
    //back to
    var backPos = $(this).parents('.board-menu-content').attr('back-pos');
    $('.board-menu-header').find('.bm-hd-back-btn').attr('backto', backPos);

    var sourceMenu = $(this).attr('src-menu');
    var eleMenu = $('#' + sourceMenu);
    var html_eleMenu = eleMenu.html();
    $('.board-menu-header').removeClass('board-menu-default-view');
    $('.board-menu-content').attr('back-pos', sourceMenu).html(html_eleMenu);
  })
  
  $(document).on('click', '.bm-hd-back-btn', function (e) {
    e.stopPropagation();
    var sourceMenu = $(this).attr('backTo');
    var eleMenu = $('#' + sourceMenu);
    var html_eleMenu = eleMenu.html();
    if (sourceMenu === "main-menu") {
      $('.board-menu-header').addClass('board-menu-default-view');
    }
    $('.board-menu-content').attr('back-pos', sourceMenu).html(html_eleMenu);
  })

  // WINDOW DIALOG
  
  $(document).on('click', '.js-open-window', function (e) {
    e.stopPropagation();
    $('.popover').removeAttr('style').attr('class', 'popover').html('');
    var srcWindow = $(this).attr('src-window');
    if (srcWindow == "mod-notifications-overlay") {
      $('.popover').removeAttr('style').attr('class', 'popover').html('');
    }
    var eleWindow = $('#' + srcWindow);
    var html_eleWin = eleWindow.html();
    $('.window-overlay').addClass(srcWindow).html(html_eleWin);
    $('body').addClass('window-up');

  })

  //POPVER
  function positionPop(eleStatic, eleFixed) {
    var offset = eleStatic.offset();
    //var ele_width = eleFixed.outerWidth();
    var ele_height = eleFixed.outerHeight();
    //var offsetTop_space = offset.top + eleFixed.outerHeight();
    var offsetLeft_space = offset.left + eleFixed.outerWidth();
    
    //var left_pos = Math.min(offset.left, $(window).innerWidth() - $('#header .status-wrap').outerWidth());
    var property;
    var windowHeight = $(window).innerHeight();

    top_pos = offset.top + eleStatic.outerHeight() + 5;

    if (windowHeight - top_pos - ele_height < 0) {
      top_pos = windowHeight - ele_height;
    }

    if ($(window).innerWidth() - offsetLeft_space > 0) {
      return property = {
        'left': offset.left + 'px',
        'top': top_pos + 'px',
      }
    } else {
      return property = {
        'left': 'unset',
        'right': '0px',
        'top': top_pos + 'px',
      }
    }
  }
  
  $(document).on('click', '.js-open-popover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    if ($('.mod-notifications-overlay').is(':visible')) {
      $('body').removeClass('window-up');
      $('body .window-overlay').attr('class', 'window-overlay').html('');
      $('.popover').removeAttr('style').attr('class', 'popover').html('');
    }
    var sourcePop = $(this).attr('src-popover');
    var elePop = $('#' + sourcePop);
    var html_elePop = elePop.html();
    $('.popover').attr('class', 'popover');
    $('.popover').addClass('show' + ' ' + sourcePop).html(html_elePop);
    var positPop = positionPop($(this), $('.popover'));
    $('.popover').css(positPop);
    
    // var maxHeight = $(window).innerHeight() - $(this).offset().top - $(this).outerHeight() - 50;
    // $('.popover').attr('currPos', sourcePop).find('.popover-content').css({'max-height' : maxHeight + 'px'});

  })

  $(document).on('click', '.js-open-subpopover', function (e) {
    e.stopPropagation();
    e.preventDefault();
    //popover back
    var backPos = $(this).parents('.popover').attr('currPos');
    //
    var sourcePop = $(this).attr('src-popover');
    var elePop = $('#' + sourcePop);
    var html_elePop = elePop.html();
    $('.popover').attr('class', 'popover show');
    $('.popover').addClass(sourcePop).attr('currPos', sourcePop);
    $('.popover').html(html_elePop);
    $('.popover').find('.popover-hd-back').attr('backto', backPos);
  })

  $(document).on('click', '.popover-hd-back', function (e) {
    e.stopPropagation();
    var sourcePop = $(this).attr('backTo');
    var elePop = $('#' + sourcePop);
    var html_elePop = elePop.html();

    $('.popover').attr('class', 'popover show ' + sourcePop).html(html_elePop);
  })



  /* CLOSE DIALOG */
  $(document).on('click', function (e) {
    if ($('.window-overlay').is(":visible")) {
      if ($('.window-overlay').is(e.target) ||
        $('.js-close-window').is(e.target) ||
        $('.js-close-window').has(e.target).length > 0
      ) {
        $('body').removeClass('window-up');
        $('body .window-overlay').attr('class', 'window-overlay').html('');
        $('.popover').removeAttr('style').attr('class', 'popover').html('');
      }
    } 
    if ($('.popover').is(":visible")) {
      if ((!$('.popover').is(e.target) && $('.popover').has(e.target).length === 0) ||
        $('.popover-hd-closebtn').is(e.target) ||
        $('.popover-hd-closebtn').has(e.target).length > 0
    ) {
        $('.popover').removeAttr('style').attr('class', 'popover').html('');
      }
    }
  })

});