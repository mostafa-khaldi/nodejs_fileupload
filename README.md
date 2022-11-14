# NodeJS file upload 
a simple code to upload files to a NodeJS server

## Endpoints

### To upload a single file
POST /api/upload/single <br/>
The file key in the formdata `file`

### To upload multiple files
POST /api/upload/bulk <br/>
The file key in the formdata `file`

### To delete a single file
DELETE /api/image <br/>
Params `path` of the file uploaded

## Prerequisits 
1- Set the property `x-dataupload-key` in the request `header` carrying the API key value <br/>
2- Set `API_KEY` as an environment variable in the backend with the same value as the one sent from the frontend
