export type BarData = {
    x: string[];
    y: any[];
    type: "bar";
    text: string[];
    textPosition: string;
    hoverInfo: string;
    marker: {
        color: string[];
        line: {
            color: string;
            width: number;
        };
    };
    hovertemplate: string;
}[];