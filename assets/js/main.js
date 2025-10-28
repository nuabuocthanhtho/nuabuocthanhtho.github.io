/* --- SCRIPT CHO NÚT CUỘN LÊN ĐẦU TRANG --- */
jQuery(function($){$.fn.scrollToTop=function(){$(this).hide().removeAttr("href");if($(window).scrollTop()!="0"){$(this).fadeIn("slow")}var scrollDiv=$(this);$(window).scroll(function(){if($(window).scrollTop()=="0"){$(scrollDiv).fadeOut("slow")}else{$(scrollDiv).fadeIn("slow")}});$(this).click(function(){$("html,body").animate({scrollTop:0},"slow")})}});jQuery(function($){$(".scroll").scrollToTop()});

/* --- CÁC SCRIPT CHẠY KHI TÀI LIỆU SẴN SÀNG --- */
$(document).ready(function() {

  /* --- SCRIPT SỬA LỖI HIỂN THỊ WIDGET HÌNH ẢNH CATEGORIES --- */
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

  /* --- SCRIPT CHO CÁC MENU (NẾU CÓ) --- */
  jQuery('.BlogArchive .form').click(function() {
    jQuery('.BlogArchive .widget-content').slideToggle('slow');
    return true;
  });
  jQuery('.BlogArchive .form').click(function(){
    jQuery('.BlogArchive .form').toggleClass('open');
  });
  $(".menu-toggle").click(function(){
    $(".menu").slideToggle('slow');
  });
  jQuery('.sidemenu').click(function() {
    jQuery('.menu').slideToggle('slow');
    return false;
  });
  jQuery('.sidemenu').click(function(){
    jQuery('.sidemenu').toggleClass('open');
  });

  /* --- SCRIPT 1: XỬ LÝ TOOLTIP CHÚ THÍCH --- */
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
          if (top < window.scrollY) { top = triggerRect.bottom + window.scrollY + 10; }
          if (left < 5) left = 5;
          if (left + tooltipRect.width > document.documentElement.clientWidth) { left = document.documentElement.clientWidth - tooltipRect.width - 5; }
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
          if (!isCurrentlyVisible) { showTooltip(); }
      });
  });
  document.addEventListener('click', function(e) {
      if (!e.target.closest('.tooltip') && !e.target.closest('.tooltiptext')) {
          hideAllTooltips();
      }
  });

  /* --- SCRIPT 2: XỬ LÝ POP-UP MỤC LỤC CHƯƠNG --- */
  var tocCache = {};
  $('body').on('click', '#open-toc-btn', function(e) {
      e.preventDefault();
      var tocUrl = $(this).attr('href');
      var tocContainer = $('.modal-toc-list');
      var popupTitle = $('.modal-content h3');
      if (popupTitle.length > 0 && popupTitle.find('a').length === 0) {
          popupTitle.html('<a href="' + tocUrl + '">' + popupTitle.text() + '</a>');
      }
      if (!tocUrl || tocUrl === "#") {
          tocContainer.html('Lỗi: Nút "Mục lục" này chưa được gán URL.');
          $('.modal-overlay, .modal-content').fadeIn(200);
          return;
      }
      $('.modal-overlay, .modal-content').fadeIn(200);
      if (tocCache[tocUrl]) {
          tocContainer.html(tocCache[tocUrl]);
      } else {
          tocContainer.html('Đang tải...');
          $.get(tocUrl, function(data) {
              var sourceContainer = $(data).find('#chapter-list-container');
              if (sourceContainer.length > 0) {
                  var chapterLinks = sourceContainer.find('a');
                  if (chapterLinks.length > 0) {
                      var newListHtml = '<ul>';
                      chapterLinks.each(function() {
                          var linkUrl = $(this).attr('href');
                          var linkText = $(this).text();
                          if (linkUrl && !linkUrl.startsWith('LINK-CHƯƠNG')) {
                              newListHtml += '<li><a href="' + linkUrl + '">' + linkText + '</a></li>';
                          }
                      });
                      newListHtml += '</ul>';
                      tocCache[tocUrl] = newListHtml;
                      tocContainer.html(newListHtml);
                  } else { tocContainer.html('Không tìm thấy link chương nào.'); }
              } else { tocContainer.html('Không tìm thấy khu vực mục lục trong trang được liên kết.'); }
          }).fail(function() { tocContainer.html('Lỗi: Không thể tải trang mục lục.'); });
      }
  });
  function closeModalToc() { $('.modal-overlay, .modal-content').fadeOut(200); }
  $('body').on('click', '.modal-close, .modal-overlay', closeModalToc);

  /* --- SCRIPT 3: XỬ LÝ POP-UP DANH MỤC TRUYỆN (QUAN TRỌNG) --- */
  $('.categories-box .Image a').on('click', function(e) {
      e.preventDefault(); // Ngăn chuyển trang
      var tocPageUrl = $(this).attr('href');
      var categoryTitle = $(this).find('h2').text() || 'Danh sách truyện'; // Lấy chữ từ thẻ h2

      $('#popup-title').text(categoryTitle);
      $('#popup-story-list').html('<div class="loading-text">Đang tải danh sách truyện...</div>');
      $('.story-popup-overlay, .story-popup-content').fadeIn(200);

      $('#popup-story-list').load(tocPageUrl + ' .post-body', function(response, status, xhr) {
          if (status == "error") {
              $(this).html('<div class="no-stories-text">Lỗi: Không thể tải được danh sách.</div>');
          }
      });
  });
  function closeModalStory() { $('.story-popup-overlay, .story-popup-content').fadeOut(200); }
  $('body').on('click', '.story-popup-close, .story-popup-overlay', closeModalStory);

  /* --- Xử lý nút Escape để đóng cả 2 loại pop-up --- */
  $(document).on('keydown', function(e) {
      if (e.key === "Escape") {
          closeModalToc();
          closeModalStory();
      }
  });

}); // Kết thúc $(document).ready()

/* --- SCRIPT HIỂN THỊ MENU (NẾU CÓ) --- */
function showIt() {
    var navWrap = document.getElementById("nav-wrap");
    if (navWrap) {
        navWrap.style.visibility = "visible";
    }
}
setTimeout("showIt()", 300);
