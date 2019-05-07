import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { connect } from 'react-redux';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: '.5em'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    maxHeight: '6em',
    alignSelf: 'center'
  },
  menuItem: {
    '&:hover': {
      backgroundColor: '#f3f4ff'
    }
  },
  extraInfoComponents: {
    fontSize: '2em'
  },
  extraInfo: {
    fontSize: '1.5em'
  },
  itemTitle: {
    fontSize: '4em'
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function OneRestaurantMenuDetails(props) {
  const { classes, menu, handleModalOpen } = props;

  const categories = Object.keys(menu);
  return (
    <TabContainer>
      {categories.map((products, index) => {
        return (
          <Paper key={index} className={classes.root} elevation={1}>
            <Typography
              key={index}
              variant="display3"
              component="h3"
              style={{ backgroundColor: '#efebeb', padding: '.4em' }}
            >
              {categories[index]}
            </Typography>
            {menu[products].map((item, ind) => (
              <div
                className={classes.menuItem}
                key={ind}
                style={{ display: 'flex', cursor: 'pointer' }}
                onClick={() => {
                  handleModalOpen(item);
                }}
              >
                <div key={ind} style={{ padding: '1em', flex: '1 1' }}>
                  <Typography
                    className={classes.itemTitle}
                    key={ind}
                    variant="display1"
                    component="h3"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    className={classes.extraInfoComponents}
                    key={ind + 'key'}
                    component="p"
                  >
                    {item.components && item.components.length
                      ? 'Składniki: ' + item.components.join(', ')
                      : null}
                  </Typography>
                  <Typography
                    className={classes.extraInfo}
                    key={ind + 'k'}
                    component="p"
                  >
                    {item.extras && item.extras.length
                      ? 'Do wyboru: ' +
                        item.extras.map(item => item.name).join(', ')
                      : null}
                  </Typography>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  <span style={{ textTransform: 'lowercase' }}>
                    {item.types[0].price} zł
                  </span>
                  <AddIcon className={classes.rightIcon} />
                </Button>
              </div>
            ))}
          </Paper>
        );
      })}
    </TabContainer>
  );
}
const mapStateToProps = state => {
  const menu = state.menu.menu;
  return {
    menu
  };
};
export default connect(mapStateToProps)(
  withStyles(styles)(OneRestaurantMenuDetails)
);
