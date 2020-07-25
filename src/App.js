import React, { Component } from "react";
import { v4 as uuidv4, v4 } from 'uuid';
import "bootstrap/dist/css/bootstrap.min.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

class App extends Component {

  state = {
    items: [],///顯示的todolist
    id: uuidv4(),
    item: "",///被操作的單獨object
    editItem: false
  };

  handleChange = e => {
    this.setState({
      item:e.target.value
    })
    // console.log(e.target.value)
  };

  handleSubmit = e => {
    e.preventDefault();
    const New = {
      id:this.state.id,
      title:this.state.item
    }
    const Update = [...this.state.items,New]

    this.setState({
      items:Update,
      item:'',
      id:uuidv4(),
      editItem:false
    },()=>console.log(this.state.items))
  };

  clearList = () => {
    this.setState({
      items:[]
    })
  };
  handleDelete = id => {
    const fliterItems = this.state.items.filter(item => item.id !== id);
    this.setState({
      items:fliterItems
    })
  };
  handleEdit = id => {
    const filterItems = this.state.items.filter(item => item.id !== id);
    const selectone = this.state.items.find(item => item.id === id);

    this.setState({
      item : selectone.title,
      items : filterItems,
      id:id,
      editItem:true,
    })
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-5">
            <h3 className="text-capitalize text-center">todo input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
