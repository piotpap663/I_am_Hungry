import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';

import {
  ENDPOINT_GET_RESTAURANT_BY_USER_ID,
  ENDPOINT_RESTAURANT_LIST,
  ENDPOINT_ADD_RESTAURANT
} from '../config';
import axios from 'axios';
import { connect } from 'react-redux';

import {
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
  Paper
} from '@material-ui/core';
import { categories } from '../config';
import { history } from '../routers/AppRouter';

const drawerWidth = '15em';
const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '0.5em'
  },
  divContainer: {
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: '750px',
    textAlign: 'center'
  },
  detailsRoot: {
    display: 'flex',
    flexFlow: 'column'
  },
  flex: {
    flex: 1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginTop: '4em'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%'
  },
  button: {
    margin: theme.spacing.unit
  },
  addBtn: {
    width: '25%',
    margin: theme.spacing.unit
  },
  addTypeBtn: {
    justifyContent: 'center',
    width: '90%'
  },
  menu: {
    width: '200'
  },
  toolbar: theme.mixins.toolbar,
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: '90%'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  threeColumns: {
    display: 'flex',
    width: '90%'
  },
  saveBtn: {
    width: '30%',
    display: 'flex',
    alignSelf: 'center',
    marginTop: '1em'
  },
  PaperButton: {
    width: '100%'
  }
});
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
class MyRestaurantList extends React.Component {
  state = {
    open: false,
    selectedRestaurant: -1,
    selectedIndex: 0,
    restaurants: [],
    selectedCategories: [],
    newCategoryName: '',
    newRestaurantName: ''
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleChangeCategory = event => {
    this.setState({ selectedCategories: event.target.value });
  };
  getCurrentRestaurantMenu = (selectedRestaurant, dishTypes) => {
    return this.state.restaurants &&
      this.state.restaurants.length &&
      this.state.restaurants[selectedRestaurant] &&
      this.state.restaurants[selectedRestaurant].Menu &&
      this.state.restaurants[selectedRestaurant].Menu[dishTypes[0]]
      ? this.state.restaurants[selectedRestaurant].Menu[dishTypes[0]]
      : null;
  };
  handleClickOpen = selectedRestaurant => async e => {
    await this.setState({ selectedRestaurant });
    const category = this.state.restaurants[selectedRestaurant].category;
    const postalCode = this.state.restaurants[
      selectedRestaurant
    ].postalCode.join(',');
    const {
      name,
      address,
      email,
      minOrderPrice,
      deliveryCost,
      _id
    } = this.state.restaurants[selectedRestaurant];

    const dishTypes = this.state.restaurants[selectedRestaurant].Menu
      ? Object.keys(this.state.restaurants[selectedRestaurant].Menu)
      : null;

    const restaurantMenu = await this.getCurrentRestaurantMenu(
      selectedRestaurant,
      dishTypes
    );

    if (restaurantMenu && restaurantMenu.length > 0) {
      const prepareTypes = await restaurantMenu.map(item => item.types)[0];
      const types = prepareTypes && prepareTypes.length ? prepareTypes : null;

      const prepareExtras = restaurantMenu.map(item => item.extras)[0];
      const extras =
        prepareExtras && prepareExtras.length ? prepareExtras : null;
      const components = restaurantMenu.components
        ? restaurantMenu.components.split(',')
        : null;

      this.setState({
        _id,
        selectedIndex: 0,
        open: true,
        selectedRestaurant,
        name,
        address,
        email,
        postalCode,
        minOrderPrice,
        deliveryCost,
        selectedCategories: category,
        types,
        components,
        extras,
        dishTypes: ['Ogólne', ...dishTypes],
        typesSwitch: types && types.length ? true : false,
        extrasSwitch: extras && extras.length ? true : false,
        restaurantMenu: restaurantMenu
      });
    }
  };
  updateFields = async () => {
    const dishTypes = Object.keys(
      this.state.restaurants[this.state.selectedRestaurant].Menu
    );
    const restaurantMenu =
      this.state.restaurants &&
      this.state.restaurants.length &&
      this.state.restaurants[this.state.selectedRestaurant] &&
      this.state.restaurants[this.state.selectedRestaurant].Menu &&
      this.state.restaurants[this.state.selectedRestaurant].Menu[
        dishTypes[this.state.selectedIndex - 1]
      ]
        ? this.state.restaurants[this.state.selectedRestaurant].Menu[
            dishTypes[this.state.selectedIndex - 1]
          ]
        : null;
    if (restaurantMenu && restaurantMenu.length > 0) {
      try {
        const prepareTypes = await restaurantMenu.map(item => item.types)[0];
        const types = prepareTypes && prepareTypes.length ? prepareTypes : null;

        const prepareExtras = restaurantMenu.map(item => item.extras)[0];
        const extras =
          prepareExtras && prepareExtras.length ? prepareExtras : null;
        const components = restaurantMenu.components
          ? restaurantMenu.components.split(',')
          : null;
        await this.setState({
          types,
          components,
          extras,
          typesSwitch: types && types.length ? true : false,
          restaurantMenu: restaurantMenu
        });
      } catch (error) {
        console.error();
      }
    }
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  handleListItemClick = async (event, index) => {
    await this.setState({ selectedIndex: index });
    await this.updateFields();
  };
  addCategoryMenu = async () => {
    const name = this.state.newCategoryName;
    if (name) {
      const newCategory = { title: '', types: [], components: [], extras: [] };
      const restaurants = this.state.restaurants;
      restaurants[this.state.selectedRestaurant].Menu[name] = [
        {
          ...newCategory
        }
      ];
      const dishTypes = this.state.dishTypes;
      dishTypes.push(name);

      this.setState({ restaurants, dishTypes });
    } else {
      alert('Niepoprawna nazwa');
    }
    // await this.saveMenuToDatabase();
  };

  handleExtras = (property, index, typeIndex) => event => {
    const restaurantMenu = [...this.state.restaurantMenu];
    const extras = restaurantMenu[index].extras.map((item, ind) => {
      if (ind === typeIndex) {
        item[property] = event.target.value;
      }
      return item;
    });
    restaurantMenu[index].extras = extras;
    this.setState({ restaurantMenu });
  };
  handleTypes = (property, index, typeIndex) => event => {
    const restaurantMenu = [...this.state.restaurantMenu];
    const types = restaurantMenu[index].types.map((item, ind) => {
      if (ind === typeIndex) {
        item[property] = event.target.value;
      }
      return item;
    });
    restaurantMenu[index].types = types;
    this.setState({ restaurantMenu });
  };
  addType = index => e => {
    const newItem = { name: '', price: '' };
    const restaurantMenu = [...this.state.restaurantMenu];
    restaurantMenu[index].types.push(newItem);
    this.setState({ restaurantMenu });
  };
  removeType = (index, typeIndex) => e => {
    const restaurantMenu = [...this.state.restaurantMenu];
    const types = restaurantMenu[index].types.filter(
      (item, ind) => typeIndex !== ind
    );
    restaurantMenu[index].types = types;
    this.setState({ restaurantMenu });
  };
  addExtras = index => e => {
    const newItem = { name: '', price: '' };
    const restaurantMenu = [...this.state.restaurantMenu];
    restaurantMenu[index].extras.push(newItem);
    this.setState({ restaurantMenu });
  };
  removeExtras = (index, extrasIndex) => e => {
    const restaurantMenu = [...this.state.restaurantMenu];
    const extras = restaurantMenu[index].extras.filter(
      (item, ind) => extrasIndex !== ind
    );
    restaurantMenu[index].extras = extras;
    this.setState({ restaurantMenu });
  };
  fetchRestaurantsByOwner = async () => {
    axios
      .post(ENDPOINT_GET_RESTAURANT_BY_USER_ID, {
        id: this.props.ownerId
      })
      .then(response => {
        this.setState({ restaurants: response.data });
      })
      .catch(function(error) {
        console.error(error);
      })
      .then(function() {
        // always executed
      });
  };
  async componentDidMount() {
    await this.fetchRestaurantsByOwner();
  }
  handleComponents = (name, property) => e => {
    const restaurantMenu = [...this.state.restaurantMenu];
    const changed = restaurantMenu.map((menuItem, index) => {
      if (menuItem.components === name) {
        menuItem.components = e.target.value.split(',');
      }
      return menuItem;
    });
    this.setState({ restaurantMenu: changed });
  };
  handle = (name, property) => e => {
    const restaurantMenu = [...this.state.restaurantMenu];
    const changed = restaurantMenu.map((menuItem, index) => {
      if (menuItem[property] === name) {
        menuItem[property] = e.target.value;
      }
      return menuItem;
    });
    this.setState({ restaurantMenu: changed });
  };
  saveMenuToDatabase = () => {
    axios
      .patch(ENDPOINT_RESTAURANT_LIST + `/${this.state._id}`, {
        Menu: [this.state.restaurantMenu],
        property: this.state.dishTypes[this.state.selectedIndex]
      })
      .then(response => {
        // this.setState({ popup: response.data });
      })
      .catch(function(error) {
        console.error(error);
      })
      .then(function() {
        // always executed
      });
  };
  saveRestaurantInfoToDatabase = () => {
    const {
      name,
      address,
      email,
      deliveryCost,
      minOrderPrice,
      selectedCategories
    } = this.state;
    const postalCode =
      this.state.postalCode && this.state.postalCode.length > 0
        ? this.state.postalCode.split(',')
        : null;

    axios
      .patch(ENDPOINT_RESTAURANT_LIST + `/${this.state._id}`, {
        property: 'INFO',
        name,
        address,
        email,
        postalCode,
        deliveryCost,
        minOrderPrice,
        category: selectedCategories
      })
      .then(response => {
        // this.setState({ popup: response.data });
      })
      .catch(function(error) {
        console.error(error);
      })
      .then(function() {
        // always executed
      });
  };
  addRestaurant = async () => {
    axios
      .post(ENDPOINT_ADD_RESTAURANT, {
        name: this.state.newRestaurantName,
        owners: this.props.ownerId
      })
      .then(response => {
        // this.setState({ popup: response.data });
        history.push('/myRestaurants');
      })
      .catch(function(error) {
        console.error(error);
      })
      .then(function() {
        // always executed
      });

    // refresh the page
    await this.fetchRestaurantsByOwner();
  };
  render() {
    const currentRestaurant =
      this.state.restaurants &&
      this.state.restaurants.length &&
      this.state.selectedRestaurant + 1
        ? this.state.restaurants[this.state.selectedRestaurant]
        : null;
    const { classes, theme } = this.props;
    return (
      <div className={classes.divContainer}>
        {this.state.restaurants && this.state.restaurants.length
          ? this.state.restaurants.map((restaurant, index) => (
              <Paper className={classes.root} elevation={1}>
                <Button
                  key={index}
                  onClick={this.handleClickOpen(index)}
                  className={classes.PaperButton}
                >
                  {restaurant.name}
                </Button>
              </Paper>
            ))
          : 'Brak'}
        <TextField
          id={'newRestaurantName'}
          label={'Nazwa restauracji'}
          type="text"
          className={classes.textField}
          value={this.state.newRestaurantName}
          onChange={this.handleChange('newRestaurantName')}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.addRestaurant}
        >
          Dodaj restaurację
        </Button>
        {currentRestaurant && (
          <Dialog
            fullScreen
            open={this.state.open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <div className={classes.root}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    color="inherit"
                    onClick={this.handleClose}
                    aria-label="Close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography
                    variant="title"
                    color="inherit"
                    className={classes.flex}
                  >
                    {currentRestaurant.name}
                  </Typography>
                  <Button color="inherit" onClick={this.handleClose}>
                    Zapisz
                  </Button>
                </Toolbar>
              </AppBar>
              <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                  paper: classes.drawerPaper
                }}
              >
                <div className={classes.toolbar} />
                <List>
                  {this.state.dishTypes && this.state.dishTypes.length > 0
                    ? this.state.dishTypes.map((text, index) => (
                        <ListItem
                          button
                          key={index}
                          selected={this.state.selectedIndex === index}
                          onClick={event =>
                            this.handleListItemClick(event, index)
                          }
                        >
                          <ListItemIcon>
                            <InboxIcon />
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItem>
                      ))
                    : null}
                  <TextField
                    id={'newCategoryName'}
                    label={'Nazwa kategorii'}
                    type={null}
                    className={classes.textField}
                    value={this.state.newCategoryName}
                    onChange={this.handleChange('newCategoryName')}
                    margin="normal"
                  />
                  <Button
                    onClick={this.addCategoryMenu}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Dodaj kategorię
                  </Button>
                </List>
              </Drawer>
              <main className={classes.content}>
                <div className={classes.detailsRoot}>
                  {this.state.selectedIndex === 0 && (
                    <React.Fragment>
                      <TextField
                        id={'name'}
                        label={'Nazwa'}
                        type={null}
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                      />
                      <TextField
                        id={'address'}
                        label={'Adres'}
                        type={null}
                        className={classes.textField}
                        value={this.state.address}
                        onChange={this.handleChange('address')}
                        margin="normal"
                      />
                      <TextField
                        id={'email'}
                        label={'E-mail'}
                        type={null}
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                      />
                      <TextField
                        id={'postalCodes'}
                        label={'Kody pocztowe'}
                        type={null}
                        className={classes.textField}
                        value={this.state.postalCode}
                        onChange={this.handleChange('postalCode')}
                        margin="normal"
                      />
                      <TextField
                        id={'deliveryCost'}
                        label={'Koszt dostawy'}
                        type={'number'}
                        className={classes.textField}
                        value={this.state.deliveryCost}
                        onChange={this.handleChange('deliveryCost')}
                        margin="normal"
                      />
                      <TextField
                        id={'minOrderPrice'}
                        label={'Minimalna wartość zamówienia'}
                        type={'number'}
                        className={classes.textField}
                        value={this.state.minOrderPrice}
                        onChange={this.handleChange('minOrderPrice')}
                        margin="normal"
                      />
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="select-multiple">
                          Kategorie
                        </InputLabel>
                        <Select
                          multiple
                          value={this.state.selectedCategories}
                          onChange={this.handleChangeCategory}
                          input={<Input id="select-multiple" />}
                          MenuProps={MenuProps}
                        >
                          {categories.map(name => (
                            <MenuItem
                              key={name}
                              value={name}
                              style={{
                                fontWeight:
                                  this.state.selectedCategories.indexOf(
                                    name
                                  ) === -1
                                    ? theme.typography.fontWeightRegular
                                    : theme.typography.fontWeightMedium
                              }}
                            >
                              {name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </React.Fragment>
                  )}
                  {this.state.selectedIndex !== 0
                    ? this.state.restaurantMenu.map((menuItem, index) => {
                        return (
                          <React.Fragment>
                            <TextField
                              id="Name"
                              label="Title"
                              type="text"
                              key={index + 'name'}
                              className={classes.textField}
                              value={menuItem.title}
                              onChange={this.handle(menuItem.title, 'title')}
                              margin="normal"
                            />
                            <TextField
                              id={'components'}
                              label={'Składniki'}
                              type={'text'}
                              key={index + 'components'}
                              className={classes.textField}
                              value={menuItem.components}
                              onChange={this.handleComponents(
                                menuItem.components,
                                'components'
                              )}
                              margin="normal"
                            />
                            <span>Typy</span>
                            {menuItem.types && menuItem.types.length > 0
                              ? menuItem.types.map(
                                  (menuItemType, typeIndex) => (
                                    <div className={classes.threeColumns}>
                                      <TextField
                                        id="name"
                                        label="Nazwa"
                                        type="text"
                                        key={index + 'typeName'}
                                        className={classes.textField}
                                        value={menuItemType.name}
                                        onChange={this.handleTypes(
                                          'name',
                                          index,
                                          typeIndex
                                        )}
                                        margin="normal"
                                      />
                                      <TextField
                                        id="price"
                                        label="Cena"
                                        type="number"
                                        key={index + 'typePrice'}
                                        className={classes.textField}
                                        value={menuItemType.price}
                                        onChange={this.handleTypes(
                                          'price',
                                          index,
                                          typeIndex
                                        )}
                                        margin="normal"
                                      />
                                      <Button
                                        onClick={this.removeType(
                                          index,
                                          typeIndex
                                        )}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                      >
                                        Usuń
                                      </Button>
                                    </div>
                                  )
                                )
                              : null}
                            <Button
                              className={classes.addTypeBtn}
                              onClick={this.addType(index)}
                              variant="contained"
                              color="primary"
                              className={classes.addBtn}
                            >
                              Dodaj typ
                            </Button>

                            <span>Dodatki</span>

                            {menuItem.extras && menuItem.extras.length > 0
                              ? menuItem.extras.map(
                                  (menuItemType, extrasIndex) => (
                                    <div className={classes.threeColumns}>
                                      <TextField
                                        id="name"
                                        label="Nazwa"
                                        type="text"
                                        key={index + 'extrasName'}
                                        className={classes.textField}
                                        value={menuItemType.name}
                                        onChange={this.handleExtras(
                                          'name',
                                          index,
                                          extrasIndex
                                        )}
                                        margin="normal"
                                      />
                                      <TextField
                                        id="price"
                                        label="Cena"
                                        type="number"
                                        key={index + 'extrasPrice'}
                                        className={classes.textField}
                                        value={menuItemType.price}
                                        onChange={this.handleExtras(
                                          'price',
                                          index,
                                          extrasIndex
                                        )}
                                        margin="normal"
                                      />
                                      <Button
                                        onClick={this.removeExtras(
                                          index,
                                          extrasIndex
                                        )}
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                      >
                                        Usuń
                                      </Button>
                                    </div>
                                  )
                                )
                              : null}
                            <Button
                              className={classes.addBtn}
                              onClick={this.addExtras(index)}
                              variant="contained"
                              color="primary"
                            >
                              Dodaj dodatek
                            </Button>
                          </React.Fragment>
                        );
                      })
                    : null}
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveBtn}
                    onClick={
                      this.state.selectedIndex !== 0
                        ? this.saveMenuToDatabase
                        : this.saveRestaurantInfoToDatabase
                    }
                  >
                    <SaveIcon className={classes.leftIcon} />
                    Zapisz
                  </Button>
                </div>
              </main>
            </div>
          </Dialog>
        )}
      </div>
    );
  }
}

MyRestaurantList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  // const products = state.cart.products;
  const ownerId = state.auth.id;
  return {
    ownerId
  };
};
export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(MyRestaurantList)
);
