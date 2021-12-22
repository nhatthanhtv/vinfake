

const cart = {
    listProduct: JSON.parse(localStorage.getItem('VIN_FAKE')),
    
    valueItem: [],

    setLocalStore: function(value){
        return localStorage.setItem('VIN_FAKE', JSON.stringify(value));
      },

    loadCartItems: function (){
       
        if(this.listProduct.length === 0){
            const list = document.querySelector('.data__cart-list')
            const itemErro = `
            <div class="cart__noItems">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQ4Ei3Wk4bfS4NuzwPyVaGgnb7Ob8PrBZi-MI3P6X8jGaegLDHkVkhZ1hdWOUXGurq94&usqp=CAU" alt="">
            <h3 class="cart__noItems-text">Giỏ hàng trống</h3>
            </div>
            `
            list.innerHTML = itemErro
            console.log('hi');
        }else{
            const htmls = this.listProduct.map((item, index) => {

                return `
            <div class="data__cart-item" id-card="${item.id}" >
            <div class="data__cart-item-info">
                <img src="${item.image}"
                    alt="" class="data__cart-item-info-img">
                <div class="data__cart-item-content">
                    <h4 class="data__cart-item-content-title">
                        ${item.name}
                    </h4>
                    <span>ĐVT</span> <span class="data__cart-item-dvt">${item.qty}</span>
                    <p class="data__cart-item-delete"  onclick="cart.xoaItemCarts(this)">
                        <i class="fas fa-trash-alt" ></i>
                        Xóa khỏi giỏ hàng
                    </p>
                </div>
    
            </div>
            <div class="cart-content-item-option">
                <p class="cart-content-item-option-price">
                ${item.price}
                </p>
                <div class="cart-content-item-option-button">
                    <button class="cart-content-item-option-down" "><span>-</span></button>
                    <input type="text" maxlength="2" max="99" value="${item.number}" class="input-value-item"  disabled >
                    <button class="cart-content-item-option-up"><span>+</span></button>
    
                </div>
            </div>
        </div>
            `
            })
    
            document.querySelector('.data__cart-list').innerHTML = htmls.join('')
        }

        
    },


    itemValue: function () {
        const _this = this;
        const btnDown = document.querySelectorAll('.cart-content-item-option-down')
        const btnUp = document.querySelectorAll('.cart-content-item-option-up')
        btnDown.forEach(function(btn, index){
            let listItemStore = _this.listProduct

            
            btn.onclick = function(){
                const formOption = this.closest('.cart-content-item-option-button')
                formInput = formOption.querySelector('.input-value-item')
                _this.valueItem = Number(formInput.value)
                
                if(listItemStore[index].number <= 1 ){ 
                   console.log('thực hiện xóa item nhưng chưa làm dược');
                    }else{
                    
                    listItemStore[index].number --
                    formInput.setAttribute('value', listItemStore[index].number)
                    _this.setLocalStore(listItemStore)
                    
                    
                }
                
                _this.caculator()
                _this.handbleEventCart()
                
                
            }
        })
        btnUp.forEach(function(btn, index){
            let listItemStore = _this.listProduct

            btn.onclick = function(){
                const formOption = this.closest('.cart-content-item-option-button')
                formInput = formOption.querySelector('.input-value-item')
                _this.valueItem = Number(formInput.value)

                if(_this.valueItem == 99 ){ 
                    return listItemStore[index].number = 99
                }else{
                    listItemStore[index].number ++
                    formInput.setAttribute('value', listItemStore[index].number)

                }
                 _this.setLocalStore(listItemStore)
                 _this.caculator()
                 _this.handbleEventCart()
            }
        })
        

    },  

    handbleEventCart: function(index){
        const   _this = this

        const btnPay = document.querySelector('#buyItems')
        const modalPay = document.querySelector('.modal_cart')
        const closePay = document.querySelector('.icon-close-pay')
        const formValue = document.querySelector('#form-1')
        const dataItems = document.querySelector('#dataItemsOrder')
        const donePay = document.querySelector('.form-submit')
       
        
        btnDeleteCart.onclick = function() {
            localStorage.setItem(VIN_FAKE, JSON.stringify([]));
            _this.listProduct = []
            _this.loadCartItems()
            _this.caculator()
           
    
          }
         
         btnPay.onclick = function(){
            modalPay.classList.add('active') 
            _this.renderListPay()
            
          }

          closePay.onclick = function(){
            modalPay.classList.remove('active')
          }

          donePay.onclick = function(e){
           

                e.preventDefault()
              dataItems.value =JSON.stringify(_this.listProduct)
              formValue.submit()
              localStorage.setItem(VIN_FAKE, JSON.stringify([]));
              _this.listProduct = []
          }
        
    },

    
    renderListPay: function(){
        const tbody = document.querySelector('#tbody-pay')
        const tfooter = document.querySelector('#tfooter-pay')
        let listItemStore = this.listProduct
        let resultPricePay = []

        const listPay = listItemStore.map(function(item, index){
            return `
            <tr>
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.number}</td>
                <td>${(parseFloat(item.price) * item.number * 1000).toLocaleString()} đ</td>
             </tr>
            `
        })
        tbody.innerHTML = listPay.join('')


        for(var i = 0 ;i < listItemStore.length; i++) {
            let a = parseFloat(listItemStore[i].price) * listItemStore[i].number
            resultPricePay.push(a*1000)
        }
        const result = resultPricePay.reduce(function(result, item){
            return result + item
        }, 0)
        
        const totalPay = `
             <tr>
             <td></td>
             <td></td>
             <td>Tổng</td>
            <td>${result.toLocaleString()}</td>
             </t>
            `
        tfooter.innerHTML = totalPay

        
    },


    xoaItemCarts: function (itemDele) {
        let listProduct = this.listProduct
        const cartItem = itemDele.closest('.data__cart-item')
        let idItemCard = cartItem.getAttribute('id-card')
        // xóa sản phẩm trong Dom
        cartItem.remove()
        // xóa phần tử trong mãng
        let listProductLength = listProduct.length
        for(let i = 0; i < listProductLength; i++){
           if(listProduct[i].id === idItemCard){
               listProduct.splice(i,1)
               this.setLocalStore(listProduct)
               this.itemValue()
                this.caculator()
                this.showErrorToast()
                this.handbleEventCart()
           }
        }
        
    },

    caculator: function(){
        let resultPrice = []
        let listItems = this.listProduct
        for(var i = 0 ;i < listItems.length; i++) {
            let a = parseFloat(listItems[i].price) * listItems[i].number
            console.log(parseFloat(listItems[i].price));
            resultPrice.push(a*1000)
        }
        const result = resultPrice.reduce(function(result, item){
            return result + item
        }, 0)
       
        const htmlsResult =`
        <div class="data__pricre__content">
                            <div class="data__pricre-header">
                                <span>Tạm tính</span>
                                <span class="data__pricre-money">
                                    ${result.toLocaleString()} đ
                                </span>
                            </div>
                            <div class="data__pricre-voucher">
                                <input type="text" placeholder="Nhập Mã giảm giá tại đây" id="voucher-sale">
                            </div>
                            <div class="data__pricre-ship">
                                <span>Phí vận chuyển</span>
                                <span class="data__pricre-ship-money">0đ</span>
                            </div>
                            <div class="data__pricre-total">
                                <span>Thành tiền</span>
                                <span class="data__pricre-total-money">${(result).toLocaleString()}đ</span>
                            </div>
                            <button class="data__cart-btn" id="buyItems">Thanh toán</button>
                        </div>
        `
        document.querySelector('.data__pricre').innerHTML = htmlsResult
    },
    showErrorToast: function(){
        this.toast({
            title: "",
            message: "Bạn đã xóa 1 sản phẩm",
            type: "error",
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

   
  
    
    start:function () {
        this.loadCartItems()
        this.caculator()
        this.itemValue()
       this.handbleEventCart()
       
    
    }
}

window.addEventListener("DOMContentLoaded", function () {
    
    cart.start()
    
})