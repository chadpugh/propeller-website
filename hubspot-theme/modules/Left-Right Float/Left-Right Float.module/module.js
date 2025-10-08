function sectionLeftrightfloat() {
  $("body").find(".section--leftrightfloat").each(function () {
    columnSpacing = parseFloat($(this).attr("data-columnspacing")||0)/100;
    columnWidth = parseFloat($(this).attr("data-columnwidth")||0);
    columnWidthTablet = parseFloat($(this).attr("data-tabletcolumnwidth")||0);
    gridWidth = $(this).find(".grid").width();
    gridOffset = $(this).find(".grid").offset().left;
    if (viewport("lap-and-up")) {
      $(this).find(".section--leftrightfloat--media").css({
        "width":(gridOffset + (gridWidth * (columnWidth - columnSpacing)))+"px"
      });
    }
    else if (viewport("tablet")) {
      $(this).find(".section--leftrightfloat--media").css({
        "width":(gridOffset + (gridWidth * (columnWidthTablet - columnSpacing)))+"px"
      });
    }
    else {
      $(this).find(".section--leftrightfloat--media").css({
        "width":""
      });
    }
    if (!$(this).hasClass("section--leftrightfloat--nominheight")) {
      contentHeight = $(this).find(".section--leftrightfloat--content").height();
      defaultPadding = parseInt(80);

      if ($(this).hasClass("section--leftrightfloat--fit")) {
        minHeight = parseInt($(this).find(".section--leftrightfloat--media img").outerHeight());
      } else {
        minHeight = parseInt($(this).attr("data-minheight")||0);
      }
 
      if (viewport(">tablet")) {
        if (contentHeight < minHeight) {
          if ( parseInt((minHeight-contentHeight)/2) <= 80 ) {
            $(this).find(".section--leftrightfloat--content").css({
              "padding-top":defaultPadding+"px",
              "padding-bottom":defaultPadding+"px"
            });
          } else {
            $(this).find(".section--leftrightfloat--content").css({
              "padding-top":Math.ceil((minHeight-contentHeight)/2)+"px",
              "padding-bottom":Math.ceil((minHeight-contentHeight)/2)+"px"
            });
          }
        } else {
          $(this).find(".section--leftrightfloat--content").css({
            "padding-top":parseInt(defaultPadding/2)+"px",
            "padding-bottom":parseInt(defaultPadding/2)+"px"
          });
        }
      }
      else {
        $(this).find(".section--leftrightfloat--content").css({
          "padding-top":"",
          "padding-bottom":""
        });
      }
    }
  });
}
sectionLeftrightfloat();
$(document).ready(function () {
  sectionLeftrightfloat();
  $(window).resize(function () {
    sectionLeftrightfloat();
  });
});
$(document).on('load',function () {
  sectionLeftrightfloat();
});