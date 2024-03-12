import { initBucket } from './aws/initBucket'
import { S3 } from 'aws-sdk'
import { Request, Response } from 'express'
import { uploadToS3 } from './aws/uploadToS3'
import config from '../config/configs'
import Lesson from '../models/programModels/lesson'

export default class UploadServices {
  static async uploadClientAvatar(req: Request) {
    const s3 = new S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    })

    // Initialize bucket
    await initBucket(s3, config.aws.avatarBucketName)

    // get file data through req.file thank to multer
    console.log('file stobject', req.file)

    return await uploadToS3(s3, req.file!, config.aws.avatarBucketName)
  }

  static async uploadTaskAttachments(req: Request, res: Response) {
    try {
      const s3 = new S3({
        accessKeyId: config.aws.accessKeyId,
        secretAccessKey: config.aws.secretAccessKey,
      })

      // Initialize bucket
      await initBucket(s3, config.aws.tasksAttachmentsBucketName)

      // get file data through req.file thank to multer
      console.log('file stobject', req.file)
      const file = await uploadToS3(s3, req.file!, config.aws.tasksAttachmentsBucketName)
      const fileKey = file.key!
      const name = req.file!.originalname
      return { fileKey, name }
    } catch (error) {
      // handle the error here
      console.error(error)
      throw new Error('Failed to upload task attachment')
    }
  }

  static async uploadLessonsAttachments(req: Request, res: Response) {
    const s3 = new S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    })

    // Initialize bucket
    await initBucket(s3, config.aws.lessonsAttachmentsBucketName)

    // get file data through req.file thank to multer
    console.log('file stobject', req.file)
    const filekey = await uploadToS3(s3, req.file!, config.aws.lessonsAttachmentsBucketName)
    console.log('file key', filekey)
    //update lesson
    // Update the lesson document with the filekey
    const lessonId = req.params.lessonId // Get the lesson id from the request parameters
    console.log('update lesson with filekey', lessonId)
    const lesson = await Lesson.findById(lessonId)

    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    // Add the new attachment to the existing attachments
    const attachments = lesson.attachments || []
    attachments.push({ name: req.file!.originalname, fileKey: filekey.key! })

    // Update the lesson document with the new attachments
    lesson.attachments = attachments
    await lesson.save()

    return res.status(200).json({ message: 'Attachment uploaded successfully' })
  }

  static async downloadClientAvatar(req: Request, res: Response) {
    const s3 = new S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    })

    // Initialize bucket
    await initBucket(s3, config.aws.avatarBucketName)

    console.info('The key is ', req.params.fileKey)
    const params = {
      Bucket: config.aws.avatarBucketName,
      Key: req.params.fileKey,
    }

    // Use the S3 getObject method to download the image
    res.attachment(params.Key)
    var fileStream = s3.getObject(params).createReadStream()

    fileStream.pipe(res)
    res.status(200)
  }

  static async downloadTaskAttachment(req: Request, res: Response) {
    const s3 = new S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    })

    // Initialize bucket
    await initBucket(s3, config.aws.tasksAttachmentsBucketName)

    console.info('The key is ', req.params.fileKey)
    const params = {
      Bucket: config.aws.tasksAttachmentsBucketName,
      Key: req.params.fileKey,
    }

    // Use the S3 getObject method to download the image
    res.attachment(params.Key)
    var fileStream = s3.getObject(params).createReadStream()

    fileStream.pipe(res)
    res.status(200)
  }

  static async downloadLessonsAttachment(req: Request, res: Response) {
    const s3 = new S3({
      accessKeyId: config.aws.accessKeyId,
      secretAccessKey: config.aws.secretAccessKey,
    })

    // Initialize bucket
    await initBucket(s3, config.aws.lessonsAttachmentsBucketName)
    console.info('The key is ', req.params.fileKey)
    const params = {
      Bucket: config.aws.lessonsAttachmentsBucketName,
      Key: req.params.fileKey,
    }

    // Use the S3 getObject method to download the image
    res.attachment(params.Key)
    var fileStream = s3.getObject(params).createReadStream()

    fileStream.pipe(res)

    fileStream.on('end', () => {
      console.log('Served by Amazon S3: ', params.Key)
    })

    res.on('finish', () => {
      console.log('Response finished.')
    })

    res.status(200)
  }
}
