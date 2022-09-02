import fs from "fs";

import { v2 as cloudinary } from "cloudinary";
import { FileService } from "medusa-interfaces";


class CloudinaryService extends FileService {
    constructor({ }, options) {
        super();

        // Initialize the Cloudinary sdk
        cloudinary.config({
            cloud_name: "dcqkldcuz",
            api_key: "244789682694679",
            api_secret: "p4UVbtjUsD9YnAs5Nn3OLzZuBbo",
            secure: options.secure,
        });
    }

    // File upload
    upload(file) {
        console.log("Starting image upload");
        return new Promise((resolve, reject) => {
            // upload_stream allows to upload a file stream
            var upload_stream = cloudinary.uploader.upload_stream(
                {},
                function (err, image) {
                    if (err) {
                        // Reject and return an error if the file upload failed
                        console.error(err);
                        reject(err);
                        return;
                    }
                    // Return the url of image uploaded
                    resolve({ url: image.url });
                }
            );
            // Create a file stream from path and forward it to our uploader
            fs.createReadStream(file.path).pipe(upload_stream);
        });
    }

    delete(file) {
        return new Promise((resolve, reject) => {
            // Pass the name of file to be deleted
            cloudinary.uploader.destroy(file, function (result) {
                resolve(result);
            });
        });
    }
}

export default CloudinaryService;