
$(document).ready(function(){
  $('.carousel').slick({
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    variableWidth: true,
    arrows:true,
    prevArrow: '<i class="fa fa-arrow-left fa-2x arrow" aria-hidden="true"></i>',
    nextArrow: '<i class="fa fa-arrow-right fa-2x arrow" aria-hidden="true"></i>',
    appendArrows:$('.slider-navigation')
  });

});