$(function(){
	
	//активируем скроллпан для стилизации прокрутки
	$('.column__scrollable, .column__scrollable2').jScrollPane();
	
	//функция вызова главного окна, при нажатии на главную кнопку
	$('.btn-wrapper__btn').click(function() {
	  $('.main').fadeIn('fast')
	  .css('visibility', 'visible');
	});
	
	//функция переключения табов между "друзьями" и "учасниками потока"
	$(".column .column__scrollable").not(":first").hide();//прячем все, кроме первой табы
	$(".tab").click(function() {
		$(".tab").removeClass("active").eq($(this).index()).addClass("active");
		$(".column .column__scrollable").hide().eq($(this).index()).fadeIn()
	}).eq(0).addClass("active");
	
	//функция появления всплывающей подсказки(общие потоки)
	$('.single-user__info').mouseover(function(){
		$(this).prepend('<div class="single-user__info__desc"></div>');
		$('.single-user__info__desc').html($(this).attr("data-info"));
	}).mouseleave(function(){
		$('.single-user__info__desc').remove();
	});
	
	//функция добавления людей в правую колонку
	function addingUser(){
		$(this).parent().clone(true, true).prependTo('.column__scrollable2 .jspContainer .jspPane').find('.single-user__arrow').remove();
		$(this).parent().css('opacity', '0.5');
		$(this).off();
		$('.column__scrollable').jScrollPane({ autoReinitialise: true }); 
		$('.column__scrollable2').jScrollPane({ autoReinitialise: true });
	}
	$(".single-user__arrow").on('click', addingUser);

	//функция удаления людей из правой колонки
	$('.single-user__close').click(function() {
		var name = $(this).next( ".single-user__name" ).text();
		$('.column__scrollable .single-user__name').filter(function() {
			return $(this).text().trim() == name;
		}).parent().css( "opacity", "1" ).find('.single-user__arrow').on("click", addingUser);
		$(this).parent().remove();
	  $('.column__scrollable').jScrollPane({ autoReinitialise: true }); 
	  $('.column__scrollable2').jScrollPane({ autoReinitialise: true });
	});
	
	//функция закрытия главного окна
	$('.close-all').click(function() {
	  $('.main').fadeOut('fast');
	});
	
	//Динамический поиск по именам
	$('.single-user__name').each(function(){
		$(this).attr('data-search-term', $(this).text().toLowerCase());
	});
	$('.column__search').on('keyup', function(){
		var searchTerm = $(this).val().toLowerCase();
		$('.single-user__name').each(function(){
			if ($(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
				$(this).parent().show();
				$('.column__scrollable').jScrollPane({ autoReinitialise: true }); 
			} else {
				$(this).parent().hide();
				$('.column__scrollable').jScrollPane({ autoReinitialise: true }); 
			}
		});
	});
	
	
	
});