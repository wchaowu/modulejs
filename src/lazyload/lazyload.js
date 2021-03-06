/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */
!(function (factory) {
    if (typeof define === 'function') {
        define(['$'], factory);
    } else {
        factory($);
    }
})(function ($) {
    'use strict';
    var pluginName = 'lazyload';

    $.fn[pluginName] = function(threshold) {

        var $w = $(window),
            th = threshold || 0,
            retina = window.devicePixelRatio > 1,
            attrib = retina? "data-src-retina" : "data-src",
            images = this,
            loaded,
            inview,
            source;

        this.one(pluginName, function() {
            source = this.getAttribute(attrib);
            source = source || this.getAttribute("data-src");
            if (source) this.setAttribute("src", source);
        });

        function load() {
            inview = images.filter(function() {
                var $e = $(this),
                    wt = $w.scrollTop(),
                    wb = wt + $w.height(),
                    et = $e.offset().top,
                    eb = et + $e.height();

                return eb >= wt - th && et <= wb + th;
            });

            loaded = inview.trigger(pluginName);
            images = images.not(loaded);
        }

        $w.scroll(load);
        $w.resize(load);

        load();

        return this;

    };

})