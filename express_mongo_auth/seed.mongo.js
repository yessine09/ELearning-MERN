/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { hash } = require('bcrypt')
const { MongoClient } = require('mongodb')

// Connexion à la base de données MongoDB
const connectDb = async () => {
  const uri =
    'mongodb+srv://OutailOuni:$Hitler-619@shapecluter0.vlieluz.mongodb.net/?retryWrites=true&w=majority'
  const client = new MongoClient(uri)
  return await client.connect()
}

// Appel de la fonction de connexion et exécution des opérations après la connexion
connectDb().then(async (mongo) => {
  const resourcesCollection = mongo.db('test').collection('resources')
  const rolesCollection = mongo.db('test').collection('roles')
  const usersCollection = mongo.db('test').collection('users')
  // Affichage dans la console d'un message indiquant que la connexion à MongoDB est établie
  console.log('connected to Mongodb 🥭 -- seeding db')

  //* seeding resources
  // Définition des données à insérer dans la collection "resources"
  const resources = [
    {
      name: 'users',
      permissions: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'roles',
      permissions: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'resources',
      permissions: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'self',
      permissions: {
        read: true,
        write: true,
        update: true,
        delete: true,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  // Affichage dans la console d'un message indiquant le début du processus de seeding pour la collection "resources"
  console.log('🌱 Seeding resources collection 🍀')

  // Insertion des données dans la collection "resources" et récupération des identifiants des documents insérés
  const { insertedIds } = await resourcesCollection.insertMany(resources)

  //* seeding roles
  // Définition des données à insérer dans la collection "roles"
  const roles = [
    {
      name: 'admin',
      resources: [insertedIds[0], insertedIds[1], insertedIds[2]],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'user',
      resources: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'mentor',
      resources: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'content_creator',
      resources: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'entreprise',
      resources: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      name: 'all',
      resources: [insertedIds[3]],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]
  // Affichage dans la console d'un message indiquant le début du processus de seeding pour la collection "roles"
  console.log('🌱 Seeding roles collection 🍀')

  // Insertion des données dans la collection "roles" et récupération des identifiants des documents insérés
  const { insertedIds: insertedRolesIds } = await rolesCollection.insertMany(roles)
  //* seeding user -- create an admin
  const admin = {
    email: 'admin@platform.com',
    password: await hash('platform_password2022', 12),
    firstName: 'admin',
    lastName: 'platform',
    roles: [insertedRolesIds[0], insertedRolesIds[4]],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  console.log('🌱 Seeding users collection 🍀')

  // Insertion des données dans la collection "users" pour créer un utilisateur admin
  await usersCollection.insertOne(admin)

  // Fermeture de la connexion à la base de données MongoDB
  await mongo.close()
})
