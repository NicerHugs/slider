function NhSlider(options) {
  this.id = options.id;
  $('#' + this.id).addClass('nh-slider clearfix');
  this.build();
  this.listen();
  this.timer();
};

NhSlider.prototype.build = function() {
  var $ul = $('.nh-slider'),
      ht = $ul.children('li:first-of-type').height();
  $ul.css('height', ht);
  $ul.children('li:first-of-type').addClass('visible');
  $ul.children('li:last-of-type').addClass('prev');
  $ul.children('li:nth-of-type(2)').addClass('next');
  $ul.append('<a href="#" class="prev">prev</a><a href="#" class="next">next</a>');
};

NhSlider.prototype.timer = function() {
  this.timeout = window.setTimeout(_.bind(this.displayNext, this), 5000);
};

NhSlider.prototype.displayNext = function(e) {
  if (e) e.preventDefault();
  var $vis = $('.nh-slider li.next'),
      $next,
      $prev = $('.nh-slider li.visible'),
      $none = $('.nh-slider li.prev');
      if ($vis.next('li').length >= 1) {
        $next = $vis.next();
      } else {
        $next = $('.nh-slider li:first-of-type');
      }
  $vis.removeClass('next').addClass('visible');
  $next.addClass('next');
  $prev.removeClass('visible').addClass('prev');
  $none.removeClass('prev');
  if (!e) this.timer();
};

NhSlider.prototype.displayPrev = function(e) {
  if (e) e.preventDefault();
  var $vis = $('.nh-slider li.prev'),
      $prev,
      $next = $('.nh-slider li.visible'),
      $none = $('.nh-slider li.next');
      if ($vis.prev('li').length >= 1) {
        $prev = $vis.prev();
      } else {
        $prev = $('.nh-slider li:last-of-type');
      }
  $vis.removeClass('prev').addClass('visible');
  $next.removeClass('visible').addClass('next');
  $prev.addClass('prev');
  $none.removeClass('next');
};

NhSlider.prototype.listen = function() {
  var self = this;
  $('.nh-slider a.prev').on('click', function(e) {
    window.clearTimeout(self.timeout);
    self.displayPrev(e);
  });
  $('.nh-slider a.next').on('click', function(e) {
    window.clearTimeout(self.timeout);
    self.displayNext(e);
  });
};
