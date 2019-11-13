import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FastFood from '@material-ui/icons/fastfood';
import React from 'react';
import { connect } from 'react-redux';

const firstCategoryName = 'Wybierz wszystkie';
// const categories = [
//     'Wybierz wszystkie',
//     'Włoska',
//     'Polska',
//     'Sushi',
//     'Amerykańska',
//     'Turecka',
//     'Pizza',
//     'Burgery',
//     'Kebab',
//     'Indyjska',
//     'Japońska',
//     'Zdrowe jedzenie',
//     'Zupy',
//     'Wegańska',
//     'Pierogi',
//     'Sałatki',
//     'Gyros',
//     'Makarony',
//     'Curry',
//     'Przekąski',
//     'Dania na lunch',
//     'Międzynarodowa',
//     'Drób',
//     'Ryby',
//     'Owoce morza',
// ];

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  focusVisible: {
    backgroundColor: '#a9dbff'
  },
  nested: {},
  ListItem: {
    margin: '2px',
    border: '1px solid #ececec',
    borderRadius: '5%'
  }
});
class CategoryFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0, open: false };
  }
  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  addAllRestaurantsCategory = firstCategoryName => {
    let obj = {};
    obj[firstCategoryName] = 0;
    return obj;
  };
  countCategories = (restaurantsList, firstCategoryName) => {
    let firstCategory = this.addAllRestaurantsCategory(firstCategoryName);
    var counter = { ...firstCategory };
    if (restaurantsList) {
      for (let item of restaurantsList) {
        if (item.category) {
          for (let cat of item.category) {
            typeof counter[cat] === 'number'
              ? (counter[cat] += 1)
              : (counter[cat] = 1);
            counter[firstCategoryName] += 1;
          }
        }
      }
      return counter;
    } else {
      return {};
    }
  };
  render() {
    const { classes, restaurantList } = this.props;

    const categoriesCounted = this.countCategories(
      restaurantList,
      firstCategoryName
    );
    const categories = Object.keys(categoriesCounted);

    return (
      <div className={classes.root}>
        <List component="nav">
          {categories.map(
            (categoryName, index) =>
              index < 5 && (
                <ListItem
                  selected={this.state.selected === index}
                  key={index}
                  button
                  className={classes.ListItem}
                  onClick={e => {
                    this.setState({ selected: index });
                    this.props.setCategory(categoryName);
                  }}
                >
                  {index === 0 && (
                    <ListItemIcon>
                      <FastFood />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    inset
                    primary={`${categoryName} (${
                      categoriesCounted[categoryName]
                    })`}
                  />
                </ListItem>
              )
          )}

          {!this.state.open &&
            categories &&
            categories.length > 5 && (
              <ListItem button onClick={this.handleClick}>
                <ListItemText inset primary="Więcej" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
            )}
          {categories &&
            categories.length > 5 && (
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                {categories.map(
                  (categoryName, index) =>
                    index > 4 && (
                      <List key={index} component="div" disablePadding>
                        <ListItem
                          selected={this.state.selected === index}
                          button
                          className={(classes.nested, classes.ListItem)}
                          onClick={e => {
                            this.setState({ selected: index });
                            this.props.setCategory(categoryName);
                          }}
                        >
                          <ListItemText
                            inset
                            primary={`${categoryName} (${
                              categoriesCounted[categoryName]
                            })`}
                          />
                        </ListItem>
                      </List>
                    )
                )}

                <ListItem button onClick={this.handleClick}>
                  <ListItemText inset primary="Mniej" />
                  <ExpandLess />
                </ListItem>
              </Collapse>
            )}
        </List>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  minprice: state.filters.category,
  restaurantList: state.restaurants.restaurantsList
});
const mapDispatchToProps = dispatch => {
  return {
    setCategory: category => {
      dispatch({
        type: 'SET_CATEGORY',
        category
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CategoryFilter));
