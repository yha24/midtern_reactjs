import React from "react";

import axios from "axios";
import '../style/admin.css';

class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product: [],
          id: null,
          name: '',
          price: '',
          image: '',
          color: '',
          name_category: '',
          material: '',
          expiry_date: '',
          origin: '',
          description: ''
        };
    }
    setStatus = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }
    componentDidMount() {
        axios
            .get("http://localhost:3000/products/")
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    deleteBook = (id) => {
        axios
            .delete("http://localhost:3000/products/" + id)
            .then(response => {
                console.log(response);
                const product = this.state.product.filter(item => item.id !== id);
                this.setState({ product });
            })
            .catch(error => {
                console.log(error);
            });
    }
    addBook = async () => {
        try {
          const Productlist = {
            name: this.state.name,
            price:this.state.price,
            image: this.state.image,
            color: this.state.color,
            name_category: this.state.name_category,
            material: this.state.material,
            expiry_date: this.state.expiry_date,
            origin: this.state.origin,
            description:this.state.description
          };
      
          const response = await axios.post(
            "http://localhost:3000/products",
            Productlist
          );
      
          console.log(response);
      
          const updatedProduct = [...this.state.product, response.data];
      
          this.setState({
            product: updatedProduct,
            name: '',
            price: '',
            image: '',
            color: '',
            name_category: '',
            material: '',
            expiry_date: '',
            origin: '',
            description: ''
          });
        } catch (error) {
          console.log(error);
        }
      };
      
      
      editBook = (id) => {
        const product = this.state.product.find(item => item.id === id);
        this.setState({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          color: product.color,

          material: product.material,
          expiry_date: product.expiry_date,
          origin: product.origin,
          description: product.description,
          showEditForm: true
        });
      }
      
      formAddBook = () => {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="text" className="form-control" value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Image</label>
                      <input type="text" className="form-control" value={this.state.image} onChange={(e) => this.setState({ image: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <input type="text" className="form-control" value={this.state.color} onChange={(e) => this.setState({ color: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Name Category</label>
                      <input type="text" className="form-control" value={this.state.name_category} onChange={(e) => this.setState({ name_category: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Material</label>
                      <input type="text" className="form-control" value={this.state.material} onChange={(e) => this.setState({ material: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Expiry_date</label>
                      <input type="text" className="form-control" value={this.state.expiry_date} onChange={(e) => this.setState({ expiry_date: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Origin</label>
                      <input type="text" className="form-control" value={this.state.origin} onChange={(e) => this.setState({ origin: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    formEditBook = () => {
        if (!this.state.showEditForm) {
          return null; // Không hiển thị form khi showEditForm = false
        }
      
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                  <div className="form-group">
                      <label>ID</label>
                      <input type="text" className="form-control" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
                    </div>
                  <div className="form-group">
                      <label>Name</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input type="text" className="form-control" value={this.state.price} onChange={(e) => this.setState({ price: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Image</label>
                      <input type="text" className="form-control" value={this.state.image} onChange={(e) => this.setState({ image: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Color</label>
                      <input type="text" className="form-control" value={this.state.color} onChange={(e) => this.setState({ color: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Material</label>
                      <input type="text" className="form-control" value={this.state.material} onChange={(e) => this.setState({ material: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Expiry_date</label>
                      <input type="text" className="form-control" value={this.state.expiry_date} onChange={(e) => this.setState({ expiry_date: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Origin</label>
                      <input type="text" className="form-control" value={this.state.origin} onChange={(e) => this.setState({ origin: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.updateBook}>Sửa</button>
                    <button type="button" className="btn btn-primary" onClick={() => this.setState({ showEditForm: false })}>Hủy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      updateBook = () => {
        const { id, name, price, image, color, name_category, material, expiry_date, origin, description } = this.state;
        const updatedProduct = {
          id,
          name,
          price,
          image,
          color,
          name_category,
          material,
          expiry_date,
          origin,
          description
        };
      
        axios
          .put(`http://localhost:3000/products/${id}`, updatedProduct)
          .then(response => {
            console.log(response);
            const updatedProductList = this.state.product.map(item => {
              if (item.id === id) {
                return updatedProduct;
              }
              return item;
            });
            this.setState({ product: updatedProductList, showEditForm: false });
          })
          .catch(error => {
            console.log(error);
          });
      }
      
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 class="Title_table">Quản lý sản phẩm</h4>
                                    <p className="card-text">
                                    <button className="btn btn-primary" onClick={this.setStatus}>Thêm sản phẩm mới</button>
                                        {/* <button class="AddBtn" onClick={this.setStatus}>Add Book</button> */}
                                    </p>
                                    {this.state.showAddForm ? this.formAddBook() : null}

                                    <table className="table table-bordered">
                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Image</th>
                                                <th>Color</th>
                                                <th>Name_category</th>
                                                <th>Material</th>
                                                <th>Expiry_date</th>
                                                <th>Origin</th>
                                                <th>Description</th>
                                                <th>Xóa</th>
                                                <th>Sửa</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.product.map((products) =>(
                                                <tr >
                                                    <td><textbox type="text" name="id" onChange={this.handleChange} /> {products.id}</td>
                                                    <td>{products.name}</td>
                                                    <td><img className="img2" src={products.image} alt={products.name} /></td>
                                                    <td>{products.color}</td>
                                                    <td>{products.name_category}</td>
                                                    <td>{products.material}</td>
                                                    <td>{products.expiry_date}</td>
                                                    <td>{products.origin}</td>
                                                    <td>{products.description}</td>
                                                    <td><button className="btn btn-primary" onClick={() => this.deleteBook(products.id)}>Delete</button></td>
                                                    <td><button className="btn btn-primary" onClick={() => this.editBook(products.id)}>Edit</button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showEditForm ? this.formEditBook() : null}
             </div>
        );
     }
 }
export default Admin;
