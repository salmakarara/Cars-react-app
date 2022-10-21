import React from 'react';
import { Typography,Button,Card,CardActions,CardContent,CardMedia } from '@material-ui/core';
import useStyles from './styles';
const CartItem = ({item,onUpdateQnt,onRemoveFromCart}) => {
  const classes=useStyles();
  return (
    <Card className="cart-item">
      <CardMedia  image={item.image.url} alt={item.name} className={classes.media}/>
      <CardContent className={classes.cardContent}>
<Typography variant='body2'>{item.name}</Typography>
<Typography variant='body2'>{item.price.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type='button' size='small' onClick={()=>onUpdateQnt(item.id,item.quantity-1)}>-</Button>
          <Typography>{item.quantity}</Typography>
          <Button type='button' size='small'onClick={()=>onUpdateQnt(item.id,item.quantity+1)}>+</Button>
        </div>
        <Button variant="contained" type="button" color="secondary" onClick={()=>onRemoveFromCart(item.id)}>Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem
