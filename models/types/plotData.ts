export type PlotData = {
    domain: {
        x: number[];
        y: number[];
    };
    value: number;
    type: "indicator";
    mode: "gauge+number";
    gauge: {
        axis: {
            range: number[];
        };
        bar: {
            color: string;
        };
        steps: {
            range: number[];
            color: string;
        }[];
    };
}[];