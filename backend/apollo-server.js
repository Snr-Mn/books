const { ApolloServer } = require("apollo-server-express");
const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res })
});


const app = express();
app.use(validateTokensMiddleware); // middleware to be built
apolloServer.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`
  )
);


const { verify } = require("jsonwebtoken");

function validateAccessToken(token) {
  try {
    return verify(token, "<your secret key for access token>");
  } catch {
    return null;
  }
}

function validateRefreshToken(token) {
  try {
    return verify(token, "<your secret key for refresh token>");
  } catch {
    return null;
  }
}
