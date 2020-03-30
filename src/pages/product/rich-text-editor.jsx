import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import PropTypes from "prop-types";
// 注意：一定要引入该样式
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

class RichTextEditor extends Component {
  static propTypes = {
    editor: PropTypes.string
  };
  constructor(props) {
    super(props);
    const html = this.props.editor;
    if (html) {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
          editorState
        };
      }
    } else {
      this.state = {
        editorState: EditorState.createEmpty()
      };
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  getDetail = () => {
    const { editorState } = this.state;
    const value = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    return value;
  };

  uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        // 接口不成功
        xhr.open('POST', '/manage/imgs/update');
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const url = response.data.url;
          resolve({data: {link: url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }
  
  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorStyle={{
            border: "1px solid black",
            minHeight: "200px",
            paddingLeft: 10
          }}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadImageCallBack,
              alt: { present: true, mandatory: true }
            }
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
      </div>
    );
  }
}

export default RichTextEditor;
