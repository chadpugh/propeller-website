{% import '/PRO-HubUI-2022/css/tools/_config.css' as config %}

{# ******************** DEVELOPER NOTES ******************** #}
{#

  Write your custom notes here ...

#}

{# **************************************************************************** #}
{# **************************************************************************** #}
{# ******************** DO NOT EDIT VALUES BELOW THIS LINE ******************** #}
{# **************************************************************************** #}
{# ********************* ADD YOUR CUSTOM JAVASCRIPT TO THE ******************** #}
{# ****************** BOTTOM OF THIS DOCUMENT WHERE SPECIFIED ***************** #}
{# **************************************************************************** #}
{# **************************************************************************** #}

/*!
Production™ Framework © 2020 IMPACT Branding & Design LLC. ALL RIGHTS RESERVED.
IMPACT Branding & Design LLC grants you a nonexclusive, nontransferable, limited right to access and use this
installation of Production™ Framework. By using this installation of Production™ Framework, you agree not
to modify, reverse engineer, disassemble, or decompile the Production™ Framework or any portion thereof.
Any unauthorized copying, reproduction, republishing, uploading, posting, distribution, transmission, display
or other use of this material without the express written permission of IMPACT Branding & Design is prohibited.
*/

{# ******************** VERSION ******************** #}

{# Production™ Framework v5.0 #}

{#
  MODIFIED = FALSE

  If the variable MODIFIED above is FALSE it means the framework core has not been modified and is able to be updated without issue.
  Update the value of MODIFIED to TRUE once the framework core has been modified to ensure your changes are not overwritten.
  Please leave a comment about what modifications were made in the DEVELOPER NOTES area above to keep track of all changes.
  When updating the framework core always check the variable MODIFIED and DEVELOPER NOTES to confirm the core can be updated without issue.

  Please note that there is a separate MODIFIED variable and DEVELOPER NOTES for each of the files in /assets/.
#}

{# ******************** BASE ******************** #}

if (window.console) {console.log("Production™ Framework v5.0 loaded.\n© "+(new Date()).getFullYear()+". All rights reserved IMPACT Branding & Design LLC.\nhttp://www.impactbnd.com");}

var mediaList = {
  {% for key,value in config.media_List.items() %}
  "{{ key }}": [{% if value[0] %}{{ value[0] }}{% else %}null{% endif %},{% if value[1] %}{{ value[1] }}{% else %}null{% endif %}]{% if not loop.last %},{% endif %}
  {% endfor %}
}

function editor() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
  $(document).ready(function () {
    $('html').addClass('device--touch');
  });
}
function touch() {
  if (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)) {
    return true
  }
  else {
    return false
  }
}
function viewport(mediaName) {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  if (mediaName) {
    if (mediaList[mediaName]) {
      if (((e[a+'Width'] <= mediaList[mediaName][0])||(mediaList[mediaName][0] == null))&&((e[a+'Width'] >= mediaList[mediaName][1])||(mediaList[mediaName][1] == null))) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == ">")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] >= mediaList[mediaName.slice(1)][1])||(mediaList[mediaName.slice(1)][1] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == "<")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] <= mediaList[mediaName.slice(1)][0])||(mediaList[mediaName.slice(1)][0] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (mediaName == "touch") {
      return touch();
    }
    else {
      throw "Media size "+mediaName+" not found in media list."
    }
  }
  else {
    return { width : e[a+'Width'] , height : e[a+'Height'] };
  }
}
function productionViewport(mediaName) {
  var e = window, a = 'inner';
  if (!('innerWidth' in window )) {
    a = 'client';
    e = document.documentElement || document.body;
  }
  if (mediaName) {
    if (mediaList[mediaName]) {
      if (((e[a+'Width'] <= mediaList[mediaName][0])||(mediaList[mediaName][0] == null))&&((e[a+'Width'] >= mediaList[mediaName][1])||(mediaList[mediaName][1] == null))) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == ">")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] >= mediaList[mediaName.slice(1)][1])||(mediaList[mediaName.slice(1)][1] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if ((mediaName.slice(0,1) == "<")&&(mediaList[mediaName.slice(1)])) {
      if ((e[a+'Width'] <= mediaList[mediaName.slice(1)][0])||(mediaList[mediaName.slice(1)][0] == null)) {
        return true;
      }
      else {
        return false;
      }
    }
    else if (mediaName == "touch") {
      return touch();
    }
    else {
      throw "Media size "+mediaName+" not found in media list."
    }
  }
  else {
    return { width : e[a+'Width'] , height : e[a+'Height'] };
  }
}
$(window).on('load',function () {
  /* Adds class to body if user is logged into HubSpot */
  if ($('.hs-tools-menu').length > 0) {
    $('body').addClass('hs--user');
  }
  /* .hs--unwrap CSS class */
  if (!editor()) {
    $('.hs--unwrap').each(function() {
      $(this).find(".hs_cos_wrapper.hs_cos_wrapper_widget_container.hs_cos_wrapper_type_widget_container > .hs_cos_wrapper > *").unwrap();
    });
  }
});

/* Date Format */

var dateFormat = function () {
  var    token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
      timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
      timezoneClip = /[^-+\dA-Z]/g,
      pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = "0" + val;
        return val;
      };

  // Regexes and supporting functions are cached through closure
  return function (date, mask, utc) {
    var dF = dateFormat;

    // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
    if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
      mask = date;
      date = undefined;
    }

    // Passing date through Date applies Date.parse, if necessary
    date = date ? new Date(date) : new Date;
    if (isNaN(date)) {
      return "";
    }

    mask = String(dF.masks[mask] || mask || dF.masks["default"]);

    // Allow setting the utc argument via the mask
    if (mask.slice(0, 4) == "UTC:") {
      mask = mask.slice(4);
      utc = true;
    }

    var    _ = utc ? "getUTC" : "get",
        d = date[_ + "Date"](),
        D = date[_ + "Day"](),
        m = date[_ + "Month"](),
        y = date[_ + "FullYear"](),
        H = date[_ + "Hours"](),
        M = date[_ + "Minutes"](),
        s = date[_ + "Seconds"](),
        L = date[_ + "Milliseconds"](),
        o = utc ? 0 : date.getTimezoneOffset(),
        flags = {
          d:    d,
          dd:   pad(d),
          ddd:  dF.i18n.dayNames[D],
          dddd: dF.i18n.dayNames[D + 7],
          m:    m + 1,
          mm:   pad(m + 1),
          mmm:  dF.i18n.monthNames[m],
          mmmm: dF.i18n.monthNames[m + 12],
          yy:   String(y).slice(2),
          yyyy: y,
          h:    H % 12 || 12,
          hh:   pad(H % 12 || 12),
          H:    H,
          HH:   pad(H),
          M:    M,
          MM:   pad(M),
          s:    s,
          ss:   pad(s),
          l:    pad(L, 3),
          L:    pad(L > 99 ? Math.round(L / 10) : L),
          t:    H < 12 ? "a"  : "p",
          tt:   H < 12 ? "am" : "pm",
          T:    H < 12 ? "A"  : "P",
          TT:   H < 12 ? "AM" : "PM",
          Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
          o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
          S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
        };

    return mask.replace(token, function ($0) {
      return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
    });
  };
}();

dateFormat.masks = {
  "default":      "ddd mmm dd yyyy HH:MM:ss",
  shortDate:      "m/d/yy",
  mediumDate:     "mmm d, yyyy",
  longDate:       "mmmm d, yyyy",
  fullDate:       "dddd, mmmm d, yyyy",
  shortTime:      "h:MM TT",
  mediumTime:     "h:MM:ss TT",
  longTime:       "h:MM:ss TT Z",
  isoDate:        "yyyy-mm-dd",
  isoTime:        "HH:MM:ss",
  isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
  isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

dateFormat.i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
  ]
};

Date.prototype.format = function (mask, utc) {
  return dateFormat(this, mask, utc);
};

function addCommasToNumber(strNumInput) {
  var n= strNumInput.toString().split(".");
  n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return n.join(".");
}

{# ******************** COOKIE ******************** #}
{% if config.assets_List["cookie"] == true %}
/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
  }

  function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
  }

  function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
  }

  function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
      // Replace server-side written pluses with spaces.
      // If we can't decode the cookie, ignore it, it's unusable.
      // If we can't parse the cookie, ignore it, it's unusable.
      s = decodeURIComponent(s.replace(pluses, ' '));
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
  }

  var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setTime(+t + days * 864e+5);
      }

      return (document.cookie = [
        encode(key), '=', stringifyCookieValue(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        // If second argument (value) is a function it's a converter...
        result = read(cookie, value);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = read(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
      return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
  };
}));
{% endif %}

{# ******************** NOINDEX ROBOTS NOTIFIER ******************** #}

$(window).on('load',function () {
  if ($('head').find('meta').filter(function() {return ($(this).attr('name')||"").toLowerCase() == 'robots'}).length > 0) {
    if (($('head').find('meta').filter(function() {return ($(this).attr('name')||"").toLowerCase() == 'robots'}).attr('content').toLowerCase().indexOf("noindex") > -1)&&(($('body').hasClass('hs--user'))||(editor()))) {
      console.log("Robots Blocked");
      $('body').append("<div id='metaRobotsNotifier' style='display:inline-block!important;position:fixed!important;bottom:10px;left:10px;padding:10px 20px;color:#ffffff;background:#232323;z-index:2147483647;font-family:sans-serif!important;font-size:14px;box-shadow: 3px 3px 8px rgba(0,0,0,.5);cursor:pointer;' onclick='$(this).remove()' title='"+$('head').find('meta').filter(function() {return ($(this).attr('name')||"").toLowerCase() == 'robots'}).attr('content').toLowerCase()+"'><i class='fab fa-android' style='color:#28ff28'></i> Robots are blocked</div>");
    }
  }
});

{# ******************** EQUALIZE ******************** #}

{% if config.assets_List["equalize"] == true %}
function equalize() {
  $('body').find('.equalize--center, .equalize--bottom').css({'margin-top':'','overflow':''});
  var eqar = [];
  for (eqc=0;eqc<$('.grid').length;eqc++) {
    if ($('.grid:eq('+eqc+')').length > 0) {
      eqar.push(eqc);
    }
  };
  for (eqeach=0;eqeach<eqar.length;eqeach++) {
    var eqheights = [0,0,0,0,0];
    var eqparent = $('.grid:eq('+eqar[eqeach]+')');
    var eqmedia = null;
    var eqkey = null;
    $.each(mediaList,function(key,value) {
      if (key == "default") {
        eqkey = "";
      }
      else {
        eqkey = key+"-";
      }
      for (i=0;i<5;i++) {
        if (i==0) {
          eqmedia = "."+eqkey+"equalize";
        }
        else {
          eqmedia = "."+eqkey+"equalize--"+i;
        }
        eqparent.find(eqmedia).css({'min-height':'','overflow':'','display':'','width':''});
        if (productionViewport(key)) {
          var eqheight = Math.max.apply(null, eqparent.find(eqmedia).map(function () {
            return $(this).outerHeight();
          }).get());
          if (eqheight > eqheights[i]) {
            eqheights[i] = eqheight;
          }
        }
      }
    });
    $.each(mediaList,function(key,value) {
      if (productionViewport(key)) {
        if (key == "default") {
          key = "";
        }
        else {
          key += "-";
        }
        for (i=0;i<5;i++) {
          if (i==0) {
            eqmedia = "."+key+"equalize";
          }
          else {
            eqmedia = "."+key+"equalize--"+i;
          }
          eqparent.find(eqmedia).css({'min-height':eqheights[i]+'px','overflow':'hidden','display':'inline-block','width':'100%'});
          eqparent.find(eqmedia).find('.equalize--center').each(function () {
            $(this).css({'margin-top':($(this).closest(eqmedia).outerHeight() - $(this).outerHeight())/2,'overflow':'hidden'});
          });
          eqparent.find(eqmedia).find('.equalize--bottom').each(function () {
            $(this).css({'margin-top':($(this).closest(eqmedia).outerHeight() - $(this).outerHeight()),'overflow':'hidden'});
          });
        }
      }
    });
  }
};

var eqselectors = [];
$.each(mediaList,function(key,value) {
  if (key == "default") {
    eqkey = "";
  }
  else {
    eqkey = key+"-";
  }
  for (i=0;i<4;i++) {
    if (i==0) {
      eqmedia = "."+eqkey+"equalize";
    }
    else {
      eqmedia = "."+eqkey+"equalize--"+i;
    }
    eqselectors.push(eqmedia);
  }
});
eqselectors = eqselectors.join();

//equalize();
$(document).ready(function() {
  equalize();
  $(window).resize(function () {
    equalize();
    setTimeout(function () {
      equalize()
    },100);
  });
});
$(window).on('load',function () {
  equalize();
  $('body').find('.equalize--center').css('opacity','1');
});
{% endif %}

{# ******************** FADES ******************** #}

function productionFade() {
  $('.fade--in, .fade--up, .fade--down, .fade--left, .fade--right').each(function () {
    thisEl = $(this);
    if ($(this).closest(".fade--parent").length > 0) {
      thisEl = $(this).closest(".fade--parent");
    }
    if (thisEl.offset().top + ($(window).height() * {{ config.fade_TriggerPercent|replace("%","")|float/100 }}) <= $(document).scrollTop() + $(window).height()) {
      $(this).addClass('production--fade');
    }
  });
}

// Fallback for slow loads
setTimeout(function () {
  productionFade();
},3000);

$(window).on('load',function () {
  productionFade();
  $(window).scroll(function () {
    productionFade();
  });
  $(window).resize(function () {
    productionFade();
  });
  $('.fade--load').each(function () {
    $(this).addClass('production--fade');
  });

});

{# ******************** EASETO ******************** #}

function easeTo(whereTo,offset,scrollTime) {
  $('html, body').animate({
    scrollTop: $(whereTo).offset().top + (typeof(offset) == "undefined"?0:offset) - ($('body').find('header').css('position') == 'fixed'?$('body').find('header').outerHeight():0) - ($('body').hasClass('header--static')?0:$('body').find('header').height())
  }, (scrollTime||1000));
};

function scrollToAnchor() {
  if (window.location.hash !== '') {
    var elements = $('#' + window.location.hash.substr(1) + '-anchor');
    if (elements.length) {
      $('html, body').animate({
        scrollTop: $(elements[0]).offset().top - 150
      }, 200);
    }
  }
}

// $(window).on('load',function () {
//   setTimeout(function () {
//     // scrollToAnchor();
//     $(window).bind('hashchange', scrollToAnchor);
//   }, 10);
// });

{# ******************** ASPECTRATIO ******************** #}

{% if config.assets_List["aspectratio"] == true %}
function productionAspect() {
  $('body').find('.aspectratio, .all--aspectratio, .all--aspectratio *').each(function () {
    if ($(this).attr('height')&&($(this).attr('width'))) {
      if (parseFloat($(this).attr('height')/$(this).attr('width')) > 0) {
        $(this).css('height',(Math.ceil($(this).width() * parseFloat($(this).attr('height')/$(this).attr('width')))+'px'));
      }
    }
  });
}
$(document).ready(function () {
  productionAspect();
  $(window).resize(function () {
    productionAspect();
  });
});
{% endif %}

{# ******************** MODERNIZR ******************** #}

{% if config.assets_List["modernizr"] == true %}
/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-backgroundsize-boxshadow-canvas-cssgradients-csstransitions-input-inputtypes-localstorage-opacity-rgba-svg-textshadow-video-domprefixes-prefixes-setclasses-shiv-testallprops-testprop !*/
!function(e,t,n){function r(e,t){return typeof e===t}function a(){var e,t,n,a,o,i,s;for(var l in x)if(x.hasOwnProperty(l)){if(e=[],t=x[l],t.name&&(e.push(t.name.toLowerCase()),t.options&&t.options.aliases&&t.options.aliases.length))for(n=0;n<t.options.aliases.length;n++)e.push(t.options.aliases[n].toLowerCase());for(a=r(t.fn,"function")?t.fn():t.fn,o=0;o<e.length;o++)i=e[o],s=i.split("."),1===s.length?Modernizr[s[0]]=a:(!Modernizr[s[0]]||Modernizr[s[0]]instanceof Boolean||(Modernizr[s[0]]=new Boolean(Modernizr[s[0]])),Modernizr[s[0]][s[1]]=a),b.push((a?"":"no-")+s.join("-"))}}function o(e){var t=S.className,n=Modernizr._config.classPrefix||"";if(w&&(t=t.baseVal),Modernizr._config.enableJSClass){var r=new RegExp("(^|\\s)"+n+"no-js(\\s|$)");t=t.replace(r,"$1"+n+"js$2")}Modernizr._config.enableClasses&&(t+=" "+n+e.join(" "+n),w?S.className.baseVal=t:S.className=t)}function i(){return"function"!=typeof t.createElement?t.createElement(arguments[0]):w?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function s(e,t){return!!~(""+e).indexOf(t)}function l(e){return e.replace(/([a-z])-([a-z])/g,function(e,t,n){return t+n.toUpperCase()}).replace(/^-/,"")}function c(e,t){return function(){return e.apply(t,arguments)}}function u(e,t,n){var a;for(var o in e)if(e[o]in t)return n===!1?e[o]:(a=t[e[o]],r(a,"function")?c(a,n||t):a);return!1}function d(e){return e.replace(/([A-Z])/g,function(e,t){return"-"+t.toLowerCase()}).replace(/^ms-/,"-ms-")}function f(t,n,r){var a;if("getComputedStyle"in e){a=getComputedStyle.call(e,t,n);var o=e.console;if(null!==a)r&&(a=a.getPropertyValue(r));else if(o){var i=o.error?"error":"log";o[i].call(o,"getComputedStyle returning null, its possible modernizr test results are inaccurate")}}else a=!n&&t.currentStyle&&t.currentStyle[r];return a}function p(){var e=t.body;return e||(e=i(w?"svg":"body"),e.fake=!0),e}function m(e,n,r,a){var o,s,l,c,u="modernizr",d=i("div"),f=p();if(parseInt(r,10))for(;r--;)l=i("div"),l.id=a?a[r]:u+(r+1),d.appendChild(l);return o=i("style"),o.type="text/css",o.id="s"+u,(f.fake?f:d).appendChild(o),f.appendChild(d),o.styleSheet?o.styleSheet.cssText=e:o.appendChild(t.createTextNode(e)),d.id=u,f.fake&&(f.style.background="",f.style.overflow="hidden",c=S.style.overflow,S.style.overflow="hidden",S.appendChild(f)),s=n(d,e),f.fake?(f.parentNode.removeChild(f),S.style.overflow=c,S.offsetHeight):d.parentNode.removeChild(d),!!s}function g(t,r){var a=t.length;if("CSS"in e&&"supports"in e.CSS){for(;a--;)if(e.CSS.supports(d(t[a]),r))return!0;return!1}if("CSSSupportsRule"in e){for(var o=[];a--;)o.push("("+d(t[a])+":"+r+")");return o=o.join(" or "),m("@supports ("+o+") { #modernizr { position: absolute; } }",function(e){return"absolute"==f(e,null,"position")})}return n}function h(e,t,a,o){function c(){d&&(delete L.style,delete L.modElem)}if(o=r(o,"undefined")?!1:o,!r(a,"undefined")){var u=g(e,a);if(!r(u,"undefined"))return u}for(var d,f,p,m,h,v=["modernizr","tspan","samp"];!L.style&&v.length;)d=!0,L.modElem=i(v.shift()),L.style=L.modElem.style;for(p=e.length,f=0;p>f;f++)if(m=e[f],h=L.style[m],s(m,"-")&&(m=l(m)),L.style[m]!==n){if(o||r(a,"undefined"))return c(),"pfx"==t?m:!0;try{L.style[m]=a}catch(y){}if(L.style[m]!=h)return c(),"pfx"==t?m:!0}return c(),!1}function v(e,t,n,a,o){var i=e.charAt(0).toUpperCase()+e.slice(1),s=(e+" "+j.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?h(s,t,a,o):(s=(e+" "+k.join(i+" ")+i).split(" "),u(s,t,n))}function y(e,t,r){return v(e,n,n,t,r)}var b=[],x=[],C={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){x.push({name:e,fn:t,options:n})},addAsyncTest:function(e){x.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=C,Modernizr=new Modernizr;var S=t.documentElement,w="svg"===S.nodeName.toLowerCase(),E=C._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];C._prefixes=E;w||!function(e,t){function n(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function r(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function a(e,t){var n=b.elements;"string"!=typeof n&&(n=n.join(" ")),"string"!=typeof e&&(e=e.join(" ")),b.elements=n+" "+e,c(t)}function o(e){var t=y[e[h]];return t||(t={},v++,e[h]=v,y[v]=t),t}function i(e,n,r){if(n||(n=t),d)return n.createElement(e);r||(r=o(n));var a;return a=r.cache[e]?r.cache[e].cloneNode():g.test(e)?(r.cache[e]=r.createElem(e)).cloneNode():r.createElem(e),!a.canHaveChildren||m.test(e)||a.tagUrn?a:r.frag.appendChild(a)}function s(e,n){if(e||(e=t),d)return e.createDocumentFragment();n=n||o(e);for(var a=n.frag.cloneNode(),i=0,s=r(),l=s.length;l>i;i++)a.createElement(s[i]);return a}function l(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?i(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+r().join().replace(/[\w\-:]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function c(e){e||(e=t);var r=o(e);return!b.shivCSS||u||r.hasCSS||(r.hasCSS=!!n(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),d||l(e,r),e}var u,d,f="3.7.3",p=e.html5||{},m=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,g=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",v=0,y={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,d=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,d=!0}}();var b={elements:p.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output picture progress section summary template time video",version:f,shivCSS:p.shivCSS!==!1,supportsUnknownElements:d,shivMethods:p.shivMethods!==!1,type:"default",shivDocument:c,createElement:i,createDocumentFragment:s,addElements:a};e.html5=b,c(t),"object"==typeof module&&module.exports&&(module.exports=b)}("undefined"!=typeof e?e:this,t),Modernizr.addTest("svg",!!t.createElementNS&&!!t.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect),Modernizr.addTest("localstorage",function(){var e="modernizr";try{return localStorage.setItem(e,e),localStorage.removeItem(e),!0}catch(t){return!1}});var T="Moz O ms Webkit",k=C._config.usePrefixes?T.toLowerCase().split(" "):[];C._domPrefixes=k,Modernizr.addTest("canvas",function(){var e=i("canvas");return!(!e.getContext||!e.getContext("2d"))}),Modernizr.addTest("video",function(){var e=i("video"),t=!1;try{t=!!e.canPlayType,t&&(t=new Boolean(t),t.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),t.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),t.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""),t.vp9=e.canPlayType('video/webm; codecs="vp9"').replace(/^no$/,""),t.hls=e.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/,""))}catch(n){}return t}),Modernizr.addTest("cssgradients",function(){for(var e,t="background-image:",n="gradient(linear,left top,right bottom,from(#9f9),to(white));",r="",a=0,o=E.length-1;o>a;a++)e=0===a?"to ":"",r+=t+E[a]+"linear-gradient("+e+"left top, #9f9, white);";Modernizr._config.usePrefixes&&(r+=t+"-webkit-"+n);var s=i("a"),l=s.style;return l.cssText=r,(""+l.backgroundImage).indexOf("gradient")>-1}),Modernizr.addTest("opacity",function(){var e=i("a").style;return e.cssText=E.join("opacity:.55;"),/^0.55$/.test(e.opacity)}),Modernizr.addTest("rgba",function(){var e=i("a").style;return e.cssText="background-color:rgba(150,255,150,.5)",(""+e.backgroundColor).indexOf("rgba")>-1});var _=i("input"),P="autocomplete autofocus list placeholder max min multiple pattern required step".split(" "),N={};Modernizr.input=function(t){for(var n=0,r=t.length;r>n;n++)N[t[n]]=!!(t[n]in _);return N.list&&(N.list=!(!i("datalist")||!e.HTMLDataListElement)),N}(P);var z="search tel url email datetime date month week time datetime-local number range color".split(" "),$={};Modernizr.inputtypes=function(e){for(var r,a,o,i=e.length,s="1)",l=0;i>l;l++)_.setAttribute("type",r=e[l]),o="text"!==_.type&&"style"in _,o&&(_.value=s,_.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(r)&&_.style.WebkitAppearance!==n?(S.appendChild(_),a=t.defaultView,o=a.getComputedStyle&&"textfield"!==a.getComputedStyle(_,null).WebkitAppearance&&0!==_.offsetHeight,S.removeChild(_)):/^(search|tel)$/.test(r)||(o=/^(url|email)$/.test(r)?_.checkValidity&&_.checkValidity()===!1:_.value!=s)),$[e[l]]=!!o;return $}(z);var j=C._config.usePrefixes?T.split(" "):[];C._cssomPrefixes=j;var F={elem:i("modernizr")};Modernizr._q.push(function(){delete F.elem});var L={style:F.elem.style};Modernizr._q.unshift(function(){delete L.style});var A=C.testProp=function(e,t,r){return h([e],n,t,r)};Modernizr.addTest("textshadow",A("textShadow","1px 1px")),C.testAllProps=v,C.testAllProps=y,Modernizr.addTest("backgroundsize",y("backgroundSize","100%",!0)),Modernizr.addTest("boxshadow",y("boxShadow","1px 1px",!0)),Modernizr.addTest("csstransitions",y("transition","all",!0)),a(),o(b),delete C.addTest,delete C.addAsyncTest;for(var M=0;M<Modernizr._q.length;M++)Modernizr._q[M]();e.Modernizr=Modernizr}(window,document);
{% endif %}

{# ******************** HUBSPOT ******************** #}

var hsCtaReadyCallbackLoop = 0;
function hsCtaReadyCallback(thisThing,callback,onerror) {
  if (hsCtaReadyCallbackLoop < 20) {
    hsCtaReadyCallbackLoop ++;
    hsCtaIsReady = true;

    $(thisThing).find(".hs-cta-wrapper").each(function () {
      if ($(this).find("a img[src*='no-cache.hubspot.com']").length > 0) {
        hsCtaIsReady = false;
      }
    });

    if (hsCtaIsReady == true) {
      callback();
    }
    else {
      setTimeout(function () {
        hsCtaReadyCallback(thisThing,callback,onerror);
      },250);
    }
  }
  else {
    if (window.console && window.console.warn) {console.warn("HubSpot CtaReady callback timeout (5s)");}
    if ($.isFunction(onerror)) {
      onerror();
    }
  }
}
$.fn.ctaready = function(callback,onerror) {
  if (document.readyState === 'complete') {
    hsCtaReadyCallback(this,callback,onerror);
  }
  else {
    $(document).ready(function () {
      hsCtaReadyCallback(this,callback,onerror);
    });
  }
};

var hsFormReadyCallbackLoop = 0;
function hsFormReadyCallback(thisThing,callback,onerror) {
  if (hsFormReadyCallbackLoop < 20) {
    hsFormReadyCallbackLoop ++;
    hsFormIsReady = true;

    $(thisThing).find('.hbspt-form').each(function () {
      if ($(this).html().trim().length == 0) {
        hsFormIsReady = false;
      }
    });

    $(thisThing).find('#comments-listing').each(function () {
      if ($(this).find('#comment-form').length > 0) {
        if ($(this).find('#comment-form').html().trim().length == 0) {
          hsFormIsReady = false;
        }
      }
      else {
        hsFormIsReady = false;
      }
    });

    $(thisThing).find(".hs_cos_wrapper_type_form").each(function () {
      if ($(this).find("> div[id*='hs_form_target_']").length > 0) {
        if ($(this).find("> div[id*='hs_form_target_']").html().trim().length > 0) {

        }
        else if ($(this).find("> form").length > 0) {
          if ($(this).find("> form").html().trim().length > 0) {

          }
          else {
            hsFormIsReady = false;
          }
        }
        else {
          hsFormIsReady = false;
        }
      }
      else {
        hsFormIsReady = false;
      }
    });

    $(thisThing).find('.hs_cos_wrapper_type_blog_subscribe').each(function () {
      if ($(this).find("> div[id*='hs_form_target_']").length > 0) {
        if ($(this).find("> div[id*='hs_form_target_']").html().trim().length > 0) {
          if ($(this).find("> form").length > 0) {
            if ($(this).find("> form").html().trim().length > 0) {

            }
            else {
              hsFormIsReady = false;
            }
          }
          else {
            hsFormIsReady = false;
          }
        }
        else {
          hsFormIsReady = false;
        }
      }
      else {
        hsFormIsReady = false;
      }
    });

    if (hsFormIsReady == true) {
      callback();
    }
    else {
      setTimeout(function () {
        hsFormReadyCallback(thisThing,callback,onerror);
      },250);
    }
  }
  else {
    if (window.console && window.console.warn) {console.warn("HubSpot FormReady callback timeout (5s)");}
    if ($.isFunction(onerror)) {
      onerror();
    }
  }
}
$.fn.formready = function(callback,onerror) {
  if (document.readyState === 'complete') {
    hsFormReadyCallback(this,callback,onerror);
  }
  else {
    $(document).ready(function () {
      hsFormReadyCallback(this,callback,onerror);
    });
  }
};

{# ******************** HUBUI ******************** #}
{% if config.assets_List["hubui"] == true %}
var hubuiId = null;
$.fn.hubui = function() {
  var thisThing;
  if ((this == undefined)||($.type(this) == "undefined")||this.is($(document))||this.is($(window))) {
    thisThing = $('html');
  }
  else if ($(this).length <= 0) {
    thisThing = $('html');
  }
  else {
    thisThing = this;
  }
  $(thisThing).find('form.hs-form label').addClass('no--transition');
  $(thisThing).addClass('hubui');
  $(thisThing)[0].offsetHeight;
  setTimeout(function () {
    $(thisThing).find('form.hs-form label').removeClass('no--transition');
  },1);

  $('.hubui').find('form.hs-form input, form.hs-form textarea').each(function () {
    $(this).closest(".hs-form-field").addClass("hubui--enabled");
    if ($(this).val().trim().length > 0) {
      $(this).closest('.hs-form-field').addClass('filled valid');
    }
    else {
      $(this).closest('.hs-form-field').removeClass('filled valid');
    }
    if ($(this).closest('.inputs-list').length > 0) {
      $(this).closest('.hs-form-field').removeClass('filled valid hubui--enabled');
      $(this).closest('.hs-form-field').addClass('static');
    }
  });
  $('.hubui').find('form.hs-form select').each(function () {
    $(this).closest('.hs-form-field').removeClass('filled valid hubui--enabled');
    $(this).closest('.hs-form-field').addClass('static');
    if ($(this).find('option:selected').is(":enabled")) {
      $(this).closest('.hs-form-field').addClass('valid');
    }
  });
  $('.hubui').find('form.hs-form input[type="file"]').each(function () {
    $(this).closest('.hs-form-field').removeClass('filled valid hubui--enabled');
    $(this).closest('.hs-form-field').addClass('static');
  });
  $('.hubui').find('form.hs-form .hs-form-field > label').click(function () {
    $(this).closest('.hs-form-field').find('input,textarea').focus();
  });
  $('.hubui').find('form.hs-form input, form.hs-form textarea').focus(function () {
    if (($(this).attr('type') == "text")||($(this).attr('type') == "email")||($(this).attr('type') == "number")||($(this).attr('type') == "tel")||($(this).attr('type') == "password")||($(this).is('textarea'))) {
      $(this).closest('.hs-form-field').addClass('focus');
      $(this).closest('.hs-form-field').removeClass('invalid');
    }
  });
  $('.hubui').find('form.hs-form input, form.hs-form textarea').blur(function () {
    if (($(this).attr('type') == "text")||($(this).attr('type') == "email")||($(this).attr('type') == "number")||($(this).attr('type') == "tel")||($(this).attr('type') == "password")||($(this).is('textarea'))) {
      $(this).closest('.hs-form-field').removeClass('focus');
      if ($(this).val().trim().length > 0) {
        $(this).closest('.hs-form-field').addClass('filled valid');
      }
      else {
        $(this).closest('.hs-form-field').removeClass('filled valid');
      }
      hubuiId = $(this);
      $(hubuiId).closest('.hs-form-field').removeClass('invalid');
      setTimeout(function () {
        if ($(hubuiId).hasClass('invalid')) {
          $(hubuiId).closest('.hs-form-field').addClass('invalid').removeClass('valid');
        }
        else {
          $(hubuiId).closest('.hs-form-field').removeClass('invalid');
        }
      },100);
    }
  });
  $('.hubui').find('form.hs-form select').change(function () {
    if ($(this).find('option:selected').is(":enabled")) {
      $(this).closest('.hs-form-field').addClass('valid');
    }
    else {
      $(this).closest('.hs-form-field').removeClass('valid');
    }
  });
  $('.hubui').find('form.hs-form .hs-form-field > label').each(function () {
    if ($(this).text().trim().length <= 0) {
      $(this).css("display","none");
    }
  });
  $('.hubui').find('form.hs-form .hs-field-desc').each(function () {
    if ($(this).text() != "") {
      $(this).closest('.hs-form-field').removeClass('filled valid');
      $(this).closest('.hs-form-field').addClass('static');
    }
  });
}
// Equalize trigger
if(typeof equalize == 'function'){
  $(document).formready(function () {
    $(document).ctaready(function () {
      equalize();
    });
  });
}
{% endif %}

{# ******************** HAMMER JS ******************** #}
/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));

{# ******************** JQUERY MOUSEWHEEL ******************** #}

{% if config.assets_List["jquerymousewheel"] == true %}
/*! jQuery Mousewheel 3.1.13 | Copyright OpenJS Foundation and other contributors */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)}(function(a){var u,r,e=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],t="onwheel"in window.document||9<=window.document.documentMode?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],f=Array.prototype.slice;if(a.event.fixHooks)for(var n=e.length;n;)a.event.fixHooks[e[--n]]=a.event.mouseHooks;var d=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var e=t.length;e;)this.addEventListener(t[--e],i,!1);else this.onmousewheel=i;a.data(this,"mousewheel-line-height",d.getLineHeight(this)),a.data(this,"mousewheel-page-height",d.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var e=t.length;e;)this.removeEventListener(t[--e],i,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(e){var t=a(e),e=t["offsetParent"in a.fn?"offsetParent":"parent"]();return e.length||(e=a("body")),parseInt(e.css("fontSize"),10)||parseInt(t.css("fontSize"),10)||16},getPageHeight:function(e){return a(e).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};function i(e){var t,n=e||window.event,i=f.call(arguments,1),o=0,l=0,s=0,h=0;if((e=a.event.fix(n)).type="mousewheel","detail"in n&&(s=-1*n.detail),"wheelDelta"in n&&(s=n.wheelDelta),"wheelDeltaY"in n&&(s=n.wheelDeltaY),"wheelDeltaX"in n&&(l=-1*n.wheelDeltaX),"axis"in n&&n.axis===n.HORIZONTAL_AXIS&&(l=-1*s,s=0),o=0===s?l:s,"deltaY"in n&&(o=s=-1*n.deltaY),"deltaX"in n&&(l=n.deltaX,0===s&&(o=-1*l)),0!==s||0!==l)return 1===n.deltaMode?(o*=t=a.data(this,"mousewheel-line-height"),s*=t,l*=t):2===n.deltaMode&&(o*=t=a.data(this,"mousewheel-page-height"),s*=t,l*=t),h=Math.max(Math.abs(s),Math.abs(l)),(!r||h<r)&&c(n,r=h)&&(r/=40),c(n,h)&&(o/=40,l/=40,s/=40),o=Math[1<=o?"floor":"ceil"](o/r),l=Math[1<=l?"floor":"ceil"](l/r),s=Math[1<=s?"floor":"ceil"](s/r),d.settings.normalizeOffset&&this.getBoundingClientRect&&(h=this.getBoundingClientRect(),e.offsetX=e.clientX-h.left,e.offsetY=e.clientY-h.top),e.deltaX=l,e.deltaY=s,e.deltaFactor=r,e.deltaMode=0,i.unshift(e,o,l,s),u&&window.clearTimeout(u),u=window.setTimeout(w,200),(a.event.dispatch||a.event.handle).apply(this,i)}function w(){r=null}function c(e,t){return d.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}a.fn.extend({mousewheel:function(e){return e?this.on("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.off("mousewheel",e)}})});
{% endif %}

{# ******************** HUBRSS ******************** #}

{% if config.assets_List["hubrss"] == true %}
var rssData = undefined;
function hubRSS(options) {
  // Extend & retain legacy format
  var defaults = {
    url: undefined,
    number: 3,
    images: true,
    callback: function () {},
    error: function () {}
  };
  if ((arguments.length > 1)&&(!$.isArray(options))) {
    options = {
      url: arguments[0],
      number: arguments[1],
      images: arguments[3],
      callback: arguments[2]
    }
  }
  var settings = $.extend({}, defaults, options);

  // Parse XML
  $.ajax({
    type: "GET",
    url: settings["url"],
    dataType: "xml",
    success: function(xml){
      rssData = [];
      for (i=0;(i<$(xml).find('item').length)&&(i<settings["number"]);i++) {
        var thisThing = $(xml).find('item:eq('+i+')');
        // Populate categories
        var catFull = [];
        thisThing.find('category').each(function () {
          catFull.push($(this).text());
        });
        // Format date
        var d = new Date(thisThing.find("dc\\:date, date").text().slice(0,thisThing.find("dc\\:date, date").text().indexOf("T")));
        d = d.format("UTC:mmmm dd, yyyy");
        // Attempt to extract image
        pImg = "";
        pDesc = "";
        var pHtml = $(thisThing.find("content\\:encoded, encoded").text());
        if (pHtml.find('img.hs-featured-image').length > 0) {
          pImg = pHtml.find('img.hs-featured-image').attr('src');
          pDesc = pHtml.text().trim().replace(/(\r\n|\n|\r)/gm,"");
        }
        var pHtml = $(thisThing.find("description").text());
        if (pHtml.find('img.hs-featured-image').length > 0) {
          pImg = pHtml.find('img.hs-featured-image').attr('src');
          pDesc = pHtml.text().trim().replace(/(\r\n|\n|\r)/gm,"");
        }
        // Populate array
        rssData.push({
          'title':thisThing.find('title').text(),
          'author':(thisThing.find('author').length > 0?thisThing.find('author').text().slice(thisThing.find('author').text().indexOf("(")+1,thisThing.find('author').text().indexOf(")")):thisThing.find('dc\\:creator, creator').text()),
          'date':d,
          'content':$(thisThing.find("content\\:encoded, encoded").text()).text().trim().replace(/(\r\n|\n|\r)/gm,""),
          'url':thisThing.find('link').text(),
          'description':pDesc,
          'image':pImg,
          'category':catFull
        });
      }
      // Individual posts
      if (settings["images"] == undefined) {
        settings["images"] = true;
      }
      if (settings["images"] != false) {
        var c = 0;
        var b = 0;
        for (p=0;p<rssData.length;p++) {
          if (rssData[p]["image"] == "") {
            $.ajax({
              url:rssData[p]['url'],
              type:'GET',
              success: function(data){
                var i = undefined;
                for (t=0;t<rssData.length;t++) {
                  if (rssData[t]['url'] == $(data).filter("link[rel='canonical']").attr('href')) {
                    var i = t;
                  }
                };
                if (i == undefined) {
                  throw "Unexpected error";
                }
                else {
                  if ($(data).filter("meta[property='og:image']").length)
                  {rssData[i]['image'] = $(data).filter("meta[property='og:image']").attr('content').replace("#keepProtocol","");}
                  else {rssData[i]['image'] = null;}
                  rssData[i]['description'] = $(data).filter("meta[property='og:description']").attr('content');
                }
                c++;
                // Render
                if (c == rssData.length) {
                  settings.callback.call(this);
                }
              },
              error: function() {
                console.log("Failed to GET data. Attempting fallback.");
                b++;
                window["$framesrc"+b] = $("<iframe style='visibility:hidden!important;display:none!important;' id='hubrss--iframe' rel='"+this.url+"' src='"+this.url+"' />");
                window["$framesrc"+b].on('load',function (event) {
                  var i = undefined;
                  for (t=0;t<rssData.length;t++) {
                    if (rssData[t]['url'] == $(this).attr('rel')) {
                      var i = t;
                    }
                  };
                  if (i == undefined) {
                    throw "Unexpected error";
                  }
                  else {
                    if ($('iframe[rel="'+$(this).attr('rel')+'"]').contents().find("meta[property='og:image']").length)
                    {rssData[i]['image'] = $('iframe[rel="'+$(this).attr('rel')+'"]').contents().find("meta[property='og:image']").attr('content').replace("#keepProtocol","");}
                    else {rssData[i]['image'] = null;}
                    rssData[i]['description'] = $('iframe[rel="'+$(this).attr('rel')+'"]').contents().find("meta[property='og:description']").attr('content');
                  }
                  c++;
                  // Render
                  if (c == rssData.length) {
                    settings.callback.call(this);
                  }
                  $(this).remove();
                });
                $('body').append(window["$framesrc"+b]);
              }
            });
          }
          else {
            c++;
            // Render
            if (c == rssData.length) {
              settings.callback.call(this);
            }
          }
        };
      }
      else {
        settings.callback.call(this);
      }
    },
    error: function() {
      rssData = undefined;
      throw "Error loading feed";
    }
  });
}
{% endif %}

{# ******************** COUNTERTICKER ******************** #}

{% if config.assets_List["counterticker"] == true %}
function productionCounterticker() {
  $('.counterticker:not(.counterticked)').each(function () {
    var $this = $(this);
    thisEl = $this;
    if ($this.closest(".counterticker--parent").length > 0) {
      thisEl = $this.closest(".counterticker--parent");
    }
    if (thisEl.offset().top + ($(window).height() * {{ config.counterticker_TriggerPercent|replace("%","")|float/100 }}) <= $(document).scrollTop()+$(window).height()) {
      //$(this).addClass('fade');
      $({ Counter: parseInt($this.text()||0) }).animate({ Counter: (parseFloat($this.attr('data-counterticker--to'))||0) }, {
        duration: parseInt($this.attr('data-counterticker--duration')||2000),
        easing: 'swing',
        step: function (now) {
          if (($this.attr('data-counterticker--commas')||"true").toLowerCase() != "false") {
            $this.text(addCommasToNumber((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))));
          }
          else {
            $this.text((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))));
          }
        }
      });
      $this.addClass('counterticked');
      if ($this.closest(".counterticker--parent").length > 0) {
        $this.closest(".counterticker--parent").addClass("counterticker--parent--counterticked");
      }
    }
  });
}

// Fallback for slow loads
setTimeout(function () {
  productionCounterticker();
},3000);

$(window).on('load',function () {
  productionCounterticker();
  $(window).scroll(function () {
    productionCounterticker();
  });
  $(window).resize(function () {
    productionCounterticker();
  });
  $('.counterticker--load').each(function () {
    var $this = $(this);
    $({ Counter: parseInt($this.text()||0) }).animate({ Counter: (parseFloat($this.attr('data-counterticker--to'))||0) }, {
      duration: parseInt($this.attr('data-counterticker--duration')||2000),
      easing: 'swing',
      step: function (now) {
        if (($this.attr('data-counterticker--commas')||"true").toLowerCase() != "false") {
          $this.text(addCommasToNumber((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))));
        }
        else {
          $this.text((Math.ceil(now*(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length)))))/(1*Math.pow(10,parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))))).toFixed(parseInt(($this.attr('data-counterticker--to').indexOf('.') == -1 ? 0 : $this.attr('data-counterticker--to').slice($this.attr('data-counterticker--to').indexOf('.')+1).length))));
        }
      }
    });
    $this.addClass('counterticked');
  });
});
{% endif %}


{# ******************** SCROLL ITEM & SCROLL WRAPPER ******************** #}

function scrollItem() {
  $('.scroll--wrapper .scroll--item').each(function () {
    $(this).css('position','absolute');
    headerHeight = ($("body").find("header")?(($("body").find("header").css("position") == "fixed")?$("body").find("header").height():0):0);
    scrollTop = $(window).scrollTop() + headerHeight;
    wrapperOffset = $(this).closest('.scroll--wrapper').offset().top;
    wrapperHeight = $(this).closest('.scroll--wrapper').height();
    itemOffset = $(this).closest('.scroll--wrapper').offset().top;
    itemHeight = $(this).height();
    if (scrollTop > itemOffset) {
      if (scrollTop - itemOffset + itemHeight >= wrapperHeight) {
        // If bottom
        $(this).css('margin-top',wrapperHeight-itemHeight+'px');
      }
      else {
        // If not at at top or bottom
        $(this).css('margin-top',scrollTop - wrapperOffset+'px');
      }
    }
    else {
      // If top
      $(this).css('margin-top','');
    }
  });
}

$(document).ready(function () {
  if ($('.scroll--wrapper .scroll--item').length>0) {
    scrollItem();
    $('.scroll--wrapper .scroll--item').each(function () {
      // Set height if needed
      if ($(this).height() > $(this).closest('.scroll--wrapper').height()) {
        $(this).closest('.scroll--wrapper').css('min-height',$(this).height()+'px');
      }
    });
    $('.scroll--wrapper').ctaready(function () {
      $('.scroll--wrapper .scroll--item').each(function () {
        // Set height if needed
        if ($(this).height() > $(this).closest('.scroll--wrapper').height()) {
          $(this).closest('.scroll--wrapper').css('min-height',$(this).height()+'px');
        }
      });
    });
    $(window).scroll(function () {
      scrollItem();
    });
    $(window).resize(function () {
      scrollItem();
      $('.scroll--wrapper .scroll--item').each(function () {
        // Set height if needed
        if ($(this).height() > $(this).closest('.scroll--wrapper').height()) {
          $(this).closest('.scroll--wrapper').css('min-height',$(this).height()+'px');
        }
      });
    });
  }
});

{# ******************** DOOMSDAY ******************** #}

{% if config.assets_List["doomsday"] == true %}
var doomsdayCounter = {
  "counter":undefined,
  "datetime":0,
  "now":0,
  "difference":0,
  "days":0,
  "hours":0,
  "minutes":0,
  "seconds":0
};

function doomsday(options) {
  clearInterval(doomsdayCounter.counter);
  var defaults = {
    datetime:undefined,
    timezone:0,
    interval:1000,
    callback: function () {},
    complete: function () {}
  };
  var settings = $.extend({}, defaults, options);

  if (settings.datetime != undefined) {
    doomsdayCounter.datetime = settings.datetime;
    doomsdayCounter.now = $.now()/1000;
    var d = new Date();
    doomsdayCounter.difference = doomsdayCounter.datetime - doomsdayCounter.now;

    doomsdayCounter.days = Math.floor((doomsdayCounter.difference / (24 * 60 * 60)));
    doomsdayCounter.hours = Math.floor((doomsdayCounter.difference % (24 * 60 * 60)) / (60 * 60));
    doomsdayCounter.minutes = Math.floor((doomsdayCounter.difference % (24 * 60 * 60)) % (60 * 60) / 60);
    doomsdayCounter.seconds = Math.floor((doomsdayCounter.difference % (24 * 60 * 60)) % (60 * 60) % 60);

    if (doomsdayCounter.difference > 0) {
      settings.callback.call(this);

      doomsdayCounter.counter = setInterval(function () {
        doomsdayCounter.seconds --;
        if (doomsdayCounter.seconds < 0) {
          doomsdayCounter.minutes --;
          doomsdayCounter.seconds = 59;
          if (doomsdayCounter.minutes < 0) {
            doomsdayCounter.hours --;
            doomsdayCounter.minutes = 59;
            if (doomsdayCounter.hours < 0) {
              doomsdayCounter.days --;
              doomsdayCounter.hours = 23;
              if (doomsdayCounter.days < 0) {
                doomsdayCounter.days = 0;
              }
            }
          }
        }
        if (doomsdayCounter.days + doomsdayCounter.hours + doomsdayCounter.minutes + doomsdayCounter.seconds <= 0) {
          doomsdayCounter.days = 0;
          doomsdayCounter.hours = 0;
          doomsdayCounter.minutes = 0;
          doomsdayCounter.seconds = 0;
          settings.callback.call(this);
          settings.complete.call(this);
          clearInterval(doomsdayCounter.counter);
        }
        else {
          settings.callback.call(this);
        }
      },settings.interval);
    }
    else {
      doomsdayCounter.days = 0;
      doomsdayCounter.hours = 0;
      doomsdayCounter.minutes = 0;
      doomsdayCounter.seconds = 0;
      settings.callback.call(this);
      settings.complete.call(this);
      clearInterval(doomsdayCounter.counter);
    }
  }
  else {
    throw "options.datetime undefined";
  }
}
{% endif %}

{# ******************** FLEXSLIDER ******************** #}

{% if config.assets_List["flexslider"] == true %}
function flexsliderSlide(sliderNum,slideNum) {
  var thisSlider = $('.flexslider--slider[data-slider="'+sliderNum+'"]');
  if (typeof(thisSlider)!="undefined") {
    if (!thisSlider.hasClass('flexslider--transition')) {
      thisSlider.addClass('flexslider--transition');
      var slideCur = thisSlider.find('.flexslider--slide.active').index();
      var slideClone = parseInt(thisSlider.attr('data-clone')||2);
      if (parseInt(slideNum) >= 0) {
        if (thisSlider.attr('data-loop') == "true") {
          slideNum += slideClone;
        }
      }
      else if (slideNum.toLowerCase() == "prev") {
        slideNum = slideCur-1;
        if (thisSlider.attr('data-loop') == "true") {
          if (slideNum < slideClone) {
            slideNum = thisSlider.find('.flexslider--slide').length-(slideClone + 1);
            thisSlider.find('.flexslider--slide').addClass('no--transition');
            for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
              thisSlider.find('.flexslider--slide:eq('+i+')').css({
                'left':100*(i - (thisSlider.find('.flexslider--slide').length - slideClone))+'%',
              });
            }
            thisSlider[0].offsetHeight;
            thisSlider.find('.flexslider--slide').removeClass('no--transition');
          }
        }
        else {
          if (slideNum < 0) {slideNum = thisSlider.find('.flexslider--slide').length-1;}
        }
      }
      else if (slideNum.toLowerCase() == "next") {
        slideNum = slideCur+1;
        if (thisSlider.attr('data-loop') == "true") {
          if (slideNum > thisSlider.find('.flexslider--slide').length-(slideClone + 1)) {
            slideNum = slideClone;
            thisSlider.find('.flexslider--slide').addClass('no--transition');
            for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
              thisSlider.find('.flexslider--slide:eq('+i+')').css({
                'left':100*(i-(slideClone-1))+'%',
              });
            }
            thisSlider[0].offsetHeight;
            thisSlider.find('.flexslider--slide').removeClass('no--transition');
          }
        }
        else {
          if (slideNum > thisSlider.find('.flexslider--slide').length-1) {
            slideNum = 0;
          }
        }
      }
      if (thisSlider.hasClass('flexslider--type--slide')) {
        for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
          thisSlider.find('.flexslider--slide:eq('+i+')').css({
            'left':(i-slideNum)*100+"%"
          });
          thisSlider.find('.flexslider--slide').removeClass('active active--clone');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li').removeClass('active');
          thisSlider.find('.flexslider--slide:eq('+slideNum+')').addClass('active');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li:eq('+(slideNum-(thisSlider.attr('data-loop') == "true"?slideClone:0))+')').addClass('active');
          if (thisSlider.attr('data-loop') == "true") {
            if (slideNum == slideClone) {
              thisSlider.find('.flexslider--slide:eq('+(thisSlider.find('.flexslider--slide').length-slideClone)+')').addClass('active--clone');
            }
            else if (slideNum == thisSlider.find('.flexslider--slide').length-(slideClone + 1)) {
              thisSlider.find('.flexslider--slide:eq('+(slideClone-1)+')').addClass('active--clone');
            }
          }
        };
      }
      else if (thisSlider.hasClass('flexslider--type--fade')) {
        for (i=0;i<thisSlider.find('.flexslider--slide').length;i++) {
          thisSlider.find('.flexslider--slide').removeClass('active');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li').removeClass('active');
          thisSlider.find('.flexslider--slide:eq('+slideNum+')').addClass('active');
          $('.flexslider--controls[data-slider="'+sliderNum+'"] li:eq('+slideNum+')').addClass('active');
        };
      }
      ghostOffset = 0;
      if (thisSlider.hasClass('flexslider--type--slide')&&(thisSlider.attr('data-loop') == "true")) {
        ghostOffset = slideClone;
      }
      if ($('body').find('.flexslider--ghost[data-slider="'+sliderNum+'"]').length > 0) {
        $('body').find('.flexslider--ghost[data-slider="'+sliderNum+'"]').find('.flexslider--slide').removeClass('active');
        $('body').find('.flexslider--ghost[data-slider="'+sliderNum+'"]').find('.flexslider--slide:eq('+(slideNum-ghostOffset)+')').addClass('active');
      }
      flexsliderAuto(sliderNum);
      setTimeout(function () {
        thisSlider.removeClass('flexslider--transition');
      },(parseFloat(thisSlider.find('.flexslider--slide').css('transition-duration')))*1000);
    }
  }
}
function flexsliderAuto(sliderNum) {
  if ($('.flexslider--slider[data-slider="'+sliderNum+'"]').data('duration')) {
    $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').stop();
    $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').css('width','0%');
    $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').animate({width:'100%',mozTransition:'width 500ms ease-out',webkitTransition:'width 500ms ease-out',transition:'width 500ms ease-out'},
                                                                     parseInt($('.flexslider--slider[data-slider="'+sliderNum+'"]').data('duration'))*1000,
                                                                     function(){
      $('.flexslider--autoslide[data-slider="'+sliderNum+'"]').css('width','0%');
      flexsliderSlide($('.flexslider--slider[data-slider="'+sliderNum+'"]').data('slider'),'next');
    }
                                                                    );
  }
}
function flexsliderSize() {
  $('.flexslider--slider').each(function () {
    $(this).find('.flexslider--slide--wrapper').css('height','');
    $(this).find('.flexslider--slide').each(function() {
      if ($(this).height() > $(this).closest('.flexslider--slide--wrapper').height()) {
        $(this).closest('.flexslider--slide--wrapper').css({
          'height':$(this).height()+'px'
        });
      }
    });
  });
}
$(document).ready(function () {
  $(window).resize(function () {
    flexsliderSize();
  });
});
$(window).on('load',function () {
  flexsliderSize();
  $('.flexslider--slider').each(function () {
    var slideClone = parseInt($(this).attr('data-clone')||2);
    if ($(this).attr('data-loop') !== "true") {
      $(this).find('.flexslider--slide:first-child').addClass('active');
    }
    if ($('body').find('.flexslider--ghost[data-slider="'+$(this).data('slider')+'"]').length > 0) {
      $('body').find('.flexslider--ghost[data-slider="'+$(this).data('slider')+'"]').find('.flexslider--slide').removeClass('active');
      $('body').find('.flexslider--ghost[data-slider="'+$(this).data('slider')+'"]').find('.flexslider--slide:first-child').addClass('active');
    }
    if ($(this)[0].hasAttribute("data-appendcontrols")) {
      if ($(this).attr("data-appendcontrols").toLowerCase() == "true") {
        for(i=0;i<$(this).find('.flexslider--slide').length;i++) {
          $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"]').append("<li></li>");
        };
      }
    }
    else {
      for(i=0;i<$(this).find('.flexslider--slide').length;i++) {
        $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"]').append("<li></li>");
      };
    }
    $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"] li:first-child').addClass('active');
    if ($(this).find('.flexslider--slide').length <= 1) {
      $('.flexslider--controls[data-slider="'+$(this).data('slider')+'"]').css('display','none');
      $('.flexslider--prev[data-slider="'+$(this).data('slider')+'"]').css('display','none');
      $('.flexslider--next[data-slider="'+$(this).data('slider')+'"]').css('display','none');
      $(this).addClass('flexslider--type--static');
    }
    else {
      if ($(this).attr('data-loop') == "true") {
        for (c=0;c<slideClone;c++) {
          $(this).find('.flexslider--slide:eq('+c+')').clone().removeClass('active').addClass('flexslider--clone').addClass(c==0?'active--clone':'').appendTo($(this).find('.flexslider--slide--wrapper > span'));
        }
        for (c=0;c<slideClone;c++) {
          $(this).find('.flexslider--slide:eq('+($(this).find('.flexslider--slide').length-(slideClone + c + 1))+')').clone().removeClass('active').addClass('flexslider--clone').prependTo($(this).find('.flexslider--slide--wrapper > span'));
        }
        $(this).find('.flexslider--slide:eq('+slideClone+')').addClass('active');
      }
      flexsliderAuto($(this).data('slider'));
    }
    $(this).addClass("flexslider--initialized");
  });
  $('.flexslider--slider.flexslider--type--slide').each(function () {
    if ($(this).find('.flexslider--slide').length > 1) {
      if ($(this).attr('data-loop') == "true") {
        for (i=0;i<$(this).find('.flexslider--slide').length;i++) {
          $(this).find('.flexslider--slide:eq('+i+')').css({
            'left':100*(i-parseInt($(this).attr('data-clone')||2))+'%',
          });
        }
      }
      else {
        for (i=0;i<$(this).find('.flexslider--slide').length;i++) {
          $(this).find('.flexslider--slide:eq('+i+')').css({
            'left':100*i+'%',
          });
        }
      }
    }
  });
  flexsliderSize();
  $('.flexslider--controls').each(function () {
    for (i=0;i<$(this).find('li').length;i++) {
      $(this).find('li:eq('+i+')').attr('onclick',"flexsliderSlide($(this).closest('.flexslider--controls').data('slider'),"+i+");");
    }
  });
  $('.flexslider--prev').attr('onclick',"flexsliderSlide($(this).data('slider'),'prev');");
  $('.flexslider--next').attr('onclick',"flexsliderSlide($(this).data('slider'),'next');");
});

/* ADD SWIPE GESTURE TO SLIDERS */
$(document).ready(function () {
  $("body").find(".flexslider--slide--wrapper").each(function () {
    if ($(this).find(".flexslider--slide").length > 1) {
			var $slideWrapper = $("body").find(".flexslider--slide--wrapper");

			$(this).closest(".flexslider--slider").addClass("flexslider--slider--draggable");

			$slideWrapper.hammer().bind( 'swipeleft', function() {
        var thisName = $(this).closest(".flexslider--slider").attr("data-slider");
        flexsliderSlide(thisName,"next");
      });

			$slideWrapper.hammer().bind( 'swiperight', function() {
        var thisName = $(this).closest(".flexslider--slider").attr("data-slider");
        flexsliderSlide(thisName,"prev");
      });
    }
  });
});
{% endif %}

{# ******************** FOUNDATION ******************** #}

/* BACKGROUND VIDEOS */

function sizeBackgroundVideo(obj) {
  var videoObj = obj;
  var videoHeight = videoObj.attr("data-height")||0;
  var videoWidth = videoObj.attr("data-width")||0;
  var layerHeight = $(videoObj).closest(".background--layer").height();
  var layerWidth = $(videoObj).closest(".background--layer").width();
  var videoAspect = videoHeight / videoWidth;
  var layerAspect = layerHeight / layerWidth;

  $(videoObj).css({
    'display':'block',
    'position':'absolute',
    'height':(layerAspect < videoAspect?(layerWidth*videoAspect)+"px":"100%"),
    'width':(layerAspect < videoAspect?"100%":(layerHeight/videoAspect)+"px"),
    'top':'50%',
    'left':'50%',
    'right':'auto',
    'bottom':'auto'
  });
  $(videoObj)[0].offsetHeight;
  $(videoObj).css({
    'margin-top':(-1*($(videoObj).height()/2))+"px",
    'margin-left':(-1*($(videoObj).width()/2))+"px"
  });
  setTimeout(function () {
    $(videoObj).css({
      'margin-top':(-1*($(videoObj).height()/2))+"px",
      'margin-left':(-1*($(videoObj).width()/2))+"px"
    });
  },200);
}

$(document).ready(function () {
  $("body").find(".section .background .background--layer .background--video").each(function () {
    $(this).find("source").attr("src",$(this).attr("data-src"));
    /*sizeBackgroundVideo($(this));*/
  });
});
$(window).on('load',function () {
  if (!touch()) {
    {#
    $("body").find(".background--layer.background--layer--hasvideo").each(function () {
      thisLayer = $(this);
      var video = $('<video />', {
        class: 'background--video',
        tabindex: '-1'
      }).prop({
        muted: true,
        autoplay: true,
        loop: true,
        playsinline: true
      });
      var src2 = $('<source />', {
        type: 'video/mp4',
        src: thisLayer.attr("data-videosrc")
      }).appendTo(video);
      video.appendTo(thisLayer);
    });
    #}
    $("body").find(".section .background .background--video").each(function () {
      try {
        $(this).load();
        $(this).get(0).pause();
        $(this).get(0).currentTime = 0;
        $(this).get(0).play();
        $(this).addClass("background--video--active");
      }
      catch(err) {
        $(this).load();
        $(this).get(0).play();
        sizeBackgroundVideo($(this));
        $(this).addClass("background--video--active");
        $(window).resize(function() {
          $("body").find(".section .background .background--video").each(function () {
            sizeBackgroundVideo($(this));
          });
        });
      }
    });
  }
});

{# ******************** LAZY LOADING ******************** #}

/*! lozad.js - v1.16.0 - 2020-09-06
* https://github.com/ApoorvSaxena/lozad.js
* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):t.lozad=e()}(this,function(){"use strict";
/**
   * Detect IE browser
   * @const {boolean}
   * @private
   */
  var g="undefined"!=typeof document&&document.documentMode,f={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=t.querySelector("img"),r=!1;null===e&&(e=document.createElement("img"),r=!0),g&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),r&&t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var a=t.children,o=void 0,i=0;i<=a.length-1;i++)(o=a[i].getAttribute("data-src"))&&(a[i].src=o);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var n=",";if(t.getAttribute("data-background-delimiter")&&(n=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url('"+t.getAttribute("data-background-image").split(n).join("'),url('")+"')";else if(t.getAttribute("data-background-image-set")){var d=t.getAttribute("data-background-image-set").split(n),u=d[0].substr(0,d[0].indexOf(" "))||d[0];// Substring before ... 1x
u=-1===u.indexOf("url(")?"url("+u+")":u,1===d.length?t.style.backgroundImage=u:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+u+"; background-image: -webkit-image-set("+d+"); background-image: image-set("+d+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function A(t){t.setAttribute("data-loaded",!0)}var m=function(t){return"true"===t.getAttribute("data-loaded")},v=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},f,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,g=e.loaded,s=void 0;"undefined"!=typeof window&&window.IntersectionObserver&&(s=new IntersectionObserver((r=u,a=g,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),m(t.target)||(r(t.target),A(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d}));for(var c,l=v(o,i),b=0;b<l.length;b++)(c=l[b]).getAttribute("data-placeholder-background")&&(c.style.background=c.getAttribute("data-placeholder-background"));return{observe:function(){for(var t=v(o,i),e=0;e<t.length;e++)m(t[e])||(s?s.observe(t[e]):(u(t[e]),A(t[e]),g(t[e])))},triggerLoad:function(t){m(t)||(u(t),A(t),g(t))},observer:s}}});

const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

{# ***************************************************************************** #}
{# ***************************************************************************** #}
{# ***************************** CUSTOM JAVASCRIPT ***************************** #}
{# ***************************************************************************** #}
{# ***************************************************************************** #}

/* HASH SCROLL */
$(document).ready(function () {
  // if (window.location.hash) {
  //   if (window.location.hash.length > 1) {
  //     $(window).on('load',function () {
  //       setTimeout(function () {
  //         thisHash = window.location.hash.slice(1);
  //         if ($("body").find("#"+thisHash).length > 0) {
  //           scrollOffset = 0;
  //           if ($("body").find("header").attr("position") == "fixed") {
  //             scrollOffset += $("body").find("header").height();
  //           }
  //           if ($("body").find(".section--submenu--anchor").length > 0) {
  //             if (($("body").find(".section--submenu--anchor").offset().top <= $("body").find("#"+thisHash).offset().top)&&(!$("body").find(".section--submenu--anchor").hasClass("section--submenu--static"))) {
  //               scrollOffset += $("body").find(".section--submenu--anchor").outerHeight();
  //             }
  //           }
  //           $(window).scrollTop($("body").find("#"+thisHash).offset().top + (-1 * scrollOffset));
  //         }
  //       },100);
  //     });
  //   }
  // }
  $("body").find("a[href^='#']").click(function (e) {
    var thisHash     = $(this).attr('href').slice(1);
		var headerHeight = $('header').outerHeight();
		console.log('%c Info ', 'color: white; background-color: blue', thisHash);
		if ($("body").find("#"+thisHash).length > 0) {
      if ($("body").find("#"+thisHash).length > 1) {
        var elIndex = 0;
        $("body").find("#"+thisHash).each(function (index) {
          if ($(this).css("display") != "none") {
            elIndex = index;
            return false;
          }
        });
        easeTo( $("body").find("#"+thisHash+":eq("+elIndex+")"), headerHeight * 1.5, 500 );
        e.preventDefault();
        return false;
      } else {
        easeTo($("body").find("#"+thisHash), headerHeight * 1.5, 500 );
        e.preventDefault();
        return false;
      }
    }
  });
});

{% if config.assets_List["hubui"] == true %}
/* HubUI */
$(document).ready(function () {
  $("body").formready(function () {
    $("body").hubui();
  });
});
{% endif %}

/* FANCYBOX */
$(document).ready(function () {
  Fancybox.defaults.infinite = 0;
  Fancybox.bind('[data-fancybox], .fancybox', {
    aspectRatio:true,
    infobar: false,
    autoSize: true,
    infinite: false,
    buttons: [
      "close"
    ],
    afterClose: function () {
      $('body').removeClass("fancybox-active compensate-for-scrollbar");
    }
  });
  Fancybox.defaults.hash = false;
});


