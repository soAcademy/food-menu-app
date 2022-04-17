import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";

const sumOrderByMenuQuantity = (data) => {
  const result = data
    .map((r) => r.items)
    .flat()
    .reduce((arr, r) => {
      arr[r.id] = {
        name: r.name,
        value: arr[r.id]?.quantity ?? 0 + r.quantity,
      };

      return arr;
    }, [])
    .flat();

  console.log(result);
  return result;
};

export const Analytics = () => {
  const [orders, setOrders] = useState([]);
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const result = await axios.post(
        process.env.REACT_APP_API_URL + "/get-orders"
      );
      setOrders(result.data);

      const chartOption1 = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "เมนู",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: sumOrderByMenuQuantity(result.data),
          },
        ],
      };

      setChartData1(chartOption1);

      const chartOption2 = {
        dataset: [
          {
            dimensions: ["name", "value"],
            source: sumOrderByMenuQuantity(result.data).map((r) => [
              r.name,
              r.value,
            ]),
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "value", order: "desc" },
            },
          },
        ],
        xAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 30 },
        },
        yAxis: {},
        series: {
          type: "bar",
          encode: { x: "name", y: "value" },
          datasetIndex: 1,
        },
      };
      setChartData2(chartOption2);
    };

    fetchOrders();
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-3xl text-center mt-4">สถิติ</h1>
      <ReactECharts option={chartData1} />
      <ReactECharts option={chartData2} />
    </div>
  );
};
