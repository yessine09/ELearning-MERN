import { S3 } from "aws-sdk";
import fs from 'fs';
import { v4 } from 'uuid';


/**
  * @name uploadToS3
  * @param {S3} s3
  * @param {File} fileData
  * @param {string} bucketName
  * @returns {Promise<{success:boolean; message: string; data: object;}>}
*/
export const uploadToS3 = async (s3: S3, fileData: Express.Multer.File, bucketName: string) => {
    try {
        const fileContent = fs.readFileSync(fileData!.path);

        const params = {
            Bucket: bucketName,
            Key: v4() + fileData!.originalname,
            Body: fileContent
        };

        try {
            const res = await s3.upload(params).promise();

            console.log("File Uploaded with Successfull", res.Location);
            console.log("Key : ", res.Key)

            return { success: true, message: "File Uploaded with Successfull", data: res.Location, key: res.Key };
        } catch (error) {
            return { success: false, message: "Unable to Upload the file", data: error };
        }
    } catch (error) {
        return { success: false, message: "Unalbe to access this file", data: {} };
    }
}
