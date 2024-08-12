function OpenMenu(button) {
    let currentButtonScope = button.attr("aria-controls");

    if (button.attr("data-state") == "closed"){
        button.attr("data-state", "opened").attr("aria-expanded", "true");
        jQuery("#" + currentButtonScope).attr("data-state", "opened");
    } else {
        button.attr("data-state", "closed").attr("aria-expanded", "false");
        jQuery("#" + currentButtonScope).attr("data-state", "closed");
    }
}

jQuery(document).ready(function() {
    const Banner = jQuery(".ArticleBanner");
    const Modal = jQuery(".ArticleBannerModal");
    const ModalContent = jQuery(".ArticleBannerModalContent");

    function getDistanceToTop(element) {
        var elementOffset = $(element).offset().top;
        var windowScrollTop = $(window).scrollTop();
        var distance = elementOffset - windowScrollTop;
        return distance;
    }

    function ImageZoomOut(){
        Banner.attr("data-rmiz-wrap", "visible");
        Modal.attr("data-rmiz-overlay", "false");
        ModalContent.attr("data-rmiz-modal-content", "false");
        ModalContent.css({
            "transition-duration": "300ms",
            transform: `scale(1) translate(0px, 0px)`
        });
    }

    function OpenCloseModal() {
        let Modal = jQuery(".VideoModal");
        Modal.toggleClass("opened")
    }

    jQuery(".DropDownBtn").hover(function(){
        OpenMenu(jQuery(this))
    });

    jQuery(".MobileNavBtn").on("click", function(){
        if(jQuery(this).hasClass('MobileBurgerButton')) {
            jQuery(this).html() == "Menu" 
                ? jQuery(this).html("Close").addClass("LightBtn") 
                : jQuery(this).html("Menu").removeClass("LightBtn");
        }
        OpenMenu(jQuery(this));
        
    });

    let lastScroll = 0;
    const navbar = jQuery(".HeaderSection");

    jQuery(window).on("scroll", function() {
        let windowWidth = jQuery(window).innerWidth();
        
        if (windowWidth > 1280){
            const currentScroll = jQuery(this).scrollTop();

            if (currentScroll > lastScroll) {
                    navbar.css('top', '-100px'); 
                } else {
                    navbar.css('top', 'clamp(24px,1.6666666667vw,32px)');
                }
                lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }
    })

    jQuery(Banner).on("click", function(){
        const BannerHeight = Banner.innerHeight();
        const BannerWidth = Banner.innerWidth();
        const BannerOffsetLeft = Banner.offset().left;
        const BannerOffsetTop = getDistanceToTop(Banner);
        const Scale = (window.innerWidth * 0.7) / BannerWidth;
        const ScaledElement = BannerHeight * Scale;
        const ScaledElementTopPosition = (visualViewport.height - ScaledElement) / 2;
        const ScaledElementDiff = (ScaledElement - BannerHeight) / 2;
        const TranslateY = ((ScaledElementTopPosition + ScaledElementDiff) - BannerOffsetTop) / Scale;

        Banner.attr("data-rmiz-wrap", "hidden");
        ModalContent.attr("data-rmiz-modal-content", "true");
        Modal.attr("data-rmiz-overlay", "true");

        ModalContent.css({
            height: BannerHeight,
            width: BannerWidth,
            top: BannerOffsetTop,
            left: BannerOffsetLeft,
            "transition-duration": "300ms",
            transform: `scale(${Scale}) translate(0px, ${TranslateY}px)`,
        });

        jQuery(window).on("scroll", ImageZoomOut);
    });

    jQuery(".ArticleBannerModal button").on("click", ImageZoomOut);

    jQuery(function() {
        function initializeSlider() {
            let slideWidth = $('.SingleSlide').outerWidth(true);
            let maxLeft = -(slideWidth * ($('.SingleSlide').length - 1));

            function updateDots(activeIndex) {
                $('.SliderSingleDot').removeClass('ActiveDot');
                $('.SliderSingleDot').eq(activeIndex).addClass('ActiveDot');
            }

            function moveSlides(newLeft, index) {
                $('#Slider').stop(true, true).animate({ left: newLeft });
                updateDots(index);
            }

            $("#Slider").draggable({
                axis: "x",
                stop: function(event, ui) {
                    let newLeft = Math.round(ui.position.left / slideWidth) * slideWidth;

                    if (newLeft > 0) {
                        newLeft = 0;
                    } else if (newLeft < maxLeft) {
                        newLeft = maxLeft;
                    }
        
                    let activeIndex = Math.abs(newLeft / slideWidth);
                    moveSlides(newLeft, activeIndex);
                }
            });

            $('.SliderSingleDot').on('click', function() {
                let index = $(this).index();
                let newLeft = -index * slideWidth;
                console.log(newLeft);
                moveSlides(newLeft, index);
            });
        };

        initializeSlider();

        $(window).resize(function() {
            initializeSlider();
        });
    });

    jQuery(".AnimatedSlider").hover(
        function() {
            jQuery(this).css("--animation-status", "paused");
        },
        function() {
            jQuery(this).css("--animation-status", "running");
        }
    );

    const Feedbacks = jQuery("#Slider").find(".FeedbackCard");
    const DotsContainer = jQuery(".FeedbackSliderDots");

    for (let i = 0; i < Feedbacks.length; i++) {
        DotsContainer.append('<button class="SliderSingleDot"><span></span></button>');
    }

    const FirstDot = jQuery(".SliderSingleDot")[0];
    jQuery(FirstDot).addClass("ActiveDot");
    
    jQuery(".CloseBtn").on("click", function(){
        OpenCloseModal();
    });

    jQuery(".OpenVideoModalBtn").on("click", function(){
        OpenCloseModal();
    });

    const video = jQuery("#Video")[0];
    const button = jQuery(".PlayVideoBtn");

    jQuery(video).on('play', function() {
        button.hide(); 
      });
    
    jQuery(video).on('pause', function() {
        button.show(); 
    });

    jQuery(button).on("click", function(){
        video.paused ? video.play() : video.pause();
    });
})