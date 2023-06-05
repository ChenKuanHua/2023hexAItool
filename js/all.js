$(document).ready(function () {

  // 定義存放資料的變數 
  let toolsData = [];
  let pagesData = {};

  const apiPath = 'https://2023-engineer-camp.zeabur.app';
  const data = {
    type: '',
    sort: 0,
    page: 1,
    search: '',
  }
  // 資料要放的地方
  const ul = document.querySelector(".tool");
  const pagination = document.querySelector('.pagination');

  getData(data);

  // Menu
  $(".navbar-btn").click(function () {
    $(".navbar-collapse").toggleClass("show");
  });

  // 常見問題
  $('.question-answer').hide();
  $(".question-item").click(function (e) {
    $(this).find('.add-icon').toggleClass('d-none');
    $(this).find('.minus-icon').toggleClass('d-block');
    $(this).toggleClass('active');
    $(this).find('p').slideToggle(200);
  });


  // ----排序----

  // 選單出現
  $('.filter .filter-btn:eq(1)').click(function (e) {
    $('.filter-dropdown-menu').toggleClass('show');
  });
  //由新到舊
  $('.new-to-old').click(function (e) {
    e.preventDefault();
    $('.filter-dropdown-menu').toggleClass('show');
    $('.filter-text').text($('.new-to-old').text());
    data.sort = 0;
    getData(data);
  });
  $('.old-to-new').click(function (e) {
    e.preventDefault();
    $('.filter-dropdown-menu').toggleClass('show');
    $('.filter-text').text($('.old-to-new').text());
    data.sort = 1;
    getData(data);
  });


  // 串接API
  function getData({ type, sort, page, search }) {
    const url = `${apiPath}/api/v1/works?sort=${sort}&page=${page}&${type ? `type=${type}` : ''}&${search ? `search=${search}` : ''}`
    console.log(data);
    console.log(url);
    axios.get(url)
      .then(function (response) {
        toolsData = response.data.ai_works.data;
        pagesData = response.data.ai_works.page;
        console.log(toolsData);
        console.log(pagesData);

        renderTools();
        renderPages();
      })
  }

  // 作品選染至畫面
  function renderTools() {
    let tools = '';

    toolsData.forEach((item) => {
      tools += `<li class="flex-column">
              <div class="tool-img">
                <img src="${item.imageUrl}" alt="tool-1">
              </div>
              <div class="tool-description flex-1">
                <h3 class="fz-s">${item.title}</h3>
                <p class="fz-xs">${item.description}</p>
              </div>
              <div class="tool-model d-flex">
                <p>AI 模型</p>
                <span>${item.model}</span>
              </div>
              <div class="tool-tag d-flex">
                <p>#${item.type}</p>
                <a href="${item.link}"><span class="material-icons">share</span></a>
              </div>
            </li>`
    });
    if (toolsData.length == 0) {
      ul.innerHTML = `<p class="text-center" style="margin-top:80px; color:#525252;line-height:1.5;">這裡還沒有資料哦 😢 <br> 大家加油快寫呀～ </p>`
    } else {
      ul.innerHTML = tools;
    }
  }

  // 切換分頁
  function changePage(pagesData) {
    const pageLinks = document.querySelectorAll('a.page-link')
    let pageId = '';

    pageLinks.forEach((item) => {

      item.addEventListener('click', (e) => {
        e.preventDefault();
        pageId = e.target.dataset.page;
        data.page = Number(pageId);

        if (!pageId) {
          data.page = Number(pagesData.current_page) + 1
        }

        getData(data);
      });
    });
  }

  // 分頁選染至畫面
  function renderPages() {
    let pageStr = '';

    for (let i = 1; i <= pagesData.total_pages; i += 1) {
      pageStr += /*html*/`<li class="page-item ${pagesData.current_page == i ? 'active' : ''}" >
      <a class="page-link ${pagesData.current_page == i ? 'disabled' : ''}" href="#"  data-page="${i}">${i}</a>
    </li>`
    };

    if (pagesData.has_next) {
      pageStr += `<li class="page-item">
      <a class="page-link" href="#">
        <span class="material-icons">
          chevron_right
        </span>
      </a>
    </li>`
    };
    pagination.innerHTML = pageStr

    changePage(pagesData);
  }

  // --- 搜尋 ---
  $('.search-input').on("keydown", function (e) {
    console.log(e.which);
    if (e.which === 13) {
      e.preventDefault();
      data.search = $(this).val();
      data.page = 1
      getData(data);
    }
  });



  // --- 篩選類型 ---
  $('.filter-type').on('click', function (e) {
    e.preventDefault();
    console.log($(this).text());

    // 移除其他元素的 active 類別
    $(this).parent().siblings().find('a').removeClass('active');
    // 為當前元素添加 active 類別

    $(this).addClass('active');
    if ($(this).text() == '全部') {
      data.type = '';
    } else {
      data.type = $(this).text();
    }
    getData(data);
  });




  // 輪播套件
  const swiper = new Swiper('.swiper', {
    spaceBetween: 24,
    breakpoints: {
      992: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      375: {
        slidesPerView: 1
      }
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

});

