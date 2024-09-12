import { useTheme } from "@mui/material";
import { Paper } from "@mui/material";

interface Payload {
  color: string;
  name: string;
  value: number | string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const { palette } = useTheme();

  if (active && payload && payload.length) {
    return (
      <Paper
        style={{
          padding: "10px",
          background: "linear-gradient(to right,#03045E,gray)",
          borderRadius: "10px",
        }}
      >
        <p style={{ color: "#ffffff", margin: 0 }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, margin: 0 }}>
            {`${entry.name} : ${entry.value}`}
          </p>
        ))}
      </Paper>
    );
  }

  return null;
};

export default CustomTooltip;
