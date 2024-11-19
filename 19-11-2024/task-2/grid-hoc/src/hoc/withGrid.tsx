import React, { Component } from "react";
import GridComponent from "../component/Gridcomponent";

export const withGrid = (fetchUrl: string, displayColumns: string[]) => {
  return class extends Component {
    state = {
      data: [],
      isLoading: true,
      hasError: false,
    };

    componentDidMount() {
      this.fetchData();
    }

    async fetchData() {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        this.setState({ data: result, isLoading: false });
      } catch (error) {
        console.error("Error fetching data:", error);
        this.setState({ hasError: true, isLoading: false });
      }
    }

    render() {
      const { data, isLoading, hasError } = this.state;

      if (isLoading) {
        return <div>Loading data...</div>;
      }

      if (hasError) {
        return <div>Error loading data. Please try again later.</div>;
      }

      return <GridComponent data={data} columns={displayColumns} />;
    }
  };
};
