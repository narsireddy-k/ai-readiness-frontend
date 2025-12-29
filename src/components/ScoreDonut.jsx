import { PieChart, Pie, Cell } from "recharts";

export default function ScoreDonut({ score }) {
    const value = typeof score === "number" ? score : 0;

    const data = [
        { name: "Score", value },
        { name: "Remaining", value: 100 - value },
    ];

    const COLORS = [
        value >= 80 ? "#16a34a" : value >= 50 ? "#2563eb" : "#f97316",
        "#e5e7eb",
    ];

    return (
        <div className="relative w-50 h-50">
            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    dataKey="value"
                    stroke="none"
                    startAngle={90}
                    endAngle={-270}
                    cornerRadius={3} 
                >
                    {data.map((_, index) => (
                        <Cell key={index} fill={COLORS[index]} />
                    ))}
                </Pie>
            </PieChart>

            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-brand-dark">
                    {value}%
                </span>
                <span className="text-xs tracking-widest uppercase text-brand-gray">
                    Score
                </span>
            </div>
        </div>
    );
}
