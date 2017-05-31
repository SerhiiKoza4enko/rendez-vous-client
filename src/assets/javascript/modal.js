function showModal(){$("#myModal").modal("show")}+function(t){"use strict";function e(e,s){return this.each(function(){var i=t(this),n=i.data("bs.modal"),a=t.extend({},o.DEFAULTS,i.data(),"object"==typeof e&&e);n||i.data("bs.modal",n=new o(this,a)),"string"==typeof e?n[e](s):a.show&&n.show(s)})}var o=function(e,o){this.options=o,this.$body=t(document.body),this.$element=t(e),this.$backdrop=this.isShown=null,this.scrollbarWidth=0,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};o.VERSION="3.3.2",o.TRANSITION_DURATION=300,o.BACKDROP_TRANSITION_DURATION=150,o.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},o.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},o.prototype.show=function(e){var s=this,i=t.Event("show.bs.modal",{relatedTarget:e});this.$element.trigger(i),this.isShown||i.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var i=t.support.transition&&s.$element.hasClass("fade");s.$element.parent().length||s.$element.appendTo(s.$body),s.$element.show().scrollTop(0),s.options.backdrop&&s.adjustBackdrop(),s.adjustDialog(),i&&s.$element[0].offsetWidth,s.$element.addClass("in").attr("aria-hidden",!1),s.enforceFocus();var n=t.Event("shown.bs.modal",{relatedTarget:e});i?s.$element.find(".modal-dialog").one("bsTransitionEnd",function(){s.$element.trigger("focus").trigger(n)}).emulateTransitionEnd(o.TRANSITION_DURATION):s.$element.trigger("focus").trigger(n)}))},o.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.modal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").attr("aria-hidden",!0).off("click.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(o.TRANSITION_DURATION):this.hideModal())},o.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},o.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},o.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},o.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},o.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},o.prototype.backdrop=function(e){var s=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&i;if(this.$backdrop=t('<div class="modal-backdrop '+i+'" />').prependTo(this.$element).on("click.dismiss.bs.modal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!e)return;n?this.$backdrop.one("bsTransitionEnd",e).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):e()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var a=function(){s.removeBackdrop(),e&&e()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",a).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION):a()}else e&&e()},o.prototype.handleUpdate=function(){this.options.backdrop&&this.adjustBackdrop(),this.adjustDialog()},o.prototype.adjustBackdrop=function(){this.$backdrop.css("height",0).css("height",this.$element[0].scrollHeight)},o.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},o.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},o.prototype.checkScrollbar=function(){this.bodyIsOverflowing=document.body.scrollHeight>document.documentElement.clientHeight,this.scrollbarWidth=this.measureScrollbar()},o.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.bodyIsOverflowing&&this.$body.css("padding-right",t+this.scrollbarWidth)},o.prototype.resetScrollbar=function(){this.$body.css("padding-right","")},o.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var s=t.fn.modal;t.fn.modal=e,t.fn.modal.Constructor=o,t.fn.modal.noConflict=function(){return t.fn.modal=s,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(o){var s=t(this),i=s.attr("href"),n=t(s.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,"")),a=n.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(i)&&i},n.data(),s.data());s.is("a")&&o.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){s.is(":visible")&&s.trigger("focus")})}),e.call(n,a,this)})}(jQuery),$("#mauticform_input_contactus_submit").on("click",function(){launchModal()}),$(window).on("load",function(){setTimeout(showModal,5e3)}),$(document).ready(function(){-1!=navigator.userAgent.indexOf("Mac OS X")&&$("body").addClass("platform-ios")});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjcmlwdC5qcyJdLCJuYW1lcyI6WyJzaG93TW9kYWwiLCIkIiwibW9kYWwiLCJQbHVnaW4iLCJvcHRpb24iLCJfcmVsYXRlZFRhcmdldCIsInRoaXMiLCJlYWNoIiwiJHRoaXMiLCJkYXRhIiwib3B0aW9ucyIsImV4dGVuZCIsIk1vZGFsIiwiREVGQVVMVFMiLCJzaG93IiwiZWxlbWVudCIsIiRib2R5IiwiZG9jdW1lbnQiLCJib2R5IiwiJGVsZW1lbnQiLCIkYmFja2Ryb3AiLCJpc1Nob3duIiwic2Nyb2xsYmFyV2lkdGgiLCJyZW1vdGUiLCJmaW5kIiwibG9hZCIsInByb3h5IiwidHJpZ2dlciIsIlZFUlNJT04iLCJUUkFOU0lUSU9OX0RVUkFUSU9OIiwiQkFDS0RST1BfVFJBTlNJVElPTl9EVVJBVElPTiIsImJhY2tkcm9wIiwia2V5Ym9hcmQiLCJwcm90b3R5cGUiLCJ0b2dnbGUiLCJoaWRlIiwidGhhdCIsImUiLCJFdmVudCIsInJlbGF0ZWRUYXJnZXQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJjaGVja1Njcm9sbGJhciIsInNldFNjcm9sbGJhciIsImFkZENsYXNzIiwiZXNjYXBlIiwicmVzaXplIiwib24iLCJ0cmFuc2l0aW9uIiwic3VwcG9ydCIsImhhc0NsYXNzIiwicGFyZW50IiwibGVuZ3RoIiwiYXBwZW5kVG8iLCJzY3JvbGxUb3AiLCJhZGp1c3RCYWNrZHJvcCIsImFkanVzdERpYWxvZyIsIm9mZnNldFdpZHRoIiwiYXR0ciIsImVuZm9yY2VGb2N1cyIsIm9uZSIsImVtdWxhdGVUcmFuc2l0aW9uRW5kIiwicHJldmVudERlZmF1bHQiLCJvZmYiLCJyZW1vdmVDbGFzcyIsImhpZGVNb2RhbCIsInRhcmdldCIsImhhcyIsIndoaWNoIiwid2luZG93IiwiaGFuZGxlVXBkYXRlIiwicmVzZXRBZGp1c3RtZW50cyIsInJlc2V0U2Nyb2xsYmFyIiwicmVtb3ZlQmFja2Ryb3AiLCJyZW1vdmUiLCJjYWxsYmFjayIsImFuaW1hdGUiLCJkb0FuaW1hdGUiLCJwcmVwZW5kVG8iLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsIiwiY2FsbGJhY2tSZW1vdmUiLCJjc3MiLCJzY3JvbGxIZWlnaHQiLCJtb2RhbElzT3ZlcmZsb3dpbmciLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRIZWlnaHQiLCJwYWRkaW5nTGVmdCIsImJvZHlJc092ZXJmbG93aW5nIiwicGFkZGluZ1JpZ2h0IiwibWVhc3VyZVNjcm9sbGJhciIsImJvZHlQYWQiLCJwYXJzZUludCIsInNjcm9sbERpdiIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc05hbWUiLCJhcHBlbmQiLCJjbGllbnRXaWR0aCIsInJlbW92ZUNoaWxkIiwib2xkIiwiZm4iLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiLCJocmVmIiwiJHRhcmdldCIsInJlcGxhY2UiLCJ0ZXN0IiwiaXMiLCJzaG93RXZlbnQiLCJqUXVlcnkiLCJsYXVuY2hNb2RhbCIsInNldFRpbWVvdXQiLCJyZWFkeSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImluZGV4T2YiXSwibWFwcGluZ3MiOiJBQW9WQSxRQUFTQSxhQUNMQyxFQUFFLFlBQVlDLE1BQU0sU0E1VXZCLFNBQVVELEdBQ1QsWUEwUUEsU0FBU0UsR0FBT0MsRUFBUUMsR0FDdEIsTUFBT0MsTUFBS0MsS0FBSyxXQUNmLEdBQUlDLEdBQVVQLEVBQUVLLE1BQ1pHLEVBQVVELEVBQU1DLEtBQUssWUFDckJDLEVBQVVULEVBQUVVLFVBQVdDLEVBQU1DLFNBQVVMLEVBQU1DLE9BQXlCLGdCQUFWTCxJQUFzQkEsRUFFakZLLElBQU1ELEVBQU1DLEtBQUssV0FBYUEsRUFBTyxHQUFJRyxHQUFNTixLQUFNSSxJQUNyQyxnQkFBVk4sR0FBb0JLLEVBQUtMLEdBQVFDLEdBQ25DSyxFQUFRSSxNQUFNTCxFQUFLSyxLQUFLVCxLQTdRckMsR0FBSU8sR0FBUSxTQUFVRyxFQUFTTCxHQUM3QkosS0FBS0ksUUFBaUJBLEVBQ3RCSixLQUFLVSxNQUFpQmYsRUFBRWdCLFNBQVNDLE1BQ2pDWixL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SyxZQUFjLFNBQVdSLEVBQUVVLFFBQVNZLFFBQVMsSUFBSW1GLEtBQUtILElBQVNBLEdBQVFDLEVBQVEvRixPQUFRRCxFQUFNQyxPQUVwSEQsR0FBTW1HLEdBQUcsTUFBTXRFLEVBQUV3QixpQkFFckIyQyxFQUFRN0MsSUFBSSxnQkFBaUIsU0FBVWlELEdBQ2pDQSxFQUFVcEUsc0JBQ2RnRSxFQUFRN0MsSUFBSSxrQkFBbUIsV0FDN0JuRCxFQUFNbUcsR0FBRyxhQUFlbkcsRUFBTW1CLFFBQVEsYUFHMUN4QixFQUFPNkUsS0FBS3dCLEVBQVNwRyxFQUFRRSxTQUcvQnVHLFFBS0Y1RyxFQUFFLHNDQUFzQzZDLEdBQUcsUUFBUyxXQUNuRGdFLGdCQU9EN0csRUFBRW1FLFFBQVF0QixHQUFHLE9BQVEsV0FDakJpRSxXQUFXL0csVUFBVyxPQVExQkMsRUFBRWdCLFVBQVUrRixNQUFNLFlBQ2tDLEdBQTVDQyxVQUFVQyxVQUFVQyxRQUFRLGFBQzVCbEgsRUFBRSxRQUFRMEMsU0FBUyIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIEJvb3RzdHJhcDogbW9kYWwuanMgdjMuMy4yXG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyNtb2RhbHNcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQ29weXJpZ2h0IDIwMTEtMjAxNSBUd2l0dGVyLCBJbmMuXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cblxuK2Z1bmN0aW9uICgkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBNT0RBTCBDTEFTUyBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgTW9kYWwgPSBmdW5jdGlvbiAoZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHRoaXMub3B0aW9ucyAgICAgICAgPSBvcHRpb25zXG4gICAgdGhpcy4kYm9keSAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgID0gJChlbGVtZW50KVxuICAgIHRoaXMuJGJhY2tkcm9wICAgICAgPVxuICAgIHRoaXMuaXNTaG93biAgICAgICAgPSBudWxsXG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IDBcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3RlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5maW5kKCcubW9kYWwtY29udGVudCcpXG4gICAgICAgIC5sb2FkKHRoaXMub3B0aW9ucy5yZW1vdGUsICQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignbG9hZGVkLmJzLm1vZGFsJylcbiAgICAgICAgfSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwuVkVSU0lPTiAgPSAnMy4zLjInXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgdHJhbnNpdGlvbiA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoYXQuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKVxuXG4gICAgICBpZiAoIXRoYXQuJGVsZW1lbnQucGFyZW50KCkubGVuZ3RoKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnQuYXBwZW5kVG8odGhhdC4kYm9keSkgLy8gZG9uJ3QgbW92ZSBtb2RhbHMgZG9tIHBvc2l0aW9uXG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnRcbiAgICAgICAgLnNob3coKVxuICAgICAgICAuc2Nyb2xsVG9wKDApXG5cbiAgICAgIGlmICh0aGF0Lm9wdGlvbnMuYmFja2Ryb3ApIHRoYXQuYWRqdXN0QmFja2Ryb3AoKVxuICAgICAgdGhhdC5hZGp1c3REaWFsb2coKVxuXG4gICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICB0aGF0LiRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC8vIGZvcmNlIHJlZmxvd1xuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5hZGRDbGFzcygnaW4nKVxuICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCBmYWxzZSlcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZWxlbWVudC5maW5kKCcubW9kYWwtZGlhbG9nJykgLy8gd2FpdCBmb3IgbW9kYWwgdG8gc2xpZGUgaW5cbiAgICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGF0LiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJykudHJpZ2dlcihlKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgIGUgPSAkLkV2ZW50KCdoaWRlLmJzLm1vZGFsJylcblxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcihlKVxuXG4gICAgaWYgKCF0aGlzLmlzU2hvd24gfHwgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuXG5cbiAgICB0aGlzLmlzU2hvd24gPSBmYWxzZVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgICQoZG9jdW1lbnQpLm9mZignZm9jdXNpbi5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50XG4gICAgICAucmVtb3ZlQ2xhc3MoJ2luJylcbiAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsIHRydWUpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcblxuICAgICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsICQucHJveHkodGhpcy5oaWRlTW9kYWwsIHRoaXMpKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQoTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgdGhpcy5oaWRlTW9kYWwoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVuZm9yY2VGb2N1cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAkKGRvY3VtZW50KVxuICAgICAgLm9mZignZm9jdXNpbi5icy5tb2RhbCcpIC8vIGd1YXJkIGFnYWluc3QgaW5maW5pdGUgZm9jdXMgbG9vcFxuICAgICAgLm9uKCdmb2N1c2luLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiYgIXRoaXMuJGVsZW1lbnQuaGFzKGUudGFyZ2V0KS5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcykpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuZXNjYXBlID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmtleWJvYXJkKSB7XG4gICAgICB0aGlzLiRlbGVtZW50Lm9uKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnLCAkLnByb3h5KGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUud2hpY2ggPT0gMjcgJiYgdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNTaG93bikge1xuICAgICAgdGhpcy4kZWxlbWVudC5vZmYoJ2tleWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duKSB7XG4gICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5icy5tb2RhbCcsICQucHJveHkodGhpcy5oYW5kbGVVcGRhdGUsIHRoaXMpKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub2ZmKCdyZXNpemUuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlTW9kYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdGhpcy4kZWxlbWVudC5oaWRlKClcbiAgICB0aGlzLmJhY2tkcm9wKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGJvZHkucmVtb3ZlQ2xhc3MoJ21vZGFsLW9wZW4nKVxuICAgICAgdGhhdC5yZXNldEFkanVzdG1lbnRzKClcbiAgICAgIHRoYXQucmVzZXRTY3JvbGxiYXIoKVxuICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdoaWRkZW4uYnMubW9kYWwnKVxuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVtb3ZlQmFja2Ryb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYmFja2Ryb3AgJiYgdGhpcy4kYmFja2Ryb3AucmVtb3ZlKClcbiAgICB0aGlzLiRiYWNrZHJvcCA9IG51bGxcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5iYWNrZHJvcCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHZhciBhbmltYXRlID0gdGhpcy4kZWxlbWVudC5oYXNDbGFzcygnZmFkZScpID8gJ2ZhZGUnIDogJydcblxuICAgIGlmICh0aGlzLmlzU2hvd24gJiYgdGhpcy5vcHRpb25zLmJhY2tkcm9wKSB7XG4gICAgICB2YXIgZG9BbmltYXRlID0gJC5zdXBwb3J0LnRyYW5zaXRpb24gJiYgYW5pbWF0ZVxuXG4gICAgICB0aGlzLiRiYWNrZHJvcCA9ICQoJzxkaXYgY2xhc3M9XCJtb2RhbC1iYWNrZHJvcCAnICsgYW5pbWF0ZSArICdcIiAvPicpXG4gICAgICAgIC5wcmVwZW5kVG8odGhpcy4kZWxlbWVudClcbiAgICAgICAgLm9uKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gZS5jdXJyZW50VGFyZ2V0KSByZXR1cm5cbiAgICAgICAgICB0aGlzLm9wdGlvbnMuYmFja2Ryb3AgPT0gJ3N0YXRpYydcbiAgICAgICAgICAgID8gdGhpcy4kZWxlbWVudFswXS5mb2N1cy5jYWxsKHRoaXMuJGVsZW1lbnRbMF0pXG4gICAgICAgICAgICA6IHRoaXMuaGlkZS5jYWxsKHRoaXMpXG4gICAgICAgIH0sIHRoaXMpKVxuXG4gICAgICBpZiAoZG9BbmltYXRlKSB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuXG5cbiAgICAgIGRvQW5pbWF0ZSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQucmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcblxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICAvLyB0aGVzZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG5cbiAgTW9kYWwucHJvdG90eXBlLmhhbmRsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmJhY2tkcm9wKSB0aGlzLmFkanVzdEJhY2tkcm9wKClcbiAgICB0aGlzLmFkanVzdERpYWxvZygpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0QmFja2Ryb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYmFja2Ryb3BcbiAgICAgIC5jc3MoJ2hlaWdodCcsIDApXG4gICAgICAuY3NzKCdoZWlnaHQnLCB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5hZGp1c3REaWFsb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1vZGFsSXNPdmVyZmxvd2luZyA9IHRoaXMuJGVsZW1lbnRbMF0uc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuXG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICAhdGhpcy5ib2R5SXNPdmVyZmxvd2luZyAmJiBtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJycsXG4gICAgICBwYWRkaW5nUmlnaHQ6IHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgIW1vZGFsSXNPdmVyZmxvd2luZyA/IHRoaXMuc2Nyb2xsYmFyV2lkdGggOiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRBZGp1c3RtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRlbGVtZW50LmNzcyh7XG4gICAgICBwYWRkaW5nTGVmdDogJycsXG4gICAgICBwYWRkaW5nUmlnaHQ6ICcnXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5jaGVja1Njcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmJvZHlJc092ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgPiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gICAgdGhpcy5zY3JvbGxiYXJXaWR0aCA9IHRoaXMubWVhc3VyZVNjcm9sbGJhcigpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBib2R5UGFkID0gcGFyc2VJbnQoKHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JykgfHwgMCksIDEwKVxuICAgIGlmICh0aGlzLmJvZHlJc092ZXJmbG93aW5nKSB0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcsIGJvZHlQYWQgKyB0aGlzLnNjcm9sbGJhcldpZHRoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0U2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgJycpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUubWVhc3VyZVNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHsgLy8gdGh4IHdhbHNoXG4gICAgdmFyIHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZSdcbiAgICB0aGlzLiRib2R5LmFwcGVuZChzY3JvbGxEaXYpXG4gICAgdmFyIHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2Lm9mZnNldFdpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gICAgdGhpcy4kYm9keVswXS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gICAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG4gIH1cblxuXG4gIC8vIE1PREFMIFBMVUdJTiBERUZJTklUSU9OXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09XG5cbiAgZnVuY3Rpb24gUGx1Z2luKG9wdGlvbiwgX3JlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgICAgdmFyIGRhdGEgICAgPSAkdGhpcy5kYXRhKCdicy5tb2RhbCcpXG4gICAgICB2YXIgb3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBNb2RhbC5ERUZBVUxUUywgJHRoaXMuZGF0YSgpLCB0eXBlb2Ygb3B0aW9uID09ICdvYmplY3QnICYmIG9wdGlvbilcblxuICAgICAgaWYgKCFkYXRhKSAkdGhpcy5kYXRhKCdicy5tb2RhbCcsIChkYXRhID0gbmV3IE1vZGFsKHRoaXMsIG9wdGlvbnMpKSlcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09ICdzdHJpbmcnKSBkYXRhW29wdGlvbl0oX3JlbGF0ZWRUYXJnZXQpXG4gICAgICBlbHNlIGlmIChvcHRpb25zLnNob3cpIGRhdGEuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4ubW9kYWxcblxuICAkLmZuLm1vZGFsICAgICAgICAgICAgID0gUGx1Z2luXG4gICQuZm4ubW9kYWwuQ29uc3RydWN0b3IgPSBNb2RhbFxuXG5cbiAgLy8gTU9EQUwgTk8gQ09ORkxJQ1RcbiAgLy8gPT09PT09PT09PT09PT09PT1cblxuICAkLmZuLm1vZGFsLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgJC5mbi5tb2RhbCA9IG9sZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuXG4gIC8vIE1PREFMIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PT09XG5cbiAgJChkb2N1bWVudCkub24oJ2NsaWNrLmJzLm1vZGFsLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgJHRoaXMgICA9ICQodGhpcylcbiAgICB2YXIgaHJlZiAgICA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgIHZhciAkdGFyZ2V0ID0gJCgkdGhpcy5hdHRyKCdkYXRhLXRhcmdldCcpIHx8IChocmVmICYmIGhyZWYucmVwbGFjZSgvLiooPz0jW15cXHNdKyQpLywgJycpKSkgLy8gc3RyaXAgZm9yIGllN1xuICAgIHZhciBvcHRpb24gID0gJHRhcmdldC5kYXRhKCdicy5tb2RhbCcpID8gJ3RvZ2dsZScgOiAkLmV4dGVuZCh7IHJlbW90ZTogIS8jLy50ZXN0KGhyZWYpICYmIGhyZWYgfSwgJHRhcmdldC5kYXRhKCksICR0aGlzLmRhdGEoKSlcblxuICAgIGlmICgkdGhpcy5pcygnYScpKSBlLnByZXZlbnREZWZhdWx0KClcblxuICAgICR0YXJnZXQub25lKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKHNob3dFdmVudCkge1xuICAgICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgcmV0dXJuIC8vIG9ubHkgcmVnaXN0ZXIgZm9jdXMgcmVzdG9yZXIgaWYgbW9kYWwgd2lsbCBhY3R1YWxseSBnZXQgc2hvd25cbiAgICAgICR0YXJnZXQub25lKCdoaWRkZW4uYnMubW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICR0aGlzLmlzKCc6dmlzaWJsZScpICYmICR0aGlzLnRyaWdnZXIoJ2ZvY3VzJylcbiAgICAgIH0pXG4gICAgfSlcbiAgICBQbHVnaW4uY2FsbCgkdGFyZ2V0LCBvcHRpb24sIHRoaXMpXG4gIH0pXG5cbn0oalF1ZXJ5KTtcblxuLyoqXG4gKiBDcmVhdGVkIGJ5IEJvZ2Rhbktvb3R6IG9uIDI3LjAyLjE3LlxuICovXG4kKCcjbWF1dGljZm9ybV9pbnB1dF9jb250YWN0dXNfc3VibWl0Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdGxhdW5jaE1vZGFsKCk7XG59KTtcblxuLy8gZnVuY3Rpb24gbGF1bmNoTW9kYWwoKSB7XG4vLyBcdCQoJyNteU1vZGFsJykubW9kYWwoJ3RvZ2dsZScpO1xuLy8gfVxuXG4kKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgc2V0VGltZW91dChzaG93TW9kYWwsIDUwMDApO1xufSk7XG5cbmZ1bmN0aW9uIHNob3dNb2RhbCgpIHtcbiAgICAkKCcjbXlNb2RhbCcpLm1vZGFsKCdzaG93Jyk7XG59XG5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAgIGlmIChuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ01hYyBPUyBYJykgIT0gLTEpIHtcbiAgICAgICAgJCgnYm9keScpLmFkZENsYXNzKCdwbGF0Zm9ybS1pb3MnKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJNYyBkdWNrXCIpXG4gICAgfWVsc2Uge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIiBIRSAgTWMgZHVja1wiKVxuICAgIH1cblxufSk7Il19
