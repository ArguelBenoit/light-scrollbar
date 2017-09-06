import $ from 'jquery';


const customScrollBar = (selector, width, color, offset) => {

  // $('window').mousewheel(() => event.stopPropagation());
  const parent = $(selector);
  const child = $(selector).children();
  const scrollbarName = `scrollbar-${selector.substring(1, selector.length)}`;
  const scrollbarId = '#' + scrollbarName;
  let level = 0;

  parent.css({ 'overflow': 'hidden' });
  child.css({ 'transition-duration': '300ms'});

  parent.append(`<div class="customScrollBar" id="${scrollbarName}"></div>`);

  const init = () => {

    if (child.height() > parent.height()) {
      $(scrollbarId).css({
        position: 'absolute',
        transitionDuration: '0ms',
        left: ( offset ? $(selector).offset().left : 0 ) + parent.width() - width,
        height: parent.height() * (parent.height() / child.height()),
        background: color,
        width,
        top: 0,
        display: 'inherit'
      });
      parent.bind('mousewheel', evt => {
        level += (evt.originalEvent.wheelDelta)/2;
        if (level > 0) {
          level = 0;
        } else if (level < parent.height()-child.height()) {
          level = parent.height()-child.height();
        }
        child.css('margin-top', level);
        $(scrollbarId).css('top', - level);
      });

    } else {
      parent.unbind('mousewheel');
      $(scrollbarId).css({ display: 'none' });
      child.css({ marginTop: 0 });
      level = 0;
      child.css('margin-top', level);
    }
  };

  init();
  $(window).resize(() => init());

};

export default customScrollBar;
