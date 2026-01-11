import React from 'react';
import {
  ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Scatter, ResponsiveContainer,
  Pie, PieChart
} from 'recharts';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Title from '../../components/Title';
import Subtitle from '../../components/Subtitle';

// #region Data for ContestVerse Growth
const composedData = [
  { name: 'Jan', participants: 590, revenue: 800, goal: 1400, newUsers: 490 },
  { name: 'Feb', participants: 868, revenue: 967, goal: 1506, newUsers: 590 },
  { name: 'Mar', participants: 1397, revenue: 1098, goal: 989, newUsers: 350 },
  { name: 'Apr', participants: 1480, revenue: 1200, goal: 1228, newUsers: 480 },
  { name: 'May', participants: 1520, revenue: 1108, goal: 1100, newUsers: 460 },
  { name: 'Jun', participants: 1400, revenue: 680, goal: 1700, newUsers: 380 },
];

const mainCat = [
  { name: 'Design', value: 400 },
  { name: 'Writing', value: 300 },
  { name: 'Gaming', value: 300 },
  { name: 'Tech', value: 200 },
];

const subCat = [
  { name: 'Logo', value: 100 }, { name: 'UI/UX', value: 300 },
  { name: 'Blog', value: 150 }, { name: 'Copy', value: 150 },
  { name: 'Esports', value: 200 }, { name: 'Reviews', value: 100 },
  { name: 'Coding', value: 200 },
];
// #endregion

const PerformanceMetrics = () => {
  return (
    <section className="py-12 bg-base-200 overflow-hidden pb-24">
      <div className="container mx-auto px-4">

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <Title>
            Platform Live Pulse
          </Title>
          <Subtitle>
          Real-time breakdown of our ecosystem performance and category distribution.
          </Subtitle>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* 1. Composed Chart Section (Left) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="lg:col-span-2 bg-base-100 p-6 rounded-md
            border border-base-300 shadow-md"
          >
            <h3 className="text-xl font-bold mb-6 px-4">Growth Strategy & Revenue</h3>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={composedData}>
                  <CartesianGrid stroke="#f5f5f5" vertical={false} />
                  <XAxis dataKey="name" scale="band" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Area type="monotone" dataKey="goal" fill="#8884d8" stroke="#8884d8" fillOpacity={0.1} />
                  <Bar dataKey="revenue" barSize={30} fill="#413ea0" radius={[10, 10, 0, 0]} />
                  <Line type="monotone" dataKey="participants" stroke="#ff7300" strokeWidth={3} />
                  <Scatter dataKey="newUsers" fill="red" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className="bg-base-100 p-6 rounded-md border border-base-300 shadow-md
             flex flex-col items-center"
          >
            <h3 className="text-xl font-bold mb-2">Market Share</h3>
            <p className="text-xs opacity-50 mb-4 text-center">Inner: Major Categories | Outer: Sub-Niches</p>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mainCat}
                    dataKey="value"
                    cx="50%" cy="50%"
                    outerRadius="45%"
                    fill="#8884d8"
                    isAnimationActive={true}
                  />
                  <Pie
                    data={subCat}
                    dataKey="value"
                    cx="50%" cy="50%"
                    innerRadius="55%"
                    outerRadius="75%"
                    fill="#82ca9d"
                    label
                    isAnimationActive={true}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;