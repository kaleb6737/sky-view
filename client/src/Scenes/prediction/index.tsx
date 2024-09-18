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
  background: 'linear-gradient(90deg, #C0E8F8, #B0DFF2)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '0.9rem', // Larger for mobile, adjusted
  fontWeight: 'bold',
  textAlign: 'center',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem', // Smaller font size for small screens
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
    <DashboardBox 
      width="100%" 
      height="100%" 
      p={{ xs: "0.5rem", md: "1rem" }} // Adjust padding for mobile
      overflow="hidden"
    >
      <FlexBetween 
        m={{ xs: "0.5rem 1rem", md: "1rem 2.5rem" }} // Smaller margins for mobile
        gap="1rem"
        flexDirection={{ xs: 'column', md: 'row' }} // Stack elements vertically on small screens
      >
        <Box textAlign={{ xs: 'center', md: 'left' }}> {/* Center text on mobile */}
          <Typography variant="h3" fontSize={{ xs: '20px', md: '28px' }}> {/* Responsive font size */}
            Predictions
          </Typography>
          <EyeCatchingTypography variant="h6">
            Visualized revenue and foresight based on a linear regression model analysis
          </EyeCatchingTypography>
        </Box>

        <PredictionStyledButton
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            fontSize: { xs: '0.8rem', md: '1rem' }, // Responsive button text size
            padding: { xs: '0.5rem 1rem', md: '0.75rem 1.5rem' }, // Adjust button padding for mobile
            marginTop: { xs: '1rem', md: '0' }, // Add top margin on mobile
          }}
        >
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
          <XAxis
            dataKey="name"
            tickLine={false}
            style={{ fontSize: '10px' }}
            tick={{ fontSize: { xs: '8px', md: '10px' } }} // Responsive tick size
          >
            <Label
              value="Month"
              offset={-5}
              position="insideBottom"
              style={{ fontSize: { xs: '8px', md: '10px' } }} // Responsive label size
            />
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            yAxisId="left"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: '10px' }}
            tick={{ fontSize: { xs: '8px', md: '10px' } }} // Responsive tick size
            tickFormatter={(v) => `${v}`}
          >
            <Label
              value="Revenue in CAD"
              angle={-90}
              offset={-5}
              position="insideLeft"
              style={{ fontSize: { xs: '8px', md: '10px' } }} // Responsive label size
            />
          </YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            style={{ fontSize: '10px' }}
            tick={{ fontSize: { xs: '8px', md: '10px' } }} // Responsive tick size
          />
          <Tooltip contentStyle={{ fontSize: '10px' }} /> {/* Responsive tooltip size */}
          <Legend verticalAlign="top" wrapperStyle={{ fontSize: '10px' }} /> {/* Responsive legend size */}
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
