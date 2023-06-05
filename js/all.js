$(document).ready(function() {
  $(".navbar-btn").click(function(){
    $(".navbar-collapse").toggleClass("show");
  });
  $('.question-answer').hide();
  $(".question-item").click(function(e){
    $(this).find('.add-icon').toggleClass('d-none');
    $(this).find('.minus-icon').toggleClass('d-block');
    $(this).toggleClass('active');
    $(this).find('p').slideToggle(200);  
  });
  $('.filter-btn').click(function(e){
    $('.filter-dropdown-menu').toggleClass('show');
  });
  $('.new-to-old').click(function(e){
    e.preventDefault();
    $('.filter-dropdown-menu').toggleClass('show');
    $('.filter-text').text($('.new-to-old').text());
  });
  $('.old-to-new').click(function(e){
    e.preventDefault();
    $('.filter-dropdown-menu').toggleClass('show');
    $('.filter-text').text($('.old-to-new').text());
  });

  // 輪播套件
  const swiper = new Swiper('.swiper', {
    spaceBetween: 24,
    breakpoints: {
      992:{
      slidesPerView: 3
    },
      768: {
        slidesPerView: 2
      },
      375: {
        slidesPerView: 1
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });


});
  
