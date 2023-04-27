import { extname } from "path"

export const imageFileFilter = (req: any, file: any, callback : any) => {
    if(!file.originalName.match(/\.(jpg|jpeg|png)$/)) {
        return callback(new Error('only image files are allowed'), false)
    }
    callback(null, true)
}


// export const editFileName = (req : any, file: any, callback) => {
//     const name = file.originalName.split('.'[0])
//     const fileExtName = extname
// }