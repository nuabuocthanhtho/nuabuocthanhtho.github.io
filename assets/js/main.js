jQuery(function($){$.fn.scrollToTop=function(){$(this).hide().removeAttr(&quot;href&quot;);if($(window).scrollTop()!=&quot;0&quot;){$(this).fadeIn(&quot;slow&quot;)}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()==&quot;0&quot;){$(scrollDiv).fadeOut(&quot;slow&quot;)}else{$(scrollDiv).fadeIn(&quot;slow&quot;)}});$(this).click(function(){$(&quot;html,body&quot;).animate({scrollTop:0},&quot;slow&quot;)})}});jQuery(function($){$(&quot;.scroll&quot;).scrollToTop()});
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".widget.Image").forEach(function (widget) {
      const a = widget.querySelector("a");
      const h2 = widget.querySelector("h2");
      if (a && h2 && !a.contains(h2)) {
        const wrapper = document.createElement("a");
        wrapper.href = a.href;
        wrapper.className = a.className;
        wrapper.innerHTML = h2.outerHTML + a.innerHTML;
        widget.innerHTML = "";
        widget.appendChild(wrapper);
      }
    });
  });
jQuery(document).ready(function() {
// toggles the slickbox on clicking the noted link
jQuery('.BlogArchive .form').click(function() {
jQuery('.BlogArchive .widget-content').slideToggle('slow');
return true;
});
// adds open class to toggle on click
jQuery(document).ready(function() {
jQuery('.BlogArchive .form').click(function(){
jQuery('.BlogArchive .form').toggleClass('open');
});
});
});
$(".menu-toggle").click(function(){
$(".menu").slideToggle('slow');
});
function showIt() {document.getElementById("nav-wrap").style.visibility = "visible";}
setTimeout("showIt()", 300);
jQuery(document).ready(function() {
// toggles the slickbox on clicking the noted link
jQuery('.sidemenu').click(function() {
jQuery('.menu').slideToggle('slow');
return false;
});
// adds open class to toggle on click
jQuery(document).ready(function() {
jQuery('.sidemenu').click(function(){
jQuery('.sidemenu').toggleClass('open');
});
});
});
// --- SCRIPT 1: Xử lý Tooltip (giữ nguyên) ---
document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.tooltip');

    const hideAllTooltips = () => {
        document.querySelectorAll('.tooltiptext.show').forEach(visibleTooltip => {
            visibleTooltip.classList.remove('show');
            if (visibleTooltip.originalParent) {
                visibleTooltip.originalParent.appendChild(visibleTooltip);
                visibleTooltip.style.cssText = '';
            }
        });
    };

    tooltips.forEach(tooltip => {
        const tooltipText = tooltip.querySelector('.tooltiptext');
        if (!tooltipText) return;

        tooltipText.originalParent = tooltipText.parentNode;

        const positionTooltip = () => {
            const triggerRect = tooltip.getBoundingClientRect();
            tooltipText.style.visibility = 'hidden';
            tooltipText.classList.add('show');
            const tooltipRect = tooltipText.getBoundingClientRect();
            tooltipText.style.visibility = '';

            let top = triggerRect.top + window.scrollY - tooltipRect.height - 10;
            let left = triggerRect.left + window.scrollX + (triggerRect.width / 2) - (tooltipRect.width / 2);

            if (top < window.scrollY) {
                top = triggerRect.bottom + window.scrollY + 10;
            }
            if (left < 5) left = 5;
            if (left + tooltipRect.width > document.documentElement.clientWidth) {
                left = document.documentElement.clientWidth - tooltipRect.width - 5;
            }

            tooltipText.style.left = `${left}px`;
            tooltipText.style.top = `${top}px`;
            tooltipText.style.transform = 'none';
            tooltipText.style.bottom = 'auto';
            tooltipText.style.position = 'absolute';
        };
        
        const showTooltip = () => {
            document.body.appendChild(tooltipText);
            positionTooltip();
            tooltipText.classList.add('show');
        };

        tooltip.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const isCurrentlyVisible = tooltipText.classList.contains('show');
            hideAllTooltips();

            if (!isCurrentlyVisible) {
                showTooltip();
            }
        });
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tooltip') && !e.target.closest('.tooltiptext')) {
            hideAllTooltips();
        }
    });
});
// ]]>
