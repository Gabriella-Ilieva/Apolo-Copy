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

    jQuery(".AnimatedSlider").hover(
        function() {
            jQuery(this).css("--animation-status", "paused");
        },
        function() {
            jQuery(this).css("--animation-status", "running");
        }
    );
})