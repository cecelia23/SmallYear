import { Upload, Icon, Modal, message } from "antd";
import React from "react";
import PropTypes from "prop-types";

import { reqDeletePicture } from "../../api";
import { BASE_IMG_URL } from "../../config/default";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends React.Component {
  static propTypes = {
    imgs: PropTypes.array
  };
  constructor(props) {
    super(props);
    let fileList = [
      {
        uid: "-1", //每个文件的唯一标识，建议设为负数
        name: "image.png",
        status: "done", // done -- 已上传
        url:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      }
    ];
    const { imgs } = this.props;
    if (imgs && imgs.length > 0) {
      fileList = imgs.map((item, index) => ({
        uid: -index, //每个文件的唯一标识，建议设为负数
        name: item,
        status: "done", // done -- 已上传
        url: BASE_IMG_URL + item
      }));
    }
    this.state = {
      previewVisible: false, // 是否预览大图
      previewImage: "",
      fileList
    };
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = async ({ file, fileList }) => {
    console.log(file);
    // 一旦上传成功，可将当前上传的file信息修正（name, url）
    if (file.status === "done") {
      const result = file.respone;
      if (result.status === 0) {
        message.success("上传图片成功");
        // fileList中最后一个元素与file不是同一个对象
        fileList[fileList.length - 1].name = result.data.name;
        fileList[fileList.length - 1].url = result.data.url;
      } else {
        message.error("上传失败");
      }
    } else if (file.status === "removed") {
      const result = await reqDeletePicture(file.name);
      if (result.status === 0) {
        message.success("删除图片成功");
      } else {
        message.error("删除图片失败！");
      }
    }
    this.setState({ fileList });
  };
  getImgs = () => {
    return this.state.fileList.map(item => item.name);
  };
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action={BASE_IMG_URL + "manage/img/upload"} // 上传图片的接口地址
          accept="image/*" // 接收文件的类型
          name="image" // 请求参数名
          listType="picture-card"
          fileList={fileList} // 所有已上传文件的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
