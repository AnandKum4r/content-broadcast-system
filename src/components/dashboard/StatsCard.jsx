// src/components/dashboard/StatsCard.jsx
import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ title, value }) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <p className="text-sm text-gray-500">{title}</p>

        <h2 className="mt-2 text-3xl font-bold">{value}</h2>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
