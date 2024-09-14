import React, { useState, useMemo } from 'react';
import { Typography, useTheme, Box } from '@mui/material';
import { useGetKpisQuery } from '@/state/api';
import DashboardBox from '@/components/DashbordBox';
import FlexBetween from '@/components/flexBetween'; // Assuming FlexBetween is a custom component
import { styled } from '@mui/system';
import PredictionStyledButton from '@/components/pb'; // Assuming 'pb' is the correct path
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Label,
} from 'recharts';
import regression, { DataPoint } from 'regression';

const EyeCatchingTypography = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(90deg, #C0E8F8, #B0DFF2)', // Light blue gradient
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '0.7rem', // Adjust as needed
  fontWeight: 'bold',
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)',
  },
}));

const Predictions = (props: {}) => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);

  const { data: kpiData, error, isLoading } = useGetKpisQuery();
  console.log('KPI Data:', kpiData, 'Error:', error, 'Loading:', isLoading);

  const formattedData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;
    console.log('Month Data:', monthData);

    const formatted: Array<DataPoint> = monthData.map(({ month, revenue }, i: number) => {
      return [i, revenue];
    });

    const regressionLine = regression.linear(formatted);
    console.log('Regression Line:', regressionLine);

    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);
  console.log('Formatted Data:', formattedData);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="1rem">
        <Box>
          <Typography variant="h3">Predictions</Typography>
          <EyeCatchingTypography variant="h6">
            Visualized revenue and foresight based on a linear regression model analysis
          </EyeCatchingTypography>
        </Box>

        <PredictionStyledButton onClick={() => setIsPredictions(!isPredictions)}>
          Toggle Predictions
        </PredictionStyledButton>
      </FlexBetween>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px' }}>
            <Label value="Month" offset={-5} position="insideBottom" />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: '10px' }}
            tickFormatter={(v) => `${v}`}
          >
            <Label value="Revenue in CAD" angle={-90} offset={-5} position="insideLeft" />
          </YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: '10px' }}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={2}
            dot={{ strokeWidth: 2 }}
            yAxisId="left"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};

export default Predictions;
