/**
 * Created by Administrator on 2017/10/28.
 */

;function osSlider(objs) {
    var that = this;
    that.objs = objs;
    that.pNode = $(that.objs.pNode);
    that.cNodes = that.pNode.find(that.objs.cNode);
    that.cNodeNums = that.cNodes.length;
    that.nowNodeKey = 0;
    that.width = that.cNodes.find('img').width();
    that.height = that.cNodes.find('img').height();
    that.moveFlag = true;
    that.isPause = false;
    that.speedNum = 0;
    if (!that.objs.speed) {
        that.objs.speed = 3000
    };
    if (!that.objs.autoPlay) {
        that.objs.autoPlay = true
    };
    that.init = function() {
        for(var i=0;i<that.cNodeNums;i++){
            that.pNode.find("img").css({"width":that.width+"px","height":that.height+"px"});
        };
        that.pNode.addClass('osSlider-main');
        that.pNode.css({
            'width': that.width,
            'height': that.height,
            'overflow': 'hidden',
            'position': 'relative'
        });

        var $toggleBtn = $('<ul class="slider-btn"><li class="slider-btn-prev"></li><li class="slider-btn-next"></li></ul>');
        $toggleBtn.appendTo(that.pNode);
        $(that.pNode).find('.slider-btn-prev').bind('click', function() {
            that.toggleMove('prev')
        });
        $(that.pNode).find('.slider-btn-next').bind('click', function() {
            that.toggleMove('next')
        });
        if (that.objs.autoPlay) {
            that.moveTime()
        }
    };
    that.toggleMove = function(command, tid) {
        if (that.moveFlag) {
            if (!command) {
                if (that.nowNodeKey == tid) {
                    return
                } else if ((that.nowNodeKey == 0 && tid == that.cNodeNums - 1) || tid < that.nowNodeKey) {
                    command = 'prev'
                } else {
                    command = 'next'
                }
            };
            if (!tid) {
                if (tid == 0) {} else if (command == 'prev') {
                    tid = that.nowNodeKey - 1;
                    if (that.nowNodeKey == 0) {
                        tid = that.cNodeNums - 1
                    }
                } else {
                    tid = that.nowNodeKey + 1;
                    if (that.nowNodeKey == that.cNodeNums - 1) {
                        tid = 0
                    }
                }
            };
            that.moveSwitch(0, command, tid)
        }
    };
    that.moveSwitch = function(mid, command, tid) {
        nid = that.nowNodeKey;
        that.moveFlag = false;
        that.speedNum = 0;
        that.gridTop(tid, 1)
    };
    that.gridTop = function(tid) {
        that.cNodes[tid].style.zIndex = 19;
        var $backHTML = that.cNodes[that.nowNodeKey].innerHTML;
        that.cNodes[that.nowNodeKey].innerHTML = '';
        for (var i = 0; i < 10; i++) {
            var $cvNode = $('<div class="cvNode"></div>');
            $(that.cNodes[that.nowNodeKey]).append($cvNode);
            $cvNode.html($backHTML);
            $cvNode.css({
                'position': 'absolute',
                'width': that.width / 10 + 'px',
                'height': that.height + 'px',
                'zIndex': 20,
                'overflow': 'hidden',
                'left': that.width / 10 * i + 'px',
                'top': '0'
            });
            $cvNode.find('*').first().css({
                'display': 'block',
                'margin-left': that.width / -10 * i + 'px'
            })
        };
        $(that.cNodes[that.nowNodeKey]).find('.cvNode').each(function(index, el) {
            var sp = 100 * index;
            $(this).animate({
                top: $(this).height() + 'px'
            }, 500 + sp, "linear")
        });
        setTimeout(function() {
            that.moveFlag = true;
            that.cNodes[tid].style.zIndex = 20;
            that.cNodes[that.nowNodeKey].style.zIndex = that.nowNodeKey;
            $(that.cNodes[that.nowNodeKey]).html($backHTML);
            that.nowNodeKey = tid;
        }, 1380)
    };
    that.moveTime = function() {
        setTimeout(function() {
            if (that.moveFlag) {
                that.speedNum++;
                if (that.speedNum >= that.objs.speed / 100) {
                    that.speedNum = 0;
                    that.toggleMove('next')
                }
            };
            if (!that.isPause) {
                setTimeout(arguments.callee, 100)
            }
        }, 100)
    };
    that.init()
};