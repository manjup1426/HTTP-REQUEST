import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ProdcutServiceService } from './prodcut-service.service';
import { CommonModule } from '@angular/common';
import { product } from './model/products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  data: product[] = [];
  isLoading:boolean=false;
  Edit:boolean=false;
  selectedId='';
  @ViewChild('productsForm') form!: NgForm;


  constructor(private dataServ: ProdcutServiceService) {
  }
  ngOnInit(): void {
    this.getProducts();
  }
  onProductCreate(productsForm) {
    const products: { Pname: string; Pdescription: string; Pprice: string } = {
      Pname: productsForm.value.Pname,
      Pdescription: productsForm.value.Pdescription,
      Pprice: productsForm.value.Pprice
    };
      if(this.Edit){
        this.dataServ.updateProduct(this.selectedId,products);
        productsForm.reset();
        alert("you have updated the product " + products.Pname);
        this.getProducts();
        this.Edit=false;
      }
      else{this.dataServ.addProduct(products);
      productsForm.reset();
      alert("you have added the product " + products.Pname);
      this.getProducts();}
      
  }
  getProducts() {
    // this.isLoading=true;
    setTimeout(()=>{
      this.dataServ.getProduct().subscribe((res) => {
        this.data = res;
        console.log(res);
        // this.isLoading=false;
      })
    });
  }
  deleteProducts(id: string, i) {
    this.dataServ.deleteProduct(id);
    alert(`you have deleted the Product of Sr.No ` + (i + 1))
    this.getProducts();
  }
  clearProducts() {
    this.dataServ.clearProduct();
    alert('you have cleared all products')
    this.getProducts();
  }
  editProducts(id:any){
    this.selectedId=id;
    let selectedProduct=this.data.find((f)=>{return f.id=== id});
    this.form.setValue({
      Pname:selectedProduct.Pname,
      Pdescription:selectedProduct.Pdescription,
      Pprice:selectedProduct.Pprice
    });
    this.Edit=true
  }
}
