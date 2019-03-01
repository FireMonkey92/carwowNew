var graphql = require('graphql');
var User = require('../models/user')
var Car = require('../models/car')
var Brand = require('../models/brand')
var Fav = require('../models/fav')
var {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;
const CarType = new GraphQLObjectType({
    name: 'CarType',
    fields: () => ({
        id: { type: GraphQLID },
        image: { type: new GraphQLList(GraphQLString) },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        price: { type: GraphQLString },
        keySpecs: {
            type: keySpecType,
        }
    })
})
const keySpecType = new GraphQLObjectType({
    name: 'KeySpecType',
    fields: () => ({
        mileage: { type: GraphQLString },
        engine: { type: GraphQLString },
        bhp: { type: GraphQLString },
        transmission: { type: GraphQLString },
        seats: { type: GraphQLString },
        airbags: { type: GraphQLString },
        fueltype: { type: GraphQLString },
        bootspace: { type: GraphQLString }
    })
})
const favType = new GraphQLObjectType({
    name: 'favType',
    fields: () => ({
        carID: { type: GraphQLID },
        userID: { type: GraphQLID },
        image: { type: new GraphQLList(GraphQLString) },
        brand: { type: GraphQLString },
        model: { type: GraphQLString },
        price: { type: GraphQLString }
    })
})
const userType = new GraphQLObjectType({
    name: 'userType',
    fields: () => ({
        id: { type: GraphQLID },
        profilePic: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        fav: {
            type: new GraphQLList(favType),
            resolve(parent, args) {
                return Fav.find({ userID: parent.id })
            }
        }
    })
})
const BrandType = new GraphQLObjectType({
    name: 'BrandType',
    fields: () => ({
        id: { type: GraphQLID },
        image: { type: GraphQLString },
        brand: { type: GraphQLString },
        carList: {
            type: new GraphQLList(CarType),
            resolve(parent, args) {
                return Car.find({ brand: parent.brand })
            }
        }
    })
})
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        car: {
            type: CarType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Car.findById(args.id)
            }
        },
        carList: {
            type: new GraphQLList(CarType),
            args: {
                brand: { type: GraphQLList(GraphQLString) },
                seats: { type: GraphQLList(GraphQLString) },
                fuel: { type: GraphQLList(GraphQLString) }
            },
            resolve(parent, args) {
                console.log(args)
                if (args.brand.length !== 0 && args.seats.length !== 0 && args.fuel.length !== 0) {
                    console.log("All")
                    // if selection is made by all type filter
                    return Car.find({ $and: [{ brand: args.brand }, { "keySpecs.seats": args.seats }, { "keySpecs.fueltype": args.fuel }] })
                } else if (args.brand.length !== 0 && args.seats.length !== 0) {
                    //get Selected brand & Seats
                    return Car.find({ $and: [{ brand: args.brand }, { "keySpecs.seats": args.seats }] })
                }
                else if (args.brand.length !== 0 && args.fuel.length !== 0) {
                    //get Selected brand & fuel
                    return Car.find({ $and: [{ brand: args.brand }, { "keySpecs.fueltype": args.fuel }] })
                }
                else if (args.seats.length !== 0 && args.fuel.length !== 0) {
                    //get Selected seats & fuel
                    return Car.find({ $and: [{ "keySpecs.seats": args.seats }, { "keySpecs.fueltype": args.fuel }] })
                }
                else if (args.brand.length !== 0) {
                    //get Selected brand
                    return Car.find({ brand: args.brand })
                }
                else if (args.seats.length !== 0) {
                    //get Selected seats query
                    return Car.find({ "keySpecs.seats": args.seats })
                }
                else if (args.fuel.length !== 0) {
                    //get Selected seats query
                    return Car.find({ "keySpecs.fueltype": args.fuel })
                }
                else
                    return Car.find({})
            }
        },
        user: {
            type: userType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        brands: {
            type: new GraphQLList(BrandType),
            resolve(parent, args) {
                return Brand.find({}).sort({ brand: 1 })
            }
        },
        brand: {
            type: new GraphQLList(CarType),
            args: {
                brand: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Car.find({ brand: args.brand })
            }
        }
    }
})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: userType,
            args: {
                profilePic: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                username: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let user = new User({
                    profilePic: args.profilePic,
                    email: args.email,
                    username: args.username,
                    password: args.password
                })
                return user.save();
            }
        },
        addFav: {
            type: favType,
            args: {
                carID: { type: new GraphQLNonNull(GraphQLID) },
                userID: { type: new GraphQLNonNull(GraphQLID) },
                image: { type: new GraphQLList(GraphQLString) },
                brand: { type: new GraphQLNonNull(GraphQLString) },
                model: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                Fav.find({ $and: [{ carID: args.carID }, { userID: args.userID }] }, (err, result) => {
                    if (result.length === 0) {
                        var fav = new Fav({
                            carID: args.carID,
                            userID: args.userID,
                            image: args.image,
                            brand: args.brand,
                            model: args.model,
                            price: args.price
                        });
                        return fav.save();
                    } else {
                        return { "message": "You have already added this to favoriates" }
                    }
                })
            }
        },
        removeFav: {
            type: favType,
            args: {
                carID: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Fav.remove({ carID: args.carID })
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})