import path from "path"

import multer from "multer"

const upload = multer({
    dest: "uploads/",
    limits:{fileSize:50*1024*1024}, // 50mb in size max limit
    storage:multer.diskStorage({
        destination:"uploads/",
        filename:(req,file,cb)=>{
            cb(null,file.originalname);
        }
    }),

    fileFilter:(_req,file,cb) => {
        let ext = path.extname(file.originalname);
        if(ext !== ".jpg" && ext !== ".png" && ext !== ".webp" && ext !==".png"){
            cb(new Error (`unsupported file type !{ext}`),false)
            return ;
        }
        cb(null,true);
    }
});

export default upload;