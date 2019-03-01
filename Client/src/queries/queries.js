import { gql } from "apollo-boost";
const getAllBrands = gql`
{
  brands{
    brand
    id
    image
  }
}
`
const getSingleCar = gql`
query($id:ID){
  car(id:$id){
    id
    image
    brand
    model
    price
    keySpecs {
      mileage
      engine
      bhp
      transmission
      seats
      airbags
      fueltype
      bootspace
    }
  }
}
`
const getAllCars = gql`
query($brand:[String], $seats:[String], $fuel:[String]){
  carList(brand:$brand , seats:$seats , fuel:$fuel){
    id
    image
    brand
    model
    price
  }
}
`
const getFav = gql`
{
  user(id: "5c665c8cfb6fc01c4ce4d1dc") {
    email
    username
    id
    fav {
      model
      brand
      price
      image
      carID
      userID
    }
  }
}
`
const addFav = gql`
mutation($carID:ID!, $userID:ID!, $image:[String!],$brand:String!, $model:String!, $price:String!) {
  addFav(
    carID: $carID,
    userID: $userID, 
    image: $image, 
    brand: $brand,
    model: $model, 
    price: $price) 
    {
      model
    }
}
`
const removeFav = gql`
mutation($carID:ID!){
  removeFav(carID: $carID){
    model
  }
}
`
export { getAllBrands, getAllCars, getFav, addFav, removeFav , getSingleCar };