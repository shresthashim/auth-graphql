export const typeDefs = `
type User {
        id: String!
        name: String!
        email: String!
        password: String!
        salt: String!
        userImage: String
        createdAt: String!
        updatedAt: String!
      }

        type Query {
            hello: String    
        }
        type Mutation {
            createUser(name: String!, email: String!, password: String!): User!
        }
    
`;
