import {scaleLinear, scaleBand, extent, line} from "d3";
import { AxisLeft, AxisBottom } from "@visx/axis";
import birth from "./birthRate.js"
import { uniq } from "lodash";

function App() {
  const chartSize = 500;
  const margin = 50;
  const legendPadding = 200;
  const _extent = extent(birth.data.births);
  const _extent2 = extent(birth.data.deaths);
  const _scaleY2 = scaleLinear()
    .domain(_extent2)
    .range([chartSize - margin, margin]);
  const _scaleY = scaleLinear()
    .domain(_extent)
    .range([chartSize - margin, margin]);
  const _scaleLine = scaleLinear()
    .domain([0, 11])
    .range([margin, chartSize - margin]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const _scaleDate = scaleBand()
    .domain(months)
    .range([0, chartSize - margin - margin]);
  const dataByYear = {};
  birth.data.year.forEach((yr, i) => {
    if (!dataByYear[yr]) {
      dataByYear[yr] = [];
    }
    dataByYear[yr].push(birth.data.births[i]);
  });
  const dataByYearTwo = {};
  birth.data.year.forEach((yr, i) => {
    if (!dataByYearTwo[yr]) {
      dataByYearTwo[yr] = [];
    }
    dataByYearTwo[yr].push(birth.data.deaths[i]);
  });
  
  const years = uniq(birth.data.year.slice(0));
  const _lineMaker = line()
    .x((d, i) => {
      return _scaleLine(i);
    })
    .y((d) => {
      return _scaleY(d);
    });

    const _lineMaker2 = line()
    .x((d, i) => {
      return _scaleLine(i);
    })
    .y((d) => {
      return _scaleY2(d);
    });

  return (
    <div style={{ margin: 20 }}>
      <h1>Births and Deaths in US (2013 - 2014)</h1>
      <div style={{ display: "flex"}}>
        <svg
          width={chartSize + legendPadding}
          height={chartSize}
          // style={{ border: "1px solid pink" }}
        >
          <AxisLeft left={margin} scale={_scaleY} />
          <AxisBottom
            top={chartSize - margin}
            left={margin}
            scale={_scaleDate}
            tickValues={months}
          />
          <text x="-170" y="65" transform="rotate(-90)" fontSize={10}>
            Number of Births
          </text>
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "blue" : "black"}
                strokeWidth={year === "2013" ? 5 : 1}
                fill="none"
                key={year}
                d={_lineMaker(dataByYear[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <text
                fill={year === "2013" ? "blue" : "black"}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: "italic"
                }}
                key={`legend--${year}`}
                x={chartSize - margin + 50}
                y={_scaleY(dataByYear[year][10])}
              >
                {year}
              </text>
            );
          })}
        </svg>
        <svg
          width={chartSize + legendPadding}
          height={chartSize}
        >
          <AxisLeft left={margin} scale={_scaleY} />
          <AxisBottom
            top={chartSize - margin}
            left={margin}
            scale={_scaleDate}
            tickValues={months}
          />
          <text x="-170" y="65" transform="rotate(-90)" fontSize={10}>
            Number of Births
          </text>
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "black" : "blue"}
                strokeWidth={year === "2013" ? 1 : 5}
                fill="none"
                key={year}
                d={_lineMaker(dataByYear[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <text
                fill={year === "2013" ? "black" : "blue"}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: "italic"
                }}
                key={`legend--${year}`}
                x={chartSize - margin + 50}
                y={_scaleY(dataByYear[year][10])}
              >
                {year}
              </text>
            );
          })}

        </svg>
      </div>
      <div style={{ display: "flex"}}>
        <svg
            width={chartSize + 200}
            height={chartSize}
        >
          <AxisLeft left={margin} scale={_scaleY2} />
          <AxisBottom
            top={chartSize - margin}
            left={margin}
            scale={_scaleDate}
            tickValues={months}
          />
          <text x="-170" y="80" transform="rotate(-90)" fontSize={10}>
            Number of Deaths
          </text>
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "red" : "black"}
                strokeWidth={year === "2013" ? 5 : 1}
                fill="none"
                key={year}
                d={_lineMaker2(dataByYearTwo[year])}                
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <text
                fill={year === "2013" ? "red" : "black"}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: "italic"
                }}
                key={`legend--${year}`}
                x={chartSize - margin + 50}
                y={_scaleY2(dataByYearTwo[year][10])}
              >
                {year}
              </text>
            );
          })}          
        </svg>
        <svg
            width={chartSize + 15}
            height={chartSize}
        >
          <AxisLeft left={margin} scale={_scaleY2} />
          <AxisBottom
            top={chartSize - margin}
            left={margin}
            scale={_scaleDate}
            tickValues={months}
          />
          <text x="-160" y="80" transform="rotate(-90)" fontSize={10}>
            Number of Deaths
          </text>
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "black" : "red"}
                strokeWidth={year === "2013" ? 1 : 5}
                fill="none"
                key={year}
                d={_lineMaker2(dataByYearTwo[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <text
                fill={year === "2013" ? "black" : "red"}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: "italic"
                }}
                key={`legend--${year}`}
                x={chartSize - margin + 30}
                y={_scaleY2(dataByYearTwo[year][10])}
              >
                {year}
              </text>
            );
          })}          
        </svg>
      </div>
      <div style={{ display: "flex"}}>
        <svg
            width={chartSize + 200}
            height={chartSize}
        >
          <AxisLeft left={margin} scale={_scaleY2} />
          <AxisBottom
            top={chartSize - margin}
            left={margin}
            scale={_scaleDate}
            tickValues={months}
          />
          <text x="60" y="50" transform="rotate(0)" fontSize={12}>
            Number of Births and Deaths in 2013
          </text>
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "red" : "black"}
                strokeWidth={year === "2013" ? 5 : 0}
                fill="none"
                key={year}
                d={_lineMaker2(dataByYearTwo[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "blue" : "red"}
                strokeWidth={year === "2013" ? 5 : 0}
                fill="none"
                key={year}
                d={_lineMaker(dataByYear[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <text
                fill={year === "2013" ? "red" : "black"}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: "italic"
                }}
                key={`legend--births, deaths`}
                x={chartSize - margin + 50}
                y={_scaleY2(dataByYearTwo[year][10])}
              >
                {year}
              </text>
            );
          })}          
        </svg>
        <svg
            width={chartSize + 15}
            height={chartSize}
        >
          <AxisLeft left={margin} scale={_scaleY2} />
          <AxisBottom
            top={chartSize - margin}
            left={margin}
            scale={_scaleDate}
            tickValues={months}
          />
          <text x="50" y="50" transform="rotate(0)" fontSize={12}>
            Number of Births and Deaths in 2014
          </text>
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "black" : "red"}
                strokeWidth={year === "2013" ? 0 : 5}
                fill="none"
                key={year}
                d={_lineMaker2(dataByYearTwo[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <path
                stroke={year === "2013" ? "red" : "blue"}
                strokeWidth={year === "2013" ? 0 : 5}
                fill="none"
                key={year}
                d={_lineMaker(dataByYear[year])}
              />
            );
          })}
          {years.map((year, i) => {
            return (
              <text
                fill={year === "2013" ? "black" : "red"}
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: "italic"
                }}
                key={`legend--${year}`}
                x={chartSize - margin + 50}
                y={_scaleY(dataByYearTwo[year][10])}
              >
                {year}
              </text>
            );
          })}          
        </svg>
      </div>
    </div>
  );
}
export default App
