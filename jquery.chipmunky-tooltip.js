/**
 * Tooltip v1.0
 * by Chipmunky - http://chipmunky.com/
 *
 * @license http://chipmunky.com/
 * - Free for personal and commercial use
 * - Thank you leave the author name, link and information license intact
 */

(function($) {
	$.fn.chipmunkyTooltip = function(params) {
		return this.each(function() {
			// Params
			params = $.extend({
				classTooltipWrapper: 'chipmunkyTooltipWrapper',
				classTooltip: 'chipmunkyTooltip',
				classArrow: 'arrow',
				classContent: 'content',
				floating: 'xy', // false, x, y, xy
				dataFloating: 'floating',
				dataContent: 'content',
				dataStyle: 'style',
			}, params);
			
			var tooltip = {
				element: false,
				elementWrapper: false,
				elementTooltip: false,
				elementArrow: false,
				elementContent: false,
				content: '',
				contentText: '',
				contentImage: '',
				styleTooltip: '',
				viewport: false,
				init: function(element) {
					this.element = element;
					this.floating = element.data(params.floating);
					this.content = element.data(params.dataContent);
					this.styleTooltip = element.data(params.dataStyle);
					this.build();
					$(document).resize(function(){
						tooltip.getViewport();
					}).trigger('resize');
				},
				build: function() {
					// wrapper
					this.elementWrapper = $('<div>').addClass(params.classTooltipWrapper).appendTo(this.element);
					
					// tooltip
					this.elementTooltip = $('<div/>').addClass(params.classTooltip).appendTo(this.elementWrapper);
					
					// style
					if (this.styleTooltip) {
						this.elementTooltip.addClass(this.styleTooltip);
					}
					
					// arrow
					if (this.content) {
						this.elementArrow = $('<div/>').addClass(params.classArrow).appendTo(this.elementTooltip);
					}
					
					// content
					if (this.content) {
						this.elementContent = $('<div/>').html(this.content).addClass(params.classContent).appendTo(this.elementTooltip);
					}
					
					// display
					this.element.mouseenter(function(){
						tooltip.show();
						tooltip.float();
					});
					this.element.mouseleave(function(){
						tooltip.hide();
					});
				},
				show: function(e) {
					this.elementTooltip.show();
				},
				getViewport: function() {
				    var w = $(window);
				    this.viewport = {
				        left:	w.scrollLeft(),
				        top:	w.scrollTop(),
				        width:	w.width(),
				        height:	w.height()
				    };
				},
				floatingPosition: function(e, offset, tooltipWidth, tooltipHeight, tooltipArrowSize) {
					
					
					return {
						left: left,
						top: top
					};
				},
				float: function(e) {
					var offset = this.elementWrapper.offset();
					var tooltipWidth = this.elementTooltip.width();
					var tooltipHeight = this.elementTooltip.height();
					var tooltipArrowSize = parseInt(this.elementArrow.css('borderWidth'));
					
					this.element.mousemove(function(e){
						var arrow = (tooltipArrowSize * 2);
						
						switch (params.floating) {
						case 'xy':
							var left = e.pageX - offset.left;
							var top = e.pageY - offset.top;
							break;
						case 'x':
							var left = e.pageX - offset.left;
							var top = -tooltipArrowSize;
							break;
						case 'y':
							var left = -tooltipArrowSize;
							var top = e.pageY - offset.top;
							break;
						default:
							var left = -tooltipArrowSize;
							var top = -tooltipArrowSize;
							break;
						}
						
						// vertical
						if (tooltip.viewport.top + tooltip.viewport.height - e.pageY < tooltipHeight + arrow) { // below
							if (tooltip.elementArrow.hasClass('below') == false) {
								tooltip.elementArrow.css({
									top: 'auto',
									bottom: -arrow,
								}).addClass('below').removeClass('above');
							}
							top-= tooltipHeight + arrow + arrow;
						} else { // above
							if (tooltip.elementArrow.hasClass('above') == false) {
								tooltip.elementArrow.css({
									top: -arrow,
									bottom: 'auto',
								}).addClass('above').removeClass('below');
							}
							top+= arrow + arrow;
						}
						
						// horizontal
						if (tooltip.viewport.left + tooltip.viewport.width - e.pageX < tooltipWidth - arrow - tooltipArrowSize) { // right
							if (tooltip.elementArrow.hasClass('rightSide') == false) {
								tooltip.elementArrow.css({
									left: 'auto',
									right: arrow,
								}).addClass('rightSide').removeClass('leftSide');
							}
							left-= tooltipWidth - arrow - tooltipArrowSize;
							
						} else { // left
							if (tooltip.elementArrow.hasClass('leftSide') == false) {
								tooltip.elementArrow.css({
									left: arrow,
									right: 'auto',
								}).addClass('leftSide').removeClass('rightSide');
							}
							left-= arrow + tooltipArrowSize;
						}
						
						tooltip.elementTooltip.css({
							left: left,
							top: top
						});
					});
				},
				hide: function(e) {
					this.elementTooltip.hide();
				},
			};
			
			// Init tooltips
			tooltip.init($(this));
        });
	};
}( jQuery ));