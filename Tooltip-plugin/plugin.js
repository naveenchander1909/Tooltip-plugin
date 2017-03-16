(function($){

    /* Public variable*/

    var _tip = $('.tip'),
        _tipEle = $(_tip).selector;

    constructor = function(self, element){
        var base = this;
            base.$el = $(self);
            base.self = self;
            this.eleLeft = element.offset().left;
            this.eleTop = element.offset().top;

        base.init = function(){
            console.log('init');
        };

        base.offset = function(){

            var eleWidth = element.width()/2,
                tipWidth = $('.tip').width()/2,
                centerWidth = eleWidth - tipWidth;

            $('.tip').css({
                'left': this.eleLeft + centerWidth,
                'top': this.eleTop
            });
        };

        base.remove = function(){
            $('.tip').remove();
        };

        base.init();
    };

    $.fn.tooltip = function(options){

        var elememt = _tip;

        this.each(function(){
            var self = this,
                $this = $(this),
                $body = $('body'),
                $element = _tip;

            var obj = new constructor(this, $this);

            //default options
            settings = $.extend(
                {
                    text: "my first tooltip",
                    html: '',
                    position: 'bottom',
                    trigger: null,
                    shadow: false
                }, options
            );

            var settings_self = settings;

            tooltipPosition = function(trigger, element){

                var eleHeight = $this.outerHeight(),
                    eleWidth = $this.outerWidth(),
                    obj = new constructor(this, element),
                    eleOffset = element.offset().left,
                    bodyOffset = $('body').offset().left,
                    minWidth = element.outerWidth();

                var windowWid = $(window).width();
                var offsetRight = windowWid-eleOffset;

                bottomAlign = function(){
                    var eleHeight = element.outerHeight();

                    $(_tipEle).css({
                        'top': obj.eleTop+eleHeight+10
                    });

                    $(_tipEle).addClass('bottom');
                };

                topAlign = function(){
                    var tooltipHeight = $(_tipEle).outerHeight();
                    $(_tipEle).css({
                        'top': obj.eleTop-tooltipHeight-10
                    });

                    $(_tipEle).addClass('top');
                };

                leftAlign = function(){

                    $(_tipEle).css({
                        'top': obj.eleTop+5
                    });

                    if(bodyOffset == eleOffset){
                        $(_tipEle).removeClass('left').addClass('right');
                        $(_tipEle).css({
                            'left': obj.eleLeft+minWidth-10
                        });
                    } else{
                        $(_tipEle).css({
                            'left': obj.eleLeft-$('.tip').width()-35
                        });
                        $(_tipEle).addClass('left');
                    }
                };

                rightAlign = function(){

                    $(_tipEle).css({
                        'top': obj.eleTop+5
                    });

                    if(offsetRight<50){
                        $(_tipEle).css({
                            'left': obj.eleLeft-element.outerWidth()-10,
                        });
                    } else{
                        $(_tipEle).css({
                            'left': obj.eleLeft+element.outerWidth()+10,
                        });
                    }

                    $(_tipEle).addClass('right');
                },

                commonClass = function(){
                    $('.tip').addClass('common');
                };

                if(trigger == 'bottom'){
                    bottomAlign();
                    commonClass();
                    $(_tipEle).addClass('horizontal');
                } else if(trigger == 'left'){
                    leftAlign();
                    commonClass();
                    $(_tipEle).addClass('vertical');
                } else if(trigger == 'top'){
                    topAlign();
                    commonClass();
                    $(_tipEle).addClass('horizontal');
                } else if(trigger == 'right'){
                    rightAlign();
                    commonClass();
                    $(_tipEle).addClass('horizontal');
                }
            };

            showToolTip = function(val, element){
                if($(_tipEle).length < 1){
                    $body.append('<div class="tip">'+ val.text + val.html +'</div>');
                    $(_tipEle).addClass('show');
                    var obj = new constructor(this, element);
                    obj.offset();
                    tooltipPosition(val.position, element);
                }
            };

            hideToolTip = function(){
                obj.remove();
            },

            outsideClick = function(e){
                if(e.target == 'body'){
                }
            },

            shadowBox = function(){
                var shadow = $('.shadow');
                if(shadow.length < 1){
                    $body.append('<div class="shadow"></div>');
                    $('body').on('click', '.shadow', function(){
                        hideToolTip();
                        $(this).remove();
                    });
                }
            },

            init = function(){

                if(settings_self.trigger == 'hover' || settings_self.trigger == null){

                    $this.on('mouseover', function(){
                        showToolTip(settings_self, $this);
                    });

                    $this.on('mouseleave', function(){
                        hideToolTip();
                    });
                } else{
                    $this.on('click', function(){
                        if($(_tipEle).length > 0){
                            hideToolTip();
                        } else{
                            if(settings_self.shadow == true){
                                shadowBox();
                            }
                            showToolTip(settings_self, $this);
                        }
                    });
                }
            };

            init();

        });
        return this;
    }
})(jQuery);