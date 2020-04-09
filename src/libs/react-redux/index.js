import React from "react";
import PropTypes from "prop-types";

// 通过context向所有子组件传递store
export class Provider extends React.Component {
  // 接收store属性
  static propTypes = {
    store: PropTypes.object.isRequired,
  };
  // 声明
  static childContextTypes = {
    store: PropTypes.object,
  };
  // 暴露接口, 返回包含store的context对象
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    // 返回渲染<Provider/>所有子节点
    return this.props.children;
  }
}
// connect高阶组件函数，接受mapStateToProps和mapDispatchToProps两个属性，返回一个高阶组件
export function connect(mapStateToProps, mapDispatchToProps) {
  // 接受一个UI组件，返回一个容器组件
  return (UIComponent) => {
    return class ContainerComponent extends React.Component {
      // 声明接受context数据的名称和类型
      static contextTypes = {
        store: PropTypes.object,
      };
      constructor(props, context) {
        super(props);
        const { store } = context;
        // 包含所有的一般属性的对象
        const stateProps = mapStateToProps(store.getState());
        // 将一般属性作为容器组件的状态属性，用于更新时重新渲染
        this.state = stateProps;
        let dispatchProps;
        if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(store.dispatch);
        } else {
          dispatchProps = Object.keys(mapDispatchToProps).reduce((pre, key) => {
            const actionCreator = mapDispatchToProps[key];
            pre[key] = (...args) => {
              store.dispatch(actionCreator(...args));
            }; // 参数透传
            return pre;
          }, {});
        }
        // 包含所有函数属性的对象(当传入的参数为函数时)
        // 将函数属性保存到对象
        this.dispatchProps = dispatchProps;
        // 绑定store中state的监听
        store.subscribe(() => {
          // 当store中的状态state发生改变时，通过更新容器组件 =》 更新UI组件
          this.setState({ ...mapStateToProps(store.getState()) });
        });
      }
      render() {
        return <UIComponent {...this.state} {...this.dispatchProps} />;
      }
    };
  };
}
