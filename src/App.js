import React, { Component, Fragment } from "react";
import categories from "./categories.json";

class App extends Component {
  state = {
    search: "",
    searchAction: false
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value, searchAction: true });
  };

  displayCategories = () => {
    return categories.map(category => {
      return (
        category.ParentCategoryId === 0 && (
          <li key={category.Id}>
            <div>{category.Name}</div>
            {this.showSubCategory(category.Id)}
          </li>
        )
      );
    });
  };

  displaySearchCategories = () => {
    const { search } = this.state;
    const subCategoriesParents = [];
    const filteredParentCategories = [];

    const rootCategories = categories.filter(
      category =>
        category.ParentCategoryId === 0 &&
        category.Name.toLowerCase().includes(search.toLowerCase())
    );
    categories.map(
      category =>
        category.ParentCategoryId !== 0 &&
        category.Name.toLowerCase().includes(search.toLowerCase()) &&
        subCategoriesParents.push(
          categories.filter(cat => cat.Id === category.ParentCategoryId)[0]
        )
    );
    subCategoriesParents.map(cat => {
      const exist = filteredParentCategories.filter(el => el.Name === cat.Name);
      return exist.length < 1 && filteredParentCategories.push(cat);
    });
    return (
      <Fragment>
        {rootCategories.map(category => (
          <li key={category.Id}>{category.Name}</li>
        ))}
        {filteredParentCategories.map(category => (
          <li key={category.Id}>
            <div>{category.Name}</div>
            {this.showSubCategory(category.Id)}
          </li>
        ))}
      </Fragment>
    );
  };

  showSubCategory = id => {
    const subCategories = categories.filter(
      category => category.ParentCategoryId === id
    );
    return (
      <ul>
        {subCategories.map(category => (
          <li key={category.Id}>{category.Name}</li>
        ))}
      </ul>
    );
  };

  render() {
    const { search, searchAction } = this.state;
    return (
      <div>
        <div>
          <input
            type="text"
            onChange={this.handleInputChange}
            value={search}
            name="search"
            onFocus={() => this.setState({ searchAction: true })}
            onBlur={() => this.setState({ searchAction: false })}
          />
        </div>
        <br />
        {searchAction && search.length > 0 ? (
          <ul>{this.displaySearchCategories()}</ul>
        ) : (
          <ul>{this.displayCategories()}</ul>
        )}
      </div>
    );
  }
}

export default App;
