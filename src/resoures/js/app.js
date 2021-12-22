const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const header = $('.header__top__content')
const logo = $('.header__top__content-img')
const btnListMenu = $$('.btn-item-menu')
const btnBuyHome = $$('.product__buy-btn')
const contentShowProduct = $('#contentShowProduct')
const containerProduct = $$('.container')
const btnDeleteCart = $('.data__cart-delete')
const fromBuy = $('#form-buy-cart')
const formCart = $('#from-cart')
const btnMuaInfo = $('.data__addcart-btn')
console.log(btnMuaInfo);


const VIN_FAKE = 'VIN_FAKE'
// console.log()



const app = {


  localData: localStorage.getItem('VIN_FAKE') === null ? [] : JSON.parse(localStorage.getItem('VIN_FAKE')),
  
  listBuyItem: [],
  valueNumber: 1,
  

  // set localStore
  setLocalStore: function (value) {
    return localStorage.setItem(VIN_FAKE, JSON.stringify(value));
  },


  // buyItem Home
  

  handleEvent: function () {
    const _this = this

    // thu phóng header
    window.onscroll = function () {

      if (document.documentElement.scrollTop > 900) {
        header.style.height = '50px'
        logo.style.width = '74%'
      }
      else {
        header.style.height = '80px'
        logo.style.width = '100%'
      }
    }

    
    btnBuyHome.forEach((btnItem, index) => {
      btnItem.onclick = function (e) {
        const listItem = _this.localData
        let double = false
        const itemBuy = this.closest('.product__card')
        const dataItem = {
          id: e.target.getAttribute('data-id'),
          image: itemBuy.querySelector('.product__card-img').src,
          name: itemBuy.querySelector('.product__data-name').textContent,
          price: itemBuy.querySelector('.product__data-pri').textContent,
          qty: itemBuy.querySelector('.product__data-qty').textContent,
          number: 1
        }
        
        for(var i = 0; i< listItem.length; i++){
          if(dataItem.id === listItem[i].id){
            listItem[i].number ++
         _this.setLocalStore(listItem)
            double = true;
            console.log(listItem[i].number);
          _this.loadNumberItems()

          }
        }
        if(double === false){
          listItem.push(dataItem)
          // console.log(_this.localData);
         _this.setLocalStore(listItem)
          _this.loadNumberItems()
          console.log('thêm sản phẩm');

        }
        
        _this.showSuccessToast()
        console.log('thêm');

        
        

      }
    })

    // 
    btnMuaInfo.onclick = function (e) {
      
    }
    // 

    btnListMenu.forEach((btn,index) => {
      let isBtnMenu = true;
      btn.onclick = () => {
         
        
        
      }
      
    })
    

  },

  loadNumberItems: function () {
    let itemsCart = (JSON.parse(localStorage.getItem(VIN_FAKE)))
    const valueNo = this.localData.reduce(function(data, item) {
      return  data + item.number
    }, 0)
   
    $('.cart-number').textContent = itemsCart === null ? '' : `(${valueNo})`
    $('#mobile-cart-number').textContent = itemsCart === null ? '' : `${valueNo}`
  },

  showSuccessToast: function () {
    this.toast({
      title: "",
      message: "Bạn đã thêm sản phẩm vào giỏ hàng.",
      type: "success",
      duration: 1000
    });
  },


  toast: function ({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");
    if (main) {
      const toast = document.createElement("div");
  
      // Auto remove toast
      const autoRemoveId = setTimeout(function () {
        main.removeChild(toast);
      }, duration + 1000);
  
      // Remove toast when clicked
      toast.onclick = function (e) {
        if (e.target.closest(".toast__close")) {
          main.removeChild(toast);
          clearTimeout(autoRemoveId);
        }
      };
  
      const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle"
      };
      const icon = icons[type];
      const delay = (duration / 1000).toFixed(2);
  
      toast.classList.add("toast", `toast--${type}`);
      toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
  
      toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="fas fa-times"></i>
                      </div>
                  `;
      main.appendChild(toast);
    }
  },

  start: function () {
    console.log("%cWEB đã load xong Clone By Thành! \ud83d\ude4b","color: #29c4a9;font-size: 16px;font-weight: 600;");
    this.loadNumberItems()
    this.handleEvent()
    
  }
}


window.addEventListener("load", function () {
  const swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const myLazyLoad = new LazyLoad({
    element_selector: ".product__card-img"
  })

  app.start()
})


