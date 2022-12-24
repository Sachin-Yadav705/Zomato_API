//Zomato Appilication API Links

//Page 1

# List of city

https://api-for-zomato.herokuapp.com/location

# List of Restaurant

https://api-for-zomato.herokuapp.com/resturantdata

# Restaurant wrt City

https://api-for-zomato.herokuapp.com/resturantdata?stateid=2

# List of QuickSearch

https://api-for-zomato.herokuapp.com/mealtype

//Page 2

# Restaurant wrt Meal

https://api-for-zomato.herokuapp.com/resturantdata?mealid=5

# Restaurant wrt Meal & cuisine

https://api-for-zomato.herokuapp.com/filter/1?cuisineid=2

# Restaurant wrt Meal & cost

https://api-for-zomato.herokuapp.com/filter/1?lcost=400&hcost=12000
https://api-for-zomato.herokuapp.com/filter/1?lcost=400&hcost=900&cuisineid=4

# Sort on basis of cost

https://api-for-zomato.herokuapp.com/filter/1?lcuisineid=4&sort=-1

//Page3

# Details of the Restaurants

//On The Basic Of Object Id

https://api-for-zomato.herokuapp.com/resturantdetails/62c726de1050b3aaad588b27

> //On The Basic Of resturant Id
> https://api-for-zomato.herokuapp.com/resturantdetails/4

# Menu of the Restaurants

https://api-for-zomato.herokuapp.com/menu/3

//Page4

# Menu Details

> localhost:9870/menuItem (POST)
> {"id":[1,6,7]}

# Place Order

> (Post)http://localhost:9870/placeOrder
> {

    "orderId" : 1,
    "name" : "sachin",
    "email" : "sachin@gmail.com",
    "address" : "Hom 42",
    "phone" : 7833345457,
    "cost" : 365,
    "menuItem" : [
    	24,
    	13,
    	8
    ]

}

//Page5

# List of order place

https://api-for-zomato.herokuapp.com/orderdetail

# List of order place wrt to email

https://api-for-zomato.herokuapp.com/orderview/sachin@gmail.com

# update order details with payment

https://api-for-zomato.herokuapp.com/updateorder/3 (PUT)

# delete orders

https://api-for-zomato.herokuapp.com/deleteorder/62dab75822f4756528d4fc7a (delete)
