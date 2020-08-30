let apiGetBasket = '';

function makeGETRequest (url) {
  

  return new Promise (function(resolve, reject) {
    var xhr;
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (xhr.status === 200) {
          resolve(xhr.responseText);
       } else reject({code: xhr.status, message: xhr.statusText});
      }
      xhr.send();
  })
}

// класс для элемента корзины
class BasketItem {

  constructor(titleImage = "img/prod_detals1.png" , title, color, size, unitPrice, shipping, quantity) {
    this.titleImage = titleImage;
    this.title = title;
    this.color = color;
    this.size = size;
    this.unitPrice = unitPrice;
    this.shipping = shipping;
    this.quantity = quantity;

  }
  renderBascketItem() {
    // формирование вставки на страницу корзины
    let subtotal = this.quantity*this.unitPrice;
    return `
    <div data-title = "${this.title}">
      <div class="shopping_product"  style="margin-top: 26px;"> 
        <div class="prod_detals" style="width: 403px;"> 
          <img src=${this.titleImage} alt="prod_detals1">
          <div class="prod__detals">
                  <a href="single_page.html">
                  <h1>${this.title}</h1>
                </a>
                <p>Color:<x> ${this.color}</x></p>
                <p>Size:<x> ${this.size}</x></p>
          </div>
        </div>
        <div class="unit_price">$${this.unitPrice}</div>
        <div class="quantity">
          <label>
          <input  type="number" min="0" max="10" step="1" value = ${this.quantity} style="height: 30px; width: 54px;" >
          </label>
        </div>
        <div class="shipping">${this.shipping}</div>
        <div class="subtotal">$${subtotal}</div>
        <div class="action"><i class="fas fa-times-circle" data-title = "${this.title}"></i></div>
      </div>
    </div>  
      `
  }
  }
  // класс для корзины
  class BascketList {
    constructor() {
        // параметр - объект, выбранные продукты
      this.bascketGoods = []; 
      
    }
    fetchBascketGoods(cb) {
      // получение списка корзины от сервера
      makeGETRequest(apiGetBasket)
      .then((bascketGoods) => {
        this.bascketGoods = JSON.parse(bascketGoods);
        console.log (this.bascketGoods);
        cb();
      })
      .catch((err)=>{
        console.log(err, "AJAX request failed");
        cb();
      })
    }

    
    // слушатель  события клика по значку удаления продукта из корзины
    addRemoveBtnsListeners() {
      let actionRemove = document.querySelectorAll('.action');
      for (let i = 0; i < actionRemove.length; i++) {
           actionRemove[i].addEventListener('click', this.removeProduct);
      }
    }
    // обработка клика по значку удаления продукта + удаление продукта из корзины
    // потребутеся добавить метод удаления продукта из объекта и передачи информации на сервер
    removeProduct(event) {
      let title = event.target.dataset.title;
      let countProduct = document.querySelector(`div[data-title="${title}"]`);
      console.log(countProduct.textContent);
        if (countProduct.textContent == 1) {
          countProduct.parentNode.remove();
      } else {
        countProduct.textContent--;
      }

    }
    

    // формирование списка корзины на странице корзины
    renderBascketList() {  
      // вставка продуктов на страницу корзины
      let html1 = '';
      this.bascketGoods.contents.forEach(({ titleImage, title, color, size, unitPrice, shipping, quantity }) => {
      const basketItem = new BasketItem(titleImage, title, color, size, unitPrice, shipping, quantity);
      html1 += basketItem.renderBascketItem();
      
      
    });
      document.querySelector('.shopping_productt').innerHTML = html1;
      
    }
    summBascket() {
    //  вычисление общей суммы выбранных продуктов 
      let sum = 0;
        for (let key in this.bascketGoods.contents) {
            sum += this.bascketGoods.contents[key].unitPrice * this.bascketGoods.contents[key].quantity;

        }
        console.log(sum);
    }
}


const bascketList = new BascketList();
bascketList.fetchBascketGoods(() => {
bascketList.renderBascketList();
bascketList.summBascket();
bascketList.addRemoveBtnsListeners();

});







