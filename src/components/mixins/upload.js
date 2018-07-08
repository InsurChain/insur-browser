import ajax from "../api/index"
import axios from 'axios'
export default {
    data() {
        return {
            uptoken: {},
            uploadType: '',
            url: 'http://upload.qiniu.com/',
            fileType: ''
        }
    },
    created() {
        this.getToken();
    },
    methods: {
        getToken() {
            ajax.getToken()
                .then(rs => {
                    this.uptoken.token = rs.data.upToken;
                    this.uptoken.domain = rs.data.qiniuDomain;
                    this.uptoken.bucket = rs.data.qiniuBucketName;
                })
                .catch(error => {
                    this.$err(error.msg);
                });
        },
        beforeUpload(file, me) {
            if (file.type.indexOf('image') > -1) {
                this.fileType = 'image'
                const isJPG = file.type === 'image/jpeg'
                const isPNG = file.type === 'image/png'
                const isGIF = file.type === 'image/gif'
                if (!isJPG && !isPNG) {
                    this.$err('图片只能上传 JPG/PNG/GIF 格式');
                    return false;
                }
                if (file.size > 1024 * 1024 * 4) {
                    this.$err('请上传少于4MB的图片')
                    return false;
                }
            }
            if (file.type.indexOf('video') > -1) {
                this.fileType = 'video'
                const isogg = file.type === 'video/ogg'
                const ismp4 = file.type === 'video/mp4'
                const iswebm = file.type === 'video/webm'
                if (!isogg && !ismp4 && !iswebm) {
                    this.$err('视频只能上传 mp4/ogg/webm 格式');
                    return false;
                }
            }
            if(me == 'attachs'){
                this.upLoad(file,me)
            }else{
                if (this.fileType === 'image' || this.fileType === 'video') {
                    if (!this.useEle) {//是否使用element自带上传组件
                        this.upLoad(file,me)
                        return false
                    } else {
                        this.eleupload(file)
                    }
                } else {
                    this.$err('不支持上传此格式');
                    return false
                }
            }
            
        },
        upLoad(file, me) {
            console.log(file);
            this.uploadType = file.name.split('.')[1];
            let option={title:file.name,size:file.size};
            let fmData = new FormData();
            fmData.append('file', file);
            fmData.append('domain', this.uptoken.domain);
            fmData.append('bucket', this.uptoken.bucket);
            fmData.append('token', this.uptoken.token)
            fmData.append('key', this.$route.name+'-' + this.uuid() + '.' + this.uploadType)
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            };
            if(this.fileType === 'image' && !this.loadingpic){//上传加载图
                this.loadingpic = true;
            }else if(this.fileType === 'video' && !this.loadingVideo){
                this.loadingVideo = true;
            }
            axios.post(this.url, fmData, config)
                .then(rs => {
                    if(me == 'attachs'){
                        this.getAttachs(this.uptoken.domain + '/' + rs.data.key, me,option)
                    }else{
                        if (this.fileType === 'image') {
                            this.getImage(this.uptoken.domain + '/' + rs.data.key, me)
                        } else {
                            this.getVideo(this.uptoken.domain + '/' + rs.data.key)
                        }
                    }
                    
                })
                .catch(err => {
                    if(this.loadingpic){
                        this.loadingpic = false;
                    }
                    if(this.loadingVideo){
                        this.loadingVideo = false;
                    }
                    this.$err(err.msg)
                })
        },
        uuid() {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";
            var uuid = s.join("");
            return uuid;
        },
    },
}