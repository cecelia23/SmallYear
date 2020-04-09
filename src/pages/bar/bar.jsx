import React from "react";
import { Card, Button } from "antd";
import EchartsReact from "echarts-for-react";

class Bar extends React.Component {
  state = {
    sales: [5, 20, 36, 10, 10, 20],
    stores: [15, 30, 16, 19, 40, 12],
  };
  update = () => {
    this.setState((state) => ({
      sales: state.sales.map((item) => item + 1),
      stores: state.stores.reduce((pre, item) => {
        pre.push(item - 1);
        return pre;
      }, []),
    }));
  };
  getOption = () => {
    return {
      title: {
        text: "ECharts 入门示例",
      },
      tooltip: {},
      legend: {
        data: ["销量", "库存"],
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: this.state.sales,
        },
        {
          name: "库存",
          type: "bar",
          data: this.state.stores,
        },
      ],
    };
  };
  render() {
    const title = (
      <Button type="primary" onClick={() => this.update()}>
        更新
      </Button>
    );

    return (
      <div>
        <Card title={title}>
          <EchartsReact option={this.getOption()}></EchartsReact>
        </Card>
      </div>
    );
  }
}

export default Bar;
