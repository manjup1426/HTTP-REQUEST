import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { product } from './model/products';

@Injectable({
  providedIn: 'root'
})
export class ProdcutServiceService {

  constructor(private http: HttpClient) { }
  // url='https://console.firebase.google.com'
  addProduct(product: any) {
    const hearders = new HttpHeaders({ 'myHeaders': 'manjuHeader' });
    this.http.post('https://angularbymanju-default-rtdb.firebaseio.com/products.json', product, { headers: hearders }).subscribe((res => {
      console.log(product)
    }));
  }
  getProduct() {
    return this.http.get<{[key:string]:product}>('https://angularbymanju-default-rtdb.firebaseio.com/products.json').
    pipe(map((res) => {
      const products: any[] = [];
      for (let key in res) {
        if (res.hasOwnProperty(key)) {
          products.push({ ...res[key], id: key })
        }
      }
      return products;
    }))
  }
  deleteProduct(id:string){
    this.http.delete('https://angularbymanju-default-rtdb.firebaseio.com/products/'+id+'.json').subscribe();
  }
  clearProduct(){
    this.http.delete('https://angularbymanju-default-rtdb.firebaseio.com/products.json').subscribe();
  }
  updateProduct(id,value:product){
    this.http.put('https://angularbymanju-default-rtdb.firebaseio.com/products/'+id+'.json', value).subscribe();
  }

}
