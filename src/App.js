import React, { Component } from "react";
import "./App.css";
import {Collapse} from 'reactstrap';
import {CardGroup,Card,Button,Accordion, ButtonToolbar,ListGroup,ListGroupItem} from 'react-bootstrap';
import EditRecette from './components/EditRecette.js';
import AddRecette from './components/AddRecette.js';
import 'bootstrap/dist/css/bootstrap.min.css';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recettes: [],
      showAdd: false,
      showEdit: false,
      open: false,
      currentlyEditing: 0
    };
    this.showAddModal = this.showAddModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.addRecette = this.addRecette.bind(this);
    this.editRecette = this.editRecette.bind(this);
    this.deleteRecette = this.deleteRecette.bind(this);
    
  }

 

  componentDidMount() {
    var recettes = (typeof localStorage["recettes"] !== "undefined") ? JSON.parse(localStorage.getItem("recettes")) : [
      {nomRecette : "gauffre", ingredients: [ "250g farine", "40g sucre", "50cl lait", "2 oeufs", "1 sachet levure", "1 sachet sucre vanillé", "1 pincée sel"]},
      {nomRecette : "gateau", ingredients: [ "160g farine", "100g sucre", "15cl lait", "2 oeufs", "50g beurre", "1 sachet sucre vanillé", "1 pincée sel"]},
      {nomRecette : "cookies", ingredients: [ "150g farine", "75g sucre", "50g beurre", "1 oeuf", "100g pépites de chocolat", "1/2 sachet levure", "1 sachet sucre vanillé", "1 pincée sel"]},
      {nomRecette : "pancake", ingredients : [ "250g farine", "75g sucre", "50g beurre", "2 oeufs", "40cl lait entier", "1 sachet levure chimique", "1 sachet sucre vanillé", "1 pincée sel"]}
    ];
    this.setState({recettes: recettes});
  }

  showToggle() {
    this.setState({open: !this.state.open});
  }


  showAddModal() {
    this.setState({showAdd: !this.state.showAdd});
  }

  showEditModal(index) {
    this.setState({currentlyEditing: index, showEdit: !this.state.showEdit});
  }

  addRecette(recette) {
    let recettes = this.state.recettes;
    recettes.push(recette);
    localStorage.setItem('recettes', JSON.stringify(recettes));
    this.setState({recettes: recettes});
    this.showAddModal();
  }

  editRecette(newName, newIngredients, currentlyEditing) {
    let recettes = this.state.recettes;
    recettes[currentlyEditing] = {name: newName, ingredients: newIngredients};
    localStorage.setItem('recettes', JSON.stringify(recettes));
    this.setState({recettes: recettes});
    this.showEditModal(currentlyEditing);
  }

  deleteRecette(index) {
    let recettes = this.state.recettes.slice();
    recettes.splice(index, 1);
    localStorage.setItem('recettes', JSON.stringify(recettes));
    this.setState({recettes: recettes, currentlyEditing: 0});
  }


  render() {
    const recettes = this.state.recettes;
    var currentlyEditing = this.state.currentlyEditing;

    return(
      <div className="container">
        <h1>Recette Menu</h1>
        <CardGroup id="recettes">
          {recettes.map((recette, index) => (
            <Card className="text-center" eventKey={index} key={index}>
              <Accordion.Toggle as={Card.Header} onClick={() => {this.showToggle(index)}} eventKey={index} style={{cursor:"pointer"}}>
              {recette.nomRecette}
              </Accordion.Toggle>
              {/* <Card.Header>
                <Card.Title className="title" toggle>{recette.nomRecette}</Card.Title>
              </Card.Header> */}
              <Collapse isOpen={this.showToggle} eventKey={index}>
                <Card.Body>
                  <ListGroup>
                    {recette.ingredients.map((ingredient, index) => (
                      <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                    ))}
                  </ListGroup>
                  <ButtonToolbar className="justify-content-center m-3">
                    <Button className="mr-2" variant="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                    <Button className="mr-2" variant="danger" onClick={() => {this.deleteRecette(index)}}>Delete</Button>
                  </ButtonToolbar>
                </Card.Body>
              </Collapse>
              {/* <Card.Body collapsible>
                <ListGroup>
                  {recette.ingredients.map((ingredient, index) => (
                    <ListGroupItem key={index}>{ingredient}</ListGroupItem>
                  ))}
                </ListGroup>
                <ButtonToolbar className="justify-content-center m-3">
                  <Button className="mr-2" variant="warning" onClick={() => {this.showEditModal(index)}}>Edit</Button>
                  <Button className="mr-2" variant="danger" onClick={() => {this.deleteRecette(index)}}>Delete</Button>
                </ButtonToolbar>
              </Card.Body> */}
              <EditRecette onShow={this.state.showEdit} onEdit={this.editRecette} onEditModal={() => {this.showEditModal(currentlyEditing)}} currentlyEditing={currentlyEditing} recette={recettes[currentlyEditing]} />
            </Card>
          ))}
        </CardGroup>
        <Button className="justify-content-center align-item-center m-4" variant="primary" onClick={this.showAddModal}>Add recette</Button>
        <AddRecette onShow={this.state.showAdd} onAdd={this.addRecette} onAddModal={this.showAddModal} />
      </div>
    );
  }
}
 

    


export default App;
