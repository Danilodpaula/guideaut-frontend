import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useVGA } from "../hooks/useVGA";
import { Language } from "../i18n/language.i18n";

interface Props {
  language: string;
  interactionList: string[];
  cognitionList: string[];
  communicationList: string[];
  behaviorList: string[];
}

const VGA = ({
  interactionList,
  cognitionList,
  communicationList,
  behaviorList,
  language,
}: Props) => {
  const { dataVGA } = useVGA({
    interactionList,
    cognitionList,
    communicationList,
    behaviorList,
  });

  return (
    <div>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart
          data={dataVGA}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey={language === Language.Portuguese ? "pt" : "en"} />
          <YAxis unit={"%"} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Legend />
          <Line
            type={"linear"}
            dataKey={"percentage"}
            stroke={"#20B4F8"}
            name={
              language === Language.Portuguese
                ? "Nível de Comprometimento"
                : "Level of Impairment"
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VGA;
