$.each(filterFilters, function (key,value) {
  for (i=0;i<value.sort().length;i++) {
    $('.section--resources--filters--input select[rel="'+key+'"]').append("<option value='"+value[i]+"'>"+value[i]+"</option>");
  }
});
var defaultFilter = "all";
if (window.location.hash) {
  hashSplit = window.location.hash.slice(1).split("&");
  for (i=0;i<hashSplit.length;i++) {
    if (hashSplit[i].indexOf("=") > 0) {
      thisSplit = hashSplit[i].indexOf("=");
      if ($('.section--resources--filters--input select[rel="'+hashSplit[i].slice(0,thisSplit)+'"]').length > 0) {
        if ($('.section--resources--filters--input select[rel="'+hashSplit[i].slice(0,thisSplit)+'"] option[value="'+decodeURIComponent(hashSplit[i].slice(thisSplit+1))+'"]').length > 0) {
          $('.section--resources--filters--input select[rel="'+hashSplit[i].slice(0,thisSplit)+'"]').find('option').attr('selected',false);
          $('.section--resources--filters--input select[rel="'+hashSplit[i].slice(0,thisSplit)+'"] option[value="'+decodeURIComponent(hashSplit[i].slice(thisSplit+1))+'"]').attr('selected',true);
          if (defaultFilter == "all") {
            defaultFilter = ".filter--"+hashSplit[i].slice(0,thisSplit).replace(/\s+/g, '-').toLowerCase()+"--"+decodeURIComponent(hashSplit[i].slice(thisSplit+1)).replace(/\s+/g, '-').toLowerCase();
          }
          else {
            defaultFilter += ".filter--"+hashSplit[i].slice(0,thisSplit).replace(/\s+/g, '-').toLowerCase()+"--"+decodeURIComponent(hashSplit[i].slice(thisSplit+1)).replace(/\s+/g, '-').toLowerCase();
          }
        }
      }
    }
  }
}
console.log(defaultFilter);

$('.section--resources--listing').mixItUp({
  load: {
    filter: defaultFilter
  },
  callbacks: {
    onMixStart: function(state) {
      $('.section--resources--listing--empty').addClass('visuallyhidden');
      equalize();
      setTimeout(function () {
        equalize();
      },100);
    },
    onMixEnd: function(state) {
      if (state.totalShow == 0) {
        $('.section--resources--listing--empty').removeClass('visuallyhidden');
      }
      equalize();
    }
  }
});

$('.section--filters--input select').change(function () {
  var mixString = "all";
  $('.section--filters--input').find('select').each(function () {
    if ($(this).val()&&($(this).val() != "all")) {
      if (mixString == "all") {
        mixString = ".filter--"+$(this).attr('rel').replace(/\s+/g, '-').toLowerCase()+"--"+$(this).val().replace(/\s+/g, '-').toLowerCase();
      }
      else {
        mixString += ".filter--"+$(this).attr('rel').replace(/\s+/g, '-').toLowerCase()+"--"+$(this).val().replace(/\s+/g, '-').toLowerCase();
      }
    }
  });
  console.log('%c Info ', 'color: white; background-color: blue', mixString);
  $('.section--resources--listing').mixItUp('filter', mixString);
  pageHashList = [];
  $('body').find('.section--resources--filters--input select').each(function () {
    if ($(this).val()&&($(this).val() != "all")) {
      if (mixString != "all") {
        pageHashList.push($(this).attr('rel')+"="+$(this).val());
      }
    }
  });
  curScroll = $(window).scrollTop();
  if (pageHashList.length > 0) {
    window.location.hash = "#"+pageHashList.join("&");
  }
  else {
    window.location.hash = "#";
  }
  $(window).scrollTop(curScroll);
});