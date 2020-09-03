let apiGetProducts = 'https://raw.githubusercontent.com/qvazimodo/API-internetShop/master/responses/catalogData.json';

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



class GoodsItem {

  constructor(titleImage = "img/catalog_items_1.png", title  = "def", color = "def", size = "def", unitPrice = "def", shipping = "def") {
    this.titleImage = titleImage;
    this.title = title;
    this.color = color;
    this.size = size;
    this.unitPrice = unitPrice;
    this.shipping = shipping;

}
render() {
  return `
        <div class="like_items_list " data-color = ${this.color} data-size = ${this.size} data-shipping = ${this.shipping} data-title = "${this.title}" >
            <a href="#" class="like_items_link"><img class="items_img" src= ${this.titleImage}   ></a>
            <div class="like_items_content">
                <a href="#" class="like_items_name">${this.title}</a>
                <div class="like_price_stars">
                     <p class="like_items_price" style="margin-top: 17px; margin-left: 1px;">$${this.unitPrice}</p>
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
    this.filteredGoods = [];
  }

  filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(goods => regexp.test(goods.title));
        this.render();
  }
  fetchGoods(cb) {
    // // асинхронная логика, получение с бека
    // this.goods = goods;
    // получение каталога продуктов
    makeGETRequest(apiGetProducts)
    .then((goods) => {
        this.goods = JSON.parse(goods);
        this.filteredGoods = JSON.parse(goods);
        cb();
    })
    .catch((err)=>{
        console.log(err, "AJAX request failed");
        cb();
    })
  }
  

  render() {
    let html = '';
    this.filteredGoods.forEach(({ titleImage, title, color, size, unitPrice, shipping }) => {
      const goodItem = new GoodsItem(titleImage, title, color, size, unitPrice, shipping);
      html += goodItem.render();
    });
    document.querySelector('.content_product_flex').innerHTML = html;
  }
  summ() {
    // вычисление общей суммы элементов
    let sum = 0;
    this.goods.forEach(({unitPrice}) => {
      let uPrice = parseInt(unitPrice); 
      if(!isNaN (uPrice)) {
        sum += uPrice;
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
list.fetchGoods(() => {
  list.render();
  list.summ();
  
});

// document.querySelector(".search_button").onclick = function() {
//     const value = document.querySelector('#product_search').value;
//     list.filterGoods(value);
//     }

const prodSearch = new Vue ({
    el: ".product__search",
    data: {
      value: ""
    },

    methods: {
      searchValue: function (e) {
        valueS = this.value;
        list.filterGoods(valueS);
      }
     
    }

})


