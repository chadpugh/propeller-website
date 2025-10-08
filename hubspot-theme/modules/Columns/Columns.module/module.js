function sizeSectioncolumnsdividers() {
  setTimeout(function () {
    $("body").find(".section--columns--hasdividers").each(function () {
      thisSection = $(this);
      thisSectionColumnVerticalPadding = (thisSection.find(".section--columns--column:eq(0)").outerHeight() - thisSection.find(".section--columns--column:eq(0)").height())/2;
      thisSection.find(".section--columns--divider--vertical").css({
        "height":"",
        "margin":""
      });
      thisSection.find(".section--columns--column--body, .section--coulumns--column--body--content").css({
        "min-height":""
      });
      rowHeights = [];
      contentHeights = [];
      columnHeight = 0;
      contentHeight = 0;
      totalColumns = thisSection.find(".section--columns--column").length;
      columnWidths = {}
      thisColumns = thisSection.find(".section--columns--grid");
      if (thisColumns.attr("data-columns--desk")) {
        columnWidths["desk"] = parseInt(thisColumns.attr("data-columns--desk"));
      }
      if (thisColumns.attr("data-columns--desk")) {
        columnWidths["lap"] = parseInt(thisColumns.attr("data-columns--lap"));
      }
      if (thisColumns.attr("data-columns--desk")) {
        columnWidths["tablet"] = parseInt(thisColumns.attr("data-columns--tablet"));
      }
      if (thisColumns.attr("data-columns--desk")) {
        columnWidths["palm"] = parseInt(thisColumns.attr("data-columns--palm"));
      }
      thisSection.find(".section--columns--column").each(function (index) {
        thisHeight = $(this).find(".section--columns--column--body").height();
        contentHeight = $(this).find(".section--coulumns--column--body--content").height();
        if (viewport("desk")) {
          rowIndex = Math.floor(index / columnWidths["desk"]);
        }
        else if (viewport("lap")) {
          rowIndex = Math.floor(index / columnWidths["lap"]);
        }
        else if (viewport("tablet")) {
          rowIndex = Math.floor(index / columnWidths["tablet"]);
        }
        else if (viewport("palm")) {
          rowIndex = Math.floor(index / columnWidths["palm"]);
        }
        else {
          rowIndex = 0; 
        }
        if (!rowHeights[rowIndex]) {
          rowHeights.push(0);
          contentHeights.push(0);
        }
        if (thisHeight > rowHeights[rowIndex]) {
          rowHeights[rowIndex] = thisHeight;
        }
        if (contentHeight > contentHeights[rowIndex]) {
          contentHeights[rowIndex] = contentHeight;
        }
      });
      if (((viewport("desk"))&&(thisSection.find(".section--columns--column").hasClass("one-whole")))||((viewport("lap"))&&(thisSection.find(".section--columns--column").hasClass("lap-one-whole")))||((viewport("tablet"))&&(thisSection.find(".section--columns--column").hasClass("tablet-one-whole")))||((viewport("palm"))&&(thisSection.find(".section--columns--column").hasClass("palm-one-whole")))) {

      }
      else {
        if (viewport("desk")) {
          columnCount = columnWidths["desk"]; 
        }
        else if (viewport("lap")) {
          columnCount = columnWidths["lap"]; 
        }
        else if (viewport("tablet")) {
          columnCount = columnWidths["tablet"]; 
        }
        else if (viewport("palm")) {
          columnCount = columnWidths["palm"]; 
        }
        else {
          columnCount = 1; 
        }
        thisSection.find(".section--columns--column").each(function (index) {
          if (viewport("desk")) {
            rowIndex = Math.floor(index / columnWidths["desk"]);
          }
          else if (viewport("lap")) {
            rowIndex = Math.floor(index / columnWidths["lap"]);
          }
          else if (viewport("tablet")) {
            rowIndex = Math.floor(index / columnWidths["tablet"]);
          }
          else if (viewport("palm")) {
            rowIndex = Math.floor(index / columnWidths["palm"]);
          }
          else {
            rowIndex = 0; 
          }
          $(this).find(".section--coulumns--column--body--content").css({
            "min-height":contentHeights[rowIndex]+"px"
          });
          $(this).find(".section--columns--column--body").css({
            "min-height":rowHeights[rowIndex]+"px"
          });
        });
        thisSection.find(".section--columns--divider--vertical").each(function (index) {
          rowIndex = Math.floor(index / columnCount);
          $(this).css({
            "height":(rowHeights[rowIndex] + 0)+"px",
            "margin":(thisSectionColumnVerticalPadding)+"px 0px"
          });
        });
      }
    }); 
  },100);
}
sizeSectioncolumnsdividers();
$(document).ready(function () {
  sizeSectioncolumnsdividers();
  $(window).resize(function () {
    sizeSectioncolumnsdividers();
  });
});
$(window).on('load',function () {
  sizeSectioncolumnsdividers();
});