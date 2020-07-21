import mongoose from 'mongoose'
import { ApolloError } from 'apollo-server-express'
import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/User'
import Composition from "..//models/Composition";
import { register } from '../schemas/index'

const mongoDBError =(err)=>{
   switch (err.code) {
      case 11000:
         throw new ApolloError(err.keyValue.email
            ? `${err.keyValue.email} already in use`
            : `${err.keyValue.username} already exists`)
      default:
         break;
   }
}

export default {
   Query: {
      users: (root, args, context, info)=> {
         return User.find({})
      },
      getUserInfo: async(root, args, {req}, info)=>{
         try {
            const tokenFromHeader = req.headers.refresh.split('Bearer ')[1]
            const decoded = await jwt.verify(tokenFromHeader, process.env.JWT_USER_REFRESH_SECRET_KEY)
            const foundUser = await User.findById(decoded.id)
            return foundUser
         } catch (err) {
            throw new ApolloError(err.message)
         }
      },
      compositions: (root, args, context, info) => {
         return Composition.find({})
      },
      userCompositions: (root, { id }, context, info)=>{
         return Composition.find({author: id})
      }
      ,
      login: async(root, { email, password }, {res}, info)=> {
         try {
            if(!password || !email)throw new Error('Please, fill out all fields')
            
            const foundUser = await User.findOne({email})
            if(!foundUser) throw new Error('User not found')
            
            const passCheck = await compare(password, foundUser.password)
            if(!passCheck) throw new Error('Check your credentials')
            
            const foundUserNoPass = foundUser.toObject();
            delete foundUserNoPass.password;

            const accessToken = jwt.sign(foundUserNoPass, process.env.JWT_USER_SECRET_KEY, {
               expiresIn: "15m"
            })

            const refreshToken = jwt.sign({id: foundUserNoPass._id}, process.env.JWT_USER_REFRESH_SECRET_KEY, {
               expiresIn: "7d",
            });

            res.cookie("access-token", accessToken, {
               expires: new Date(Date.now() + 60000 * 15),
               httpOnly: false,
               secure: process.env.NODE_ENV === "production" ? true : false,
            })
            res.cookie("refresh-token", refreshToken, {
               expires: new Date(Date.now() + 60000 * 60 * 24 * 7),
               httpOnly: false,
               secure: process.env.NODE_ENV === "production" ? true : false,
            })

            return foundUser
         } catch (err) {
            throw new ApolloError(err.message)
         } 
      }, 
   },
   Mutation: {
      register: async(root, args, {res}, info)=> {
         try {
            const validationResult = await register.validate(args)
            if(validationResult.error)throw new Error(validationResult.error)

            const createdUser = await User.create(args)
            
            const createdUserNoPass = createdUser.toObject();
            delete createdUserNoPass.password;

            const accessToken = jwt.sign(createdUserNoPass, process.env.JWT_USER_SECRET_KEY, {
               expiresIn: "15m"
            })

            const refreshToken = jwt.sign({id: createdUserNoPass._id}, process.env.JWT_USER_REFRESH_SECRET_KEY, {
               expiresIn: "7d",
            });

            res.cookie("access-token", accessToken, {
               expires: new Date(Date.now() + 60000 * 15),
               httpOnly: false,
               secure: process.env.NODE_ENV === "production" ? true : false,
            })
            res.cookie("refresh-token", refreshToken, {
               expires: new Date(Date.now() + 60000 * 60 * 24 * 7),
               httpOnly: false,
               secure: process.env.NODE_ENV === "production" ? true : false,
            })

            return createdUser
         } catch (err) {
            if(err.code){
               mongoDBError(err)
            }else{
               throw new ApolloError(err.message)
            }
         }
      },
      saveComposition: (root, args, context, info)=>{
         try {
            return Composition.create(args)
         } catch (error) {
            if(err.code){
               mongoDBError(err)
            }else{
               throw new ApolloError(err.message)
            }
         }
      },
      deleteComposition: async(root, {id}, context, info) => {
         try {
            const result = await Composition.findByIdAndDelete(id)
            if(!result) throw new Error('Something went wrong. Please refresh the page')
            return result
         } catch (err) {
            if(err.code){
               mongoDBError(err)
            }else{
               throw new ApolloError(err.message)
            }
         }
      }
      
   }
}