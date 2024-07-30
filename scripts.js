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
})