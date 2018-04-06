// jquery.stepper.js
// https://github.com/ncou/jquery.stepper.basic
// ------------------------------------------------------
// Author: NCOU
//
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {

  "use strict";

  var pluginName = "stepper",
    defaults = {
      selectorProgressBar: '.stepper-progress',
      selectorInputNumber: '.stepper-number',
      classNameChanging: 'is-changing',
      decimals: 0,
      unit: '%',
      initialValue: '',
      min: 0,
      max: 100,
      stepSize: 1
    };

  // The actual plugin constructor
  function Plugin(element, options) {
    this.element = element;

    this.settings = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {

    init: function() {

      // local variable
      this.curDown = false;
      this.mouseDownX = 0;
      this.mouseDownValue = 0;

      // Cache elements
      this.$el = $(this.element);
      this.$input = this.$el.find(this.settings.selectorInputNumber);
      this.$progress = this.$el.find(this.settings.selectorProgressBar);

      // init values
      this.min = this.$input.attr('min') || this.settings.min;
      this.max = this.$input.attr('max') || this.settings.max;

      this.initialValue = this.$input.val() || (this.settings.initialValue !== "" ? this.settings.initialValue : this.max);

      this.setValue(this.initialValue);

      // Bind events
      this.$input.on('keydown', this.onKeyPress.bind(this));
      this.$input.on('blur', this.onBlur.bind(this));
      this.$input.on('paste input', this.onChange.bind(this));
      this.$el.on('mousedown touchstart', this.onMouseDown.bind(this));
      $(document).on('mouseup touchend', this.onMouseUp.bind(this));
      $(document).on('mousemove touchmove', this.onMouseMove.bind(this));
    },

    onMouseDown: function(e) {
      this.mouseDownX = e.clientX || e.originalEvent.touches[0].clientX;
      this.mouseDownValue = this.getValue();

      this._changeStart();
    },

    onMouseUp: function(e) {
      this._changeEnd();
    },

    onMouseMove: function(e) {
      if (this.curDown === true) {
        var t = (e.clientX || e.originalEvent.touches[0].clientX) - this.mouseDownX;
        this.setValue(this.mouseDownValue + t * this.settings.stepSize);
      }
    },

    onChange: function(e) {
      this._updateProgress(this.getValue());
    },

    onBlur: function(e) {
      this._changeEnd();
      this.setValue(this.getValue());
    },

    onKeyPress: function(e) {
      // key press == 'Enter' we exit the input field
      if (e.keyCode === 13) {
        this.$input.blur();
      }
    },

    getValue: function() {
      return parseFloat(this.$input.val()) || 0;
    },

    setValue: function(amount) {
      var value;

      value = Math.max(Math.min(amount, this.max), this.min);
      value = this._roundValue(value);

      var n = value;
      n = n.toFixed(this.settings.decimals);

      n += this.settings.unit;
      this.$input.val(n);

      this._updateProgress(value);
    },

    _updateProgress: function(v) {
      var r = this._valueToPercent(v) / 100;
      this.$progress.css("transform", "scaleX(" + r + ")");

      this.$input.trigger("change");
    },

    _percentToValue: function(v) {
      return this.min + v / 100 * (this.max - this.min);
    },

    _valueToPercent: function(v) {
      var t = (v - this.min) / (this.max - this.min) * 100;
      return Math.max(Math.min(t, 100), 0);
    },

    _roundValue: function(v) {
      var nbrDecimals = 2;

      var t = Math.pow(10, nbrDecimals);
      return Math.round(v * t) / t
    },

    _changeStart: function() {
      this.curDown = true;
      this.$el.addClass(this.settings.classNameChanging);
    },

    _changeEnd: function() {
      this.curDown = false;
      this.$el.removeClass(this.settings.classNameChanging);
    },

  });

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin-" + pluginName)) {
        $.data(this, "plugin-" + pluginName,
          new Plugin(this, options));
      }
    });
  };

})(jQuery, window, document);
