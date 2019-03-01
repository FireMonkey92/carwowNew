$(document).ready(function () {
    $(".header1").click(function () {
        // parent 1
        $('.parent1 .header1 i').removeClass('fa-arrow-right');
        $('.parent1 .header1 i').addClass('fa-arrow-down');
        //parent 2
        $('.parent2 .header2 i').removeClass('fa-arrow-down');
        $('.parent2 .header2 i').addClass('fa-arrow-right');
        //parent 3
        $('.parent3 .header3 i').removeClass('fa-arrow-down');
        $('.parent3 .header3 i').addClass('fa-arrow-right');
        $(".parent1 .content1").slideToggle();
        $(".parent2 .content2").slideUp();
        $(".parent3 .content3").slideUp();
    });
    $(".header2").click(function () {
        //parent 2
        $('.parent2 .header2 i').removeClass('fa-arrow-right');
        $('.parent2 .header2 i').addClass('fa-arrow-down');
        // //parent 2
        $('.parent1 .header1 i').removeClass('fa-arrow-down');
        $('.parent1 .header1 i').addClass('fa-arrow-right');
        // //parent 3
        $('.parent3 .header3 i').removeClass('fa-arrow-down');
        $('.parent3 .header3 i').addClass('fa-arrow-right');
        $(".parent1 .content1").slideUp();
        $(".parent2 .content2").slideToggle();
        $(".parent3 .content3").slideUp();

    });
    $(".header3").click(function () {
        //parent 3
        $('.parent3 .header3 i').removeClass('fa-arrow-right');
        $('.parent3 .header3 i').addClass('fa-arrow-down');
        // //parent 2
        $('.parent1 .header1 i').removeClass('fa-arrow-down');
        $('.parent1 .header1 i').addClass('fa-arrow-right');
        // //parent 2
        $('.parent2 .header2 i').removeClass('fa-arrow-down');
        $('.parent2 .header2 i').addClass('fa-arrow-right');
        $(".parent1 .content1").slideUp();
        $(".parent2 .content2").slideUp();
        $(".parent3 .content3").slideToggle();
    });
});