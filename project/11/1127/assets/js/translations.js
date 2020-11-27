(window.localization = window.localization || {}),
    (function (n) {
        localization.translate = {
            menu: function () {
                $("#welcome-menu").text(i18n.__("Welcome"));
                $("[data-section='whoweare']").text(i18n.__("Who we are"));
                $("[data-section='whatwedo']").text(i18n.__("What we do"));
                $("[data-section='getintouch']").text(i18n.__("Get in touch"));
            },

            welcome: function () {
                $("#welcome .inner p").text(i18n.__("test"));
            },
            init: function () {
                this.welcome();
                this.menu();
            },
        };
        n(function () {
            localization.translate.init();
        });
    })(jQuery);
