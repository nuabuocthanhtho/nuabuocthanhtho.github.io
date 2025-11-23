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

  /* --- SCRIPT CHO CÁC MENU --- */
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

  /* --- SCRIPT 3: XỬ LÝ POP-UP DANH MỤC TRUYỆN --- */
  $('.categories-box .Image a').on('click', function(e) {
      e.preventDefault();
      var tocPageUrl = $(this).attr('href');
      var categoryTitle = $(this).find('h2').text() || 'Danh sách truyện';

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

  $(document).on('keydown', function(e) {
      if (e.key === "Escape") {
          closeModalToc();
          closeModalStory();
          $('.settings-overlay, .settings-popup').fadeOut();
          $('.history-overlay, .history-popup').fadeOut();
      }
  });

  // ==============================================================
  //       CODE XỬ LÝ NÚT FAB & CÀI ĐẶT (ĐÃ FIX LỖI)
  // ==============================================================
  
  // 1. Xử lý nút chính (Xòe/Thu menu)
  $('.fab-main-btn').click(function(){
      $('.fab-container').toggleClass('active');
  });

  // 2. Tự động lấy link chương trước/sau (ĐÃ NÂNG CẤP LOGIC)
  // Ưu tiên 1: Link bài viết (Chapter)
  var postPrev = $('#data-prev-link').data('url');
  var postNext = $('#data-next-link').data('url');
  
  // Ưu tiên 2: Link phân trang (Pagination ở trang chủ)
  var pagePrev = $('.blog-pager-link.prev').attr('href');
  var pageNext = $('.blog-pager-link.next').attr('href');

  // Xử lý nút PREV
  if (postPrev) {
      $('.fab-prev-chapter').attr('href', postPrev).removeClass('disabled');
  } else if (pagePrev) {
      $('.fab-prev-chapter').attr('href', pagePrev).removeClass('disabled');
  } else {
      $('.fab-prev-chapter').addClass('disabled');
  }

  // Xử lý nút NEXT
  if (postNext) {
      $('.fab-next-chapter').attr('href', postNext).removeClass('disabled');
  } else if (pageNext) {
      $('.fab-next-chapter').attr('href', pageNext).removeClass('disabled');
  } else {
      $('.fab-next-chapter').addClass('disabled');
  }

  // 3. Nút lên đầu trang
  $('.scroll-to-top').click(function(){
      $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  // 4. Kết nối nút Mục lục trong FAB
  $('#fab-toc-btn').click(function(e){
      e.preventDefault();
      $('#open-toc-btn').click(); 
  });

  /* --- LOGIC CÀI ĐẶT (SETTINGS) --- */
  $('#open-settings-btn').click(function(){
      $('.settings-overlay, .settings-popup').fadeIn();
      $('.fab-container').removeClass('active');
  });
  $('.settings-close, .settings-overlay').click(function(){
      $('.settings-overlay, .settings-popup').fadeOut();
  });

  function applyTheme(themeName) {
      $('body').removeClass('mode-light mode-sepia mode-dark').addClass('mode-' + themeName);
      $('.theme-btn').removeClass('active');
      $('.theme-btn[data-theme="' + themeName + '"]').addClass('active');
      localStorage.setItem('nbtt_theme', themeName);
  }
  $('.theme-btn').click(function(){
      var theme = $(this).data('theme');
      applyTheme(theme);
  });

  var currentFontSize = parseInt(localStorage.getItem('nbtt_fontSize')) || 18;
  function applyFontSize(size) {
      $('.post-body, .post-body p').css('font-size', size + 'px');
      $('#current-font-size').text(size + 'px');
      localStorage.setItem('nbtt_fontSize', size);
      currentFontSize = size;
  }
  $('#font-increase').click(function(){
      if(currentFontSize < 30) applyFontSize(currentFontSize + 1);
  });
  $('#font-decrease').click(function(){
      if(currentFontSize > 12) applyFontSize(currentFontSize - 1);
  });

  var savedTheme = localStorage.getItem('nbtt_theme') || 'light';
  applyTheme(savedTheme);
  applyFontSize(currentFontSize);
  
  // ==============================================================
  //       CODE LỊCH SỬ ĐỌC (PERSONAL BOOKSHELF)
  // ==============================================================
  
  const HISTORY_KEY = 'nbtt_reading_history';
  const MAX_HISTORY_ITEMS = 20;

  // 1. Hàm lưu lịch sử (CHỈ LƯU, KHÔNG HIỂN THỊ)
  function saveHistory() {
      if ($('.post-body').length > 0) {
          var postTitle = $('.post-title').text().trim() || document.title;
          var postUrl = window.location.pathname;
          var currentTime = new Date().toLocaleString('vi-VN');

          var history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
          history = history.filter(item => item.url !== postUrl);
          history.unshift({
              title: postTitle,
              url: postUrl,
              time: currentTime
          });
          if (history.length > MAX_HISTORY_ITEMS) {
              history = history.slice(0, MAX_HISTORY_ITEMS);
          }
          localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      }
  }
  // Chạy hàm lưu ngầm khi vào trang
  saveHistory();

  // 2. Hàm hiển thị lịch sử
  function renderHistory() {
      var history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
      var listHtml = '';

      if (history.length === 0) {
          $('#history-list').html('');
          $('#no-history-msg').show();
      } else {
          $('#no-history-msg').hide();
          history.forEach(function(item) {
              listHtml += `
                  <li>
                      <a href="${item.url}">
                          <span class="history-title">${item.title}</span>
                          <span class="history-time"><i class="far fa-clock"></i> Đọc lúc: ${item.time}</span>
                      </a>
                  </li>
              `;
          });
          $('#history-list').html(listHtml);
      }
  }

  // 3. Xử lý sự kiện mở Popup (CHỈ MỞ KHI CLICK)
  $('#open-history-btn').click(function(){
      renderHistory(); // Vẽ lại danh sách
      $('.history-overlay, .history-popup').fadeIn(); // Lúc này mới hiện popup
      $('.fab-container').removeClass('active');
  });

  // 4. Đóng Popup
  $('.history-close, .history-overlay').click(function(){
      $('.history-overlay, .history-popup').fadeOut();
  });

  // 5. Xóa lịch sử
  $('#clear-history-btn').click(function(){
      if(confirm('Bạn có chắc muốn xóa toàn bộ lịch sử đọc không?')) {
          localStorage.removeItem(HISTORY_KEY);
          renderHistory();
      }
  });

}); // Kết thúc $(document).ready()
