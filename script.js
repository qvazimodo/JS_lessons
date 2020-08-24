const goods = [
    { titleImage: "img/catalog_items_1.png", title: 'Mango T-shirt1',   color: "Red", size: "XLL", unitPrice: "10",  shipping: "FREE"   },
    { titleImage: "img/catalog_items_2.png", title: 'Mango T-shirt2', color: "Black", size: "XL", unitPrice: "20",  shipping: "FREE"  },
    { titleImage: "img/catalog_items_3.png", title: 'Mango T-shirt3', color: "Red", size: "XLL", unitPrice: "30",  shipping: "FREE"   },
    { titleImage: "img/catalog_items_4.png", title: 'Mango T-shirt4', color: "Red", size: "XLL", unitPrice: "40",  shipping: "FREE"   },
    { titleImage: "img/catalog_items_5.png", title: 'Mango T-shirt5', color: "Black", size: "XL", unitPrice: "50",  shipping: "FREE"  },
    { titleImage: "img/catalog_items_6.png", title: 'Mango T-shirt6', color: "Red", size: "XLL", unitPrice: "60",  shipping: "FREE"   },
    { titleImage: "img/catalog_items_7.png", title: 'Mango T-shirt7', color: "Red", size: "XLL", unitPrice: "70",  shipping: "FREE"   },
    { titleImage: "img/catalog_items_8.png", title: 'Mango T-shirt8', color: "Black", size: "XL", unitPrice: "80",  shipping: "FREE"  },
    { titleImage: "img/catalog_items_9.png", title: 'Mango T-shirt9', color: "Red", size: "XLL", unitPrice: "90",  shipping: "FREE"   },
    
  ];

class GoodsItem {

  constructor(titleImage = "def", title  = "def", color = "def", size = "def", unitPrice = "def", shipping = "def") {
    this.titleImage = titleImage;
    this.title = title;
    this.color = color;
    this.size = size;
    this.unitPrice = unitPrice;
    this.shipping = shipping;

}
render() {
  return `
          <div class="like_items_list " data-color = ${this.color} data-size = ${this.size} data-shipping = ${this.shipping}     >
          <a href="#" class="like_items_link"><img class="items_img" src= ${this.titleImage}   ></a>
          <div class="like_items_content">
              <a href="#" class="like_items_name">${this.title}</a>
              <div class="like_price_stars"> <p class="like_items_price" style="margin-top: 17px; margin-left: 1px;">$${this.unitPrice}</p>
                  </div>
          </div>
          <a href="#" class="items_add"> <img src="img/cart_2.png" alt="" style="margin-right: 8px">Add to Cart</a>
          </div>
  `
}
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    // асинхронная логика, получение с бека
    this.goods = goods;
  }
  render() {
    let html = '';
    this.goods.forEach(({ titleImage, title, color, size, unitPrice, shipping }) => {
      const goodItem = new GoodsItem(titleImage, title, color, size, unitPrice, shipping);
      html += goodItem.render();
    });
    document.querySelector('.content_product_flex').innerHTML = html;
  }
  summ() {
    // вычисление общей суммы элементов
    let sum = 0;
    this.goods.forEach(({unitPrice}) => {
      if(!isNaN (parseInt(unitPrice))) {
        sum += parseInt(unitPrice);
        }
      else {
        console.log ("Error");
        sum = 0;
      }
    })
    console.log (sum);
  }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.summ();



// класс для элемента корзины
class BasketItem {

  constructor(titleImage , title, color, size, unitPrice, shipping) {
    this.titleImage = titleImage;
    this.title = title;
    this.color = color;
    this.size = size;
    this.unitPrice = unitPrice;
    this.shipping = shipping;

}
renderBascketItem() {
  // формирование вставки на страницу корзины
  return `<div class="shopping_product" style="margin-top: 26px;"> 
  <div class="prod_detals" style="width: 403px;"> 
      <img src=${this.titleImage} alt="prod_detals1">
      <div class="prod__detals">
          <a href="single_page.html"><h1>${this.title}</h1></a>
          <p>Color:<x> ${this.color}</x></p>
          <p>Size:<x> ${this.size}</x></p></div>            </div>
  <div class="unit_price">$${this.unitPrice}</div>
  <div class="quantity"><label>
      <input  type="number" min="0" max="10" step="1" style="height: 30px; width: 54px;" >
  </label></div>
  <div class="shipping">${this.shipping}</div>
  <div class="subtotal">$300</div>
 <div class="action"><i class="fas fa-times-circle"></i></div></div>  
    `
}
}
// класс для корзины
class BascketList {
  constructor() {
      // параметр - объект, выбранные продукты
    this.bascketGoods = []; 
  }
  fetchBascketGoods() {
    // получение выбранных на странице продуктов
    this.bascketGoods = bascketGoods; 
  }
  renderBascketList() {  
    // вставка продуктов на страницу корзины
    // let html = '';
    // this.bascketGoods.forEach(({ titleImage, title, color, size, unitPrice, shipping }) => {
    //   const bascketItem = new BasketItem(titleImage, title, color, size, unitPrice, shipping);
    //   html += bascketItem.renderBascketItem();
    // });
    // document.querySelector('.shopping_productt').innerHTML = html;
  }
  summBascket() {
  //  вычисление общей суммы выбранных продуктов 
  }
}

