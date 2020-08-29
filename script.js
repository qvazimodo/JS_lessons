function makeGETRequest(url, callback) {
    var xhr;
  
    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { 
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        callback(xhr.responseText);
      }
    }
  
    xhr.open('GET', url, true);
    xhr.send();
  }



// class GoodsItem {

//   constructor(titleImage = "img/catalog_items_1.png", title  = "def", color = "def", size = "def", unitPrice = "def", shipping = "def") {
//     this.titleImage = titleImage;
//     this.title = title;
//     this.color = color;
//     this.size = size;
//     this.unitPrice = unitPrice;
//     this.shipping = shipping;

// }
// render() {
//   return `
//           <div class="like_items_list " data-color = ${this.color} data-size = ${this.size} data-shipping = ${this.shipping}     >
//           <a href="#" class="like_items_link"><img class="items_img" src= ${this.titleImage}   ></a>
//           <div class="like_items_content">
//               <a href="#" class="like_items_name">${this.title}</a>
//               <div class="like_price_stars"> <p class="like_items_price" style="margin-top: 17px; margin-left: 1px;">$${this.unitPrice}</p>
//                   </div>
//           </div>
//           <a href="#" class="items_add"> <img src="img/cart_2.png" alt="" style="margin-right: 8px">Add to Cart</a>
//           </div>
//   `
// }
// }

// class GoodsList {
//   constructor() {
//     this.goods = [];
//   }
//   fetchGoods(cb) {
//     // // асинхронная логика, получение с бека
//     // this.goods = goods;
//     // получение каталога продуктов
//     makeGETRequest('https://raw.githubusercontent.com/qvazimodo/API-internetShop/master/responses/catalogData.json', (goods) => {
//       this.goods = JSON.parse(goods);
//       console.log (this.goods);
//       cb();
//     })
//   }
//   render() {
//     let html = '';
//     this.goods.forEach(({ titleImage, title, color, size, unitPrice, shipping }) => {
//       const goodItem = new GoodsItem(titleImage, title, color, size, unitPrice, shipping);
//       html += goodItem.render();
//     });
//     document.querySelector('.content_product_flex').innerHTML = html;
//   }
//   summ() {
//     // вычисление общей суммы элементов
//     let sum = 0;
     
//     this.goods.forEach(({unitPrice}) => {
//       let uPrice = parseInt(unitPrice); 
//       if(!isNaN (uPrice)) {
//         sum += uPrice;
//         }
//       else {
//         console.log ("Error");
//         sum = 0;
//       }
//     })
//     console.log (sum);
//   }
// }

// const list = new GoodsList();
// list.fetchGoods(() => {
//   list.render();
// });

// list.summ();







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
      makeGETRequest('https://raw.githubusercontent.com/qvazimodo/API-internetShop/master/responses/getBasket.json', (bascketGoods) => {
        this.bascketGoods = JSON.parse(bascketGoods);
        console.log (this.bascketGoods);
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







