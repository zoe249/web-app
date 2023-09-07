<template>
  <div>
    <div :style="uploadWrapper" v-show="isShowImg && imgtypes">
      <div class="elementImg">
        <img
          :src="url"
          alt=""
          class="imgSingleClass"
          mode="widthFix"
          id="imgId"
        />
      </div>
    </div>
    <div v-show="isShowImg && !imgtypes">
      <img
        :src="url"
        alt=""
        class="imgSingleClass"
        mode="widthFix"
        id="imgId"
      />
    </div>
    <div v-show="isShowImg" class="img-btns">
      <span class="priview-btn" @click="priviewImg(url)">预览</span>
      <span class="delete-btn" @click="deleteImg">删除</span>
    </div>
    <el-upload
      :action="domain"
      accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDFg"
      :data="QiniuData"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :before-remove="beforeRemove"
      :before-upload="beforeAvatarUpload"
      :limit="limitNumber"
      multiple
      :on-exceed="handleExceed"
      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">{{ utypeInfo.message }}</div>
    </el-upload>
    <el-dialog
      title="图片预览"
      append-to-body
      :visible.sync="preViewDialogVisible"
      width="50%"
    >
      <div class="previewImgwrapper">
        <img class="previewImg" :src="previewImgPath" alt="" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
import imgInfo from './YpSingleUpload.js'
export default {
  props: {
    utype: {
      type: String,
      default: 'common'
    },
    url: {
      type: String
    },
    imgSingleInfo: {
      type: Boolean,
      default: false
    },
    imgSingleSize: {
      type: Object
    },
    imgtype: {
      type: Boolean
    },
    typeStatus: {
      type: String
    },
    limitNumber: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      loadingStatus: '',
      domain: this.$domain,
      imgtypes: false,
      test: '600px',
      isShowImg: true,
      preViewDialogVisible: false,
      fileList: [],
      previewImgPath: '',
      uploadWrapper: {
        width: '150px',
        height: '190px'
      },
      imgUpload: {
        width: '100%',
        height: '100%'
      },
      // 判断上传前是否检验成功
      isLt500kb: true,
      // 根据js判断的信息
      utypeInfo: '',
      QiniuData: {
        key: '', // 图片名字处理
        token: '', // 七牛云token
        data: {}
      },
      qiniuaddr: '' // 七牛云的图片外链地址 七牛云空间的外链地址
    }
  },
  created() {
    // console.log(this.utype)
    // // 根据传值来筛选内容
    // imgInfo.imgInfo.forEach(item => {
    //   if (item.utype === this.utype) {
    //     this.utypeInfo = item
    //   }
    // })
    // this.uploadWrapper.width = this.utypeInfo.widthUse ? this.utypeInfo.widthUse : this.uploadWrapper.width
    // this.uploadWrapper.height = this.utypeInfo.heightUse ? this.utypeInfo.heightUse : this.uploadWrapper.height
    // console.log(this.uploadWrapper)
    // console.log('9999')
    // this.getQiniuToken()
    // // 为编辑时回显数据做判断
    // if (this.url === '' || this.url === null) {
    //   this.isShowImg = false
    // }
    this.firstChangeEvent()
  },
  // computed: {
  //   ...mapState(['domain'])
  // },
  methods: {
    firstChangeEvent() {
      console.log(this.utype)
      // 根据传值来筛选内容
      imgInfo.imgInfo.forEach((item) => {
        if (item.utype === this.utype) {
          this.utypeInfo = item
        }
      })
      if (!this.imgSingleInfo) {
        this.uploadWrapper.width = this.utypeInfo.widthUse
          ? this.utypeInfo.widthUse
          : this.uploadWrapper.width
        this.uploadWrapper.height = this.utypeInfo.heightUse
          ? this.utypeInfo.heightUse
          : this.uploadWrapper.height
      } else {
        this.uploadWrapper.width = this.imgSingleSize.width
        this.uploadWrapper.height = this.imgSingleSize.height
      }

      console.log(this.uploadWrapper)
      console.log('9999')
      this.getQiniuToken()
      // 为编辑时回显数据做判断
      if (this.url === '' || this.url === null) {
        this.isShowImg = false
      }
    },
    getQiniuToken() {
      // 七牛云接口
      this.$api.getQiniuTokenApi.getQiniuToken().then((res) => {
        this.qiniuaddr = res.data.cdnDomainName
        this.QiniuData.token = res.data.qiniuToken
      })
    },
    priviewImg(previewImgPath) {
      this.preViewDialogVisible = true
      this.previewImgPath = previewImgPath
    },
    async deleteImg() {
      const confirmResult = await this.$confirm(
        '此操作将永久删除, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch((err) => err)
      if (confirmResult !== 'confirm') {
        this.$message.info('用户取消了删除')
      } else {
        this.handleRemove()
        this.$message.success('删除成功')
      }
    },
    handleRemove(file, fileList) {
      console.log(this.fileList)
      console.log(file)
      this.fileList = []
      this.$emit('update:url', '')
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        '当前限制选择 1 张图片，如需更换，请删除上一张图片在重新选择！'
      )
    },
    beforeAvatarUpload(file) {
      const loading = this.$loading({
        lock: true,
        text: '正在加载数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 图片上传之前的方法
      const isPNG = file.type === 'image/png'
      const isJPEG = file.type === 'image/jpeg'
      const isJPG = file.type === 'image/jpg'
      // 根据图片的大小来进行比对
      var fileSize = file.size / 1000
      if (fileSize < this.utypeInfo.imgSize) {
        this.isLt500kb = true
      } else {
        this.$message.error(
          '上传图标大小不能超过' + this.utypeInfo.imgSize + 'kb'
        )
        loading.close()
        this.isLt500kb = false
        return
      }
      console.log(this.isLt500kb)
      if (!isPNG && !isJPEG && !isJPG) {
        this.$message.error('上传头像图片只能是 jpg、png、jpeg 格式!')
        loading.close()
        return false
      }
      this.QiniuData.data = file
      this.QiniuData.key = `${file.uid}`
      loading.close()
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      const loading = this.$loading({
        lock: true,
        text: '正在加载数据',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      console.log('666666666')
      console.log(response)
      this.imgtypes = true
      console.log(this.utypeInfo.width)
      if (!this.imgSingleInfo) {
        this.uploadWrapper.width = this.utypeInfo.width / 192 + 'rem'
        this.uploadWrapper.height = this.utypeInfo.height / 192 + 'rem'
      }
      // this.uploadWrapper.width = this.utypeInfo.width / 192 + 'rem'
      // this.uploadWrapper.height = this.utypeInfo.height / 192 + 'rem'
      console.log(this.uploadWrapper.width)
      console.log('458641651641')
      if (this.isLt500kb) {
        console.log(file, fileList)
        console.log(this.fileList)
        const uploadUrl = `${this.qiniuaddr}/${response.key}`
        const image = new Image()
        image.src = uploadUrl

        const that = this
        // 根据上传图片的大小进行比对
        image.onload = function () {
          if (
            image.width <= that.utypeInfo.width &&
            image.height <= that.utypeInfo.height
          ) {
            that.$message.success('上传成功！')
            that.$emit('update:url', uploadUrl)
            that.$emit('imgChange', uploadUrl)
            loading.close()
          } else {
            console.log(that.utypeInfo.widths)
            console.log('666622')
            if (that.utypeInfo.widths !== undefined) {
              if (
                image.width <= that.utypeInfo.widths &&
                image.height <= that.utypeInfo.heights
              ) {
                that.$message.success('上传成功！')
                that.$emit('update:url', uploadUrl)
                that.$emit('imgChange', uploadUrl)
                loading.close()
              } else {
                that.$message.error(
                  '上传图片大小为' +
                    that.utypeInfo.widths +
                    '*' +
                    that.utypeInfo.heights +
                    '请重新上传' +
                    '或者' +
                    that.utypeInfo.width +
                    '*' +
                    that.utypeInfo.height
                )
                that.handleRemove()
                loading.close()
              }
            } else {
              that.$message.error(
                '上传图片大小为' +
                  that.utypeInfo.width +
                  '*' +
                  that.utypeInfo.height +
                  '请重新上传'
              )
              that.handleRemove()
              loading.close()
            }
          }
        }
      }
    },
    // 删除图片
    beforeRemove(file, fileList) {
      this.handleRemove()
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  watch: {
    imgtype: function () {
      this.imgtypes = this.imgtype
    },
    utype: function () {
      this.firstChangeEvent(0)
    },
    url: {
      handler() {
        if (this.url !== '' || this.url === undefined) {
          this.isShowImg = true
        } else {
          this.isShowImg = false
          this.handleRemove()
        }
      },
      deep: true
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.el-dialog {
  border-radius: 10px !important;
  overflow: hidden;
  // background: #757cbb;
}
/deep/.el-dialog__header {
  padding: 5px 5px 5px;
  height: 36px;
  background: #409eff;
  .el-dialog__title {
    line-height: 36px;
    color: #fff;
    font-size: 16px;
    margin-left: 20px;
  }
  .el-dialog__headerbtn {
    top: 15px;
    right: 20px;
    color: #fff !important;
  }
  .el-icon-close {
    color: #fff;
  }
}
// 图片上传区域样式
/deep/.el-upload-list--picture .el-upload-list__item {
  display: none !important;
}
// .upload-img-container {
//   // display: flex !important;
//   // width: 100%;
// }
.uploadWrapper {
  display: flex;
  flex-direction: column;
  // width: 150px;
  // height: 180px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: #eee;
  overflow: hidden;
}
// 图片上传组件
.img-upload {
  width: 100%;
  height: 150px;

  // border-radius: 10px;
}
.ddd {
  width: 100%;
  height: 500px;
}
// 图片按钮
.img-btns {
  height: 20px;
  width: 100%;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  span {
    margin-left: 10px;
    line-height: 30px;
    // margin-right: 10px;
    cursor: pointer;
  }
  .priview-btn {
    color: #757cbb;
  }
  .delete-btn {
    color: red;
  }
}
.previewImgwrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .previewImg {
    width: 80%;
    height: 80%;
  }
}
.el-upload__tip {
  color: #757cbb;
}
.imgSingleClass {
  // width: 100%;
  // height: 100%;
  width: 50%;
  height: 50%;
}
// .elementImg {
//   width: 300px;
//   height: 180px;
// }
</style>
