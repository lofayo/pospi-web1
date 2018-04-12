/*"关于我们"页面的交互*/

// 点击导航切换头部背景和底部文本

$(document).ready(function() {
    // $('.about_us_nav li').click(function() {
    //     $('.about_us_nav li').removeClass('nav_active');
    //     $(this).addClass('nav_active');
    //     var currentIndex = $(this).index();

    //     $('.header_nav section').removeClass('active');
    //     $('.header_nav section').eq(currentIndex).addClass('active');

    //     $('.text_nav section').removeClass('active');
    //     $('.text_nav section').eq(currentIndex).addClass('active');
    // });


    // 加入我们的职位申请
    $('.join_us_list li').click(function() {


        $('.job_inviting').show();
        $('html').addClass('html_unscroll');

        var currentIndex = $(this).index();
        $('.job_inviting li').removeClass('active');
        $('.job_inviting li').eq(currentIndex).addClass('active');
    })

    $('.close').click(function() {
        $('.job_inviting').hide();
        $('html').removeClass('html_unscroll');

    })


    /*
        头部导航，鼠标移入呼出对应子项
    */

    // 解析URL——》获取具体子页面——》让对应导航标识

    /*    
     *    解析URL，获取当前页面标识
     *    如：file:///C:/Users/Administrator/Desktop/POSPI-web/html/source.html——》source.html
     */
    function getURLIdentification(url) {
        var lastSlashIndex = url.lastIndexOf('/');
        return url.slice(lastSlashIndex + 1);
    }

    var urlIdentification = getURLIdentification(location.href);

    $('.nav_item').each(function() {
        if ($(this).find('.nav_item_list').length !== 0) {
            $('.nav_item_list').find('a').each(function() {
                if ($(this).attr('href') === urlIdentification) {
                    // 先标识主导航
                    $(this).parents('.nav_item').find('span').addClass('active');

                    // 再标识对应子导航
                    var $curImg = $(this).children('img');
                    var src = $curImg.attr('src')
                    var dataSrc = $curImg.data('src');
                    $curImg.attr('src', dataSrc).data('src', src);

                    // 给个标识，表明选中
                    $curImg.attr('isCheck', 'true');
                }
            })

        } else {
            if ($(this).find('a').attr('href') === urlIdentification) {
                $(this).find('span').addClass('active');
            }
        }
    })

    // 进入页面，获取当前页面导航标识index
    var curNavItemIndex = -1;
    $('.nav_item').each(function() {
        if ($(this).find('span').hasClass('active')) {
            curNavItemIndex = $(this).index();
        }
    })

    $('.nav_item').mouseover(function() {
        $('.nav_item').find('span').removeClass('active');
        $(this).find('span').addClass('active');
        $(this).children('ul').show();
    });

    $('.nav_item').mouseout(function() {
        $(this).find('span').removeClass('active');
        $(this).children('ul').hide();

        // 鼠标移开，还原初始标识
        $('.nav_item').eq(curNavItemIndex).find('span').addClass('active');
    });

    $('.nav_item_list').mouseout(function() {
        $(this).hide();
    });

    $('.nav_item_list img').on('mouseenter mouseleave', function() {
        if ($(this).attr('isCheck') !== 'true') {
            var src = $(this).attr('src')
            var dataSrc = $(this).data('src');
            $(this).attr('src', dataSrc).data('src', src);
        }
    })
})