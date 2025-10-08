$(document).ready(function () {
  $("body").find(".section--faqs--faq--toggle").click(function () {
    thisGroup = $(this).closest(".section--faqs--faq");
    thisContent = thisGroup.find(".section--faqs--faq--content");
    thisContentInner = thisContent.find(".section--faqs--faq--content--inner");
    if (!thisGroup.hasClass("active")) {
      thisContent.slideDown();
      thisGroup.addClass("active");
    } else {
      thisContent.slideUp();
      thisGroup.removeClass("active");
    }
  });
  $("body").find(".section--faqs--faq--content--inner").scroll(function () {
    $(this).scrollTop(0);
  });
});