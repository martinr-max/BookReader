import React from 'react';
import { Button, Card, CardContent, CardActionArea, CardActions, CardMedia } from '@material-ui/core';
import DeleteUSerBookDialog from '../DeleteModel/Deletemodel';
import './UserBooklistItem.css';

 
export default function UserBooklistItem({
     id,
     imageUrl,
     title,
     author,
     open,
     bookIndex,
     handleclickOpen,
     handleClose,
     handleDeleteUserBook
    }) {    

return(
    <div className="container">
  	<div className="card-wrap">
    	 <Card className="root">
      	  <CardActionArea>
           <CardMedia className="userCardMedia" image={imageUrl} />
            <CardContent>
             <h3 className="card-title"> {title} </h3>
             <h4 className="card-author"> {author} </h4>
             <CardActionArea>
             <CardActions>
               <Button className="removeBookButton" onClick={(e)=> handleclickOpen(id)}
                color="primary">
                remove book
               </Button>
               </CardActions>
              </CardActionArea>
             </CardContent>
           </CardActionArea>
         </Card>
    <DeleteUSerBookDialog
	open={open}
	handleClose={handleClose}
	handleclickOpen={handleclickOpen}
	handleDeleteUserBook={handleDeleteUserBook}
	bookid={bookIndex} />
    </div>
   </div>
 );

}
