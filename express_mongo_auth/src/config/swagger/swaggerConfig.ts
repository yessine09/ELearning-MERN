import swaggerJsdoc from 'swagger-jsdoc';
import { programModel } from '../../models/index';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hello World',
            version: '1.0.0',
        },
    },
    servers: [
        {
            url: 'http://localhost:5000',
            description: 'Development server',
        },
        {
            url: 'http://18.184.143.238:5000/',
            description: 'Staging EC2 server'
        }
    ],
    tags: [
        {
            name: 'Programs'
        }
    ],
    /*  paths: {
          '/program/create': {
              post: {
                  summary: 'Create a new program',
                  tags: [
                      'Programs'
                  ],
                  requestBody: {
                      description: 'Program object to be created',
                      required: true,
                      content: {
                          'application/json': {
                              schema: {
                                  $ref: `${programModel}`
                              },
                              example: {
                                  title: 'My Program',
                                  description: 'This is a program description.',
                                  createdBy: '614885cb131c2498364e0fe9',
                                  status: 'published',
                                  weeks: [
                                      {
                                          start: '2023-04-25T00:00:00.000Z',
                                          end: '2023-05-01T00:00:00.000Z',
                                          lessons: [
                                              {
                                                  title: 'My Lesson 1',
                                                  description: 'This is the first lesson.',
                                                  videoUrl: 'https://example.com/my-video-1.mp4'
                                              },
                                              {
                                                  title: 'My Lesson 2',
                                                  description: 'This is the second lesson.',
                                                  videoUrl: 'https://example.com/my-video-2.mp4'
                                              }
                                          ]
                                      }
                                  ]
                              }
                          }
                      }
                  },
                  responses: {
                      200: {
                          description: 'OK',
                          content: {
                              'application/json': {
                                  schema: {
                                      $ref: `${programModel}`
                                  }
                              }
                          }
                      }
                  }
              }
          }
      },*/
    apis: ['../../routes/*.ts'], // files containing annotations as above
};

export const openapiSpecification = swaggerJsdoc(options);