// let apiGetProducts = 'https://raw.githubusercontent.com/qvazimodo/API-internetShop/master/responses/catalogData.json';

// function makeGETRequest (url) {
  

//     return new Promise (function(resolve, reject) {
//       var xhr;
//       if (window.XMLHttpRequest) {
//         xhr = new XMLHttpRequest();
//       } else if (window.ActiveXObject) { 
//         xhr = new ActiveXObject("Microsoft.XMLHTTP");
//       }
//       xhr.open('GET', url, true);
//       xhr.onload = function () {
//         if (xhr.status === 200) {
//             resolve(xhr.responseText);
//          } else reject({code: xhr.status, message: xhr.statusText});
//         }
//         xhr.send();
//     })
// }

// function makePOSTRequest(url, data,callback) {
//   let xhr;

//   if (window.XMLHttpRequest) {
//     xhr = new XMLHttpRequest();
//   } else if (window.ActiveXObject) { 
//     xhr = new ActiveXObject("Microsoft.XMLHTTP");
//   }

//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4) {
//       callback(xhr.responseText);
//     }
//   }

//   xhr.open('POST', url, true);
//   xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

//   xhr.send(data);
// }






// ------------------------------------------------класс формирования карточки товара на странице------
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
//         <div class="like_items_list " data-color = ${this.color} data-size = ${this.size} data-shipping = ${this.shipping} data-title = "${this.title}" >
//             <a href="#" class="like_items_link"><img class="items_img" src= ${this.titleImage}   ></a>
//             <div class="like_items_content">
//                 <a href="#" class="like_items_name">${this.title}</a>
//                 <div class="like_price_stars">
//                      <p class="like_items_price" style="margin-top: 17px; margin-left: 1px;">$${this.unitPrice}</p>
//                 </div>
//             </div>
//              <a href="#" class="items_add" data-color = ${this.color} data-size = ${this.size} data-shipping = ${this.shipping} data-title = "${this.title}" data-price = ${this.unitPrice} > <img src="img/cart_2.png" alt="" style="margin-right: 8px">Add to Cart</a>
//         </div>
//         `
//     }
// }
// // -----------------------------------------------------------------------------------------------------
// // -------------------------------------------------класс вызова, отрисовки товаров на странице---------
// class GoodsList {
//   constructor() {
//     this.goods = [];
//     this.filteredGoods = [];
//   }

//   filterGoods(value) {
//         const regexp = new RegExp(value, 'i');
//         this.filteredGoods = this.goods.filter(goods => regexp.test(goods.title));
//         this.render();
//   }
//   fetchGoods(cb) {
//     // // асинхронная логика, получение с бека
//     // this.goods = goods;
//     // получение каталога продуктов
//     makeGETRequest(apiGetProducts)
//     .then((goods) => {
//         this.goods = JSON.parse(goods);
//         this.filteredGoods = JSON.parse(goods);
//         cb();
//     })
//     .catch((err)=>{
//         console.log(err, "AJAX request failed");
//         cb();
//     })
//   }
  

//   render() {
//     let html = '';
//     this.filteredGoods.forEach(({ titleImage, title, color, size, unitPrice, shipping }) => {
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
  // list.render();
  // list.summ();

// });
//---------------------------------------------формирование запроса на сервер--------------------------
// const API_BASE = 'https://raw.githubusercontent.com/qvazimodo/API-internetShop/master/responses';


class ProductService {
    static getProducts() {
        
      // return fetch(`${API_BASE}/catalogData.json`).then(data => data.json());
      return fetch(`/catalogData/catalog.json`).then(data => data.json());
      
    }

    
  

     static postProducts(data) {
        
      // return fetch(`${API_BASE}/catalogData.json`).then(data => data.json());
      return fetch(`/addToCart/cart.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)



      }).then(console.log(data));



      
    }
  }

//--------------------------------------------формирование списка товаров------------------------------

Vue.component ("contentProductFlex", {
  props: ['query'],
  template: /*html*/`
      <div class="content-product-flex "  >
            <div
             v-for="product in filteredProducts "
            :key = "product.title"
            class="like_items_list "
            :data-color = "product.color" 
            :data-size = "product.size" 
            :data-shipping = "product.shipping" 
            :data-title = "product.title" >
                        <a href="#" class="like_items_link"><img class="items_img" src= "img/cart_prod_photo1.png"   ></a>
                        <div class="like_items_content">
                          <a href="#" class="like_items_name">{{ product.title }}</a>
                            <div class="like_price_stars">
                                <p class="like_items_price" style="margin-top: 17px; margin-left: 1px;">$ {{ product.unitPrice }}</p>
                            </div>
                        </div>
                        <div  class="items_add" 
                        @click= "addToCart"
                        :product = "product"
                        :data-color = "product.color" :data-size = "product.size" :data-shipping = "product.shipping" 
                        :data-title = "product.title" :data-price = "product.unitPrice" > <img src="img/cart_2.png" alt="" style="margin-right: 8px">Add to Cart</div>
                        </div>
                    </div> 
        </div>
  ` ,

  data() {
    return {
      products: [],
      cart: [],
      data:{},
      
      

    }
  },

  
  methods: {
      addToCart(e) {

        // console.log(e.target.dataset.title)
        let data = {
          title: e.target.dataset.title,
          color: e.target.dataset.color,
          unitPrice: e.target.dataset.price,
          size: e.target.dataset.size,
          shipping: e.target.dataset.shipping

        };
        // console.log(data);
        // this.cart.push(data);
        ProductService.postProducts(data);


      }


  },

  computed: {
    filteredProducts() {
      console.log("content" ,this.query );
 
      return this.products.filter(({ title }) => title.includes(this.query.toUpperCase()));
    }
  },

  created() {
    ProductService.getProducts().then((data) => {
      this.products = data;
      console.log(this.products);
    });
  }
});


Vue.component("productSearch", {
  template: /*html*/ `
  <input
    type="text"
    
    v-model = "search"
    >
  `,
  data: function() {
    return {
      search: "",
    }
  },
  watch: {
    search() {
      
      this.$emit('search', this.search);
      console.log("prod_search" , this.$emit('search', this.search) );
    }
  }
})


//-------------------------------------------------------------------------------------------------------
// ---------------------------------------формирование карточки товара в корзина на Vue------------------
Vue.component ("cartProduct", {
  template: /*html */ `
      <div class= "cart-product" >
          <div class="cart_prod_photo"><img src="img/cart_prod_photo1.png" alt="">
          </div>
          <div class="cart_prod_info">
              <h1>Rebox Zane</h1>
              <div class="stars"><img src="img/stars.png" alt="">
              </div>
              <h2>1 x $250</h2>
          </div>
          <div class="cart_prod_cansel"><img src="img/cansel.png" alt="">
          </div> 
      </div>
  `,

})



//-------------------------------------------------------------------------------------------------------------

new Vue ({
  el: ".app",
  data: {
    query: ''
  }
})