export function gtmSet() {
  // click event
  $('.js-gtm-event').on('click touch', function (e) {
    const $self = $(this);
    const dataClick = {
      eventAction: 'click',
      eventLabel: $self.data('event') || null,
      eventLocation: $self.data('section') || null,
      eventContext: $self.data('context') || null,
      eventCategory: $self.data('event-category') || 'Interactions',
    };
    gaPush(dataClick);
    // e.preventDefault(); ////for testing clicks/////
  });

  /// scroll event
  let pageScrolling = false;
  document.addEventListener('scroll', (e) => {
    const currentPos = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());
    if (!pageScrolling) {
      window.requestAnimationFrame(() => { scrollEvt(currentPos); pageScrolling = false; });
      pageScrolling = true;
    }
  });

  const scrollGtm = {
    10: '', 30: '', 50: '', 70: '', 90: '',
  };
  function scrollEvt(scrollPos) {
    const points = Object.entries(scrollGtm);
    points.forEach(([p, val]) => {
      if (~~scrollPos >= p) {
        delete scrollGtm[p]; scrollEventPush(p);
      }
    });
  }
  function scrollEventPush(p) {
    const scrollEventData = {
      eventAction: 'scroll',
      eventLabel: 'scrollPage-' + `${p}%`,
      eventCategory: 'Interactions',
    };
    gaPush(scrollEventData); // console.log(scrollEventData)
  }
}

export function gaPush(d) {
  const fullEventData = {
    hitsTime: Date.now(),
    requestId: generateId(7),
    firingOptions: 'onesPerEvent',
    event: 'event',
    eventStream: 'flight',
    eventAction: d.eventAction,
    eventLabel: d.eventLabel,
    eventCategory: d.eventCategory,
    eventLocation: d.eventLocation || null, // data-section
    eventContext: d.eventContext || null,
    eventContent: d.eventContent || null,
    eventValue: d.eventValue || null,
    ecommerce: null,
    ecommerceAction: false,
    noninteraction: false,
  };
  /// Unique ID
  function generateId(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr); return Array.from(arr, dec2hex).join('');
  }
  function dec2hex(dec) { return (`0${dec.toString(16)}`).substr(-2); }

  if (dataLayer) {
    dataLayer.push(fullEventData);
  }
}
