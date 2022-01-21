const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Tokens {
    accessToken: String
    refreshToken: String
  }

  type Mutation {
    login(username: String, password: String!): Tokens
  }
`;
async function login(_, { username, password }) {
    const user = await users.get({ email, username });
    if (!user) return null;

    const passwordValid = await validatePassword(password, user.password);

    if (!passwordValid) return null;

    return setTokens(user);
}
const { sign } = require("jsonwebtoken");
const Bookmodel = require("./Book");

function setTokens(user) {
    const sevenDays = 60 * 60 * 24 * 7 * 1000;
    const fifteenMins = 60 * 15 * 1000;
    const accessUser = {
        id: user.id
    };
    const accessToken = sign(
        { user: accessUser },
        "<your secret key for access token>",
        {
            expiresIn: fifteenMins
        }
    );
    const refreshUser = {
        id: user.id,
        count: user.tokenCount
    };
    const refreshToken = sign(
        { user: refreshUser },
        "<your secret key for refresh token>",
        {
            expiresIn: sevenDays
        }
    );

    return { accessToken, refreshToken };
}

async function addBooks(_, params, context) {
    console.log("aaa: ", params)
    const books = new Bookmodel(params)
    try {
        await books.save();
        return books;
    } catch (error) {
        return error;
    }
}
async function deleteBooks(_, {bookId}, context) {
    console.log("aaa: ", bookId);
    Bookmodel.deleteOne({ _id: bookId })
        .then(() => {
            console.log("Data Deleted")
        })
        .catch((error)=> {
            console.log(error);
        })

}